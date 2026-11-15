/* Scriptable's objects, rebuilt on the app's native functions (__native, see Runtime.swift),
 * so SahraMAC.js runs in the app exactly as it runs in Scriptable. */
(function (G) {
  "use strict";
  var N = G.__native;
  var str = function (v) { return v === null || v === undefined ? "" : String(v); };

  // ---- console ----
  var say = function () { N.log(Array.prototype.map.call(arguments, function (x) { try { return typeof x === "string" ? x : JSON.stringify(x); } catch (e) { return String(x); } }).join(" ")); };
  G.console = { log: say, info: say, warn: say, error: say, debug: say };

  // ---- timers ----
  var seq = 0, live = {};
  G.setTimeout = function (fn, ms) {
    var id = ++seq, a = Array.prototype.slice.call(arguments, 2);
    live[id] = 1;
    N.after(+ms || 0, function () { if (live[id]) { delete live[id]; fn.apply(null, a); } });
    return id;
  };
  G.clearTimeout = function (id) { delete live[id]; };
  G.setInterval = function (fn, ms) {
    var id = ++seq;
    live[id] = 1;
    var tick = function () { N.after(+ms || 0, function () { if (!live[id]) return; fn(); tick(); }); };
    tick();
    return id;
  };
  G.clearInterval = G.clearTimeout;
  G.Timer = {
    schedule: function (ms, repeats, cb) {
      var t = { valid: true, invalidate: function () { t.valid = false; } };
      var run = function () { N.after(+ms || 0, function () { if (!t.valid) return; if (!repeats) t.valid = false; cb(); if (repeats && t.valid) run(); }); };
      run();
      return t;
    }
  };

  // ---- Data ----
  function DataObj(b64) { this._b = b64 || ""; }
  DataObj.prototype.toBase64String = function () { return this._b; };
  Object.defineProperty(DataObj.prototype, "size", { get: function () { var b = this._b, p = b.endsWith("==") ? 2 : b.endsWith("=") ? 1 : 0; return Math.floor(b.length * 3 / 4) - p; } });
  G.Data = { fromBase64String: function (b) { return new DataObj(str(b)); } };

  // ---- FileManager ----
  var fm = {
    documentsDirectory: function () { return N.docsDir(); },
    libraryDirectory: function () { return N.libDir(); },
    temporaryDirectory: function () { return N.tmpDir(); },
    cacheDirectory: function () { return N.tmpDir(); },
    joinPath: function (a, b) { a = str(a); b = str(b); return (a.endsWith("/") ? a : a + "/") + b.replace(/^\/+/, ""); },
    fileExists: function (p) { return N.exists(str(p)); },
    isDirectory: function (p) { return N.isDir(str(p)); },
    createDirectory: function (p) { N.mkdir(str(p)); },
    readString: function (p) { return N.readString(str(p)); },
    writeString: function (p, s) { N.writeString(str(p), str(s)); },
    read: function (p) { return new DataObj(N.readB64(str(p))); },
    write: function (p, d) { N.writeB64(str(p), d && d.toBase64String ? d.toBase64String() : ""); },
    remove: function (p) { N.remove(str(p)); },
    move: function (a, b) { N.move(str(a), str(b)); },
    copy: function (a, b) { N.copy(str(a), str(b)); },
    listContents: function (p) { return N.list(str(p)); },
    fileSize: function (p) { return N.size(str(p)) / 1024; },
    modificationDate: function (p) { return new Date(N.mtime(str(p))); },
    creationDate: function (p) { return new Date(N.mtime(str(p))); },
    isFileStoredIniCloud: function () { return false; },
    isFileDownloaded: function () { return true; },
    downloadFileFromiCloud: function () { return Promise.resolve(); }
  };
  G.FileManager = { local: function () { return fm; }, iCloud: function () { return fm; } };

  // ---- Request ----
  function Request(url) {
    this.url = url; this.method = "GET"; this.headers = {}; this.body = null;
    this.timeoutInterval = 60; this.allowInsecureRequest = false; this.response = null;
  }
  Request.prototype._go = function (kind) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var opts = { url: str(self.url), method: str(self.method || "GET"), headers: self.headers || {}, timeout: +self.timeoutInterval || 60,
        body: typeof self.body === "string" ? self.body : null };
      N.http(JSON.stringify(opts), kind, function (err, resp, payload) {
        if (err) { reject(new Error(err)); return; }
        try { self.response = JSON.parse(resp); } catch (e) { self.response = { statusCode: 0, headers: {} }; }
        self.response.cookies = [];
        resolve(payload);
      });
    });
  };
  Request.prototype.loadString = function () { return this._go("string"); };
  Request.prototype.loadJSON = function () { return this._go("string").then(function (t) { return JSON.parse(t); }); };
  Request.prototype.load = function () { return this._go("b64").then(function (b) { return new DataObj(b); }); };
  G.Request = Request;

  // ---- WebView ----
  var wvSeq = 0;
  function WebView() { this.__id = ++wvSeq; this.shouldAllowRequest = null; N.wvCreate(this.__id, this); }
  WebView.prototype.loadFile = function (p) { var id = this.__id; return new Promise(function (ok, bad) { N.wvLoadFile(id, str(p), function () { ok(); }, function (e) { bad(new Error(e)); }); }); };
  WebView.prototype.loadURL = function (u) { var id = this.__id; return new Promise(function (ok, bad) { N.wvLoadURL(id, str(u), function () { ok(); }, function (e) { bad(new Error(e)); }); }); };
  WebView.prototype.loadHTML = function (h, base) { var id = this.__id; return new Promise(function (ok, bad) { N.wvLoadHTML(id, str(h), str(base), function () { ok(); }, function (e) { bad(new Error(e)); }); }); };
  WebView.prototype.present = function () { var id = this.__id; return new Promise(function (done) { N.wvPresent(id, function () { done(); }); }); };
  WebView.prototype.evaluateJavaScript = function (js) { var id = this.__id; return new Promise(function (ok, bad) { N.wvEval(id, str(js), function (e, r) { if (e) bad(new Error(e)); else ok(r); }); }); };
  WebView.prototype.waitForLoad = function () { return Promise.resolve(); };
  G.WebView = WebView;

  // ---- the rest of what the script touches ----
  G.Safari = {
    open: function (u) { N.openURL(str(u)); },
    openInApp: function (u) { return new Promise(function (done) { N.openInApp(str(u), function () { done(); }); }); }
  };
  G.Pasteboard = { copyString: function (s) { N.copyText(str(s)); }, copy: function (s) { N.copyText(str(s)); }, paste: function () { return N.paste(); }, pasteString: function () { return N.paste(); } };
  G.Script = { complete: function () {}, name: function () { return "SahraMAC"; }, setShortcutOutput: function () {}, setWidget: function () {} };
  G.config = { runsInApp: true, runsInWidget: false, runsWithSiri: false, runsInActionExtension: false, runsInNotification: false, runsFromHomeScreen: false, widgetFamily: null };
  G.args = { all: [], plainTexts: [], urls: [], fileURLs: [], images: [], queryParameters: {}, shortcutParameter: null, notification: null, widgetParameter: null };
})(globalThis);
