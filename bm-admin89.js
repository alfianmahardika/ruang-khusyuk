/* Best Muslim v89 — Panel Admin (local moderation prototype). No real auth. */
(function () {
  "use strict";
  const PAGE = "admin";
  const SK_REPORTS = "rk_jn_reports_v1";
  const SK_FILTER = "rk_jn_filter_v1";
  const SK_TRUST = "rk_jn_trust_v1";
  const SK_POSTS = "rk_jn_posts_v1";

  const UI = {
    id: {
      title: "Panel Admin",
      sub: "Moderasi lokal · prototipe (belum ada login)",
      tabQueue: "Antrean",
      tabReports: "Dilaporkan",
      tabFilter: "Filter",
      tabTrust: "Tepercaya",
      queueEy: "Antrean tinjauan",
      queueEmpty: "Tidak ada jejak menunggu tinjauan.",
      reportsEy: "Dilaporkan",
      reportsEmpty: "Belum ada laporan.",
      filterEy: "Filter otomatis",
      filterWords: "Kata terblokir",
      filterLinks: "Tautan mencurigakan ditahan",
      filterAdd: "Tambah kata",
      filterPh: "kata atau frasa",
      trustEy: "Pengguna tepercaya",
      trustEmpty: "Belum ada pengguna tepercaya.",
      trustAuto: "Otomatis terbit (lewati antrean)",
      approve: "Setujui",
      reject: "Tolak",
      revise: "Minta revisi",
      hide: "Sembunyikan",
      ignore: "Abaikan",
      block: "Blokir pengguna",
      needDalil: "Perlu cek dalil",
      pending: "Menunggu tinjauan",
      reasonSpam: "Spam",
      reasonOff: "Tidak pantas",
      reasonFake: "Dalil meragukan",
      reasonOther: "Lainnya",
      approved: "Disetujui",
      rejected: "Ditolak",
      revised: "Diminta revisi",
      hidden: "Disembunyikan",
      ignored: "Diabaikan",
      blocked: "Pengguna diblokir (uji)",
      back: "Kembali",
      verHint: "Best Muslim · v89 · prototipe",
      verLong: "Tahan lama untuk Panel Admin (uji)",
      author: "Penulis",
      type: "Jenis",
      noPhoto: "Tanpa foto"
    },
    en: {
      title: "Admin Panel",
      sub: "Local moderation · prototype (no login yet)",
      tabQueue: "Queue",
      tabReports: "Reported",
      tabFilter: "Filters",
      tabTrust: "Trusted",
      queueEy: "Review queue",
      queueEmpty: "No posts awaiting review.",
      reportsEy: "Reported",
      reportsEmpty: "No reports yet.",
      filterEy: "Auto filters",
      filterWords: "Blocked words",
      filterLinks: "Suspicious links held",
      filterAdd: "Add word",
      filterPh: "word or phrase",
      trustEy: "Trusted users",
      trustEmpty: "No trusted users yet.",
      trustAuto: "Auto-publish (skip queue)",
      approve: "Approve",
      reject: "Reject",
      revise: "Request revision",
      hide: "Hide",
      ignore: "Dismiss",
      block: "Block user",
      needDalil: "Dalil needs check",
      pending: "Pending review",
      reasonSpam: "Spam",
      reasonOff: "Inappropriate",
      reasonFake: "Dubious dalil",
      reasonOther: "Other",
      approved: "Approved",
      rejected: "Rejected",
      revised: "Revision requested",
      hidden: "Hidden",
      ignored: "Dismissed",
      blocked: "User blocked (demo)",
      back: "Back",
      verHint: "Best Muslim · v89 · prototype",
      verLong: "Long-press for Admin Panel (demo)",
      author: "Author",
      type: "Type",
      noPhoto: "No photo"
    },
    ar: {
      title: "لوحة الإدارة",
      sub: "إشراف محلي · نموذج أولي (بدون تسجيل بعد)",
      tabQueue: "الانتظار",
      tabReports: "المبلَّغ",
      tabFilter: "التصفية",
      tabTrust: "موثوق",
      queueEy: "قائمة المراجعة",
      queueEmpty: "لا منشورات بانتظار المراجعة.",
      reportsEy: "المبلَّغ عنها",
      reportsEmpty: "لا بلاغات بعد.",
      filterEy: "تصفية تلقائية",
      filterWords: "كلمات محظورة",
      filterLinks: "روابط مشبوهة معلّقة",
      filterAdd: "أضف كلمة",
      filterPh: "كلمة أو عبارة",
      trustEy: "مستخدمون موثوقون",
      trustEmpty: "لا مستخدمين موثوقين بعد.",
      trustAuto: "نشر تلقائي (تجاوز الانتظار)",
      approve: "موافقة",
      reject: "رفض",
      revise: "طلب تعديل",
      hide: "إخفاء",
      ignore: "تجاهل",
      block: "حظر المستخدم",
      needDalil: "يحتاج فحص الدليل",
      pending: "بانتظار المراجعة",
      reasonSpam: "إزعاج",
      reasonOff: "غير لائق",
      reasonFake: "دليل مشكوك",
      reasonOther: "أخرى",
      approved: "تمت الموافقة",
      rejected: "مرفوض",
      revised: "طُلب التعديل",
      hidden: "مخفي",
      ignored: "متجاهل",
      blocked: "حُظر المستخدم (تجربة)",
      back: "رجوع",
      verHint: "Best Muslim · v89 · نموذج",
      verLong: "اضغط مطولًا للوحة الإدارة",
      author: "الكاتب",
      type: "النوع",
      noPhoto: "بدون صورة"
    }
  };

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lang = () => {
    try {
      const L = (window.lang && window.lang()) || JSON.parse(localStorage.getItem("rk_lang") || '"id"');
      return L === "en" || L === "ar" ? L : "id";
    } catch (e) {
      return "id";
    }
  };
  const t = (k) => (UI[lang()] || UI.id)[k] || UI.id[k] || k;
  const toast = (m) => {
    try {
      if (window.toast) return window.toast(m);
    } catch (e) {}
    console.log("[admin]", m);
  };
  const storeGet = (k, d) => {
    try {
      const v = localStorage.getItem(k);
      return v == null ? d : JSON.parse(v);
    } catch (e) {
      return d;
    }
  };
  const storeSet = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  };

  const state = { tab: "queue" };

  function posts() {
    if (window.RKJejakNur && RKJejakNur.posts) return RKJejakNur.posts();
    return storeGet(SK_POSTS, []);
  }
  function savePosts(list) {
    storeSet(SK_POSTS, list);
    try {
      if (window.RKJejakNur && RKJejakNur.render) RKJejakNur.render();
    } catch (e) {}
  }
  function reports() {
    return storeGet(SK_REPORTS, []);
  }
  function saveReports(r) {
    storeSet(SK_REPORTS, r);
  }
  function filters() {
    const d = storeGet(SK_FILTER, null);
    if (d) return d;
    const init = {
      words: ["judi", "porn", "crypto scam", "pinjol ilegal"],
      holdLinks: true,
      held: [{ url: "http://bit.ly/x-scam", note: "shortener", at: Date.now() - 86400000 }]
    };
    storeSet(SK_FILTER, init);
    return init;
  }
  function saveFilters(f) {
    storeSet(SK_FILTER, f);
  }
  function trust() {
    const d = storeGet(SK_TRUST, null);
    if (d) return d;
    const init = [{ handle: "hambaallah", name: "Hamba Allah", auto: false }];
    storeSet(SK_TRUST, init);
    return init;
  }
  function saveTrust(x) {
    storeSet(SK_TRUST, x);
  }

  function ensureSeedReports() {
    if (storeGet("rk_jn_admin_seed_v1", false)) return;
    const list = posts();
    const sample = list.find((p) => !p.own) || list[0];
    if (sample) {
      const R = reports();
      if (!R.length) {
        R.push({
          id: "rep_" + sample.id,
          postId: sample.id,
          reasons: ["spam"],
          note: "Contoh laporan (uji)",
          at: Date.now() - 3600000,
          status: "open"
        });
        saveReports(R);
      }
    }
    storeSet("rk_jn_admin_seed_v1", true);
  }

  function mountPage() {
    let sec = $("#page-admin");
    const body = `
      <div class="stack" id="adRoot">
        <div class="ad-top">
          <button type="button" class="btn sm ghost" data-ad="back">← <span data-ad-i="back"></span></button>
          <div><div class="eyebrow">🛡</div><h1 data-ad-i="title"></h1></div>
        </div>
        <p class="ad-sub dim" data-ad-i="sub"></p>
        <div class="ad-tabs" role="tablist">
          <button type="button" data-ad-tab="queue" class="on" data-ad-i="tabQueue"></button>
          <button type="button" data-ad-tab="reports" data-ad-i="tabReports"></button>
          <button type="button" data-ad-tab="filter" data-ad-i="tabFilter"></button>
          <button type="button" data-ad-tab="trust" data-ad-i="tabTrust"></button>
        </div>
        <div id="adView"></div>
      </div>`;
    if (sec) {
      if (!$("#adRoot", sec)) sec.innerHTML = body;
      return;
    }
    sec = document.createElement("section");
    sec.className = "page";
    sec.id = "page-admin";
    sec.innerHTML = body;
    const host = $("#view") || document.body;
    host.appendChild(sec);
  }

  function applyI18n() {
    $$("[data-ad-i]").forEach((el) => {
      const k = el.getAttribute("data-ad-i");
      if (k) el.textContent = t(k);
    });
  }

  function showPage(tab) {
    mountPage();
    if (tab) state.tab = tab;
    document.querySelectorAll(".page").forEach((s) => s.classList.toggle("on", s.id === "page-admin"));
    try {
      history.replaceState(history.state, "", "#admin");
    } catch (e) {}
    $$("#nav button").forEach((b) => b.classList.remove("on"));
    render();
  }

  async function thumbHtml(p) {
    if (!p || !(p.hasImg || p.imgKey || (p.img && String(p.img).slice(0, 5) === "data:"))) {
      return `<div class="ad-thumb empty">${esc(t("noPhoto"))}</div>`;
    }
    const key = p.imgKey || p.id;
    let src = "";
    try {
      if (window.RKJejakNur && RKJejakNur.loadPostImage) src = (await RKJejakNur.loadPostImage(key)) || "";
    } catch (e) {}
    if (!src && p.img) src = p.img;
    if (src) return `<div class="ad-thumb"><img src="${esc(src)}" alt=""></div>`;
    return `<div class="ad-thumb" data-ad-img="${esc(key)}"><img alt=""></div>`;
  }

  function L3(o) {
    if (!o) return "";
    if (typeof o === "string") return o;
    return o[lang()] || o.id || o.en || "";
  }

  async function renderQueue(view) {
    const pending = posts().filter((p) => p.pending && !p.hidden && p.status !== "rejected");
    if (!pending.length) {
      view.innerHTML = `<div class="eyebrow">${esc(t("queueEy"))}</div><p class="dim">${esc(t("queueEmpty"))}</p>`;
      return;
    }
    const cards = [];
    for (const p of pending) {
      const th = await thumbHtml(p);
      const dalilFlag = p.dalil ? `<span class="ad-flag">${esc(t("needDalil"))}</span>` : "";
      cards.push(`<article class="ad-card" data-ad-post="${esc(p.id)}">
        ${th}
        <div class="ad-body">
          <div class="ad-meta"><b>${esc(p.author || "?")}</b><span>${esc(p.type || "")} · ${esc(p.age || "")}</span></div>
          <p class="ad-text">${esc(L3(p.text).slice(0, 160))}</p>
          ${dalilFlag}
          ${p.dalil ? `<div class="ad-dalil"><div class="ar" dir="rtl">${esc(p.dalil.ar || "")}</div><small>${esc(p.dalil.ref || "")}</small></div>` : ""}
          <div class="ad-acts">
            <button type="button" class="btn sm gold" data-ad-act="approve">${esc(t("approve"))}</button>
            <button type="button" class="btn sm" data-ad-act="revise">${esc(t("revise"))}</button>
            <button type="button" class="btn sm ghost" data-ad-act="reject-open">${esc(t("reject"))}</button>
          </div>
          <div class="ad-reasons" hidden>
            <button type="button" data-ad-reason="spam">${esc(t("reasonSpam"))}</button>
            <button type="button" data-ad-reason="off">${esc(t("reasonOff"))}</button>
            <button type="button" data-ad-reason="fake">${esc(t("reasonFake"))}</button>
            <button type="button" data-ad-reason="other">${esc(t("reasonOther"))}</button>
          </div>
        </div>
      </article>`);
    }
    view.innerHTML = `<div class="eyebrow">${esc(t("queueEy"))}</div><div class="ad-list">${cards.join("")}</div>`;
    hydrateThumbs(view);
  }

  async function hydrateThumbs(root) {
    for (const el of $$("[data-ad-img]", root)) {
      const key = el.getAttribute("data-ad-img");
      try {
        const url = window.RKJejakNur && (await RKJejakNur.loadPostImage(key));
        const img = el.querySelector("img");
        if (url && img) img.src = url;
      } catch (e) {}
    }
  }

  async function renderReports(view) {
    ensureSeedReports();
    const open = reports().filter((r) => r.status === "open");
    if (!open.length) {
      view.innerHTML = `<div class="eyebrow">${esc(t("reportsEy"))}</div><p class="dim">${esc(t("reportsEmpty"))}</p>`;
      return;
    }
    const list = posts();
    const cards = [];
    for (const r of open) {
      const p = list.find((x) => x.id === r.postId) || { id: r.postId, text: { id: "(hilang)" }, author: "?" };
      const th = await thumbHtml(p);
      const reasons = (r.reasons || []).map((x) => esc(t("reason" + x.charAt(0).toUpperCase() + x.slice(1)) || x)).join(" · ");
      cards.push(`<article class="ad-card" data-ad-rep="${esc(r.id)}" data-ad-post="${esc(p.id)}">
        ${th}
        <div class="ad-body">
          <div class="ad-meta"><b>${esc(p.author || "?")}</b><span>${esc(reasons || r.note || "")}</span></div>
          <p class="ad-text">${esc(L3(p.text).slice(0, 140))}</p>
          <div class="ad-acts">
            <button type="button" class="btn sm" data-ad-act="hide">${esc(t("hide"))}</button>
            <button type="button" class="btn sm ghost" data-ad-act="ignore">${esc(t("ignore"))}</button>
            <button type="button" class="btn sm ghost" data-ad-act="block">${esc(t("block"))}</button>
          </div>
        </div>
      </article>`);
    }
    view.innerHTML = `<div class="eyebrow">${esc(t("reportsEy"))}</div><div class="ad-list">${cards.join("")}</div>`;
    hydrateThumbs(view);
  }

  function renderFilter(view) {
    const f = filters();
    view.innerHTML = `<div class="eyebrow">${esc(t("filterEy"))}</div>
      <div class="ad-card flat">
        <b>${esc(t("filterWords"))}</b>
        <div class="ad-chips">${(f.words || []).map((w) => `<span data-ad-delword="${esc(w)}">${esc(w)} ✕</span>`).join("")}</div>
        <div class="row" style="gap:8px;margin-top:10px">
          <input type="text" id="adWord" class="ad-in" placeholder="${esc(t("filterPh"))}" maxlength="40">
          <button type="button" class="btn sm gold" data-ad-act="addword">${esc(t("filterAdd"))}</button>
        </div>
      </div>
      <div class="ad-card flat">
        <label class="ad-check"><input type="checkbox" id="adHoldLinks" ${f.holdLinks ? "checked" : ""}> <span>${esc(t("filterLinks"))}</span></label>
        <ul class="ad-held">${(f.held || []).map((h) => `<li><code>${esc(h.url)}</code> <small>${esc(h.note || "")}</small></li>`).join("") || "<li class='dim'>—</li>"}</ul>
      </div>`;
  }

  function renderTrust(view) {
    const list = trust();
    view.innerHTML = `<div class="eyebrow">${esc(t("trustEy"))}</div>
      ${
        list.length
          ? `<div class="ad-list">${list
              .map(
                (u) => `<article class="ad-card flat" data-ad-trust="${esc(u.handle)}">
            <div class="ad-body" style="padding-inline-start:0">
              <div class="ad-meta"><b>${esc(u.name || u.handle)}</b><span>@${esc(u.handle)}</span></div>
              <label class="ad-check"><input type="checkbox" data-ad-auto ${u.auto ? "checked" : ""}> <span>${esc(t("trustAuto"))}</span></label>
            </div>
          </article>`
              )
              .join("")}</div>`
          : `<p class="dim">${esc(t("trustEmpty"))}</p>`
      }`;
  }

  async function render() {
    applyI18n();
    $$("[data-ad-tab]").forEach((b) => b.classList.toggle("on", b.dataset.adTab === state.tab));
    const view = $("#adView");
    if (!view) return;
    if (state.tab === "queue") await renderQueue(view);
    else if (state.tab === "reports") await renderReports(view);
    else if (state.tab === "filter") renderFilter(view);
    else renderTrust(view);
  }

  function setPostFlags(id, patch) {
    const list = posts();
    const i = list.findIndex((p) => p.id === id);
    if (i < 0) return false;
    Object.assign(list[i], patch);
    savePosts(list);
    return true;
  }

  function onClick(e) {
    const g = (sel) => e.target.closest(sel);
    if (g("[data-ad=back]")) {
      e.preventDefault();
      if (window.go) window.go("settings");
      return;
    }
    const tab = g("[data-ad-tab]");
    if (tab) {
      e.preventDefault();
      state.tab = tab.dataset.adTab;
      render();
      return;
    }
    const card = g(".ad-card[data-ad-post]");
    const act = g("[data-ad-act]");
    if (card && act) {
      e.preventDefault();
      const id = card.dataset.adPost;
      const a = act.dataset.adAct;
      if (a === "approve") {
        setPostFlags(id, { pending: false, status: "approved", revised: false });
        toast(t("approved"));
        render();
        return;
      }
      if (a === "revise") {
        setPostFlags(id, { pending: true, status: "revise", revised: true });
        toast(t("revised"));
        render();
        return;
      }
      if (a === "reject-open") {
        const box = card.querySelector(".ad-reasons");
        if (box) box.hidden = !box.hidden;
        return;
      }
      if (a === "hide") {
        setPostFlags(id, { hidden: true, pending: false });
        const R = reports();
        const rep = g("[data-ad-rep]");
        if (rep) {
          const r = R.find((x) => x.id === rep.dataset.adRep);
          if (r) r.status = "hidden";
          saveReports(R);
        }
        toast(t("hidden"));
        render();
        return;
      }
      if (a === "ignore") {
        const rep = g("[data-ad-rep]");
        const R = reports();
        if (rep) {
          const r = R.find((x) => x.id === rep.dataset.adRep);
          if (r) r.status = "ignored";
          saveReports(R);
        }
        toast(t("ignored"));
        render();
        return;
      }
      if (a === "block") {
        setPostFlags(id, { hidden: true, blockedAuthor: true });
        const rep = g("[data-ad-rep]");
        const R = reports();
        if (rep) {
          const r = R.find((x) => x.id === rep.dataset.adRep);
          if (r) r.status = "blocked";
          saveReports(R);
        }
        toast(t("blocked"));
        render();
        return;
      }
      if (a === "addword") {
        const inp = $("#adWord");
        const w = (inp && inp.value.trim().toLowerCase()) || "";
        if (!w) return;
        const f = filters();
        if (!f.words.includes(w)) f.words.push(w);
        saveFilters(f);
        if (inp) inp.value = "";
        render();
        return;
      }
    }
    const reason = g("[data-ad-reason]");
    if (reason && card) {
      e.preventDefault();
      const id = card.dataset.adPost;
      setPostFlags(id, { pending: false, status: "rejected", rejectReason: reason.dataset.adReason, hidden: true });
      toast(t("rejected"));
      render();
      return;
    }
    const delw = g("[data-ad-delword]");
    if (delw) {
      e.preventDefault();
      const f = filters();
      f.words = (f.words || []).filter((w) => w !== delw.dataset.adDelword);
      saveFilters(f);
      render();
      return;
    }
  }

  function onChange(e) {
    if (e.target && e.target.id === "adHoldLinks") {
      const f = filters();
      f.holdLinks = !!e.target.checked;
      saveFilters(f);
      return;
    }
    if (e.target && e.target.matches("[data-ad-auto]")) {
      const row = e.target.closest("[data-ad-trust]");
      if (!row) return;
      const list = trust();
      const u = list.find((x) => x.handle === row.dataset.adTrust);
      if (u) {
        u.auto = !!e.target.checked;
        saveTrust(list);
        toast(t("trustAuto") + (u.auto ? " ✓" : ""));
      }
    }
  }

  function injectSettingsVersion() {
    const stack = $("#stStack");
    if (!stack || $("#adVerBtn")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "adVerBtn";
    btn.className = "ad-ver";
    btn.setAttribute("aria-label", "version");
    btn.innerHTML = `<span data-ad-verhint></span><small data-ad-verlong></small>`;
    stack.appendChild(btn);
    const sync = () => {
      const a = btn.querySelector("[data-ad-verhint]");
      const b = btn.querySelector("[data-ad-verlong]");
      if (a) a.textContent = t("verHint");
      if (b) b.textContent = t("verLong");
    };
    sync();
    document.addEventListener("rk:lang", sync);
    let timer = null;
    const start = () => {
      timer = setTimeout(() => showPage("queue"), 650);
    };
    const cancel = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
    btn.addEventListener("pointerdown", start);
    btn.addEventListener("pointerup", cancel);
    btn.addEventListener("pointerleave", cancel);
    btn.addEventListener("pointercancel", cancel);
  }

  function wrapGo() {
    const tryWrap = () => {
      if (!window.go || window.go._admin89) return !!window.go;
      const inner = window.go;
      window.go = function (p) {
        if (p === "admin" || p === PAGE) {
          showPage();
          return;
        }
        return inner.apply(this, arguments);
      };
      window.go._admin89 = true;
      return true;
    };
    if (!tryWrap()) {
      setTimeout(tryWrap, 100);
      setTimeout(tryWrap, 600);
    }
  }

  /* Hook report button in Jejak Nur → admin reports store */
  function hookReports() {
    document.addEventListener(
      "click",
      (e) => {
        const rep = e.target.closest("[data-jn-report]");
        if (!rep) return;
        const card = e.target.closest(".jn-ig[data-id], .jn-card[data-id]");
        if (!card) return;
        const postId = card.dataset.id;
        const R = reports();
        R.unshift({
          id: "rep_" + postId + "_" + Date.now(),
          postId,
          reasons: ["other"],
          note: "User report",
          at: Date.now(),
          status: "open"
        });
        saveReports(R);
      },
      true
    );
  }

  /* Trusted auto-publish: when publishing, if author trusted+auto, clear pending */
  function patchPublish() {
    /* Observe posts after publish via storage — simpler: wrap save in interval check after JN loads */
    const applyTrust = () => {
      try {
        const list = posts();
        const T = trust();
        let changed = false;
        for (const p of list) {
          if (!p.pending || !p.own) continue;
          const handle = (storeGet("rk_jn_prof_v1", {}) || {}).handle || "hambaallah";
          const u = T.find((x) => x.handle === handle && x.auto);
          if (u) {
            p.pending = false;
            p.status = "approved";
            changed = true;
          }
        }
        if (changed) savePosts(list);
      } catch (e) {}
    };
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-jn=publish]")) setTimeout(applyTrust, 400);
    });
  }

  function boot() {
    mountPage();
    wrapGo();
    injectSettingsVersion();
    hookReports();
    patchPublish();
    document.addEventListener("click", onClick);
    document.addEventListener("change", onChange);
    document.addEventListener("rk:lang", () => {
      applyI18n();
      injectSettingsVersion();
      if ($("#page-admin")?.classList.contains("on")) render();
    });
    if (location.hash === "#admin") setTimeout(() => showPage("queue"), 700);
    /* Re-inject version when settings opened */
    const obs = new MutationObserver(() => injectSettingsVersion());
    const st = $("#page-settings");
    if (st) obs.observe(st, { childList: true, subtree: true });
  }

  window.RKAdmin = { open: showPage, render, t };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
