import UIKit
import WebKit
import JavaScriptCore
import AVKit

/// Scriptable's WebView for the script: the page is served from the app's own address (sahra://app/…),
/// navigations are offered to the script's `shouldAllowRequest`, and the page can also talk through
/// `window.webkit.messageHandlers.sahra` (faster than the navigation trick Scriptable needs).
final class WebViews: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
    weak var host: HostViewController?
    let scheme = SchemeHandler()
    private var views: [Int: WKWebView] = [:]
    private var objs: [Int: JSValue] = [:]
    private var pending: [Int: (ok: JSValue, fail: JSValue)] = [:]
    private var presented: [Int: JSValue] = [:]

    /// Runs before the page: marks the app, and sends the page's requests to other servers through
    /// the app (no CORS limits, broken certificates accepted).
    static let inject = """
    window.SAHRA_APP = 1;
    (function () {
      var of = window.fetch.bind(window);
      window.fetch = function (input, init) {
        try {
          var u = typeof input === "string" ? input : (input && input.url) || "";
          if (/^https?:\\/\\//i.test(u)) {
            var p = "sahra://app/__proxy?u=" + encodeURIComponent(u);
            input = typeof input === "string" ? p : new Request(p, input);
          }
        } catch (e) {}
        return of(input, init);
      };
    })();
    """

    private func id(of wv: WKWebView) -> Int? {
        for (k, v) in views where v === wv { return k }
        return nil
    }

    func create(_ id: Int, _ obj: JSValue) {
        let cfg = WKWebViewConfiguration()
        cfg.setURLSchemeHandler(scheme, forURLScheme: SchemeHandler.scheme)
        cfg.allowsInlineMediaPlayback = true
        cfg.mediaTypesRequiringUserActionForPlayback = []
        cfg.allowsPictureInPictureMediaPlayback = true
        cfg.allowsAirPlayForMediaPlayback = true
        let ucc = WKUserContentController()
        ucc.addUserScript(WKUserScript(source: WebViews.inject, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        ucc.add(WeakMessageHandler(self), name: "sahra")
        cfg.userContentController = ucc

        let frame = host?.view.bounds ?? UIScreen.main.bounds
        let wv = WKWebView(frame: frame, configuration: cfg)
        wv.navigationDelegate = self
        wv.uiDelegate = self
        wv.isOpaque = false
        wv.backgroundColor = .black
        wv.scrollView.backgroundColor = .black
        wv.scrollView.contentInsetAdjustmentBehavior = .never
        wv.scrollView.bounces = false
        wv.allowsBackForwardNavigationGestures = false
        if #available(iOS 16.4, *) { wv.isInspectable = true }
        views[id] = wv
        objs[id] = obj
        host?.attach(wv)
    }

    // ---- loading ----
    func loadFile(_ id: Int, _ path: String, _ ok: JSValue, _ fail: JSValue) {
        guard let wv = views[id] else { _ = fail.call(withArguments: ["no web view"]); return }
        var rel = path
        if rel.hasPrefix(Runtime.docs) { rel = String(rel.dropFirst(Runtime.docs.count)) }
        while rel.hasPrefix("/") { rel.removeFirst() }
        let enc = rel.split(separator: "/").map { part -> String in
            let s = String(part)
            return s.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? s
        }.joined(separator: "/")
        guard let url = URL(string: SchemeHandler.scheme + "://app/" + enc) else {
            _ = fail.call(withArguments: ["bad path"])
            return
        }
        pending[id] = (ok: ok, fail: fail)
        wv.load(URLRequest(url: url))
    }

    func loadURL(_ id: Int, _ s: String, _ ok: JSValue, _ fail: JSValue) {
        guard let wv = views[id], let url = Net.makeURL(s) else { _ = fail.call(withArguments: ["bad url"]); return }
        pending[id] = (ok: ok, fail: fail)
        wv.load(URLRequest(url: url))
    }

    func loadHTML(_ id: Int, _ html: String, _ base: String, _ ok: JSValue, _ fail: JSValue) {
        guard let wv = views[id] else { _ = fail.call(withArguments: ["no web view"]); return }
        pending[id] = (ok: ok, fail: fail)
        wv.loadHTMLString(html, baseURL: base.isEmpty ? nil : Net.makeURL(base))
    }

    func present(_ id: Int, _ done: JSValue) {
        guard let wv = views[id] else { return }
        presented[id] = done
        host?.reveal(wv)
    }

    func eval(_ id: Int, _ js: String, _ cb: JSValue) {
        guard let wv = views[id] else { _ = cb.call(withArguments: ["no web view", NSNull()]); return }
        wv.evaluateJavaScript(js) { result, error in
            if let e = error {
                _ = cb.call(withArguments: [e.localizedDescription, NSNull()])
            } else {
                let r: Any = result ?? NSNull()
                _ = cb.call(withArguments: [NSNull(), r])
            }
        }
    }

    /// An answer the script just wrote for the page: run it in the page right away.
    func pushAnswer(_ js: String) {
        for (_, wv) in views {
            wv.evaluateJavaScript("if (window.bridge) {" + js + "}", completionHandler: nil)
        }
    }

    // ---- the script decides about navigations (that is how the page talks in Scriptable) ----
    private func allow(_ obj: JSValue, _ url: String, _ method: String) -> Bool {
        guard let fn = obj.forProperty("shouldAllowRequest"), !fn.isUndefined, !fn.isNull else { return true }
        let req: [String: Any] = ["url": url, "method": method]
        if let r = fn.call(withArguments: [req]), r.isBoolean { return r.toBool() }
        return true
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let url = navigationAction.request.url
        if let i = id(of: webView), let obj = objs[i] {
            if !allow(obj, url?.absoluteString ?? "", navigationAction.request.httpMethod ?? "GET") {
                decisionHandler(.cancel)
                return
            }
        }
        // other apps (VLC, Infuse, …)
        if let u = url, let sch = u.scheme?.lowercased(),
           !["sahra", "http", "https", "about", "blob", "data", "file"].contains(sch) {
            UIApplication.shared.open(u, options: [:], completionHandler: nil)
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let s = message.body as? String, let wv = message.webView, let i = id(of: wv), let obj = objs[i] else { return }
        _ = allow(obj, s, "GET")
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        guard let i = id(of: webView), let p = pending.removeValue(forKey: i) else { return }
        _ = p.ok.call(withArguments: [])
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        failLoad(webView, error)
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        failLoad(webView, error)
    }

    private func failLoad(_ wv: WKWebView, _ error: Error) {
        let ns = error as NSError
        if ns.domain == NSURLErrorDomain && ns.code == NSURLErrorCancelled { return }
        if ns.domain == "WebKitErrorDomain" && ns.code == 102 { return }   // stopped by a policy decision (the bridge)
        guard let i = id(of: wv), let p = pending.removeValue(forKey: i) else { return }
        _ = p.fail.call(withArguments: [error.localizedDescription])
    }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        webView.reload()
    }

    // ---- links that want a new window, and alert / confirm ----
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                 for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let u = navigationAction.request.url { UIApplication.shared.open(u, options: [:], completionHandler: nil) }
        return nil
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        guard let host = host else { completionHandler(); return }
        let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: "حسناً", style: .default) { _ in completionHandler() })
        (host.presentedViewController ?? host).present(a, animated: true, completion: nil)
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        guard let host = host else { completionHandler(false); return }
        let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: "إلغاء", style: .cancel) { _ in completionHandler(false) })
        a.addAction(UIAlertAction(title: "موافق", style: .default) { _ in completionHandler(true) })
        (host.presentedViewController ?? host).present(a, animated: true, completion: nil)
    }
}

