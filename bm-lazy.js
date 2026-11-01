/*! Best Muslim — keep heavy features off the first paint.
 *  Home cards (Hari ini, growth) start after window load.
 *  Jejak Nur, the guide, and admin load the first time their page opens. */
(function () {
  "use strict";
  var FEATS = {
    target: { js: "bm-target-harian.js", css: "bm-target-harian.css", global: "BmTargetHarian" },
    growth: { js: "bm-growth.js", css: "bm-growth.css", global: "BmGrowth", needs: ["target"] },
    jejak: { js: "bm-jejak-nur.js", css: "bm-jejak-nur.css", global: "RKJejakNur" },
    panduan: { js: "bm-panduan.js", css: "bm-panduan.css", global: "BmPanduan" },
    admin: { js: "bm-admin89.js", css: "bm-admin89.css", global: "RKAdmin" }
  };
  var jobs = Object.create(null);

  function loadCss(href) {
    return new Promise(function (res) {
      if (document.querySelector('link[data-bm-lazy="' + href + '"]')) { res(); return; }
      var l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      l.setAttribute("data-bm-lazy", href);
      l.onload = function () { res(); };
      l.onerror = function () { res(); };
      document.head.appendChild(l);
    });
  }

  function loadJs(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.onload = function () { res(); };
      s.onerror = function () { rej(new Error(src)); };
      document.head.appendChild(s);
    });
  }

  function ready(name) {
    var f = FEATS[name];
    return !!(f && window[f.global]);
  }

  function ensure(name) {
    if (jobs[name]) return jobs[name];
    var f = FEATS[name];
    if (!f) return Promise.resolve();
    var chain = Promise.resolve();
    (f.needs || []).forEach(function (n) {
      chain = chain.then(function () { return ensure(n); });
    });
    jobs[name] = chain.then(function () {
      if (ready(name)) return;
      return loadCss(f.css).then(function () { return loadJs(f.js); }).then(function () {
        try { document.dispatchEvent(new CustomEvent("bm:module", { detail: name })); } catch (e) {}
      });
    }).catch(function (err) {
      delete jobs[name];
      return Promise.reject(err);
    });
    return jobs[name];
  }

  var PAGE = {
    "jejak-nur": ["jejak"],
    profil: ["jejak"],
    panduan: ["panduan"],
    admin: ["admin"],
    settings: ["panduan", "admin"],
    quran: ["panduan"],
    mushaf: ["panduan"]
  };

  function missing(p) {
    if (p === "admin" && window.BM_STORE_BUILD) return [];
    return (PAGE[p] || []).filter(function (n) { return !ready(n); });
  }

  function wrapGo() {
    if (!window.go || window.go._bmLazy) return !!window.go;
    var inner = window.go;
    function wrapped(p) {
      var miss = missing(p);
      if (miss.length) {
        Promise.all(miss.map(ensure)).then(function () {
          try { window.go(p); } catch (e) {}
        }).catch(function () {});
        return;
      }
      return inner.apply(this, arguments);
    }
    wrapped._bmLazy = 1;
    window.go = wrapped;
    return true;
  }

  function boot() {
    wrapGo();
    /* Nav and other modules wrap go on DOMContentLoaded and again ~800ms later. Stay outside that chain. */
    setTimeout(wrapGo, 1200);
    var home = function () {
      ensure("target").then(function () { return ensure("growth"); }).catch(function () {});
    };
    if (document.readyState === "complete") setTimeout(home, 1);
    else window.addEventListener("load", function () { setTimeout(home, 1); });
  }

  window.BMLazy = { ensure: ensure, ready: ready };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
