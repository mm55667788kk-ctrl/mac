import UIKit
import JavaScriptCore

/// A small stand-in for the Scriptable app: a JavaScriptCore context that offers the same objects
/// the script uses (FileManager, Request, WebView, Safari, Pasteboard, Timer, Data, Script).
/// prelude.js builds those objects on top of the plain functions in `__native` defined here.
/// Everything runs on the main thread.
final class Runtime: NSObject {
    static let shared = Runtime()
    static let docs: String = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].path

    let ctx: JSContext = JSContext()
    let web = WebViews()
    let net = Net()
    weak var host: HostViewController?
    private var started = false
    private var native: JSValue!

    func start(host: HostViewController) {
        guard !started else { return }
        started = true
        self.host = host
        web.host = host
        ctx.name = "SahraMAC"
        ctx.exceptionHandler = { _, exc in
            let msg = exc?.toString() ?? "?"
            let stack = exc?.objectForKeyedSubscript("stack")?.toString() ?? ""
            NSLog("[Sahra] JS error: %@\n%@", msg, stack)
            Runtime.shared.reportError(msg + "\n" + stack)
        }
        native = JSValue(newObjectIn: ctx)
        installNative()
        ctx.setObject(native, forKeyedSubscript: "__native" as NSString)

        guard let preludeURL = Bundle.main.url(forResource: "prelude", withExtension: "js"),
              let prelude = try? String(contentsOf: preludeURL, encoding: .utf8),
              let scriptURL = Bundle.main.url(forResource: "SahraMAC", withExtension: "js"),
              let script = try? String(contentsOf: scriptURL, encoding: .utf8) else {
            host.showError("ملفات التطبيق ناقصة")
            return
        }
        ctx.evaluateScript(prelude, withSourceURL: preludeURL)
        // the script uses top-level await (fine in Scriptable): run it inside an async function
        let wrapped = "(async () => {\n" + script + "\n})().catch(e => __native.fatal(String(e) + '\\n' + ((e && e.stack) || '')));"
        ctx.evaluateScript(wrapped, withSourceURL: scriptURL)
    }

    func reportError(_ s: String) {
        DispatchQueue.main.async {
            guard let host = self.host, host.shown == nil else { return }
            host.showError("خطأ في التشغيل:\n" + String(s.prefix(700)))
        }
    }

    private func def(_ name: String, _ block: AnyObject) {
        native.setObject(block, forKeyedSubscript: name as NSString)
    }

    private static func null() -> JSValue { JSValue(nullIn: JSContext.current()) }

    static func orNull(_ s: String?) -> Any {
        if let s = s { return s }
        return NSNull()
    }

    // swiftlint:disable function_body_length
    private func installNative() {
        let fm = FileManager.default

        // ---- logs and errors ----
        let log: @convention(block) (String) -> Void = { s in NSLog("[Sahra] %@", s) }
        def("log", unsafeBitCast(log, to: AnyObject.self))
        let fatal: @convention(block) (String) -> Void = { s in
            NSLog("[Sahra] fatal: %@", s)
            Runtime.shared.reportError(s)
        }
        def("fatal", unsafeBitCast(fatal, to: AnyObject.self))

        // ---- timers ----
        let after: @convention(block) (Double, JSValue) -> Void = { ms, fn in
            DispatchQueue.main.asyncAfter(deadline: .now() + max(0, ms) / 1000.0) { _ = fn.call(withArguments: []) }
        }
        def("after", unsafeBitCast(after, to: AnyObject.self))

        // ---- files ----
        let docsDir: @convention(block) () -> String = { Runtime.docs }
        def("docsDir", unsafeBitCast(docsDir, to: AnyObject.self))
        let tmpDir: @convention(block) () -> String = { NSTemporaryDirectory() }
        def("tmpDir", unsafeBitCast(tmpDir, to: AnyObject.self))
        let libDir: @convention(block) () -> String = {
            FileManager.default.urls(for: .libraryDirectory, in: .userDomainMask)[0].path
        }
        def("libDir", unsafeBitCast(libDir, to: AnyObject.self))
        let exists: @convention(block) (String) -> Bool = { p in fm.fileExists(atPath: p) }
        def("exists", unsafeBitCast(exists, to: AnyObject.self))
        let isDir: @convention(block) (String) -> Bool = { p in
            var d: ObjCBool = false
            return fm.fileExists(atPath: p, isDirectory: &d) && d.boolValue
        }
        def("isDir", unsafeBitCast(isDir, to: AnyObject.self))
        let mkdir: @convention(block) (String) -> Void = { p in
            try? fm.createDirectory(atPath: p, withIntermediateDirectories: true, attributes: nil)
        }
        def("mkdir", unsafeBitCast(mkdir, to: AnyObject.self))
        let readString: @convention(block) (String) -> JSValue = { p in
            guard let d = fm.contents(atPath: p) else { return Runtime.null() }
            let s = String(data: d, encoding: .utf8) ?? String(data: d, encoding: .isoLatin1) ?? ""
            return JSValue(object: s, in: JSContext.current())
        }
        def("readString", unsafeBitCast(readString, to: AnyObject.self))
        let writeString: @convention(block) (String, String) -> Void = { p, s in
            try? s.write(toFile: p, atomically: true, encoding: .utf8)
            // answers for the page: also hand them over at once (the page still polls as a fallback)
            if p.contains("/ui/r/") && p.hasSuffix(".js") { Runtime.shared.web.pushAnswer(s) }
        }
        def("writeString", unsafeBitCast(writeString, to: AnyObject.self))
        let readB64: @convention(block) (String) -> String = { p in fm.contents(atPath: p)?.base64EncodedString() ?? "" }
        def("readB64", unsafeBitCast(readB64, to: AnyObject.self))
        let writeB64: @convention(block) (String, String) -> Void = { p, b in
            let d = Data(base64Encoded: b, options: .ignoreUnknownCharacters) ?? Data()
            try? d.write(to: URL(fileURLWithPath: p), options: .atomic)
        }
        def("writeB64", unsafeBitCast(writeB64, to: AnyObject.self))
        let remove: @convention(block) (String) -> Void = { p in try? fm.removeItem(atPath: p) }
        def("remove", unsafeBitCast(remove, to: AnyObject.self))
        let move: @convention(block) (String, String) -> Void = { a, b in
            if fm.fileExists(atPath: b) { try? fm.removeItem(atPath: b) }
            try? fm.moveItem(atPath: a, toPath: b)
        }
        def("move", unsafeBitCast(move, to: AnyObject.self))
        let copy: @convention(block) (String, String) -> Void = { a, b in
            if fm.fileExists(atPath: b) { try? fm.removeItem(atPath: b) }
            try? fm.copyItem(atPath: a, toPath: b)
        }
        def("copy", unsafeBitCast(copy, to: AnyObject.self))
        let list: @convention(block) (String) -> [String] = { p in (try? fm.contentsOfDirectory(atPath: p)) ?? [] }
        def("list", unsafeBitCast(list, to: AnyObject.self))
        let size: @convention(block) (String) -> Double = { p in
            ((try? fm.attributesOfItem(atPath: p))?[.size] as? NSNumber)?.doubleValue ?? 0
        }
        def("size", unsafeBitCast(size, to: AnyObject.self))
        let mtime: @convention(block) (String) -> Double = { p in
            (((try? fm.attributesOfItem(atPath: p))?[.modificationDate] as? Date)?.timeIntervalSince1970 ?? 0) * 1000
        }
        def("mtime", unsafeBitCast(mtime, to: AnyObject.self))

        // ---- network (Request) ----
        let http: @convention(block) (String, String, JSValue) -> Void = { opts, kind, cb in
            Runtime.shared.net.request(opts: opts, kind: kind) { err, resp, payload in
                let args: [Any] = [Runtime.orNull(err), Runtime.orNull(resp), Runtime.orNull(payload)]
                _ = cb.call(withArguments: args)
            }
        }
        def("http", unsafeBitCast(http, to: AnyObject.self))

        // ---- web views ----
        let wvCreate: @convention(block) (Double, JSValue) -> Void = { id, obj in Runtime.shared.web.create(Int(id), obj) }
        def("wvCreate", unsafeBitCast(wvCreate, to: AnyObject.self))
        let wvLoadFile: @convention(block) (Double, String, JSValue, JSValue) -> Void = { id, p, ok, bad in
            Runtime.shared.web.loadFile(Int(id), p, ok, bad)
        }
        def("wvLoadFile", unsafeBitCast(wvLoadFile, to: AnyObject.self))
        let wvLoadURL: @convention(block) (Double, String, JSValue, JSValue) -> Void = { id, u, ok, bad in
            Runtime.shared.web.loadURL(Int(id), u, ok, bad)
        }
        def("wvLoadURL", unsafeBitCast(wvLoadURL, to: AnyObject.self))
        let wvLoadHTML: @convention(block) (Double, String, String, JSValue, JSValue) -> Void = { id, html, base, ok, bad in
            Runtime.shared.web.loadHTML(Int(id), html, base, ok, bad)
        }
        def("wvLoadHTML", unsafeBitCast(wvLoadHTML, to: AnyObject.self))
        let wvPresent: @convention(block) (Double, JSValue) -> Void = { id, done in Runtime.shared.web.present(Int(id), done) }
        def("wvPresent", unsafeBitCast(wvPresent, to: AnyObject.self))
        let wvEval: @convention(block) (Double, String, JSValue) -> Void = { id, js, cb in Runtime.shared.web.eval(Int(id), js, cb) }
        def("wvEval", unsafeBitCast(wvEval, to: AnyObject.self))

        // ---- Safari / players / clipboard ----
        let openURL: @convention(block) (String) -> Void = { s in
            if let u = Net.makeURL(s) { UIApplication.shared.open(u, options: [:], completionHandler: nil) }
        }
        def("openURL", unsafeBitCast(openURL, to: AnyObject.self))
        let openInApp: @convention(block) (String, JSValue) -> Void = { s, done in
            NativePlayer.present(s, from: Runtime.shared.host)
            _ = done.call(withArguments: [])
        }
        def("openInApp", unsafeBitCast(openInApp, to: AnyObject.self))
        let copyText: @convention(block) (String) -> Void = { s in UIPasteboard.general.string = s }
        def("copyText", unsafeBitCast(copyText, to: AnyObject.self))
        let paste: @convention(block) () -> String = { UIPasteboard.general.string ?? "" }
        def("paste", unsafeBitCast(paste, to: AnyObject.self))
    }
}

