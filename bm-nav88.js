/* Best Muslim v88 — TikTok-style nav helpers: Fitur grid, global search, profil→Jamaah profile */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  /** Resolve id/en/ar objects, arrays, or plain strings to current-lang text */
  function resolveI18n(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    const L = lang();
    if (Array.isArray(v)) {
      const i = { id: 0, en: 1, ar: 2 }[L] || 0;
      const pick = v[i] != null ? v[i] : v[0];
      return resolveI18n(pick);
    }
    if (typeof v === "object") {
      if (v[L] != null) return resolveI18n(v[L]);
      if (v.id != null) return resolveI18n(v.id);
      if (v.en != null) return resolveI18n(v.en);
      if (v.ar != null) return resolveI18n(v.ar);
      if (v.nama != null) return resolveI18n(v.nama);
      if (v.name != null) return resolveI18n(v.name);
      if (v.t != null) return resolveI18n(v.t);
      if (v.title != null) return resolveI18n(v.title);
      if (v.text != null) return resolveI18n(v.text);
      return "";
    }
    return String(v);
  }
  const lang = () => {
    try {
      const L = (window.lang && window.lang()) || JSON.parse(localStorage.getItem("rk_lang") || '"id"');
      return L === "en" || L === "ar" ? L : "id";
    } catch (e) {
      return "id";
    }
  };

  const UI = {
    id: {
      fiturEy: "Semua di sini",
      fiturT: "Fitur",
      fiturAll: "Lihat semua",
      searchPh: "Cari surah, ayat, doa, fitur, jamaah…",
      searchT: "Cari",
      searchEmpty: "Tidak ada hasil",
      searchClose: "Tutup",
      catFeature: "Fitur",
      catSurah: "Surah",
      catDoa: "Doa",
      catPost: "Jamaah",
      semuaFitur: "Semua fitur",
      pengaturan: "Pengaturan"
    },
    en: {
      fiturEy: "Everything here",
      fiturT: "Features",
      fiturAll: "See all",
      searchPh: "Search surah, verse, du'a, features, jamaah…",
      searchT: "Search",
      searchEmpty: "No results",
      searchClose: "Close",
      catFeature: "Feature",
      catSurah: "Surah",
      catDoa: "Du'a",
      catPost: "Jamaah",
      semuaFitur: "All features",
      pengaturan: "Settings"
    },
    ar: {
      fiturEy: "كل شيء هنا",
      fiturT: "الميزات",
      fiturAll: "عرض الكل",
      searchPh: "ابحث عن سورة أو آية أو دعاء أو ميزة…",
      searchT: "بحث",
      searchEmpty: "لا نتائج",
      searchClose: "إغلاق",
      catFeature: "ميزة",
      catSurah: "سورة",
      catDoa: "دعاء",
      catPost: "الجماعة",
      semuaFitur: "كل الميزات",
      pengaturan: "الإعدادات"
    }
  };
  const t = (k) => (UI[lang()] || UI.id)[k] || UI.id[k] || k;

  /* Same catalog as Lainnya — kept reachable from Beranda Fitur */
  const FITUR = [
    ["📖", "Akademi", "Academy", "الأكاديمية", "quran"],
    ["🎙️", "Hafalan AI", "Hafiz AI", "الحفظ الذكي", "hafalan"],
    ["✨", "Jamaah", "Jamaah", "الجماعة", "jejak-nur"],
    ["🕰️", "Jadwal Salat", "Prayer Times", "المواقيت", "jadwal"],
    ["🧭", "Kiblat", "Qibla", "القبلة", "kiblat"],
    ["🕋", "Salat Khusyuk", "Mindful Prayer", "صلاة خاشعة", "flow"],
    ["✅", "Checklist", "Checklist", "المهام", "harian"],
    ["🧎", "Persiapan", "Preparation", "التهيئة", "persiapan"],
    ["📖", "Bacaan Salat", "Recitations", "الأذكار", "bacaan"],
    ["🌙", "Sunnah", "Sunnah", "السنن", "sunnah"],
    ["🧍", "Gerakan", "Postures", "الحركات", "gerakan"],
    ["📿", "Tasbih", "Tasbih", "المسبحة", "tasbih"],
    ["📝", "Setelah Salat", "After Prayer", "بعد الصلاة", "setelah"],
    ["🎧", "Murattal", "Murattal", "التلاوة", "mur"],
    ["💰", "Zakat", "Zakat", "الزكاة", "zakat"],
    ["🛍️", "Toko Berkah", "Blessed Shop", "متجر البركة", "belanja"],
    ["🌙", "Puasa", "Fasting", "الصيام", "puasa"],
    ["🕋", "Haji & Umrah", "Hajj & Umrah", "الحج والعمرة", "umrah"],
    ["✦", "Premium", "Premium", "بريميوم", "premium"],
    ["⚙", "Pengaturan", "Settings", "الإعدادات", "settings"],
    ["🔒", "Privasi", "Privacy", "الخصوصية", "privasi"]
  ];

  const SURAH = [
    [1, "Al-Fatihah", "الفاتحة"],
    [2, "Al-Baqarah", "البقرة"],
    [18, "Al-Kahf", "الكهف"],
    [36, "Yasin", "يس"],
    [55, "Ar-Rahman", "الرحمن"],
    [67, "Al-Mulk", "الملك"],
    [112, "Al-Ikhlas", "الإخلاص"]
  ];

  function lab(row) {
    const i = { id: 1, en: 2, ar: 3 }[lang()] || 1;
    return row[i] || row[1];
  }

  function ensureFitur() {
    const stack = $("#page-beranda .stack");
    if (!stack) return;
    let box = $("#bmFitur");
    const L = lang();
    if (box && box.dataset.lang === L && box.querySelector(".bm-fitur-grid")) return;
    if (!box) {
      box = document.createElement("div");
      box.id = "bmFitur";
      box.className = "bm-fitur";
      const anchor = $("#v2PromoCard") || $("#bmDompet");
      if (anchor) anchor.before(box);
      else stack.appendChild(box);
    }
    box.dataset.lang = L;
    const preview = FITUR.slice(0, 8);
    box.innerHTML = `<div class="bm-fitur-hd"><div><div class="eyebrow">${esc(t("fiturEy"))}</div><h3>${esc(t("fiturT"))}</h3></div><button type="button" data-bm-fitur-all="1">${esc(t("fiturAll"))} →</button></div>
      <div class="bm-fitur-grid">${preview
        .map((r) => `<button type="button" data-bm-fitur="${esc(r[4])}"><i aria-hidden="true">${r[0]}</i><b>${esc(lab(r))}</b></button>`)
        .join("")}</div>`;
  }

  function openAllFitur() {
    /* Reuse page-lainnya which still has full grid */
    if (window.go) window.go("lainnya");
    setTimeout(() => {
      const g = $("#lnGrid");
      if (g) {
        /* ensure jejak tile not required; grid already has items */
      }
    }, 50);
  }

  function ensureSearchSheet() {
    if ($("#bmSearchSheet")) return;
    const d = document.createElement("div");
    d.id = "bmSearchSheet";
    d.className = "bm-search-sheet";
    d.hidden = true;
    d.innerHTML = `<div class="bm-search-in" role="dialog" aria-modal="true" aria-label="Search">
      <div class="bm-search-row">
        <input id="bmSearchInput" type="search" enterkeyhint="search" autocomplete="off">
        <button type="button" class="btn sm ghost" data-bm-search-x="1">✕</button>
      </div>
      <div class="bm-search-res" id="bmSearchRes"></div>
    </div>`;
    document.body.appendChild(d);
  }

  function openSearch() {
    ensureSearchSheet();
    const sh = $("#bmSearchSheet");
    const inp = $("#bmSearchInput");
    sh.hidden = false;
    inp.placeholder = t("searchPh");
    inp.value = "";
    $("#bmSearchRes").innerHTML = `<p class="dim">${esc(t("searchPh"))}</p>`;
    setTimeout(() => inp.focus(), 50);
  }
  function closeSearch() {
    const sh = $("#bmSearchSheet");
    if (sh) sh.hidden = true;
  }

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[^a-z0-9\u0600-\u06ff\s]/gi, " ")
      .trim();
  }

  function runSearch(qRaw) {
    const q = norm(qRaw);
    const res = $("#bmSearchRes");
    if (!res) return;
    if (!q || q.length < 1) {
      res.innerHTML = `<p class="dim">${esc(t("searchPh"))}</p>`;
      return;
    }
    const out = [];
    FITUR.forEach((r) => {
      const name = lab(r);
      if (norm(name).includes(q) || norm(r[4]).includes(q) || norm(r[1]).includes(q)) {
        out.push({ kind: "feature", title: name, sub: t("catFeature"), go: r[4] });
      }
    });
    SURAH.forEach(([n, la, ar]) => {
      if (norm(la).includes(q) || norm(ar).includes(q) || String(n) === q) {
        out.push({ kind: "surah", title: la, sub: `${t("catSurah")} ${n} · ${ar}`, open: n + ":1" });
      }
    });
    /* Jamaah posts */
    try {
      const posts = JSON.parse(localStorage.getItem("rk_jn_posts_v1") || "null") || [];
      posts.slice(0, 30).forEach((p) => {
        const body = resolveI18n(p.text || p.body || "");
        const author = resolveI18n(p.author) || "Jamaah";
        if (norm(body).includes(q) || norm(author).includes(q)) {
          const snippet = body.slice(0, 42);
          out.push({ kind: "post", title: author + (snippet ? " · " + snippet : ""), sub: t("catPost"), go: "jejak-nur" });
        }
      });
    } catch (e) {}
    /* doa from RKV2DATA.H (name/m are i18n objects) */
    try {
      const H = (window.RKV2DATA && window.RKV2DATA.H) || [];
      H.forEach((h) => {
        const name = resolveI18n(h.name || h.nama || h.t);
        const mean = resolveI18n(h.m || h.arti || h.d);
        const tr = resolveI18n(h.tr || h.latin || "");
        const hay = [name, mean, tr, resolveI18n(h.ar), h.id].join(" ");
        if (norm(hay).includes(q)) {
          const src = resolveI18n(h.src || h.dalil || "");
          out.push({ kind: "doa", title: name || h.id || t("catDoa"), sub: t("catDoa") + (src ? " · " + src : ""), go: "bacaan" });
        }
      });
    } catch (e) {}
    /* DOA catalog (nama/arti via T() objects) */
    try {
      const D = (typeof DOA !== "undefined" && Array.isArray(DOA)) ? DOA : (window.DOA || []);
      D.forEach((d) => {
        const name = resolveI18n(d.nama || d.name || d.t);
        const arti = resolveI18n(d.arti || d.m || d.d);
        const hay = [name, arti, resolveI18n(d.latin), resolveI18n(d.arab), resolveI18n(d.g)].join(" ");
        if (norm(hay).includes(q)) {
          const src = resolveI18n(d.dalil || d.src || "");
          out.push({ kind: "doa", title: name || t("catDoa"), sub: t("catDoa") + (src ? " · " + src : ""), go: "bacaan" });
        }
      });
    } catch (e) {}

    if (!out.length) {
      res.innerHTML = `<p class="dim">${esc(t("searchEmpty"))}</p>`;
      return;
    }
    res.innerHTML = out
      .slice(0, 24)
      .map((o) => {
        const title = resolveI18n(o.title);
        const sub = resolveI18n(o.sub);
        if (!title || title === "[object Object]") return "";
        const attrs = o.open ? `data-bm-s-open="${esc(o.open)}"` : `data-bm-s-go="${esc(o.go)}"`;
        return `<button type="button" ${attrs}><b>${esc(title)}</b><small>${esc(sub)}</small></button>`;
      })
      .filter(Boolean)
      .join("");
  }

  function goFitur(p) {
    if (p === "flow") {
      try {
        if (window.Flow && Flow.open) Flow.open(0);
        else if (window.go) window.go("persiapan");
      } catch (e) {}
      return;
    }
    if (p === "mur") {
      const m = $("#murBtn");
      if (m) m.click();
      return;
    }
    if (window.go) window.go(p);
  }

  function openProfil() {
    try {
      sessionStorage.setItem("rk_jn_tab", "prof");
    } catch (e) {}
    /* show Jejak page shell then profile tab */
    if (window.go && !window.go._nav88_opening) {
      const inner = window.go;
      /* use raw page switch via go without recursion */
      const pages = document.querySelectorAll(".page");
      pages.forEach((s) => s.classList.toggle("on", s.id === "page-jejak-nur"));
      try { history.replaceState(history.state, "", "#profil"); } catch (e) {}
    }
    if (window.RKJejakNur && RKJejakNur.open) RKJejakNur.open("prof");
    hilite("profil");
  }

  function openJamaah() {
    try {
      sessionStorage.setItem("rk_jn_tab", "feed");
    } catch (e) {}
    document.querySelectorAll(".page").forEach((s) => s.classList.toggle("on", s.id === "page-jejak-nur"));
    try { history.replaceState(history.state, "", "#jejak-nur"); } catch (e) {}
    if (window.RKJejakNur && RKJejakNur.open) RKJejakNur.open("feed");
    hilite("jejak-nur");
  }

  function hilite(which) {
    $$("#nav button").forEach((b) => {
      const p = b.dataset.p;
      let on = false;
      if (which === "profil") on = p === "profil";
      else if (which === "jejak-nur") on = p === "jejak-nur";
      else on = p === which;
      b.classList.toggle("on", on);
    });
  }

  function wrapGo() {
    const tryWrap = () => {
      if (!window.go || window.go._nav88) return !!window.go;
      const inner = window.go;
      window.go = function (p) {
        if (p === "profil") {
          openProfil();
          try {
            history.replaceState(history.state, "", "#profil");
          } catch (e) {}
          return;
        }
        if (p === "jejak-nur") {
          const r = inner.apply(this, arguments);
          setTimeout(() => {
            try {
              const tab = sessionStorage.getItem("rk_jn_tab") || "feed";
              if (window.RKJejakNur) RKJejakNur.open(tab);
            } catch (e) {}
            hilite("jejak-nur");
          }, 30);
          return r;
        }
        const r = inner.apply(this, arguments);
        /* when opening mushaf, center tab should highlight — existing sync handles data-p=mushaf */
        return r;
      };
      window.go._nav88 = true;
      return true;
    };
    if (!tryWrap()) {
      setTimeout(tryWrap, 100);
      setTimeout(tryWrap, 600);
    }
  }

  function onNavClick(e) {
    const b = e.target.closest("#nav button");
    if (!b) return;
    const p = b.dataset.p;
    if (p === "profil") {
      e.preventDefault();
      e.stopImmediatePropagation();
      openProfil();
      return;
    }
    if (p === "jejak-nur") {
      e.preventDefault();
      e.stopImmediatePropagation();
      openJamaah();
      return;
    }
    if (p === "mushaf") {
      /* let existing capture handler run; ensure center stays */
      return;
    }
  }

  function onClick(e) {
    if (e.target.closest("#bmSearchBtn")) {
      e.preventDefault();
      openSearch();
      return;
    }
    if (e.target.closest("[data-bm-search-x]") || e.target === $("#bmSearchSheet")) {
      closeSearch();
      return;
    }
    const all = e.target.closest("[data-bm-fitur-all]");
    if (all) {
      e.preventDefault();
      openAllFitur();
      return;
    }
    const f = e.target.closest("[data-bm-fitur]");
    if (f) {
      e.preventDefault();
      goFitur(f.dataset.bmFitur);
      return;
    }
    const sg = e.target.closest("[data-bm-s-go]");
    if (sg) {
      closeSearch();
      goFitur(sg.dataset.bmSGo);
      return;
    }
    const so = e.target.closest("[data-bm-s-open]");
    if (so) {
      closeSearch();
      const [s, a] = so.dataset.bmSOpen.split(":");
      try {
        sessionStorage.setItem("rk_nav_mushaf", "1");
      } catch (err) {}
      if (window.go) window.go("mushaf");
      setTimeout(() => {
        try {
          if (window.RKQuran && RKQuran.open) RKQuran.open(+s, +a);
        } catch (err) {}
      }, 200);
      return;
    }
  }

  function onInput(e) {
    if (e.target && e.target.id === "bmSearchInput") {
      clearTimeout(onInput._t);
      onInput._t = setTimeout(() => runSearch(e.target.value), 160);
    }
  }

  function boot() {
    document.documentElement.classList.add("nav-tt-pad");
    const app = $("#app");
    if (app) app.classList.add("nav-tt-pad");
    ensureFitur();
    ensureSearchSheet();
    wrapGo();
    document.addEventListener("click", onNavClick, true);
    document.addEventListener("click", onClick);
    document.addEventListener("input", onInput);
    document.addEventListener("rk:lang", () => {
      const box = $("#bmFitur");
      if (box) delete box.dataset.lang;
      ensureFitur();
      const inp = $("#bmSearchInput");
      if (inp) inp.placeholder = t("searchPh");
    });
    const ber = $("#page-beranda");
    if (ber) {
      let lock = false;
      new MutationObserver(() => {
        if (lock) return;
        if ($("#bmFitur") && $("#bmFitur").dataset.lang === lang()) return;
        lock = true;
        try { ensureFitur(); } finally { lock = false; }
      }).observe(ber, { childList: true, subtree: false });
    }
    setTimeout(ensureFitur, 500);
    setTimeout(ensureFitur, 1500);
    setTimeout(wrapGo, 800);
    /* expose */
    window.BMNav88 = { openSearch, ensureFitur, openProfil, openJamaah, t };
    if (location.hash === "#profil") setTimeout(openProfil, 700);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
