/*! Muslim Pay — Best Muslim original mockup. No network payments. */
(function () {
  "use strict";
  const store = window.store || {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const $ = (s, r) => (r || document).querySelector(s);
  const lang = () => {
    const l = store.get("rk_lang", "id");
    return ["id", "en", "ar"].includes(l) ? l : "id";
  };
  const Li = () => ({ id: 0, en: 1, ar: 2 }[lang()] || 0);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const T = {
    title: ["Muslim Pay", "Muslim Pay", "مسلم باي"],
    balLab: ["Saldo Muslim Pay", "Muslim Pay balance", "رصيد مسلم باي"],
    soon: ["Segera hadir", "Coming soon", "قريبًا"],
    soonSub: ["Belum ada saldo atau transaksi sungguhan.", "No real balance or transactions yet.", "لا رصيد ولا معاملات حقيقية بعد."],
    foot: ["Tanpa riba · Tanpa PayLater · Diproses mitra berizin Bank Indonesia", "No riba · No PayLater · Processed by BI-licensed partners", "بلا ربا · بلا PayLater · عبر شركاء مرخّصين من بنك إندونيسيا"],
    close: ["Tutup", "Close", "إغلاق"],
    back: ["Kembali", "Back", "رجوع"],
    qris: ["QRIS", "QRIS", "QRIS"],
    topup: ["Top up", "Top up", "شحن"],
    tagihan: ["Tagihan", "Bills", "الفواتير"],
    tagihanSub: ["Pulsa, listrik PLN, BPJS, PDAM, internet", "Mobile credit, PLN power, BPJS, PDAM, internet", "رصيد جوال، كهرباء PLN، BPJS، PDAM، إنترنت"],
    zis: ["ZIS", "ZIS", "زكاة"],
    zisSub: ["Zakat, infak, sedekah via LAZ resmi", "Zakat, infaq, sadaqah via licensed LAZ", "زكاة وإنفاق وصدقة عبر مؤسسات رسمية"],
    qurban: ["Qurban & Wakaf", "Qurban & Waqf", "أضحية ووقف"],
    umrah: ["Tabungan Umrah", "Umrah savings", "ادخار العمرة"],
    toko: ["Toko Berkah", "Blessed Shop", "متجر البركة"],
    riwayat: ["Riwayat", "History", "السجل"],
    soonBody: ["Fitur ini sedang disiapkan bersama mitra berizin. Tidak ada pembayaran atau data yang dikirim sekarang.", "This feature is being prepared with licensed partners. No payment or data is sent now.", "هذه الميزة قيد الإعداد مع شركاء مرخّصين. لا يُرسل دفع أو بيانات الآن."],
    strip: ["Muslim Pay", "Muslim Pay", "مسلم باي"]
  };
  const tt = (k) => (T[k] && T[k][Li()]) || (T[k] && T[k][0]) || k;

  /* Original icons — gold/currentColor, no brand marks */
  const IC = {
    mark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1a1208" d="M14.2 3.2a8.2 8.2 0 1 0 6.1 13.6 7 7 0 1 1-6.1-13.6z"/><circle cx="15.2" cy="12" r="3.1" fill="none" stroke="#1a1208" stroke-width="1.6"/><path fill="#1a1208" d="M15.2 10.2v3.6M13.6 12h3.2"/></svg>`,
    qris: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2.5M14 17h4M18.5 14V19M14 19h.01"/></svg>`,
    topup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M12 13v4M10 15h4"/></svg>`,
    tagihan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>`,
    zis: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/></svg>`,
    qurban: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18c2-4 4-6 8-6s6 2 8 6"/><path d="M12 12V5M9 7.5c1.2-2 2.2-3 3-3s1.8 1 3 3"/></svg>`,
    umrah: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16M6 20V10l6-5 6 5v10"/><path d="M10 20v-5h4v5"/></svg>`,
    toko: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 7V6a4.5 4.5 0 0 1 9 0v1H19a1.5 1.5 0 0 1 1.5 1.5v11A2.5 2.5 0 0 1 18 22H6a2.5 2.5 0 0 1-2.5-2.5v-11A1.5 1.5 0 0 1 5 7h2.5zm1.75 0h5.5V6a2.75 2.75 0 0 0-5.5 0v1z"/></svg>`,
    riwayat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/></svg>`
  };

  const ITEMS = [
    { id: "qris", label: "qris", ic: "qris" },
    { id: "topup", label: "topup", ic: "topup" },
    { id: "tagihan", label: "tagihan", ic: "tagihan", sub: "tagihanSub" },
    { id: "zis", label: "zis", ic: "zis", sub: "zisSub" },
    { id: "qurban", label: "qurban", ic: "qurban" },
    { id: "umrah", label: "umrah", ic: "umrah" },
    { id: "toko", label: "toko", ic: "toko" },
    { id: "riwayat", label: "riwayat", ic: "riwayat" }
  ];

  function ensure() {
    if ($("#bmMPay")) return;
    const root = document.createElement("div");
    root.id = "bmMPay";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.innerHTML = `
      <div class="mp-hd">
        <button type="button" class="mp-back" data-mp="close" aria-label="${esc(tt("back"))}">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <h1 id="bmMPayH"></h1>
        <button type="button" class="mp-x" data-mp="close" aria-label="${esc(tt("close"))}">✕</button>
      </div>
      <div class="mp-sc" id="bmMPayBody"></div>`;
    document.body.appendChild(root);

    const soon = document.createElement("div");
    soon.id = "bmMPaySoon";
    soon.innerHTML = `<div class="mp-soon-panel" role="dialog" aria-modal="true">
      <div class="mp-soon-hd"><h2 id="bmMPaySoonH"></h2>
        <button type="button" class="mp-soon-x" data-mp="soonx" aria-label="${esc(tt("close"))}">✕</button></div>
      <div class="mp-soon-body" id="bmMPaySoonBody"></div>
    </div>`;
    document.body.appendChild(soon);

    root.addEventListener("click", onRoot);
    soon.addEventListener("click", (e) => {
      if (e.target.id === "bmMPaySoon" || e.target.closest("[data-mp=soonx]")) closeSoon();
    });
  }

  function paint() {
    ensure();
    $("#bmMPayH").textContent = tt("title");
    const grid = ITEMS.map((it) => {
      const sub = it.sub ? ` data-sub="${esc(it.sub)}"` : "";
      return `<button type="button" class="mp-item" data-mp="item" data-id="${it.id}" data-label="${it.label}"${sub}>
        <i class="mp-ic" aria-hidden="true">${IC[it.ic]}</i>
        <span>${esc(tt(it.label))}</span>
      </button>`;
    }).join("");
    $("#bmMPayBody").innerHTML = `
      <div class="mp-bal">
        <div class="mp-brand">
          <span class="mp-mark" aria-hidden="true">${IC.mark}</span>
          <div><b>${esc(tt("title"))}</b><small>${esc(tt("balLab"))}</small></div>
        </div>
        <div class="mp-amt">${esc(tt("soon"))}</div>
        <div class="mp-amt-sub">${esc(tt("soonSub"))}</div>
        <span class="mp-chip">✦ ${esc(tt("soon"))}</span>
      </div>
      <div class="mp-grid">${grid}</div>
      <p class="mp-foot"><b>${esc(tt("title"))}</b><br>${esc(tt("foot"))}</p>`;
  }

  function openSoon(item) {
    ensure();
    const title = tt(item.label || "soon");
    $("#bmMPaySoonH").textContent = title;
    const extra = item.sub ? `<p style="margin-top:-6px;font-size:12.5px;color:var(--text-muted,var(--fg3))">${esc(tt(item.sub))}</p>` : "";
    $("#bmMPaySoonBody").innerHTML = `
      <div class="mp-big">${IC[item.ic] || IC.riwayat}</div>
      <b>${esc(tt("soon"))}</b>
      ${extra}
      <p>${esc(tt("soonBody"))}</p>
      <button type="button" class="btn gold" data-mp="soonx">${esc(tt("close"))}</button>`;
    $("#bmMPaySoon").classList.add("on");
  }
  function closeSoon() { const s = $("#bmMPaySoon"); if (s) s.classList.remove("on"); }

  function onRoot(e) {
    const close = e.target.closest("[data-mp=close]");
    if (close) { e.preventDefault(); closePay(); return; }
    const item = e.target.closest("[data-mp=item]");
    if (item) {
      e.preventDefault();
      openSoon({
        id: item.dataset.id,
        label: item.dataset.label,
        sub: item.dataset.sub || null,
        ic: (ITEMS.find((x) => x.id === item.dataset.id) || {}).ic || "riwayat"
      });
    }
  }

  function open() {
    ensure();
    paint();
    $("#bmMPay").classList.add("on");
    document.documentElement.classList.add("mp-open");
    try { history.pushState({ bmMPay: 1 }, ""); } catch (e) {}
  }
  function closePay() {
    closeSoon();
    const r = $("#bmMPay");
    if (r) r.classList.remove("on");
    document.documentElement.classList.remove("mp-open");
  }

  window.addEventListener("popstate", () => {
    if ($("#bmMPay") && $("#bmMPay").classList.contains("on")) closePay();
  });
  document.addEventListener("rk:lang", () => {
    if ($("#bmMPay") && $("#bmMPay").classList.contains("on")) paint();
  });

  /** SVG for Dompet strip (gold fill) */
  const STRIP_MARK = `<svg class="bm-mp-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <rect x="2" y="2" width="28" height="28" rx="8" fill="rgba(230,199,122,.14)" stroke="#e6c77a" stroke-width="1.4"/>
    <path fill="#e6c77a" d="M18.2 7.2a9 9 0 1 0 6.2 14.2 7.6 7.6 0 1 1-6.2-14.2z"/>
    <circle cx="19.2" cy="16" r="3.4" fill="none" stroke="#e6c77a" stroke-width="1.6"/>
    <path stroke="#e6c77a" stroke-width="1.5" stroke-linecap="round" d="M19.2 14.2v3.6M17.4 16h3.6"/>
  </svg>`;

  window.BMMuslimPay = { open, close: closePay, tt, STRIP_MARK, stripLabel: () => tt("strip") };
  function refreshStrip() {
    try { if (window.KusyuDompet && KusyuDompet.renderStrip) KusyuDompet.renderStrip(); } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(refreshStrip, 50));
  else setTimeout(refreshStrip, 50);
  window.addEventListener("load", () => setTimeout(refreshStrip, 80));
})();