/// WKUserContentController keeps its handlers alive; this keeps the cycle out.
final class WeakMessageHandler: NSObject, WKScriptMessageHandler {
    weak var target: WKScriptMessageHandler?
    init(_ target: WKScriptMessageHandler) { self.target = target }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        target?.userContentController(userContentController, didReceive: message)
    }
}

/// sahra://app/<path> → a file in the app's Documents folder (the page, the answers, test files);
/// sahra://app/__proxy?u=<url> → the app fetches that address and streams it back to the page.
final class SchemeHandler: NSObject, WKURLSchemeHandler, URLSessionDataDelegate {
    static let scheme = "sahra"
    private var session: URLSession!
    private var byTask: [Int: WKURLSchemeTask] = [:]
    private var byScheme: [ObjectIdentifier: URLSessionDataTask] = [:]

    override init() {
        super.init()
        let c = URLSessionConfiguration.default
        c.requestCachePolicy = .reloadIgnoringLocalCacheData
        c.urlCache = nil
        c.timeoutIntervalForRequest = 30
        c.httpMaximumConnectionsPerHost = 8
        session = URLSession(configuration: c, delegate: self, delegateQueue: OperationQueue.main)
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(URLError(.badURL))
            return
        }
        if url.path == "/__proxy" { proxy(urlSchemeTask, url) } else { serveFile(urlSchemeTask, url) }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
        let key = ObjectIdentifier(urlSchemeTask as AnyObject)
        if let t = byScheme.removeValue(forKey: key) {
            byTask.removeValue(forKey: t.taskIdentifier)
            t.cancel()
        }
    }

    // ---- files ----
    private func serveFile(_ task: WKURLSchemeTask, _ url: URL) {
        let rel = url.path
        let path = (Runtime.docs as NSString).appendingPathComponent(rel)
        var isDir: ObjCBool = false
        guard !rel.contains(".."),
              FileManager.default.fileExists(atPath: path, isDirectory: &isDir), !isDir.boolValue,
              let data = FileManager.default.contents(atPath: path) else {
            let headers = ["Content-Type": "text/plain", "Cache-Control": "no-store", "Content-Length": "0"]
            if let r = HTTPURLResponse(url: url, statusCode: 404, httpVersion: "HTTP/1.1", headerFields: headers) {
                task.didReceive(r)
                task.didReceive(Data())
                task.didFinish()
            } else {
                task.didFailWithError(URLError(.fileDoesNotExist))
            }
            return
        }
        var status = 200
        var body = data
        var headers: [String: String] = ["Content-Type": SchemeHandler.mime(path), "Cache-Control": "no-store",
                                         "Accept-Ranges": "bytes", "Access-Control-Allow-Origin": "*"]
        if let range = task.request.value(forHTTPHeaderField: "Range"), let r = SchemeHandler.parseRange(range, data.count) {
            body = data.subdata(in: r.lowerBound..<(r.upperBound + 1))
            status = 206
            headers["Content-Range"] = "bytes \(r.lowerBound)-\(r.upperBound)/\(data.count)"
        }
        headers["Content-Length"] = String(body.count)
        guard let resp = HTTPURLResponse(url: url, statusCode: status, httpVersion: "HTTP/1.1", headerFields: headers) else {
            task.didFailWithError(URLError(.cannotParseResponse))
            return
        }
        task.didReceive(resp)
        task.didReceive(body)
        task.didFinish()
    }

    static func parseRange(_ h: String, _ n: Int) -> ClosedRange<Int>? {
        guard h.hasPrefix("bytes="), n > 0 else { return nil }
        let parts = h.dropFirst(6).split(separator: "-", omittingEmptySubsequences: false)
        guard parts.count == 2 else { return nil }
        if parts[0].isEmpty {
            guard let suffix = Int(parts[1]), suffix > 0 else { return nil }
            return max(0, n - suffix)...(n - 1)
        }
        guard let a = Int(parts[0]), a < n else { return nil }
        let b = Int(parts[1]).map { min($0, n - 1) } ?? (n - 1)
        return b >= a ? a...b : nil
    }

    static func mime(_ p: String) -> String {
        switch (p as NSString).pathExtension.lowercased() {
        case "html", "htm": return "text/html; charset=utf-8"
        case "js": return "application/javascript; charset=utf-8"
        case "css": return "text/css; charset=utf-8"
        case "json": return "application/json"
        case "mp4", "m4v": return "video/mp4"
        case "m4s": return "video/iso.segment"
        case "m3u8": return "application/vnd.apple.mpegurl"
        case "ts": return "video/mp2t"
        case "png": return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "svg": return "image/svg+xml"
        default: return "application/octet-stream"
        }
    }

    // ---- the page's requests to other servers ----
    private func proxy(_ task: WKURLSchemeTask, _ url: URL) {
        guard let comps = URLComponents(url: url, resolvingAgainstBaseURL: false),
              let target = comps.queryItems?.first(where: { $0.name == "u" })?.value,
              let turl = Net.makeURL(target) else {
            task.didFailWithError(URLError(.badURL))
            return
        }
        if task.request.httpMethod == "OPTIONS" {
            let headers = ["Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*",
                           "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS", "Content-Length": "0"]
            if let r = HTTPURLResponse(url: url, statusCode: 204, httpVersion: "HTTP/1.1", headerFields: headers) {
                task.didReceive(r)
                task.didFinish()
            }
            return
        }
        var req = URLRequest(url: turl)
        req.httpMethod = task.request.httpMethod ?? "GET"
        for (k, v) in task.request.allHTTPHeaderFields ?? [:] {
            let l = k.lowercased()
            if l == "origin" || l == "referer" || l == "host" || l == "accept-encoding" { continue }
            req.setValue(v, forHTTPHeaderField: k)
        }
        let t = session.dataTask(with: req)
        byTask[t.taskIdentifier] = task
        byScheme[ObjectIdentifier(task as AnyObject)] = t
        t.resume()
    }

    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive response: URLResponse,
                    completionHandler: @escaping (URLSession.ResponseDisposition) -> Void) {
        guard let task = byTask[dataTask.taskIdentifier], let url = task.request.url else {
            completionHandler(.cancel)
            return
        }
        var status = 200
        var headers: [String: String] = [:]
        if let h = response as? HTTPURLResponse {
            status = h.statusCode
            for (k, v) in h.allHeaderFields { headers[(k.base as? String) ?? "\(k)"] = "\(v)" }
        }
        // URLSession already unpacked a compressed body: its length no longer matches
        if headers.keys.contains(where: { $0.lowercased() == "content-encoding" }) {
            headers = headers.filter { $0.key.lowercased() != "content-encoding" && $0.key.lowercased() != "content-length" }
        }
        headers = headers.filter { !$0.key.lowercased().hasPrefix("access-control-") && $0.key.lowercased() != "set-cookie" }
        headers["Access-Control-Allow-Origin"] = "*"
        headers["Access-Control-Expose-Headers"] = "*"
        headers["Cache-Control"] = "no-store"
        guard let r = HTTPURLResponse(url: url, statusCode: status, httpVersion: "HTTP/1.1", headerFields: headers) else {
            completionHandler(.cancel)
            return
        }
        task.didReceive(r)
        completionHandler(.allow)
    }

    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
        byTask[dataTask.taskIdentifier]?.didReceive(data)
    }

    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        guard let st = byTask.removeValue(forKey: task.taskIdentifier) else { return }
        byScheme.removeValue(forKey: ObjectIdentifier(st as AnyObject))
        if let e = error { st.didFailWithError(e) } else { st.didFinish() }
    }

    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge,
                    completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        if challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust,
           let trust = challenge.protectionSpace.serverTrust {
            completionHandler(.useCredential, URLCredential(trust: trust))
        } else {
            completionHandler(.performDefaultHandling, nil)
        }
    }
}

/// «مشغّل النظام»: Apple's own player (MP4 / HLS, picture-in-picture, AirPlay).
enum NativePlayer {
    static func present(_ s: String, from host: UIViewController?) {
        guard let host = host, let url = Net.makeURL(s) else { return }
        let player = AVPlayer(url: url)
        let vc = AVPlayerViewController()
        vc.player = player
        vc.allowsPictureInPicturePlayback = true
        vc.canStartPictureInPictureAutomaticallyFromInline = true
        var top: UIViewController = host
        while let p = top.presentedViewController { top = p }
        top.present(vc, animated: true) { player.play() }
    }
}