/// Plain HTTP for `Request` (the portal, the downloads). Accepts broken certificates like Scriptable's
/// `allowInsecureRequest`, because many IPTV servers have them.
final class Net: NSObject, URLSessionDelegate {
    private lazy var session: URLSession = {
        let c = URLSessionConfiguration.default
        c.requestCachePolicy = .reloadIgnoringLocalCacheData
        c.urlCache = nil
        c.httpMaximumConnectionsPerHost = 6
        return URLSession(configuration: c, delegate: self, delegateQueue: nil)
    }()

    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge,
                    completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        if challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust,
           let trust = challenge.protectionSpace.serverTrust {
            completionHandler(.useCredential, URLCredential(trust: trust))
        } else {
            completionHandler(.performDefaultHandling, nil)
        }
    }

    /// opts: {url, method, headers, timeout, body}; kind: "string" or "b64".
    /// done(error, responseJSON, payload) is called on the main thread.
    func request(opts: String, kind: String, done: @escaping (String?, String?, String?) -> Void) {
        guard let data = opts.data(using: .utf8),
              let o = (try? JSONSerialization.jsonObject(with: data, options: [])) as? [String: Any],
              let us = o["url"] as? String,
              let url = Net.makeURL(us) else {
            done("Invalid URL", nil, nil)
            return
        }
        var req = URLRequest(url: url)
        req.httpMethod = (o["method"] as? String) ?? "GET"
        if let t = o["timeout"] as? Double, t > 0 { req.timeoutInterval = t }
        if let h = o["headers"] as? [String: Any] {
            for (k, v) in h { req.setValue("\(v)", forHTTPHeaderField: k) }
        }
        if let b = o["body"] as? String { req.httpBody = b.data(using: .utf8) }
        session.dataTask(with: req) { body, response, error in
            var respJSON: String?
            if let h = response as? HTTPURLResponse {
                var headers: [String: String] = [:]
                for (k, v) in h.allHeaderFields { headers[(k.base as? String) ?? "\(k)"] = "\(v)" }
                let r: [String: Any] = ["statusCode": h.statusCode, "url": h.url?.absoluteString ?? us,
                                        "headers": headers, "mimeType": h.mimeType ?? ""]
                if let d = try? JSONSerialization.data(withJSONObject: r, options: []) {
                    respJSON = String(data: d, encoding: .utf8)
                }
            }
            let bytes = body ?? Data()
            let payload: String
            if kind == "b64" {
                payload = bytes.base64EncodedString()
            } else {
                payload = String(data: bytes, encoding: .utf8) ?? String(data: bytes, encoding: .isoLatin1) ?? ""
            }
            DispatchQueue.main.async {
                if let e = error, response == nil {
                    done(e.localizedDescription, nil, nil)
                } else {
                    done(nil, respJSON ?? "{\"statusCode\":0,\"headers\":{}}", payload)
                }
            }
        }.resume()
    }

    static func makeURL(_ s: String) -> URL? {
        if let u = URL(string: s) { return u }
        let allowed = CharacterSet.urlQueryAllowed.union(CharacterSet(charactersIn: "#"))
        guard let enc = s.addingPercentEncoding(withAllowedCharacters: allowed) else { return nil }
        return URL(string: enc)
    }
}
