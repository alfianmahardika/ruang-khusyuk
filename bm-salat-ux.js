/* Best Muslim v75 — salat reward popup + NPS (privacy-first, local only). No autoplay. */
(function () {
  "use strict";
  const PTS_PER = 10;
  const SK_DOM = "rk_dompet";
  const SK_STREAK = "rk_salat_journey";
  const SK_NPS = "rk_nps";
  const SK_FIRST = "rk_first_seen";
  const SK_CHECKS = "rk_salat_checks_total";
  const SK_SESS = "rk_sess_boot";

  const I18N = {
    id: {
      pts: "+{n} poin",
      days: "{n}-hari",
      journey: "Perjalanan Sholat",
      cheer: "MasyaAllah! Teruskan!",
      share: "Bagikan",
      shareText: "Alhamdulillah, saya menjaga sholat dengan Best Muslim ({n}-hari). Yuk jaga sholat bareng: https://bestmuslim.app",
      npsQ: "Seberapa mungkin Anda merekomendasikan Best Muslim ke teman?",
      npsLo: "0 — Tidak mungkin",
      npsHi: "10 — Sangat mungkin",
      npsGo: "Lanjutkan",
      npsThanks: "Terima kasih atas masukan Anda",
      npsSharePrompt: "Bagikan Best Muslim ke teman?",
      npsShareBtn: "Bagikan ke teman",
      npsFbPh: "Apa yang bisa kami perbaiki? (opsional)",
      npsMail: "Kirim saran ke halo@bestmuslim.app",
      npsSkip: "Nanti saja",
      week: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
    },
    en: {
      pts: "+{n} pts",
      days: "{n}-day",
      journey: "Prayer Journey",
      cheer: "MashaAllah! Keep going!",
      share: "Share",
      shareText: "Alhamdulillah — I'm keeping my prayers with Best Muslim ({n}-day streak). Join me: https://bestmuslim.app",
      npsQ: "How likely are you to recommend Best Muslim to a friend?",
      npsLo: "0 — Not likely",
      npsHi: "10 — Very likely",
      npsGo: "Continue",
      npsThanks: "Thank you for your feedback",
      npsSharePrompt: "Share Best Muslim with a friend?",
      npsShareBtn: "Share with a friend",
      npsFbPh: "What could we improve? (optional)",
      npsMail: "Email feedback to halo@bestmuslim.app",
      npsSkip: "Maybe later",
      week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    ar: {
      pts: "+{n} نقطة",
      days: "{n} يوم",
      journey: "رحلة الصلاة",
      cheer: "ما شاء الله! واصل!",
      share: "شارك",
      shareText: "الحمد لله أحافظ على صلاتي مع Best Muslim ({n} يوم). انضم إلي: https://bestmuslim.app",
      npsQ: "ما مدى احتمالية أن توصي بـ Best Muslim لصديق؟",
      npsLo: "0 — غير محتمل",
      npsHi: "10 — محتمل جدًا",
      npsGo: "متابعة",
      npsThanks: "شكرًا لملاحظاتك",
      npsSharePrompt: "شارك Best Muslim مع صديق؟",
      npsShareBtn: "شارك مع صديق",
      npsFbPh: "ما الذي يمكننا تحسينه؟ (اختياري)",
      npsMail: "أرسل ملاحظاتك إلى halo@bestmuslim.app",
      npsSkip: "لاحقًا",
      week: ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"]
    }
  };

  function storeGet(k, d) {
    try {
      const v = localStorage.getItem(k);
      return v == null ? d : JSON.parse(v);
    } catch (e) {
      return d;
    }
  }
  function storeSet(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  }
  function dkey(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function lang() {
    try {
      const raw = localStorage.getItem("rk_lang");
      const v = raw == null ? "id" : JSON.parse(raw);
      if (v === "ar" || v === "en" || v === "id") return v;
      return "en";
    } catch (e) {
      return "id";
    }
  }
  function t(k, vars) {
    const L = I18N[lang()] || I18N.id;
    let s = L[k] != null ? L[k] : (I18N.en[k] != null ? I18N.en[k] : k);
    if (vars) Object.keys(vars).forEach((x) => {
      s = String(s).replace("{" + x + "}", vars[x]);
    });
    return s;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function bootMeta() {
    if (storeGet(SK_FIRST, null) == null) storeSet(SK_FIRST, Date.now());
    if (!sessionStorage.getItem(SK_SESS)) {
      sessionStorage.setItem(SK_SESS, String(Date.now()));
      sessionStorage.setItem("rk_sess_is_first", storeGet(SK_CHECKS, 0) === 0 && (Date.now() - (storeGet(SK_FIRST, Date.now()))) < 60000 ? "1" : "0");
      // better first-launch: if first_seen was just set this page load
      const fs = storeGet(SK_FIRST, Date.now());
      if (Date.now() - fs < 5000) sessionStorage.setItem("rk_sess_is_first", "1");
    }
  }

  function bumpChecks() {
    storeSet(SK_CHECKS, (storeGet(SK_CHECKS, 0) | 0) + 1);
  }

  function awardPoints(n, note) {
    const o = storeGet(SK_DOM, null) || { saldo: 0, poin: 0, hist: [], claimed: {}, act: {} };
    o.poin = (o.poin | 0) + n;
    o.hist = o.hist || [];
    o.hist.unshift({ ts: Date.now(), day: dkey(), pts: n, note: note || "Salat" });
    if (o.hist.length > 80) o.hist.length = 80;
    storeSet(SK_DOM, o);
    try {
      if (window.renderStrip) renderStrip();
    } catch (e) {}
    return o.poin;
  }

  /** Streak: once per calendar day when first fard is checked that day */
  function bumpStreak(day) {
    day = day || dkey();
    const j = storeGet(SK_STREAK, null) || { count: 0, lastDay: null, days: {} };
    j.days = j.days || {};
    if (j.days[day]) return j; // already counted today
    j.days[day] = 1;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yk = dkey(y);
    if (j.lastDay === yk || j.lastDay === day) j.count = (j.count | 0) + 1;
    else j.count = 1;
    j.lastDay = day;
    // prune old week keys
    const keep = new Set();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      keep.add(dkey(d));
    }
    Object.keys(j.days).forEach((k) => {
      if (!keep.has(k)) delete j.days[k];
    });
    storeSet(SK_STREAK, j);
    return j;
  }

  function weekDots(journey) {
    const labels = t("week");
    // Show 7 days starting from start of current week (Sun) OR rolling last 7 ending today?
    // Reference: Rab highlighted as today with Kam..Sel ahead — so week from today for 7 days starting at beginning of week containing today in locale.
    // Use Mon-start for ID feel? Reference had Rab as first highlighted with Kam Jum Sab Min Sen Sel — that's Wed→Tue rolling from today.
    const out = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const k = dkey(d);
      out.push({
        lab: labels[d.getDay()],
        on: !!(journey.days && journey.days[k]),
        today: i === 0
      });
    }
    return out;
  }

  function ensureOv() {
    if (document.getElementById("bmSalatReward")) return;
    const wrap = document.createElement("div");
    wrap.innerHTML =
      '<div class="bm-ov" id="bmSalatReward" role="dialog" aria-modal="true" aria-labelledby="bmRwTitle">' +
      '<div class="bm-ov-card">' +
      '<button type="button" class="bm-ov-x" id="bmRwX" aria-label="Close">×</button>' +
      '<div class="bm-rw-art" aria-hidden="true">🕌</div>' +
      '<div class="bm-rw-pts" id="bmRwPts"></div>' +
      '<p class="bm-rw-days" id="bmRwDays"></p>' +
      '<p class="bm-rw-title" id="bmRwTitle"></p>' +
      '<p class="bm-rw-sub" id="bmRwSub"></p>' +
      '<div class="bm-rw-week" id="bmRwWeek"></div>' +
      '<button type="button" class="bm-rw-share" id="bmRwShare"></button>' +
      "</div></div>" +
      '<div class="bm-ov" id="bmNps" role="dialog" aria-modal="true">' +
      '<div class="bm-ov-card bm-nps-card">' +
      '<button type="button" class="bm-ov-x" id="bmNpsX" aria-label="Close">×</button>' +
      '<div class="bm-nps-emoji" aria-hidden="true">😊💛</div>' +
      '<p class="bm-nps-q" id="bmNpsQ"></p>' +
      '<div class="bm-nps-scale"><span id="bmNpsLo"></span><span id="bmNpsHi"></span></div>' +
      '<div class="bm-nps-nums" id="bmNpsRow1"></div>' +
      '<div class="bm-nps-nums" id="bmNpsRow2"></div>' +
      '<div id="bmNpsExtra" hidden></div>' +
      '<button type="button" class="bm-nps-go" id="bmNpsGo" disabled></button>' +
      "</div></div>";
    document.body.appendChild(wrap);
    document.getElementById("bmRwX").onclick = () => closeReward(true);
    document.getElementById("bmSalatReward").addEventListener("click", (e) => {
      if (e.target.id === "bmSalatReward") closeReward(true);
    });
    document.getElementById("bmRwShare").onclick = () => doShare();
    document.getElementById("bmNpsX").onclick = () => closeNps(true);
    document.getElementById("bmNps").addEventListener("click", (e) => {
      if (e.target.id === "bmNps") closeNps(true);
    });
  }

  let _score = null;
  let _journey = null;

  function showReward(opts) {
    ensureOv();
    _journey = opts.journey;
    const days = opts.journey.count | 0;
    document.getElementById("bmRwPts").textContent = t("pts", { n: opts.pts });
    document.getElementById("bmRwDays").textContent = t("days", { n: days });
    document.getElementById("bmRwTitle").textContent = t("journey");
    document.getElementById("bmRwSub").textContent = t("cheer");
    document.getElementById("bmRwShare").textContent = "↗ " + t("share");
    const week = weekDots(opts.journey);
    document.getElementById("bmRwWeek").innerHTML = week
      .map(
        (d) =>
          `<div class="bm-rw-day${d.on || d.today ? " on" : ""}"><span class="bm-rw-dot">${d.on || d.today ? "✦" : ""}</span><span>${esc(d.lab)}</span></div>`
      )
      .join("");
    document.getElementById("bmSalatReward").classList.add("on");
  }

  function closeReward(maybeNps) {
    const el = document.getElementById("bmSalatReward");
    if (el) el.classList.remove("on");
    if (maybeNps) setTimeout(() => {
      tryShowNps();
    }, 400);
  }

  async function doShare() {
    const n = (_journey && _journey.count) || 1;
    const text = t("shareText", { n });
    const url = "https://bestmuslim.app";
    try {
      if (window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.Share) {
        await Capacitor.Plugins.Share.share({ text, url, dialogTitle: t("share") });
        return;
      }
    } catch (e) {}
    try {
      if (navigator.share) {
        await navigator.share({ text, url, title: "Best Muslim" });
        return;
      }
    } catch (e) {}
    try {
      await navigator.clipboard.writeText(text);
      if (window.__rkToast) __rkToast(lang() === "ar" ? "تم النسخ" : lang() === "en" ? "Copied" : "Tersalin");
    } catch (e) {}
  }

  function npsEligible() {
    bootMeta();
    if (sessionStorage.getItem("rk_sess_is_first") === "1") return false;
    if (sessionStorage.getItem("rk_nps_shown_sess") === "1") return false;
    const first = storeGet(SK_FIRST, Date.now());
    const days = (Date.now() - first) / 864e5;
    if (days < 3) return false;
    if ((storeGet(SK_CHECKS, 0) | 0) < 5) return false;
    const nps = storeGet(SK_NPS, null) || {};
    if (nps.lastShown && Date.now() - nps.lastShown < 30 * 864e5) return false;
    // occasional: ~35% when eligible
    if (Math.random() > 0.35 && !window.__BM_FORCE_NPS) return false;
    return true;
  }

  function tryShowNps() {
    if (!npsEligible() && !window.__BM_FORCE_NPS) return;
    window.__BM_FORCE_NPS = false;
    ensureOv();
    _score = null;
    document.getElementById("bmNpsQ").textContent = t("npsQ");
    document.getElementById("bmNpsLo").textContent = t("npsLo");
    document.getElementById("bmNpsHi").textContent = t("npsHi");
    document.getElementById("bmNpsGo").textContent = t("npsGo");
    document.getElementById("bmNpsGo").disabled = true;
    const extra = document.getElementById("bmNpsExtra");
    extra.hidden = true;
    extra.innerHTML = "";
    const mk = (from, to, rowId) => {
      const row = document.getElementById(rowId);
      row.innerHTML = "";
      for (let i = from; i <= to; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "bm-nps-n";
        b.textContent = String(i);
        b.dataset.s = String(i);
        b.onclick = () => {
          _score = i;
          row.parentElement.querySelectorAll(".bm-nps-n").forEach((x) => x.classList.toggle("on", +x.dataset.s === i));
          document.getElementById("bmNpsGo").disabled = false;
        };
        row.appendChild(b);
      }
    };
    mk(0, 5, "bmNpsRow1");
    mk(6, 10, "bmNpsRow2");
    document.getElementById("bmNpsGo").onclick = onNpsContinue;
    const nps = storeGet(SK_NPS, {}) || {};
    nps.lastShown = Date.now();
    storeSet(SK_NPS, nps);
    sessionStorage.setItem("rk_nps_shown_sess", "1");
    document.getElementById("bmNps").classList.add("on");
  }

  function onNpsContinue() {
    if (_score == null) return;
    const nps = storeGet(SK_NPS, {}) || {};
    nps.score = _score;
    nps.answeredAt = Date.now();
    storeSet(SK_NPS, nps);
    const extra = document.getElementById("bmNpsExtra");
    const go = document.getElementById("bmNpsGo");
    if (_score >= 9) {
      extra.hidden = false;
      extra.innerHTML =
        `<p class="bm-rw-sub" style="margin-bottom:10px">${esc(t("npsSharePrompt"))}</p>` +
        `<button type="button" class="bm-rw-share" id="bmNpsShare">${esc(t("npsShareBtn"))}</button>` +
        `<button type="button" class="btn sm ghost" id="bmNpsSkip" style="margin-top:8px;width:100%;justify-content:center">${esc(t("npsSkip"))}</button>`;
      go.hidden = true;
      document.getElementById("bmNpsShare").onclick = () => {
        doShare().then(() => closeNps(false));
      };
      document.getElementById("bmNpsSkip").onclick = () => closeNps(false);
    } else if (_score <= 6) {
      extra.hidden = false;
      extra.innerHTML =
        `<textarea class="bm-nps-fb" id="bmNpsFb" placeholder="${esc(t("npsFbPh"))}"></textarea>` +
        `<a class="bm-nps-mail" id="bmNpsMail" href="#">${esc(t("npsMail"))}</a>`;
      go.hidden = false;
      go.textContent = t("npsGo");
      go.onclick = () => {
        const fb = (document.getElementById("bmNpsFb") || {}).value || "";
        if (fb) {
          nps.feedback = String(fb).slice(0, 2000);
          storeSet(SK_NPS, nps);
        }
        closeNps(false);
      };
      document.getElementById("bmNpsMail").onclick = (e) => {
        e.preventDefault();
        const fb = (document.getElementById("bmNpsFb") || {}).value || "";
        const body = encodeURIComponent(
          (lang() === "ar" ? "تقييمي: " : lang() === "en" ? "My score: " : "Skor saya: ") +
            _score +
            "/10\n\n" +
            fb
        );
        const sub = encodeURIComponent("Best Muslim feedback NPS " + _score);
        // user-initiated mailto only
        location.href = "mailto:halo@bestmuslim.app?subject=" + sub + "&body=" + body;
      };
    } else {
      if (window.__rkToast) __rkToast(t("npsThanks"));
      closeNps(false);
    }
  }

  function closeNps() {
    const el = document.getElementById("bmNps");
    if (el) el.classList.remove("on");
    const go = document.getElementById("bmNpsGo");
    if (go) {
      go.hidden = false;
      go.disabled = true;
    }
  }

  function onSalatChecked(detail) {
    bumpChecks();
    const day = (detail && detail.day) || dkey();
    /* Streak once per calendar day — only when the checked date is today */
    const journey = day === dkey() ? bumpStreak(day) : (storeGet(SK_STREAK, null) || { count: 0, lastDay: null, days: {} });
    awardPoints(PTS_PER, detail && detail.label ? detail.label : "Salat");
    showReward({ pts: PTS_PER, journey, prayer: detail && detail.n });
  }

  document.addEventListener("rk:salat-check", (e) => {
    try {
      onSalatChecked(e.detail || {});
    } catch (err) {}
  });

  window.BMSalatUX = {
    showReward,
    tryShowNps,
    forceNps: () => {
      window.__BM_FORCE_NPS = true;
      tryShowNps();
    },
    bumpStreak,
    awardPoints
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootMeta);
  else bootMeta();
})();
