/* Best Muslim — circular flag language picker (header LEFT). 18 languages, scrollable. */
(function () {
  "use strict";
  const LANGS = [
    { code: "id", labelKey: "lang.id", fallback: "Bahasa Indonesia" },
    { code: "en", labelKey: "lang.en", fallback: "English" },
    { code: "ar", labelKey: "lang.ar", fallback: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629" },
    { code: "ms", labelKey: "lang.ms", fallback: "Bahasa Melayu" },
    { code: "tr", labelKey: "lang.tr", fallback: "T\u00fcrk\u00e7e" },
    { code: "ur", labelKey: "lang.ur", fallback: "\u0627\u0631\u062f\u0648" },
    { code: "bn", labelKey: "lang.bn", fallback: "\u09ac\u09be\u0982\u09b2\u09be" },
    { code: "fa", labelKey: "lang.fa", fallback: "\u0641\u0627\u0631\u0633\u06cc" },
    { code: "fr", labelKey: "lang.fr", fallback: "Fran\u00e7ais" },
    { code: "de", labelKey: "lang.de", fallback: "Deutsch" },
    { code: "es", labelKey: "lang.es", fallback: "Espa\u00f1ol" },
    { code: "ru", labelKey: "lang.ru", fallback: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
    { code: "hi", labelKey: "lang.hi", fallback: "\u0939\u093f\u0928\u094d\u0926\u0940" },
    { code: "nl", labelKey: "lang.nl", fallback: "Nederlands" },
    { code: "it", labelKey: "lang.it", fallback: "Italiano" },
    { code: "pt", labelKey: "lang.pt", fallback: "Portugu\u00eas" },
    { code: "zh-Hans", labelKey: "lang.zh-Hans", fallback: "\u7b80\u4f53\u4e2d\u6587" },
    { code: "zh-Hant", labelKey: "lang.zh-Hant", fallback: "\u7e41\u9ad4\u4e2d\u6587" }
  ];

  /* Inline SVG flags — local only. Representatives:
     en=UK, ar=Saudi, ur=Pakistan, bn=Bangladesh, fa=Iran, hi=India,
     pt=Portugal, zh-Hans=PRC, zh-Hant=Taiwan (Traditional UI cue). */
  const FLAGS = {
    "id": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-id\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-id)\"><rect width=\"24\" height=\"12\" y=\"0\" fill=\"#e70011\"/><rect width=\"24\" height=\"12\" y=\"12\" fill=\"#fff\"/></g></svg>",
    "en": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-en\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-en)\"><rect width=\"24\" height=\"24\" fill=\"#012169\"/><path d=\"M0 0l24 24M24 0L0 24\" stroke=\"#fff\" stroke-width=\"4\"/><path d=\"M0 0l24 24M24 0L0 24\" stroke=\"#C8102E\" stroke-width=\"2\"/><path d=\"M12 0v24M0 12h24\" stroke=\"#fff\" stroke-width=\"7\"/><path d=\"M12 0v24M0 12h24\" stroke=\"#C8102E\" stroke-width=\"4\"/></g></svg>",
    "ar": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-ar\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-ar)\"><rect width=\"24\" height=\"24\" fill=\"#006C35\"/><path d=\"M5 9.2c2.2-1.6 5.2-1.6 7.4 0 .4.3.4.9 0 1.2-2.2 1.6-5.2 1.6-7.4 0-.4-.3-.4-.9 0-1.2z\" fill=\"#fff\" opacity=\".95\"/><path d=\"M13.2 8.5c1.8-.2 3.4.6 4.2 2 .3.5-.1 1.1-.7.9-1.5-.5-2.9-.2-4 .7-.4.3-.9 0-.9-.5.1-1.2.4-2.3 1.4-3.1z\" fill=\"#fff\" opacity=\".9\"/><rect x=\"6\" y=\"15.2\" width=\"12\" height=\"1.3\" rx=\".4\" fill=\"#fff\"/></g></svg>",
    "ms": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-ms\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-ms)\"><rect width=\"24\" height=\"24\" fill=\"#CC0001\"/><rect width=\"12\" height=\"12\" fill=\"#010066\"/><circle cx=\"6\" cy=\"6\" r=\"3.2\" fill=\"#FFCC00\"/><circle cx=\"7.1\" cy=\"6\" r=\"2.6\" fill=\"#010066\"/><path d=\"M9.2 6l1.6.5-.9 1.5.2-1.7 1.5-.7-1.6-.3-.3-1.6-.7 1.4-1.7.1 1.3 1.1z\" fill=\"#FFCC00\"/><g fill=\"#fff\"><rect y=\"12.5\" width=\"24\" height=\"1.5\"/><rect y=\"15.5\" width=\"24\" height=\"1.5\"/><rect y=\"18.5\" width=\"24\" height=\"1.5\"/><rect y=\"21.5\" width=\"24\" height=\"1.5\"/></g></g></svg>",
    "tr": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-tr\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-tr)\"><rect width=\"24\" height=\"24\" fill=\"#E30A17\"/><circle cx=\"10\" cy=\"12\" r=\"5\" fill=\"#fff\"/><circle cx=\"11.2\" cy=\"12\" r=\"4\" fill=\"#E30A17\"/><path d=\"M14.5 12l3.2.9-2.4 2.4.2-3.2 2.4-2.3-3.2.2-1.2-3-.9 3.1z\" fill=\"#fff\"/></g></svg>",
    "ur": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-ur\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-ur)\"><rect width=\"6\" height=\"24\" fill=\"#fff\"/><rect x=\"6\" width=\"18\" height=\"24\" fill=\"#01411C\"/><circle cx=\"14\" cy=\"12\" r=\"4.2\" fill=\"#fff\"/><circle cx=\"15.3\" cy=\"12\" r=\"3.4\" fill=\"#01411C\"/><path d=\"M17.2 10.2l1.1 1.4 1.6-.4-1 1.4.8 1.5-1.6-.5-1.1 1.3.1-1.7-1.6-.6 1.7-.3z\" fill=\"#fff\"/></g></svg>",
    "bn": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-bn\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-bn)\"><rect width=\"24\" height=\"24\" fill=\"#006A4E\"/><circle cx=\"10.5\" cy=\"12\" r=\"5.2\" fill=\"#F42A41\"/></g></svg>",
    "fa": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-fa\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-fa)\"><rect width=\"24\" height=\"8\" fill=\"#239F40\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#fff\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#DA0000\"/><circle cx=\"12\" cy=\"12\" r=\"2.2\" fill=\"none\" stroke=\"#DA0000\" stroke-width=\".8\"/></g></svg>",
    "fr": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-fr\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-fr)\"><rect width=\"8\" height=\"24\" fill=\"#002395\"/><rect x=\"8\" width=\"8\" height=\"24\" fill=\"#fff\"/><rect x=\"16\" width=\"8\" height=\"24\" fill=\"#ED2939\"/></g></svg>",
    "de": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-de\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-de)\"><rect width=\"24\" height=\"8\" fill=\"#000\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#D00\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#FFCE00\"/></g></svg>",
    "es": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-es\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-es)\"><rect width=\"24\" height=\"6\" fill=\"#AA151B\"/><rect y=\"6\" width=\"24\" height=\"12\" fill=\"#F1BF00\"/><rect y=\"18\" width=\"24\" height=\"6\" fill=\"#AA151B\"/></g></svg>",
    "ru": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-ru\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-ru)\"><rect width=\"24\" height=\"8\" fill=\"#fff\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#0039A6\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#D52B1E\"/></g></svg>",
    "hi": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-hi\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-hi)\"><rect width=\"24\" height=\"8\" fill=\"#FF9933\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#fff\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#138808\"/><circle cx=\"12\" cy=\"12\" r=\"2.6\" fill=\"none\" stroke=\"#000080\" stroke-width=\".7\"/><circle cx=\"12\" cy=\"12\" r=\".5\" fill=\"#000080\"/></g></svg>",
    "nl": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-nl\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-nl)\"><rect width=\"24\" height=\"8\" fill=\"#AE1C28\"/><rect y=\"8\" width=\"24\" height=\"8\" fill=\"#fff\"/><rect y=\"16\" width=\"24\" height=\"8\" fill=\"#21468B\"/></g></svg>",
    "it": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-it\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-it)\"><rect width=\"8\" height=\"24\" fill=\"#009246\"/><rect x=\"8\" width=\"8\" height=\"24\" fill=\"#fff\"/><rect x=\"16\" width=\"8\" height=\"24\" fill=\"#CE2B37\"/></g></svg>",
    "pt": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-pt\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-pt)\"><rect width=\"9.5\" height=\"24\" fill=\"#006600\"/><rect x=\"9.5\" width=\"14.5\" height=\"24\" fill=\"#FF0000\"/><circle cx=\"9.5\" cy=\"12\" r=\"3.2\" fill=\"#FFCC00\"/><circle cx=\"9.5\" cy=\"12\" r=\"2\" fill=\"#003399\"/></g></svg>",
    "zh-Hans": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-zhHans\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-zhHans)\"><rect width=\"24\" height=\"24\" fill=\"#DE2910\"/><g fill=\"#FFDE00\"><path d=\"M5 4.2l.7 2.1H8l-1.7 1.3.7 2.1L5 8.4 3.3 9.7l.7-2.1L2.3 6.3h2.3z\"/><path d=\"M10.2 2.8l.35 1.1h1.15l-.93.68.35 1.1-.92-.67-.93.67.36-1.1-.93-.68h1.15z\"/><path d=\"M12.2 5.6l.35 1.1h1.15l-.93.68.35 1.1-.92-.67-.93.67.36-1.1-.93-.68h1.15z\"/><path d=\"M12.2 9.2l.35 1.1h1.15l-.93.68.35 1.1-.92-.67-.93.67.36-1.1-.93-.68h1.15z\"/><path d=\"M10.2 11.6l.35 1.1h1.15l-.93.68.35 1.1-.92-.67-.93.67.36-1.1-.93-.68h1.15z\"/></g></g></svg>",
    "zh-Hant": "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><clipPath id=\"c-zhHant\"><circle cx=\"12\" cy=\"12\" r=\"12\"/></clipPath><g clip-path=\"url(#c-zhHant)\"><rect width=\"24\" height=\"24\" fill=\"#FE0000\"/><rect width=\"12\" height=\"12\" fill=\"#000095\"/><circle cx=\"6\" cy=\"6\" r=\"3.2\" fill=\"#fff\"/><circle cx=\"6\" cy=\"6\" r=\"2\" fill=\"#000095\"/><g fill=\"#fff\" transform=\"translate(6 6)\"><circle cx=\"0\" cy=\"-3.6\" r=\".45\"/><circle cx=\"2.55\" cy=\"-2.55\" r=\".45\"/><circle cx=\"3.6\" cy=\"0\" r=\".45\"/><circle cx=\"2.55\" cy=\"2.55\" r=\".45\"/><circle cx=\"0\" cy=\"3.6\" r=\".45\"/><circle cx=\"-2.55\" cy=\"2.55\" r=\".45\"/><circle cx=\"-3.6\" cy=\"0\" r=\".45\"/><circle cx=\"-2.55\" cy=\"-2.55\" r=\".45\"/><circle cx=\"0\" cy=\"0\" r=\".7\"/></g></g></svg>"
  };

  const CODES = LANGS.map(L => L.code);

  function $(s, r) { return (r || document).querySelector(s); }
  function tr(k, fb) {
    try { if (window.BMI18N) return BMI18N.t(k, fb); } catch (e) {}
    return fb;
  }
  function curLang() {
    try {
      if (window.BMI18N) return BMI18N.getLang();
      const raw = localStorage.getItem("rk_lang");
      if (raw != null) {
        const v = JSON.parse(raw);
        if (window.BMI18N && BMI18N.normalize) return BMI18N.normalize(v) || "id";
        if (CODES.includes(v)) return v;
      }
    } catch (e) {}
    return "id";
  }

  function setLang(code) {
    try {
      if (window.BMI18N && BMI18N.setLang) return BMI18N.setLang(code);
    } catch (e) {}
    try {
      localStorage.setItem("rk_lang", JSON.stringify(code));
      document.dispatchEvent(new CustomEvent("rk:lang", { detail: code }));
    } catch (e) {}
  }

  function closeAll() {
    const m = $("#bmLangMenu");
    const b = $("#bmLangBtn");
    if (m) m.classList.remove("open");
    if (b) b.setAttribute("aria-expanded", "false");
  }

  function syncBridge(lang) {
    let seg = $("#langseg");
    if (seg) {
      /* Rebuild bridge buttons for all codes so legacy I18N click path works */
      const need = CODES.join(",");
      if (seg.dataset.bmCodes !== need) {
        seg.dataset.bmCodes = need;
        seg.innerHTML = CODES.map(c =>
          '<button data-l="' + c + '" type="button">' + c + "</button>"
        ).join("");
      }
      seg.querySelectorAll("[data-l]").forEach(b => {
        b.classList.toggle("on", b.dataset.l === lang);
      });
    }
    const st = $("#stLang");
    if (st) {
      if (st.dataset.bmCodes !== CODES.join(",")) {
        st.dataset.bmCodes = CODES.join(",");
        st.innerHTML = LANGS.map(L => {
          const lab = tr(L.labelKey, L.fallback);
          return '<button type="button" data-l="' + L.code + '">' + lab + "</button>";
        }).join("");
      } else {
        st.querySelectorAll("[data-l]").forEach(b => {
          const L = LANGS.find(x => x.code === b.dataset.l);
          if (L) b.textContent = tr(L.labelKey, L.fallback);
        });
      }
      st.querySelectorAll("[data-l]").forEach(b => {
        b.classList.toggle("on", b.dataset.l === lang);
      });
    }
  }

  function render() {
    const wrap = $("#bmLangPick");
    if (!wrap) return;
    const lang = curLang();
    const btn = $("#bmLangBtn");
    const menu = $("#bmLangMenu");
    if (btn) {
      btn.innerHTML = '<span class="bm-flag">' + (FLAGS[lang] || FLAGS.id) + "</span>";
      btn.setAttribute("aria-label", tr("lang.aria", "Pilih bahasa"));
      btn.title = tr("lang.aria", "Pilih bahasa");
    }
    if (menu) {
      menu.innerHTML = LANGS.map(L => {
        const lab = tr(L.labelKey, L.fallback);
        const on = L.code === lang;
        return '<button type="button" class="bm-lang-item' + (on ? " on" : "") + '" data-l="' + L.code + '" role="menuitem" aria-checked="' + (on ? "true" : "false") + '">' +
          '<span class="bm-flag">' + (FLAGS[L.code] || FLAGS.id) + "</span>" +
          '<span class="bm-lang-lab">' + lab + "</span>" +
          (on ? '<span class="bm-lang-check" aria-hidden="true">✓</span>' : '<span class="bm-lang-check" aria-hidden="true"></span>') +
          "</button>";
      }).join("");
    }
    syncBridge(lang);
  }

  function ensure() {
    let hdr = $("header.hdr") || $(".hdr");
    if (!hdr) return;
    let left = hdr.querySelector(".hdr-left");
    if (!left) {
      left = document.createElement("div");
      left.className = "hdr-left";
      hdr.insertBefore(left, hdr.firstChild);
    }
    if (!$("#bmLangPick")) {
      const wrap = document.createElement("div");
      wrap.className = "bm-lang";
      wrap.id = "bmLangPick";
      wrap.innerHTML =
        '<button type="button" class="bm-lang-btn" id="bmLangBtn" aria-haspopup="menu" aria-expanded="false" aria-controls="bmLangMenu"></button>' +
        '<div class="bm-lang-menu" id="bmLangMenu" role="menu"></div>';
      left.appendChild(wrap);
    }
    const seg = $("#langseg");
    if (seg && !seg.classList.contains("bm-lang-bridge")) {
      seg.classList.add("bm-lang-bridge");
      seg.setAttribute("aria-hidden", "true");
      if (seg.parentElement && seg.parentElement.classList.contains("right")) {
        left.appendChild(seg);
      }
    }
    render();
    const btn = $("#bmLangBtn");
    const menu = $("#bmLangMenu");
    if (btn && !btn._bmBound) {
      btn._bmBound = true;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = !menu.classList.contains("open");
        closeAll();
        if (open) {
          menu.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
          /* Scroll current into view */
          const cur = menu.querySelector(".bm-lang-item.on");
          if (cur) try { cur.scrollIntoView({ block: "nearest" }); } catch (err) {}
        }
      });
      menu.addEventListener("click", (e) => {
        const it = e.target.closest("[data-l]");
        if (!it) return;
        e.stopPropagation();
        const code = it.dataset.l;
        closeAll();
        setLang(code);
        const bridge = document.querySelector('#langseg [data-l="' + code + '"]');
        if (bridge) try { bridge.click(); } catch (err) {}
        render();
      });
    }
  }

  function boot() {
    ensure();
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#bmLangPick")) closeAll();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
    document.addEventListener("rk:lang", render);
    document.addEventListener("bm:i18n", render);
    const mo = new MutationObserver(() => { if (!$("#bmLangPick") || !$(".hdr-left")) ensure(); });
    mo.observe(document.body, { childList: true, subtree: true });
    try {
      const u = new URL(location.href);
      if (u.searchParams.get("bm_lang_open") === "1") {
        setTimeout(() => {
          const b = $("#bmLangBtn"); const m = $("#bmLangMenu");
          if (b && m) { m.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
        }, 500);
      }
    } catch (e) {}
  }

  window.BMLang = { render, ensure, close: closeAll, FLAGS, LANGS };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
