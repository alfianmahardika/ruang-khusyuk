/*! Best Muslim — store gating (native Play/App Store builds).
 *  When BM_STORE_BUILD is true: hide Admin, Muslim Pay, Toko Berkah
 *  payment UI, Buka Toko / Premium fake-pay; show "Daftar minat" instead.
 *  Web keeps BM_STORE_BUILD=false so nothing is removed. */
(function () {
  function isStore() {
    return !!window.BM_STORE_BUILD;
  }
  window.bmStoreBuild = isStore;

  const T = {
    minatT: ["Daftar minat", "Interest list", "سجّل اهتمامك"],
    minatL: [
      "Fitur ini sedang disiapkan. Catat minat Anda di perangkat ini — tidak ada pembayaran.",
      "This feature is being prepared. Record your interest on this device — no payment.",
      "هذه الميزة قيد الإعداد. سجّل اهتمامك على هذا الجهاز — بلا دفع."
    ],
    minatB: ["Catat minat", "Save interest", "سجّل"],
    minatOk: ["✓ Minat tercatat", "✓ Interest saved", "✓ تم التسجيل"],
    tokoSoon: [
      "Toko Berkah & pembayaran belum tersedia di versi toko. Catat minat Anda.",
      "Blessed Shop & payments are not available in the store build yet. Record your interest.",
      "متجر البركة والدفع غير متاحين في نسخة المتجر بعد. سجّل اهتمامك."
    ],
    paySoon: [
      "Muslim Pay belum tersedia di versi toko. Catat minat Anda.",
      "Muslim Pay is not available in the store build yet. Record your interest.",
      "مسلم باي غير متاح في نسخة المتجر بعد. سجّل اهتمامك."
    ],
    shopSoon: [
      "Buka Toko belum tersedia di versi toko. Catat minat Anda sebagai penjual.",
      "Open Shop is not available in the store build yet. Record seller interest.",
      "فتح المتجر غير متاح في نسخة المتجر بعد. سجّل اهتمام البائع."
    ],
    premSoon: [
      "Premium berbayar belum tersedia. Tombol hanya mencatat minat — tanpa tagihan.",
      "Paid Premium is not available yet. Buttons only record interest — no charge.",
      "بريميوم المدفوع غير متاح بعد. الأزرار تسجّل الاهتمام فقط — بلا رسوم."
    ]
  };

  function lang() {
    try {
      const v = JSON.parse(localStorage.getItem("rk_lang") || '"id"');
      return v === "en" || v === "ar" ? v : "id";
    } catch (e) {
      return "id";
    }
  }
  function tt(k) {
    const a = T[k];
    if (!a) return k;
    const i = { id: 0, en: 1, ar: 2 }[lang()] || 0;
    return a[i] || a[0];
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function record(kind) {
    try {
      const o = JSON.parse(localStorage.getItem("rk_store_interest_v1") || "{}");
      o[kind] = { ts: Date.now(), lang: lang() };
      localStorage.setItem("rk_store_interest_v1", JSON.stringify(o));
    } catch (e) {}
    try {
      if (window.toast) toast(tt("minatOk"));
      else alert(tt("minatOk"));
    } catch (e) {}
  }

  function minatCard(kind, leadKey) {
    return `<div class="card bm-store-minat" data-bm-store-kind="${kind}">
      <div class="eyebrow">✦ ${esc(tt("minatT"))}</div>
      <p class="muted" style="margin-top:8px;font-size:13.5px;line-height:1.45">${esc(tt(leadKey))}</p>
      <button type="button" class="btn gold sm" data-bm-store-minat="${kind}" style="margin-top:12px">${esc(tt("minatB"))}</button>
    </div>`;
  }

  function applyCss() {
    if (!isStore()) return;
    document.documentElement.classList.add("bm-store");
    if (document.getElementById("bmStoreGateCss")) return;
    const s = document.createElement("style");
    s.id = "bmStoreGateCss";
    s.textContent =
      'html.bm-store #bmDompet [data-bm="mpay"],html.bm-store .bm-dp-qr.mp,html.bm-store .bm-dp-saldo,html.bm-store #bmMPay,html.bm-store .jn-admin-hid,html.bm-store #adVerBtn{display:none!important}' +
      "html.bm-store #page-admin{display:none!important}" +
      "html.bm-store.mp-open{overflow:auto}";
    document.head.appendChild(s);
  }

  function blockAdmin() {
    if (!isStore()) return;
    const block = () => {
      if (location.hash === "#admin") {
        try {
          history.replaceState(history.state, "", "#beranda");
        } catch (e) {}
        if (window.go) window.go("beranda");
      }
    };
    block();
    window.addEventListener("hashchange", block);
    const wrap = () => {
      if (!window.go || window.go._storeGate) return !!window.go;
      const inner = window.go;
      window.go = function (p) {
        if (p === "admin") return inner.call(this, "beranda");
        return inner.apply(this, arguments);
      };
      window.go._storeGate = true;
      return true;
    };
    if (!wrap()) {
      let n = 0;
      const iv = setInterval(() => {
        if (wrap() || ++n > 80) clearInterval(iv);
      }, 200);
    }
    const neut = () => {
      if (!window.RKAdmin || window.RKAdmin._storeGate) return !!window.RKAdmin;
      window.RKAdmin.open = function () {
        if (window.go) window.go("beranda");
      };
      window.RKAdmin._storeGate = true;
      return true;
    };
    if (!neut()) {
      let n = 0;
      const iv2 = setInterval(() => {
        if (neut() || ++n > 100) clearInterval(iv2);
      }, 300);
    }
  }

  function patchMuslimPay() {
    if (!isStore()) return;
    const wrap = () => {
      if (!window.BMMuslimPay || window.BMMuslimPay._storeGate) return !!window.BMMuslimPay;
      window.BMMuslimPay.open = function () {
        record("muslim_pay");
        showMinatSheet("paySoon", "muslim_pay");
      };
      window.BMMuslimPay._storeGate = true;
      return true;
    };
    if (!wrap()) {
      let n = 0;
      const iv = setInterval(() => {
        if (wrap() || ++n > 80) clearInterval(iv);
      }, 200);
    }
  }

  function showMinatSheet(leadKey, kind) {
    let s = document.getElementById("bmStoreMinat");
    if (!s) {
      s = document.createElement("div");
      s.id = "bmStoreMinat";
      s.style.cssText =
        "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);display:grid;place-items:end center;padding:16px;padding-bottom:max(16px,env(safe-area-inset-bottom))";
      s.addEventListener("click", (e) => {
        if (e.target === s) s.remove();
      });
      document.body.appendChild(s);
    }
    s.innerHTML = `<div role="dialog" aria-modal="true" style="width:100%;max-width:420px;background:var(--card-bg,#1c150d);color:var(--fg,#ede8dd);border:1px solid var(--line);border-radius:20px;padding:18px 16px 14px">
      <div class="eyebrow">✦ ${esc(tt("minatT"))}</div>
      <p style="margin-top:8px;font-size:14px;line-height:1.45;opacity:.9">${esc(tt(leadKey))}</p>
      <button type="button" class="btn gold" id="bmStoreMinatGo" style="width:100%;margin-top:14px">${esc(tt("minatB"))}</button>
      <button type="button" class="btn ghost" id="bmStoreMinatX" style="width:100%;margin-top:8px">OK</button>
    </div>`;
    document.getElementById("bmStoreMinatGo").onclick = () => {
      record(kind);
      s.remove();
    };
    document.getElementById("bmStoreMinatX").onclick = () => s.remove();
  }

  let belanjaBusy = false;
  function fillBelanja() {
    if (!isStore() || belanjaBusy) return;
    const st = document.getElementById("bbStack");
    const page = document.getElementById("page-belanja");
    if (!st || !page || !page.classList.contains("on")) return;
    if (st.querySelector("[data-bm-store-kind=toko]")) return;
    belanjaBusy = true;
    try {
      st.innerHTML =
        `<div><div class="eyebrow">🛍️</div><h1>Toko Berkah</h1></div>` + minatCard("toko", "tokoSoon");
      st.querySelector("[data-bm-store-minat]")?.addEventListener("click", () => record("toko"));
    } finally {
      belanjaBusy = false;
    }
  }

  function patchBelanja() {
    if (!isStore()) return;
    const st = document.getElementById("bbStack");
    if (st) {
      const obs = new MutationObserver(() => {
        if (belanjaBusy) return;
        fillBelanja();
      });
      obs.observe(st, { childList: true });
    }
    window.addEventListener("hashchange", () => setTimeout(fillBelanja, 100));
    document.addEventListener("click", (e) => {
      if (e.target.closest?.("[data-go=belanja],[data-nav=belanja]")) setTimeout(fillBelanja, 120);
    });
    setTimeout(fillBelanja, 300);
  }

  let premBusy = false;
  function restylePremium() {
    if (!isStore() || premBusy) return;
    const plans = document.getElementById("prPlans");
    if (!plans || plans.dataset.bmStorePrem === "1") return;
    if (!plans.children.length) return;
    premBusy = true;
    try {
      const note = document.querySelector("#page-premium .v2-note");
      if (note) note.textContent = tt("premSoon");
      plans.querySelectorAll(".v2-plan .p").forEach((el) => {
        el.textContent = tt("minatT");
        el.style.fontSize = "16px";
      });
      plans.querySelectorAll("s").forEach((el) => el.remove());
      plans.dataset.bmStorePrem = "1";
    } finally {
      premBusy = false;
    }
  }

  function patchPremium() {
    if (!isStore()) return;
    const plans = document.getElementById("prPlans");
    if (plans) {
      const obs = new MutationObserver(() => {
        if (premBusy) return;
        plans.dataset.bmStorePrem = "";
        restylePremium();
      });
      obs.observe(plans, { childList: true });
    }
    window.addEventListener("hashchange", () => {
      const p = document.getElementById("prPlans");
      if (p) p.dataset.bmStorePrem = "";
      setTimeout(restylePremium, 150);
    });
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest?.("[data-bm-store-minat]");
    if (b) record(b.getAttribute("data-bm-store-minat"));
  });

  window.BMStoreGate = { isStore, record, showMinatSheet, tt, minatCard };

  applyCss();
  function boot() {
    applyCss();
    blockAdmin();
    patchMuslimPay();
    patchBelanja();
    patchPremium();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
