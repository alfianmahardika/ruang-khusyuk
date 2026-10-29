/* Best Muslim i18n layer — locale JSON (18 langs), RTL for ar/ur/fa.
   Syncs with existing rk_lang / I18N / V.applyV without removing features.
   Religious content (Qur'an/hadith/doa meanings) stays on ID/EN/AR fallback — see store/compliance/i18n-religious-fallback.md */
(function () {
  "use strict";
  const LANGS = [
    "id", "en", "ar", "ms", "tr", "ur", "bn", "fa",
    "fr", "de", "es", "ru", "hi", "nl", "it", "pt",
    "zh-Hans", "zh-Hant"
  ];
  const RTL = new Set(["ar", "ur", "fa"]);
  const DEFAULT = "id";
  const catalogs = Object.create(null);
  let lang = DEFAULT;
  let ready = false;

  function normalize(v) {
    if (v == null) return null;
    const s = String(v);
    if (LANGS.includes(s)) return s;
    /* Accept zh / zh-CN / zh-TW aliases */
    const low = s.toLowerCase();
    if (low === "zh" || low === "zh-cn" || low === "zh-sg" || low === "zh-hans") return "zh-Hans";
    if (low === "zh-tw" || low === "zh-hk" || low === "zh-mo" || low === "zh-hant") return "zh-Hant";
    const base = low.split("-")[0];
    if (LANGS.includes(base)) return base;
    return null;
  }

  function readStored() {
    try {
      const raw = localStorage.getItem("rk_lang");
      if (raw == null) return DEFAULT;
      const v = JSON.parse(raw);
      return normalize(v) || DEFAULT;
    } catch (e) { return DEFAULT; }
  }

  function t(key, fallback) {
    const c = catalogs[lang] || catalogs[DEFAULT] || {};
    if (c[key] != null) return c[key];
    if (catalogs[DEFAULT] && catalogs[DEFAULT][key] != null) return catalogs[DEFAULT][key];
    return fallback != null ? fallback : key;
  }

  function applyDir() {
    const rtl = RTL.has(lang);
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = rtl ? "rtl" : "ltr";
      const app = document.getElementById("app");
      if (app) { app.lang = lang; app.dir = rtl ? "rtl" : "ltr"; }
    } catch (e) {}
  }

  function applyNav() {
    const map = {
      beranda: "nav.beranda",
      quran: "nav.akademi",
      mushaf: "nav.quran",
      belanja: "nav.belanja",
      "jejak-nur": "nav.jamaah",
      profil: "nav.profil",
      lainnya: "nav.lainnya"
    };
    Object.keys(map).forEach(p => {
      const btn = document.querySelector('.nav button[data-p="' + p + '"]');
      if (!btn) return;
      /* Prefer label span[data-v]; never overwrite .nav-center-btn (holds icon) */
      const el = btn.querySelector('span[data-v]') || [...btn.querySelectorAll('span')].find(s => !s.classList.contains('nav-center-btn') && !s.querySelector('svg'));
      if (!el) return;
      const k = map[p];
      if (catalogs[lang] && catalogs[lang][k]) el.textContent = t(k);
    });
    document.querySelectorAll("[data-bm-i18n]").forEach(el => {
      el.textContent = t(el.getAttribute("data-bm-i18n"));
    });
    document.querySelectorAll("[data-bm-i18n-html]").forEach(el => {
      el.innerHTML = t(el.getAttribute("data-bm-i18n-html"));
    });
  }

  async function loadOne(l) {
    if (catalogs[l] && Object.keys(catalogs[l]).length) return catalogs[l];
    try {
      const r = await fetch("i18n/" + encodeURIComponent(l) + ".json", { cache: "no-cache" });
      if (!r.ok) throw new Error("http " + r.status);
      catalogs[l] = await r.json();
    } catch (e) {
      catalogs[l] = catalogs[l] || {};
    }
    return catalogs[l];
  }

  async function setLang(l, opts) {
    l = normalize(l) || DEFAULT;
    lang = l;
    await loadOne(l);
    if (!catalogs[DEFAULT]) await loadOne(DEFAULT);
    applyDir();
    applyNav();
    try {
      if (!(opts && opts.skipStore)) localStorage.setItem("rk_lang", JSON.stringify(l));
    } catch (e) {}
    try {
      /* Legacy I18N only knows id/en/ar for religious T() strings — map others to en for that layer */
      const legacy = (l === "id" || l === "ar") ? l : "en";
      if (window.I18N && typeof I18N.set === "function" && I18N.lang !== legacy && !(opts && opts.fromI18N)) {
        I18N.lang = legacy;
        if (typeof I18N.apply === "function") I18N.apply();
        if (window.App && App.rerender) App.rerender();
      }
    } catch (e) {}
    try {
      if (typeof window.applyV === "function") window.applyV();
      else if (typeof applyV === "function") applyV();
    } catch (e) {}
    /* Legacy applyV only knows id/en/ar — re-stamp BMI18N nav labels after it */
    applyNav();
    try { document.dispatchEvent(new CustomEvent("rk:lang", { detail: l })); } catch (e) {}
    try { document.dispatchEvent(new CustomEvent("bm:i18n", { detail: l })); } catch (e) {}
  }


  function hookApplyV() {
    try {
      const wrap = (fn) => function () {
        const r = fn.apply(this, arguments);
        try { applyNav(); } catch (e) {}
        return r;
      };
      if (typeof window.applyV === "function" && !window.applyV._bmHooked) {
        window.applyV = wrap(window.applyV);
        window.applyV._bmHooked = true;
      }
      if (typeof applyV === "function" && applyV !== window.applyV && !applyV._bmHooked) {
        /* global applyV in non-module bundle */
        try { applyV = wrap(applyV); applyV._bmHooked = true; } catch (e) {}
      }
    } catch (e) {}
  }

  async function init() {
    lang = readStored();
    await loadOne(DEFAULT);
    await loadOne(lang);
    ready = true;
    applyDir();
    applyNav();
    hookApplyV();
    setTimeout(hookApplyV, 500);
    setTimeout(hookApplyV, 2000);
    /* Prefetch rest in background */
    LANGS.forEach(l => { if (l !== lang && l !== DEFAULT) loadOne(l); });
    document.addEventListener("rk:lang", (e) => {
      const l = normalize(e && e.detail);
      if (l && l !== lang) {
        setLang(l, { skipStore: true, fromI18N: true });
      }
    });
  }

  window.BMI18N = {
    t, setLang, getLang: () => lang, langs: () => LANGS.slice(),
    rtl: () => RTL.has(lang), isRtl: (c) => RTL.has(normalize(c) || c),
    normalize, ready: () => ready, init, applyNav, catalogs: () => catalogs
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => { init(); });
  else init();
})();
