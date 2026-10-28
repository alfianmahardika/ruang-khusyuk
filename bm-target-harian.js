/*! Best Muslim v80 — Hari ini (unified Target + Amalan sunnah).
 * Reuses: rk_salat_*, ks_hikmah, rk_q_last/rk_q_lastpg, rk_dompet, ks_ibadah_log, rk_target_harian.
 * Privacy-first: localStorage only. ID/EN/AR. Gold Best Muslim.
 */
(function () {
  "use strict";
  var SK = "rk_target_harian";
  var SK_DOM = "rk_dompet";
  var PTS_DONE = 25;
  var FREEZE_MAX = 2;
  var FREEZE_EVERY = 7;
  var QURAN_AYAT_GOAL = 10;
  var CIRC = 2 * Math.PI * 26;

  var I18N = {
    id: {
      ey: "Harian",
      title: "Hari ini",
      streak: "{n} 🔥",
      freeze: "🧊 ×{n}",
      freezeMax: "maks 2",
      pts: "{n} poin",
      gSalat: "Sholat 5 waktu",
      gSalatSub: "Centang dari checklist Jadwal",
      gSalatUzur: "Tidak dihitung saat uzur",
      gQuran: "Baca 1 halaman Qur'an",
      gQuranSub: "Atau ±{n} ayat di mode per ayat",
      gHikmah: "1 Hikmah Harian",
      gHikmahSub: "Selesaikan putaran Hikmah hari ini",
      sunnahToggle: "+ Amalan sunnah (opsional)",
      sunnahHide: "Sembunyikan amalan sunnah",
      guest: "Mode tamu — tersimpan di perangkat ini",
      openCal: "Kalender streak",
      openUzur: "Mode uzur",
      uzurOn: "Mode uzur aktif — streak dijeda",
      privacy: "Disimpan hanya di perangkat Anda (localStorage).",
      calTitle: "Kalender streak",
      calLead: "🔥 lengkap · 🧊 pembeku · 🌙 uzur · · kosong = belum / terlewat",
      celeTitle: "Hari ini lengkap!",
      celeSub: "MasyaAllah — streak Anda jadi {n} hari. Tetap istiqamah.",
      celePts: "+{n} poin",
      share: "Bagikan",
      shareText: "Alhamdulillah, target harian Best Muslim selesai — streak {n} hari 🔥 https://bestmuslim.app",
      close: "Tutup",
      freezeUsed: "Kemarin belum lengkap — 🧊 Pembeku streak dipakai. Streak Anda aman.",
      freezeGone: "Streak terputus. Mulai lagi hari ini — Allah Maha Pengasih.",
      uzurTitle: "Mode uzur",
      uzurLead: "Untuk kondisi yang membuat sholat tidak wajib atau memberatkan. Streak dijeda (tidak putus, pembeku tidak dipakai).",
      uzurOff: "Nonaktifkan mode uzur",
      uzurHaid: "Haid",
      uzurNifas: "Nifas",
      uzurSakit: "Sakit / uzur medis",
      uzurSafar: "Safar (perjalanan)",
      uzurFiqh: "Menurut mayoritas ulama (termasuk madzhab Syafi'i), perempuan yang sedang haid atau nifas tidak wajib sholat, dan sholat yang terlewat saat itu tidak diqada. Mode ini hanya membantu pencatatan pribadi di aplikasi — bukan fatwa. Untuk kondisi sakit atau safar, ikuti hukum dan kemudahan yang berlaku bagi Anda, sebaiknya dengan menanyakan kepada ustadz/ustadzah tepercaya.",
      save: "Simpan",
      done: "Selesai",
      of3: "{n}/3",
      dalil: "Dalil"
    },
    en: {
      ey: "Daily",
      title: "Today",
      streak: "{n} 🔥",
      freeze: "🧊 ×{n}",
      freezeMax: "max 2",
      pts: "{n} pts",
      gSalat: "5 daily prayers",
      gSalatSub: "From the Prayer Times checklist",
      gSalatUzur: "Not counted during uzur",
      gQuran: "Read 1 Qur'an page",
      gQuranSub: "Or about {n} verses in verse mode",
      gHikmah: "1 Daily Wisdom",
      gHikmahSub: "Finish today's Hikmah round",
      sunnahToggle: "+ Optional sunnah deeds",
      sunnahHide: "Hide sunnah deeds",
      guest: "Guest mode — saved on this device",
      openCal: "Streak calendar",
      openUzur: "Uzur mode",
      uzurOn: "Uzur mode on — streak paused",
      privacy: "Stored only on your device (localStorage).",
      calTitle: "Streak calendar",
      calLead: "🔥 complete · 🧊 freeze · 🌙 uzur · · empty = missed / pending",
      celeTitle: "Today complete!",
      celeSub: "MashaAllah — your streak is now {n} days. Keep going.",
      celePts: "+{n} pts",
      share: "Share",
      shareText: "Alhamdulillah — Best Muslim daily goals done, {n}-day streak 🔥 https://bestmuslim.app",
      close: "Close",
      freezeUsed: "Yesterday was incomplete — a 🧊 streak freeze was used. Your streak is safe.",
      freezeGone: "Streak reset. Start again today — Allah is Most Kind.",
      uzurTitle: "Uzur mode",
      uzurLead: "For times when prayer is not obligatory or is a hardship. Your streak is paused (not broken; no freeze used).",
      uzurOff: "Turn off uzur mode",
      uzurHaid: "Menstruation (haid)",
      uzurNifas: "Postnatal bleeding (nifas)",
      uzurSakit: "Illness / medical excuse",
      uzurSafar: "Travel (safar)",
      uzurFiqh: "According to the majority of scholars (including the Shafi'i school), women in menstruation or postnatal bleeding are not obligated to pray, and missed prayers in that period are not made up. This mode only helps personal tracking in the app — it is not a fatwa. For illness or travel, follow the rulings and concessions that apply to you, ideally with a trusted teacher.",
      save: "Save",
      done: "Done",
      of3: "{n}/3",
      dalil: "Evidence"
    },
    ar: {
      ey: "يومي",
      title: "اليوم",
      streak: "{n} 🔥",
      freeze: "🧊 ×{n}",
      freezeMax: "حد أقصى 2",
      pts: "{n} نقطة",
      gSalat: "الصلوات الخمس",
      gSalatSub: "من قائمة مواقيت الصلاة",
      gSalatUzur: "لا تُحتسب أثناء العذر",
      gQuran: "قراءة صفحة من القرآن",
      gQuranSub: "أو نحو {n} آيات في وضع الآية",
      gHikmah: "حكمة يومية واحدة",
      gHikmahSub: "أتمّ جولة الحكمة اليوم",
      sunnahToggle: "+ سنن اختيارية",
      sunnahHide: "إخفاء السنن",
      guest: "وضع الضيف — محفوظ على هذا الجهاز",
      openCal: "تقويم السلسلة",
      openUzur: "وضع العذر",
      uzurOn: "وضع العذر مفعّل — السلسلة متوقفة",
      privacy: "يُحفظ على جهازك فقط (localStorage).",
      calTitle: "تقويم السلسلة",
      calLead: "🔥 مكتمل · 🧊 تجميد · 🌙 عذر · · فارغ = فائت / قيد الانتظار",
      celeTitle: "اكتمل اليوم!",
      celeSub: "ما شاء الله — سلسلتك الآن {n} يومًا. واصل.",
      celePts: "+{n} نقطة",
      share: "شارك",
      shareText: "الحمد لله — أهداف Best Muslim اليومية تمت، سلسلة {n} يوم 🔥 https://bestmuslim.app",
      close: "إغلاق",
      freezeUsed: "أمس لم يكتمل — استُخدم 🧊 تجميد السلسلة. سلسلتك بأمان.",
      freezeGone: "انقطعت السلسلة. ابدأ من جديد اليوم — والله رؤوف.",
      uzurTitle: "وضع العذر",
      uzurLead: "لحالات يسقط فيها وجوب الصلاة أو يشق أداؤها. السلسلة تُوقف (لا تنقطع؛ لا يُستهلك التجميد).",
      uzurOff: "إيقاف وضع العذر",
      uzurHaid: "حيض",
      uzurNifas: "نفاس",
      uzurSakit: "مرض / عذر طبي",
      uzurSafar: "سفر",
      uzurFiqh: "عند جمهور العلماء (ومنهم الشافعية) لا تجب الصلاة على الحائض والنفساء، ولا يُقضى ما فات في تلك المدة. هذا الوضع للمساعدة في التتبع الشخصي فقط — وليس فتوى. للمرض أو السفر اتّبع الأحكام والتيسير التي تناسبك، ويُستحب سؤال معلّم موثوق.",
      save: "حفظ",
      done: "تم",
      of3: "{n}/3",
      dalil: "الدليل"
    }
  };

  var sunnahOpen = false;

  function storeGet(k, d) {
    try {
      var v = localStorage.getItem(k);
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
  function dAdd(key, n) {
    var p = key.split("-").map(Number);
    var d = new Date(p[0], p[1] - 1, p[2]);
    d.setDate(d.getDate() + n);
    return dkey(d);
  }
  function lang() {
    try {
      var v = storeGet("rk_lang", "id");
      return v === "en" || v === "ar" || v === "id" ? v : "id";
    } catch (e) {
      return "id";
    }
  }
  function t(k, vars) {
    var L = I18N[lang()] || I18N.id;
    var s = L[k] != null ? L[k] : I18N.en[k] != null ? I18N.en[k] : k;
    if (vars)
      Object.keys(vars).forEach(function (x) {
        s = String(s).replace("{" + x + "}", vars[x]);
      });
    return s;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function lx(arr) {
    var i = { id: 0, en: 1, ar: 2 }[lang()] || 0;
    return (arr && arr[i]) || (arr && arr[0]) || "";
  }

  function defaultState() {
    return {
      streak: 0,
      freezes: 0,
      freezeAwardAt: 0,
      uzur: false,
      uzurReason: null,
      calendar: {},
      lastRoll: null,
      celebrated: {},
      quran: {},
      lastQPage: null,
      lastQAyat: null,
      quranAyatProg: {},
      streakMigrated: false
    };
  }
  function state() {
    var s = storeGet(SK, null);
    if (!s || typeof s !== "object") s = defaultState();
    s.calendar = s.calendar || {};
    s.celebrated = s.celebrated || {};
    s.quran = s.quran || {};
    s.quranAyatProg = s.quranAyatProg || {};
    s.freezes = Math.max(0, Math.min(FREEZE_MAX, s.freezes | 0));
    s.streak = s.streak | 0;
    s.freezeAwardAt = s.freezeAwardAt | 0;
    return s;
  }
  function save(s) {
    storeSet(SK, s);
  }

  /** One streak: max of Target + Log Ibadah so nobody loses progress. */
  function migrateStreak(s) {
    if (s.streakMigrated) return s;
    var other = 0;
    try {
      if (window.KusyuIbadah && KusyuIbadah.stats) {
        var st = KusyuIbadah.stats();
        other = Math.max(st.streak | 0, st.best | 0);
      }
    } catch (e) {}
    s.streak = Math.max(s.streak | 0, other | 0);
    s.streakMigrated = true;
    save(s);
    return s;
  }

  function salatCount(day) {
    return (storeGet("rk_salat_" + day, []) || []).length;
  }
  function salatDone(day) {
    return salatCount(day) >= 5;
  }
  function hikmahDone(day) {
    try {
      var S = storeGet("ks_hikmah", {}) || {};
      if (S.days && S.days[day]) return true;
      if (day === dkey() && S.doneToday && (S.day === day || !S.day)) return true;
      return false;
    } catch (e) {
      return false;
    }
  }
  function quranDone(day, s) {
    s = s || state();
    if (s.quran && s.quran[day] >= 1) return true;
    if ((s.quranAyatProg && s.quranAyatProg[day]) >= QURAN_AYAT_GOAL) return true;
    return false;
  }

  function trackQuranProgress() {
    var s = state();
    var day = dkey();
    var page = storeGet("rk_q_lastpg", null);
    var last = storeGet("rk_q_last", null);
    var changed = false;
    if (page != null && s.lastQPage != null && page !== s.lastQPage) {
      s.quran[day] = (s.quran[day] | 0) + 1;
      changed = true;
    }
    if (page != null) s.lastQPage = page;
    if (last && last.s != null && last.a != null) {
      var key = last.s + ":" + last.a;
      if (s.lastQAyat && s.lastQAyat !== key) {
        if (last.ts && dkey(new Date(last.ts)) === day) {
          s.quranAyatProg[day] = (s.quranAyatProg[day] | 0) + 1;
          changed = true;
        }
      }
      s.lastQAyat = key;
    }
    if (changed) save(s);
    return s;
  }

  function goals(day, s) {
    s = s || state();
    day = day || dkey();
    var uzur = !!(s.uzur && day === dkey());
    if (s.calendar[day] === "uzur") uzur = true;
    var gSalat = uzur ? true : salatDone(day);
    var gQ = quranDone(day, s);
    var gH = hikmahDone(day);
    return {
      uzur: uzur,
      salat: gSalat,
      quran: gQ,
      hikmah: gH,
      needed: uzur ? 2 : 3,
      doneCount: (uzur ? 0 : gSalat ? 1 : 0) + (gQ ? 1 : 0) + (gH ? 1 : 0),
      all: uzur ? gQ && gH : gSalat && gQ && gH
    };
  }

  function awardFreezeIfDue(s) {
    var floors = Math.floor((s.streak | 0) / FREEZE_EVERY);
    var already = s.freezeAwardAt | 0;
    if (floors > already) {
      var gain = floors - already;
      s.freezes = Math.min(FREEZE_MAX, (s.freezes | 0) + gain);
      s.freezeAwardAt = floors;
    }
    return s;
  }

  function markFullDay(s, day) {
    if (s.calendar[day] === "full") return s;
    s.calendar[day] = "full";
    var prev = dAdd(day, -1);
    var cont = s.calendar[prev] === "full" || s.calendar[prev] === "freeze" || s.calendar[prev] === "uzur";
    if (cont || (s.streak | 0) === 0) s.streak = (s.streak | 0) + 1;
    else s.streak = 1;
    awardFreezeIfDue(s);
    return s;
  }

  function rollMisses() {
    var s = state();
    var today = dkey();
    var msgs = [];
    if (!s.lastRoll) {
      s.lastRoll = today;
      save(s);
      return msgs;
    }
    var start = dAdd(s.lastRoll, 1);
    if (start > today) return msgs;
    for (var day = start; day < today; day = dAdd(day, 1)) {
      if (s.calendar[day] === "full" || s.calendar[day] === "freeze" || s.calendar[day] === "uzur") continue;
      if (s.uzur && s.uzurSince && s.uzurSince <= day) {
        s.calendar[day] = "uzur";
        continue;
      }
      if ((s.freezes | 0) > 0) {
        s.freezes = (s.freezes | 0) - 1;
        s.calendar[day] = "freeze";
        msgs.push({ type: "freeze", day: day });
        continue;
      }
      s.calendar[day] = "miss";
      s.streak = 0;
      s.freezeAwardAt = 0;
      msgs.push({ type: "break", day: day });
    }
    s.lastRoll = today;
    save(s);
    return msgs;
  }

  function completeTodayIfReady() {
    var s = state();
    var day = dkey();
    var g = goals(day, s);
    if (s.uzur) {
      s.calendar[day] = "uzur";
      save(s);
      return { completed: false, uzur: true, g: g, s: s };
    }
    if (!g.all) return { completed: false, g: g, s: s };
    var already = s.calendar[day] === "full";
    if (!already) {
      s = markFullDay(s, day);
      save(s);
      if (!s.celebrated[day]) {
        awardPoints(PTS_DONE, "Hari ini");
        s = state();
        s.celebrated[day] = 1;
        save(s);
        return { completed: true, fresh: true, g: goals(day, s), s: s };
      }
    }
    return { completed: true, fresh: false, g: g, s: s };
  }

  function awardPoints(n, note) {
    var o = storeGet(SK_DOM, null) || { saldo: 0, poin: 0, hist: [], claimed: {}, act: {} };
    o.poin = (o.poin | 0) + n;
    o.hist = o.hist || [];
    o.hist.unshift({ ts: Date.now(), day: dkey(), pts: n, note: note || "Hari ini" });
    if (o.hist.length > 80) o.hist.length = 80;
    storeSet(SK_DOM, o);
    try {
      if (window.KusyuDompet && KusyuDompet.renderStrip) KusyuDompet.renderStrip();
      else if (window.renderStrip) renderStrip();
    } catch (e) {}
  }

  function dompetPoin() {
    try {
      if (window.KusyuDompet && KusyuDompet.st) return KusyuDompet.st().poin | 0;
    } catch (e) {}
    var o = storeGet(SK_DOM, null) || {};
    return o.poin | 0;
  }

  function showToast(msg) {
    var el = document.getElementById("bmTgToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "bmTgToast";
      el.className = "bm-tg-toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("on");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("on");
    }, 4200);
  }

  function ringSvg(pct) {
    var off = CIRC * (1 - Math.max(0, Math.min(1, pct)));
    return (
      '<svg viewBox="0 0 64 64" aria-hidden="true"><circle class="bg" cx="32" cy="32" r="26"/>' +
      '<circle class="fg" cx="32" cy="32" r="26" stroke-dasharray="' +
      CIRC.toFixed(2) +
      '" stroke-dashoffset="' +
      off.toFixed(2) +
      '"/></svg>'
    );
  }

  function ensureCard() {
    var host = document.getElementById("bmTargetHost");
    if (!host) return null;
    var card = document.getElementById("bmTargetCard");
    if (card) return card;
    card = document.createElement("div");
    card.id = "bmTargetCard";
    card.className = "bm-tg-card bm-hari-ini";
    card.setAttribute("role", "region");
    card.setAttribute("aria-label", "Hari ini");
    host.appendChild(card);
    return card;
  }

  function go(p) {
    try {
      if (typeof window.go === "function") window.go(p);
    } catch (e) {}
  }

  function sunnahItems() {
    try {
      if (window.KusyuIbadah && KusyuIbadah.ITEMS) return KusyuIbadah.ITEMS;
    } catch (e) {}
    return [];
  }
  function sunnahDay() {
    try {
      if (window.KusyuIbadah && KusyuIbadah.Log) return (KusyuIbadah.Log.all() || {})[dkey()] || {};
    } catch (e) {}
    return (storeGet("ks_ibadah_log", {}) || {})[dkey()] || {};
  }
  function toggleSunnah(k) {
    try {
      if (window.KusyuIbadah && KusyuIbadah.Log) {
        KusyuIbadah.Log.toggle(k);
        return;
      }
    } catch (e) {}
    var o = storeGet("ks_ibadah_log", {}) || {};
    var day = dkey();
    o[day] = o[day] || {};
    if (o[day][k]) delete o[day][k];
    else o[day][k] = Date.now();
    if (!Object.keys(o[day]).length) delete o[day];
    storeSet("ks_ibadah_log", o);
  }

  function renderSunnahBlock() {
    var items = sunnahItems();
    var day = sunnahDay();
    if (!items.length) return "";
    var rows = items
      .map(function (it) {
        var on = !!day[it.k];
        return (
          '<div class="bm-tg-sunnah-it' +
          (on ? " on" : "") +
          '"><button type="button" class="bm-tg-sunnah-tg" data-k="' +
          esc(it.k) +
          '" aria-pressed="' +
          (on ? "true" : "false") +
          '"><span class="ck">' +
          (on ? "✓" : "") +
          '</span><span class="nm">' +
          esc(lx(it.n)) +
          '</span><em>+' +
          (it.p | 0) +
          "</em></button>" +
          "<details><summary>" +
          esc(t("dalil")) +
          "</summary><p>" +
          esc(lx(it.d)) +
          "</p></details></div>"
        );
      })
      .join("");
    return (
      '<div class="bm-tg-sunnah' +
      (sunnahOpen ? " open" : "") +
      '">' +
      '<button type="button" class="bm-tg-sunnah-tog" id="bmTgSunnahTog">' +
      esc(sunnahOpen ? t("sunnahHide") : t("sunnahToggle")) +
      "</button>" +
      '<div class="bm-tg-sunnah-body" id="bmTgSunnahBody"' +
      (sunnahOpen ? "" : " hidden") +
      ">" +
      rows +
      "</div></div>"
    );
  }

  function render() {
    trackQuranProgress();
    var card = ensureCard();
    if (!card) return;
    var s = migrateStreak(state());
    var day = dkey();
    var g = goals(day, s);
    var need = g.uzur ? 2 : 3;
    var have = g.uzur ? (g.quran ? 1 : 0) + (g.hikmah ? 1 : 0) : (g.salat ? 1 : 0) + (g.quran ? 1 : 0) + (g.hikmah ? 1 : 0);
    var pct = need ? have / need : 0;
    var pts = dompetPoin();

    card.innerHTML =
      '<div class="bm-tg-top">' +
      '<div class="bm-tg-ring-wrap">' +
      ringSvg(pct) +
      '<div class="pct">' +
      esc(t("of3", { n: have })) +
      "</div></div>" +
      '<div class="bm-tg-head"><p class="bm-tg-ey">' +
      esc(t("ey")) +
      "</p>" +
      '<div class="bm-tg-title">' +
      esc(t("title")) +
      "</div>" +
      '<div class="bm-tg-meta">' +
      '<button type="button" class="bm-tg-streak" id="bmTgStreakBtn" title="' +
      esc(t("openCal")) +
      '">' +
      esc(t("streak", { n: s.streak | 0 })) +
      "</button>" +
      '<span class="bm-tg-freeze-pill" title="' +
      esc(t("freezeMax")) +
      '">' +
      esc(t("freeze", { n: s.freezes | 0 })) +
      "</span>" +
      '<span class="bm-tg-pts">' +
      esc(t("pts", { n: pts })) +
      "</span></div>" +
      (s.uzur ? '<p class="bm-tg-note" style="margin-top:6px;color:#9ec9e8">' + esc(t("uzurOn")) + "</p>" : "") +
      "</div></div>" +
      '<div class="bm-tg-goals">' +
      goalRow("🕌", t("gSalat"), s.uzur ? t("gSalatUzur") : t("gSalatSub"), s.uzur ? true : g.salat, s.uzur) +
      goalRow("📖", t("gQuran"), t("gQuranSub", { n: QURAN_AYAT_GOAL }), g.quran, false) +
      goalRow("✨", t("gHikmah"), t("gHikmahSub"), g.hikmah, false) +
      "</div>" +
      renderSunnahBlock() +
      '<div class="bm-tg-actions">' +
      '<button type="button" class="btn sm ghost" id="bmTgUzur">' +
      esc(t("openUzur")) +
      "</button></div>" +
      '<p class="bm-tg-guest">' +
      esc(t("guest")) +
      "</p>" +
      '<p class="bm-tg-note">' +
      esc(t("privacy")) +
      "</p>";

    var map = [
      function () {
        go("jadwal");
      },
      function () {
        go("quran");
      },
      function () {
        go("beranda");
        setTimeout(function () {
          var b = document.querySelector("#pkToday [data-hkstart], #pkToday .hk-btn, #pkToday .hk-go");
          if (b) b.click();
          else {
            var slide = document.querySelector('.v2-hero-slide[data-hi="1"]');
            if (slide) slide.scrollIntoView({ inline: "center", behavior: "smooth" });
          }
        }, 200);
      }
    ];
    card.querySelectorAll(".bm-tg-goal").forEach(function (r, i) {
      r.style.cursor = "pointer";
      r.onclick = map[i];
    });
    var stBtn = document.getElementById("bmTgStreakBtn");
    if (stBtn) stBtn.onclick = openCalendar;
    var uzBtn = document.getElementById("bmTgUzur");
    if (uzBtn) uzBtn.onclick = openUzur;
    var tog = document.getElementById("bmTgSunnahTog");
    if (tog)
      tog.onclick = function () {
        sunnahOpen = !sunnahOpen;
        render();
      };
    card.querySelectorAll(".bm-tg-sunnah-tg").forEach(function (b) {
      b.onclick = function () {
        toggleSunnah(b.getAttribute("data-k"));
        render();
      };
    });

    var res = completeTodayIfReady();
    if (res.fresh) openCelebration(res.s);
  }

  function goalRow(ic, title, sub, on, skip) {
    return (
      '<div class="bm-tg-goal' +
      (on ? " on" : "") +
      (skip ? " skip" : "") +
      '"><span class="ic">' +
      ic +
      '</span><div class="tx"><b>' +
      esc(title) +
      "</b><small>" +
      esc(sub) +
      '</small></div><span class="ck">' +
      (on ? "✓" : "") +
      "</span></div>"
    );
  }

  function ensureOv() {
    var ov = document.getElementById("bmTgOv");
    if (ov) return ov;
    ov = document.createElement("div");
    ov.id = "bmTgOv";
    ov.className = "bm-tg-ov";
    ov.innerHTML = '<div class="bm-tg-sheet" id="bmTgSheet" role="dialog" aria-modal="true"></div>';
    ov.addEventListener("click", function (e) {
      if (e.target === ov) closeOv();
    });
    document.body.appendChild(ov);
    return ov;
  }
  function closeOv() {
    var ov = document.getElementById("bmTgOv");
    if (ov) ov.classList.remove("on");
  }
  function openOv(html) {
    var ov = ensureOv();
    var sh = document.getElementById("bmTgSheet");
    sh.innerHTML = html;
    ov.classList.add("on");
    var x = sh.querySelector(".bm-tg-x");
    if (x) x.onclick = closeOv;
  }

  function openCalendar() {
    var s = state();
    var cells = "";
    for (var i = 27; i >= 0; i--) {
      var day = dAdd(dkey(), -i);
      var st = s.calendar[day];
      var em = st === "full" ? "🔥" : st === "freeze" ? "🧊" : st === "uzur" ? "🌙" : "·";
      var lab = day.slice(8);
      cells +=
        '<div class="d' +
        (day === dkey() ? " today" : "") +
        '" title="' +
        esc(day) +
        '"><span class="em">' +
        em +
        "</span><span>" +
        esc(lab) +
        "</span></div>";
    }
    openOv(
      '<button type="button" class="bm-tg-x" aria-label="' +
        esc(t("close")) +
        '">×</button>' +
        "<h3>" +
        esc(t("calTitle")) +
        "</h3>" +
        '<p class="lead">' +
        esc(t("calLead")) +
        "</p>" +
        '<div class="bm-tg-legend"><span>🔥 ' +
        esc(t("done")) +
        "</span><span>🧊 Pembeku</span><span>🌙 Uzur</span></div>" +
        '<div class="bm-tg-cal">' +
        cells +
        "</div>" +
        '<button type="button" class="btn gold" id="bmTgCalClose">' +
        esc(t("close")) +
        "</button>"
    );
    var c = document.getElementById("bmTgCalClose");
    if (c) c.onclick = closeOv;
  }

  function openUzur() {
    var s = state();
    var reasons = [
      ["haid", t("uzurHaid")],
      ["nifas", t("uzurNifas")],
      ["sakit", t("uzurSakit")],
      ["safar", t("uzurSafar")]
    ];
    var opts = reasons
      .map(function (r) {
        var on = s.uzur && s.uzurReason === r[0];
        return (
          '<label class="' +
          (on ? "on" : "") +
          '"><input type="radio" name="bmTgUzurR" value="' +
          r[0] +
          '"' +
          (on ? " checked" : "") +
          "/><span><b>" +
          esc(r[1]) +
          "</b></span></label>"
        );
      })
      .join("");
    openOv(
      '<button type="button" class="bm-tg-x">×</button>' +
        "<h3>" +
        esc(t("uzurTitle")) +
        "</h3>" +
        '<p class="lead">' +
        esc(t("uzurLead")) +
        "</p>" +
        '<div class="bm-tg-uzur-opts" id="bmTgUzurOpts">' +
        opts +
        "</div>" +
        '<div class="bm-tg-fiqh">' +
        esc(t("uzurFiqh")) +
        "</div>" +
        '<div class="bm-tg-actions">' +
        '<button type="button" class="btn gold" id="bmTgUzurSave">' +
        esc(t("save")) +
        "</button>" +
        '<button type="button" class="btn ghost" id="bmTgUzurOff">' +
        esc(t("uzurOff")) +
        "</button></div>"
    );
    var box = document.getElementById("bmTgUzurOpts");
    if (box) {
      box.querySelectorAll("label").forEach(function (lab) {
        lab.onclick = function () {
          box.querySelectorAll("label").forEach(function (x) {
            x.classList.remove("on");
          });
          lab.classList.add("on");
          lab.querySelector("input").checked = true;
        };
      });
    }
    document.getElementById("bmTgUzurSave").onclick = function () {
      var pick = document.querySelector('input[name="bmTgUzurR"]:checked');
      var st = state();
      if (pick) {
        st.uzur = true;
        st.uzurReason = pick.value;
        st.uzurSince = st.uzurSince || dkey();
        st.calendar[dkey()] = "uzur";
      }
      save(st);
      closeOv();
      render();
    };
    document.getElementById("bmTgUzurOff").onclick = function () {
      var st = state();
      st.uzur = false;
      st.uzurReason = null;
      st.uzurSince = null;
      if (st.calendar[dkey()] === "uzur") delete st.calendar[dkey()];
      save(st);
      closeOv();
      render();
    };
  }

  function openCelebration(s) {
    s = s || state();
    openOv(
      '<button type="button" class="bm-tg-x">×</button>' +
        '<div class="bm-tg-cele" id="bmTgCele">' +
        '<div class="big">🔥</div>' +
        "<h3>" +
        esc(t("celeTitle")) +
        "</h3>" +
        '<p class="lead">' +
        esc(t("celeSub", { n: s.streak | 0 })) +
        "</p>" +
        '<div class="pts">' +
        esc(t("celePts", { n: PTS_DONE })) +
        "</div>" +
        '<div class="bm-tg-actions">' +
        '<button type="button" class="btn gold" id="bmTgShare">' +
        esc(t("share")) +
        "</button>" +
        '<button type="button" class="btn ghost" id="bmTgCeleClose">' +
        esc(t("close")) +
        "</button></div></div>"
    );
    document.getElementById("bmTgCeleClose").onclick = closeOv;
    document.getElementById("bmTgShare").onclick = function () {
      var text = t("shareText", { n: s.streak | 0 });
      if (navigator.share) {
        navigator.share({ text: text }).catch(function () {
          copyShare(text);
        });
      } else copyShare(text);
    };
  }
  function copyShare(text) {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {}
  }

  function seedDemo(mode) {
    var today = dkey();
    var s = defaultState();
    s.lastRoll = today;
    s.streak = 12;
    s.freezes = 1;
    s.freezeAwardAt = 1;
    s.streakMigrated = true;
    for (var i = 1; i <= 12; i++) s.calendar[dAdd(today, -i)] = "full";
    s.calendar[dAdd(today, -5)] = "freeze";
    s.calendar[dAdd(today, -8)] = "uzur";
    sunnahOpen = mode === "sunnah-open" || mode === "sunnah";

    var log = {};
    for (var j = 1; j < 5; j++) {
      log[dAdd(today, -j)] = { jamaah: 1, rawatib: 1 };
    }

    if (mode === "done" || mode === "cele") {
      storeSet("rk_salat_" + today, ["fajr", "dhuhr", "asr", "maghrib", "isha"]);
      storeSet("ks_hikmah", {
        day: today,
        doneToday: true,
        days: (function () {
          var o = {};
          o[today] = 1;
          return o;
        })()
      });
      s.quran[today] = 1;
      s.celebrated = {};
      delete s.calendar[today];
      log[today] = { jamaah: Date.now(), rawatib: Date.now(), dhuha: Date.now(), tahajjud: Date.now() };
      storeSet(SK_DOM, { saldo: 0, poin: 148, hist: [], claimed: {}, act: {} });
    } else if (mode === "sunnah-open" || mode === "sunnah") {
      storeSet("rk_salat_" + today, ["fajr", "dhuhr", "asr", "maghrib"]);
      storeSet("ks_hikmah", {
        day: today,
        doneToday: true,
        days: (function () {
          var o = {};
          o[today] = 1;
          return o;
        })()
      });
      s.quran = {};
      log[today] = { jamaah: Date.now(), rawatib: Date.now() };
      storeSet(SK_DOM, { saldo: 0, poin: 86, hist: [], claimed: {}, act: {} });
    } else {
      // collapsed / beranda
      storeSet("rk_salat_" + today, ["fajr", "dhuhr", "asr", "maghrib"]);
      storeSet("ks_hikmah", {
        day: today,
        doneToday: true,
        days: (function () {
          var o = {};
          o[today] = 1;
          return o;
        })()
      });
      s.quran = {};
      log[today] = { jamaah: Date.now() };
      storeSet(SK_DOM, { saldo: 0, poin: 72, hist: [], claimed: {}, act: {} });
    }
    storeSet("ks_ibadah_log", log);
    save(s);
    storeSet("rk_lang", "id");
    storeSet("rk_loc", { lat: -7.98, lng: 112.63, name: "Malang", cc: "id" });
    return s;
  }

  /** Native notif action: mark prayer done respecting time-lock (RKPT.canCheck). */
  function markSalatFromNotif(prayer, day) {
    day = day || dkey();
    prayer = String(prayer || "").toLowerCase();
    var map = { subuh: "fajr", fajr: "fajr", dzuhur: "dhuhr", dhuhr: "dhuhr", ashar: "asr", asr: "asr", maghrib: "maghrib", isya: "isha", isha: "isha" };
    var n = map[prayer] || prayer;
    if (["fajr", "dhuhr", "asr", "maghrib", "isha"].indexOf(n) < 0) return { ok: false, reason: "bad_prayer" };
    try {
      if (window.RKPT && typeof RKPT.canCheck === "function") {
        var [y, m, dd] = day.split("-").map(Number);
        var d = new Date(y, m - 1, dd);
        if (!RKPT.canCheck(n, d)) return { ok: false, reason: "locked" };
      }
    } catch (e) {}
    var k = "rk_salat_" + day;
    var arr = storeGet(k, []) || [];
    var set = {};
    arr.forEach(function (x) {
      set[x] = 1;
    });
    if (set[n]) return { ok: true, already: true, prayer: n };
    arr.push(n);
    storeSet(k, arr);
    try {
      document.dispatchEvent(new CustomEvent("rk:salat-check", { detail: { n: n, day: day, source: "notif" } }));
    } catch (e) {}
    render();
    return { ok: true, prayer: n };
  }

  function boot() {
    var demo = null;
    try {
      var q = new URLSearchParams(location.search || "");
      demo = q.get("bm_target_demo") || q.get("bm_hari_demo");
      if (!demo && storeGet("rk_target_demo", null)) demo = storeGet("rk_target_demo", null);
    } catch (e) {}
    if (demo) seedDemo(demo === "1" ? "beranda" : demo);

    migrateStreak(state());
    var msgs = rollMisses();
    msgs.forEach(function (m) {
      if (m.type === "freeze") showToast(t("freezeUsed"));
      else if (m.type === "break") showToast(t("freezeGone"));
    });

    render();
    document.addEventListener("rk:salat-check", function () {
      setTimeout(render, 50);
    });
    document.addEventListener("rk:ibadah", function () {
      setTimeout(render, 50);
    });
    window.addEventListener("storage", function () {
      setTimeout(render, 80);
    });
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        rollMisses();
        render();
      }
    });
    setInterval(function () {
      if (!document.getElementById("page-beranda") || !document.getElementById("page-beranda").classList.contains("on")) return;
      render();
    }, 4000);

    var _go = window.go;
    if (typeof _go === "function" && !window.go._bmTg) {
      window.go = function (p) {
        _go.apply(this, arguments);
        if (p === "beranda") setTimeout(render, 100);
      };
      window.go._bmTg = 1;
    }
  }

  window.BmTargetHarian = {
    render: render,
    seedDemo: seedDemo,
    state: state,
    goals: goals,
    openCalendar: openCalendar,
    openUzur: openUzur,
    openCelebration: openCelebration,
    showToast: showToast,
    rollMisses: rollMisses,
    completeTodayIfReady: completeTodayIfReady,
    markSalatFromNotif: markSalatFromNotif,
    setSunnahOpen: function (v) {
      sunnahOpen = !!v;
      render();
    }
  };
  window.BmHariIni = window.BmTargetHarian;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
