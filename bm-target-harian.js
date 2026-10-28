/*! Best Muslim v82 — Hari ini: 2 required (Sholat+Hikmah) + optional Qur'an Bonus.
 * Reuses: rk_salat_*, ks_hikmah, rk_q_last/rk_q_lastpg, rk_dompet, ks_ibadah_log, rk_target_harian.
 * Privacy-first: localStorage only. ID/EN/AR. Gold Best Muslim.
 * Mushaf Madinah 604 pages via quran/meta.json (Tanzil).
 */
(function () {
  "use strict";
  var SK = "rk_target_harian";
  var SK_DOM = "rk_dompet";
  var PTS_DONE = 25;
  var FREEZE_MAX = 2;
  var FREEZE_EVERY = 7;
  var CIRC = 2 * Math.PI * 26;
  var PAGES_PER_JUZ = 604 / 30; /* Madinah ≈ 20.133 */
  var META = null;
  var META_P = null; /* promise */
  var qDoneToastShown = {};

  var PRESETS = [
    { amount: 1, unit: "ayat" },
    { amount: 10, unit: "ayat" },
    { amount: 1, unit: "halaman" },
    { amount: 2, unit: "halaman" },
    { amount: 0.5, unit: "juz" },
    { amount: 1, unit: "juz" }
  ];

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
      gQuran: "Baca {label} Qur'an",
      gQuranSub: "Ketuk untuk baca · Ubah target lewat ✏️",
      gQuranProg: "{have}/{need} {unit}",
      bonus: "Bonus",
      bonusSub: "Opsional — tidak memengaruhi streak",
      addQuran: "+ Target Qur'an",
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
      ofNeed: "{n}/{m}",
      dalil: "Dalil",
      qPickTitle: "Target Qur'an harian",
      qPickLead: "Pilih berapa yang ingin Anda baca setiap hari. Boleh diubah kapan saja.",
      qPickSkip: "Lewati (pakai 1 halaman)",
      qPickCustom: "Custom",
      qPickAmt: "Jumlah",
      qUnitAyat: "ayat",
      qUnitHalaman: "halaman",
      qUnitJuz: "juz",
      qEdit: "Ubah",
      qProgBar: "{have}/{need} {unit}",
      qDoneTitle: "Target Qur'an hari ini tercapai ✓",
      qDoneSub: "Alhamdulillah — target {label} selesai.",
      qBackHome: "Kembali ke Beranda",
      qKeepReading: "Lanjut baca",
      qSetTitle: "Target Qur'an harian",
      qSetLead: "Bonus opsional di kartu Hari ini (tidak memengaruhi streak). Progres hari ini dihitung ulang sesuai target baru.",
      qHalf: "½ juz",
      qLabelAyat: "{n} ayat",
      qLabelHalaman: "{n} halaman",
      qLabelJuz: "{n} juz",
      qLabelHalfJuz: "½ juz"
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
      gQuran: "Read {label} of Qur'an",
      gQuranSub: "Tap to read · Change target via ✏️",
      gQuranProg: "{have}/{need} {unit}",
      bonus: "Bonus",
      bonusSub: "Optional — does not affect streak",
      addQuran: "+ Qur'an target",
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
      ofNeed: "{n}/{m}",
      dalil: "Evidence",
      qPickTitle: "Daily Qur'an target",
      qPickLead: "Choose how much you want to read each day. You can change it anytime.",
      qPickSkip: "Skip (use 1 page)",
      qPickCustom: "Custom",
      qPickAmt: "Amount",
      qUnitAyat: "verses",
      qUnitHalaman: "pages",
      qUnitJuz: "juz",
      qEdit: "Edit",
      qProgBar: "{have}/{need} {unit}",
      qDoneTitle: "Today's Qur'an target reached ✓",
      qDoneSub: "Alhamdulillah — {label} target done.",
      qBackHome: "Back to Home",
      qKeepReading: "Keep reading",
      qSetTitle: "Daily Qur'an target",
      qSetLead: "Optional bonus on Today (does not affect streak). Today's progress re-checks against the new target.",
      qHalf: "½ juz",
      qLabelAyat: "{n} verses",
      qLabelHalaman: "{n} pages",
      qLabelJuz: "{n} juz",
      qLabelHalfJuz: "½ juz"
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
      gQuran: "قراءة {label} من القرآن",
      gQuranSub: "انقر للقراءة · غيّر الهدف عبر ✏️",
      gQuranProg: "{have}/{need} {unit}",
      bonus: "مكافأة",
      bonusSub: "اختياري — لا يؤثر على السلسلة",
      addQuran: "+ هدف القرآن",
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
      ofNeed: "{n}/{m}",
      dalil: "الدليل",
      qPickTitle: "هدف القرآن اليومي",
      qPickLead: "اختر مقدار قراءتك كل يوم. يمكنك تغييره في أي وقت.",
      qPickSkip: "تخطَّ (صفحة واحدة)",
      qPickCustom: "مخصص",
      qPickAmt: "العدد",
      qUnitAyat: "آيات",
      qUnitHalaman: "صفحات",
      qUnitJuz: "أجزاء",
      qEdit: "تعديل",
      qProgBar: "{have}/{need} {unit}",
      qDoneTitle: "تحقق هدف القرآن اليوم ✓",
      qDoneSub: "الحمد لله — اكتمل هدف {label}.",
      qBackHome: "العودة إلى الرئيسية",
      qKeepReading: "متابعة القراءة",
      qSetTitle: "هدف القرآن اليومي",
      qSetLead: "مكافأة اختيارية في بطاقة اليوم (لا تؤثر على السلسلة). يُعاد احتساب تقدّم اليوم وفق الهدف الجديد.",
      qHalf: "نصف جزء",
      qLabelAyat: "{n} آيات",
      qLabelHalaman: "{n} صفحات",
      qLabelJuz: "{n} أجزاء",
      qLabelHalfJuz: "نصف جزء"
    }
  };

  var sunnahOpen = false;
  var readerHooked = false;

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
        s = String(s).replace(new RegExp("\\{" + x + "\\}", "g"), vars[x]);
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
  function fmtNum(n) {
    n = +n;
    if (!isFinite(n)) return "0";
    if (Math.abs(n - 0.5) < 0.001) return lang() === "ar" ? "½" : "½";
    if (Math.floor(n) === n) return String(n);
    return String(Math.round(n * 100) / 100);
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
      quranProg: {},
      quranTarget: { amount: 1, unit: "halaman" },
      quranTargetSet: false,
      quranDoneToast: {},
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
    s.quranProg = s.quranProg || {};
    s.quranDoneToast = s.quranDoneToast || {};
    if (!s.quranTarget || typeof s.quranTarget !== "object") s.quranTarget = { amount: 1, unit: "halaman" };
    var u = s.quranTarget.unit;
    if (u !== "ayat" && u !== "halaman" && u !== "juz") s.quranTarget.unit = "halaman";
    s.quranTarget.amount = Math.max(0.01, +s.quranTarget.amount || 1);
    s.freezes = Math.max(0, Math.min(FREEZE_MAX, s.freezes | 0));
    s.streak = s.streak | 0;
    s.freezeAwardAt = s.freezeAwardAt | 0;
    return s;
  }
  function save(s) {
    storeSet(SK, s);
  }

  function getTarget(s) {
    s = s || state();
    return { amount: +s.quranTarget.amount || 1, unit: s.quranTarget.unit || "halaman" };
  }
  function setTarget(amount, unit, opts) {
    opts = opts || {};
    var s = state();
    unit = unit === "ayat" || unit === "halaman" || unit === "juz" ? unit : "halaman";
    amount = Math.max(0.01, Math.min(unit === "juz" ? 30 : unit === "halaman" ? 604 : 6236, +amount || 1));
    if (unit === "juz" && Math.abs(amount - 0.5) < 0.001) amount = 0.5;
    s.quranTarget = { amount: amount, unit: unit };
    if (opts.markSet !== false) s.quranTargetSet = true;
    save(s);
    /* Re-evaluate done against existing progress — mid-day change OK */
    trackQuranProgress(true);
    render();
    renderSettingsCard();
    updateReaderBar();
    return s.quranTarget;
  }

  function unitWord(unit) {
    if (unit === "ayat") return t("qUnitAyat");
    if (unit === "juz") return t("qUnitJuz");
    return t("qUnitHalaman");
  }
  function targetLabel(tg) {
    tg = tg || getTarget();
    if (tg.unit === "juz" && Math.abs(tg.amount - 0.5) < 0.001) return t("qLabelHalfJuz");
    if (tg.unit === "ayat") return t("qLabelAyat", { n: fmtNum(tg.amount) });
    if (tg.unit === "juz") return t("qLabelJuz", { n: fmtNum(tg.amount) });
    return t("qLabelHalaman", { n: fmtNum(tg.amount) });
  }
  function goalQuranTitle(tg) {
    return t("gQuran", { label: targetLabel(tg) });
  }

  function loadMeta() {
    if (META) return Promise.resolve(META);
    if (META_P) return META_P;
    META_P = fetch("quran/meta.json")
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (m) {
        META = m;
        return m;
      })
      .catch(function (e) {
        META_P = null;
        console.warn("[BmTarget] quran/meta.json missing — page/juz mapping limited", e);
        return null;
      });
    return META_P;
  }
  function findIdx(arr, s, a) {
    if (!arr || !arr.length) return 0;
    var lo = 0,
      hi = arr.length - 1,
      ans = 0;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      var x = arr[mid];
      if (x[0] < s || (x[0] === s && x[1] <= a)) {
        ans = mid;
        lo = mid + 1;
      } else hi = mid - 1;
    }
    return ans;
  }
  function pageOf(s, a) {
    try {
      if (window.RKQuran && typeof RKQuran.pos === "function") {
        var p = RKQuran.pos(s, a);
        if (p && p.page) return p.page;
      }
    } catch (e) {}
    if (!META || !META.p) return null;
    return findIdx(META.p, +s, +a) + 1;
  }

  function dayProg(s, day) {
    s = s || state();
    day = day || dkey();
    s.quranProg = s.quranProg || {};
    if (!s.quranProg[day] || typeof s.quranProg[day] !== "object") {
      s.quranProg[day] = { ayat: {}, pages: {} };
    }
    s.quranProg[day].ayat = s.quranProg[day].ayat || {};
    s.quranProg[day].pages = s.quranProg[day].pages || {};
    return s.quranProg[day];
  }
  function progressAmount(s, day) {
    s = s || state();
    day = day || dkey();
    var tg = getTarget(s);
    var p = dayProg(s, day);
    var ayatN = Object.keys(p.ayat).length;
    var pageN = Object.keys(p.pages).length;
    /* Legacy bridge */
    if (!ayatN && (s.quranAyatProg[day] | 0) > 0) ayatN = s.quranAyatProg[day] | 0;
    if (!pageN && (s.quran[day] | 0) > 0 && tg.unit === "halaman") pageN = s.quran[day] | 0;
    if (tg.unit === "ayat") return ayatN;
    if (tg.unit === "juz") return pageN / PAGES_PER_JUZ;
    return pageN;
  }
  function progressNeed(s) {
    return getTarget(s).amount;
  }
  function progressHaveDisplay(s, day) {
    var tg = getTarget(s);
    var have = progressAmount(s, day);
    if (tg.unit === "juz") return Math.round(have * 100) / 100;
    return Math.floor(have);
  }

  function quranDone(day, s) {
    s = s || state();
    day = day || dkey();
    if (s.quran && s.quran[day] >= 1) return true;
    var need = progressNeed(s);
    var have = progressAmount(s, day);
    return have + 1e-9 >= need;
  }

  function markQuranDone(s, day) {
    s = s || state();
    day = day || dkey();
    if (!(s.quran[day] >= 1)) {
      s.quran[day] = 1;
      save(s);
    }
    return s;
  }

  function trackQuranProgress(forceEval) {
    var s = state();
    var day = dkey();
    var page = storeGet("rk_q_lastpg", null);
    var last = storeGet("rk_q_last", null);
    var p = dayProg(s, day);
    var changed = false;

    if (last && last.s != null && last.a != null) {
      var key = last.s + ":" + last.a;
      var sameDay = !last.ts || dkey(new Date(last.ts)) === day;
      if (sameDay) {
        if (!p.ayat[key]) {
          p.ayat[key] = 1;
          changed = true;
        }
        var pg = pageOf(last.s, last.a);
        if (pg != null && !p.pages[pg]) {
          p.pages[pg] = 1;
          changed = true;
        }
      }
      s.lastQAyat = key;
    }
    if (page != null) {
      page = Math.max(1, Math.min(604, +page || 1));
      if (!p.pages[page]) {
        p.pages[page] = 1;
        changed = true;
      }
      /* If META knows page start ayah, count that ayah too */
      if (META && META.p && META.p[page - 1]) {
        var st = META.p[page - 1];
        var ak = st[0] + ":" + st[1];
        if (!p.ayat[ak]) {
          p.ayat[ak] = 1;
          changed = true;
        }
      }
      s.lastQPage = page;
    }
    s.quranProg[day] = p;
    if (changed || forceEval) {
      if (quranDone(day, s)) markQuranDone(s, day);
      else save(s);
    }
    return s;
  }

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

  function goals(day, s) {
    s = s || state();
    day = day || dkey();
    var uzur = !!(s.uzur && day === dkey());
    if (s.calendar[day] === "uzur") uzur = true;
    var gSalat = uzur ? true : salatDone(day);
    var gQ = quranDone(day, s);
    var gH = hikmahDone(day);
    /* Required: Sholat + Hikmah only. Qur'an is optional bonus (does not affect streak). */
    return {
      uzur: uzur,
      salat: gSalat,
      quran: gQ,
      hikmah: gH,
      bonus: gQ,
      needed: uzur ? 1 : 2,
      doneCount: (uzur ? 0 : gSalat ? 1 : 0) + (gH ? 1 : 0),
      all: uzur ? !!gH : !!(gSalat && gH)
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
    if (s.lastRoll === today) return msgs;
    var d = s.lastRoll;
    while (d !== today) {
      d = dAdd(d, 1);
      if (d === today) break;
      if (s.calendar[d] === "full" || s.calendar[d] === "freeze" || s.calendar[d] === "uzur") continue;
      var wasUzur = s.uzur && s.uzurSince && s.uzurSince <= d;
      if (wasUzur) {
        s.calendar[d] = "uzur";
        continue;
      }
      if ((s.freezes | 0) > 0) {
        s.freezes = (s.freezes | 0) - 1;
        s.calendar[d] = "freeze";
        msgs.push({ type: "freeze", day: d });
      } else {
        s.streak = 0;
        s.freezeAwardAt = 0;
        msgs.push({ type: "break", day: d });
      }
    }
    s.lastRoll = today;
    save(s);
    return msgs;
  }

  function dompetPoin() {
    try {
      var d = storeGet(SK_DOM, {}) || {};
      return d.poin | 0;
    } catch (e) {
      return 0;
    }
  }
  function addDompetPts(n) {
    var d = storeGet(SK_DOM, null) || { saldo: 0, poin: 0, hist: [], claimed: {}, act: {} };
    d.poin = (d.poin | 0) + (n | 0);
    storeSet(SK_DOM, d);
    return d.poin | 0;
  }

  function completeTodayIfReady() {
    var s = state();
    var day = dkey();
    var g = goals(day, s);
    if (!g.all) return { completed: false, fresh: false, g: g, s: s };
    if (s.calendar[day] === "full") return { completed: true, fresh: false, g: g, s: s };
    var fresh = !s.celebrated[day];
    markFullDay(s, day);
    if (fresh) {
      s.celebrated[day] = 1;
      addDompetPts(PTS_DONE);
    }
    save(s);
    return { completed: true, fresh: fresh, g: goals(day, s), s: s };
  }

  function ringSvg(pct) {
    var off = CIRC * (1 - Math.max(0, Math.min(1, pct)));
    return (
      '<svg viewBox="0 0 64 64" aria-hidden="true"><circle class="bg" cx="32" cy="32" r="26"/><circle class="fg" cx="32" cy="32" r="26" stroke-dasharray="' +
      CIRC.toFixed(2) +
      '" stroke-dashoffset="' +
      off.toFixed(2) +
      '"/></svg>'
    );
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

  function renderSunnahBlock(opts) {
    opts = opts || {};
    var items = sunnahItems();
    var day = sunnahDay();
    var addQ =
      opts.addQuran
        ? '<button type="button" class="bm-tg-addq" id="bmTgAddQuran">' + esc(t("addQuran")) + "</button>"
        : "";
    if (!items.length && !addQ) return "";
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
    var tog = items.length
      ? '<button type="button" class="bm-tg-sunnah-tog" id="bmTgSunnahTog">' +
        esc(sunnahOpen ? t("sunnahHide") : t("sunnahToggle")) +
        "</button>"
      : "";
    var body = items.length
      ? '<div class="bm-tg-sunnah-body" id="bmTgSunnahBody"' +
        (sunnahOpen ? "" : " hidden") +
        ">" +
        rows +
        "</div>"
      : "";
    return (
      '<div class="bm-tg-sunnah' +
      (sunnahOpen ? " open" : "") +
      '">' +
      tog +
      addQ +
      body +
      "</div>"
    );
  }

  function goalRow(ic, title, sub, on, skip, extra, cls) {
    extra = extra || "";
    cls = cls || "";
    return (
      '<div class="bm-tg-goal' +
      (on ? " on" : "") +
      (skip ? " skip" : "") +
      (cls ? " " + cls : "") +
      '"><span class="ic">' +
      ic +
      '</span><div class="tx"><b>' +
      esc(title) +
      "</b><small>" +
      esc(sub) +
      "</small></div>" +
      extra +
      '<span class="ck">' +
      (on ? "✓" : "") +
      "</span></div>"
    );
  }

  function openQuranReader() {
    loadMeta().then(function () {
      try {
        sessionStorage.setItem("rk_nav_mushaf", "1");
      } catch (e) {}
      go("mushaf");
      var last = storeGet("rk_q_last", null);
      var pg = storeGet("rk_q_lastpg", null);
      var tries = 0;
      function attempt() {
        tries++;
        var Q = window.RKQuran;
        if (!Q && tries < 20) {
          setTimeout(attempt, 80);
          return;
        }
        try {
          if (Q && typeof Q.openPage === "function" && pg) {
            Q.openPage(+pg);
          } else if (Q && typeof Q.open === "function") {
            if (last && last.s) Q.open(last.s, last.a || 1);
            else Q.open(1, 1);
          }
        } catch (e) {}
        ensureReaderBar();
        updateReaderBar();
        maybeShowQuranDone();
      }
      setTimeout(attempt, 120);
    });
  }

  function ensureReaderBar() {
    var r = document.getElementById("qReader");
    if (!r) return null;
    var bar = document.getElementById("bmQProgBar");
    if (bar) return bar;
    bar = document.createElement("div");
    bar.id = "bmQProgBar";
    bar.className = "bm-q-prog";
    bar.innerHTML =
      '<div class="bm-q-prog-tx" id="bmQProgTx"></div><div class="bm-q-prog-track"><i id="bmQProgFg"></i></div>';
    var qbar = r.querySelector(".q-bar");
    if (qbar && qbar.nextSibling) r.insertBefore(bar, qbar.nextSibling);
    else r.insertBefore(bar, r.firstChild);
    return bar;
  }
  function updateReaderBar() {
    var bar = document.getElementById("bmQProgBar");
    var r = document.getElementById("qReader");
    if (!r || r.hidden) {
      if (bar) bar.hidden = true;
      return;
    }
    bar = ensureReaderBar();
    if (!bar) return;
    bar.hidden = false;
    trackQuranProgress();
    var s = state();
    var tg = getTarget(s);
    var have = progressHaveDisplay(s);
    var need = tg.amount;
    var pct = Math.max(0, Math.min(1, progressAmount(s) / need));
    var tx = document.getElementById("bmQProgTx");
    var fg = document.getElementById("bmQProgFg");
    if (tx)
      tx.textContent = t("qProgBar", {
        have: fmtNum(have),
        need: fmtNum(need),
        unit: unitWord(tg.unit)
      });
    if (fg) fg.style.width = (pct * 100).toFixed(1) + "%";
    bar.classList.toggle("done", quranDone(dkey(), s));
    maybeShowQuranDone();
  }
  function maybeShowQuranDone() {
    var s = state();
    var day = dkey();
    if (!quranDone(day, s)) return;
    markQuranDone(s, day);
    if (s.quranDoneToast[day] || qDoneToastShown[day]) return;
    var r = document.getElementById("qReader");
    if (!r || r.hidden) return;
    qDoneToastShown[day] = 1;
    s.quranDoneToast[day] = 1;
    save(s);
    openQuranDoneSheet();
    try {
      if (window.BmGrowth && BmGrowth.onQuranTargetReached) {
        setTimeout(function () {
          BmGrowth.onQuranTargetReached({ label: targetLabel() });
        }, 1200);
      }
    } catch (e) {}
    setTimeout(function () {
      render();
    }, 80);
  }
  function openQuranDoneSheet() {
    var lab = targetLabel();
    openOv(
      '<button type="button" class="bm-tg-x">×</button>' +
        '<div class="bm-tg-cele" id="bmQDone">' +
        '<div class="big">📖</div>' +
        "<h3>" +
        esc(t("qDoneTitle")) +
        "</h3>" +
        '<p class="lead">' +
        esc(t("qDoneSub", { label: lab })) +
        "</p>" +
        '<div class="bm-tg-actions">' +
        '<button type="button" class="btn gold" id="bmQBackHome">' +
        esc(t("qBackHome")) +
        "</button>" +
        '<button type="button" class="btn ghost" id="bmQKeep">' +
        esc(t("qKeepReading")) +
        "</button></div></div>"
    );
    var bh = document.getElementById("bmQBackHome");
    if (bh)
      bh.onclick = function () {
        closeOv();
        try {
          if (window.RKQuran && RKQuran.close) RKQuran.close();
        } catch (e) {}
        go("beranda");
        setTimeout(render, 120);
      };
    var kp = document.getElementById("bmQKeep");
    if (kp) kp.onclick = closeOv;
  }

  function openTargetPicker(opts) {
    opts = opts || {};
    var s = state();
    var tg = getTarget(s);
    var presetBtns = PRESETS.map(function (p, i) {
      var on =
        p.unit === tg.unit &&
        Math.abs(+p.amount - +tg.amount) < 0.001 &&
        !opts.forceCustom;
      var lab =
        p.unit === "juz" && p.amount === 0.5
          ? t("qHalf")
          : fmtNum(p.amount) + " " + unitWord(p.unit);
      return (
        '<button type="button" class="bm-q-preset' +
        (on ? " on" : "") +
        '" data-i="' +
        i +
        '">' +
        esc(lab) +
        "</button>"
      );
    }).join("");
    openOv(
      '<button type="button" class="bm-tg-x">×</button>' +
        "<h3>" +
        esc(t("qPickTitle")) +
        "</h3>" +
        '<p class="lead">' +
        esc(t("qPickLead")) +
        "</p>" +
        '<div class="bm-q-presets" id="bmQPresets">' +
        presetBtns +
        "</div>" +
        '<div class="bm-q-custom">' +
        "<label><span>" +
        esc(t("qPickCustom")) +
        "</span></label>" +
        '<div class="bm-q-custom-row">' +
        '<input type="number" id="bmQAmt" min="0.5" step="0.5" inputmode="decimal" value="' +
        esc(fmtNum(tg.amount)) +
        '" aria-label="' +
        esc(t("qPickAmt")) +
        '"/>' +
        '<select id="bmQUnit" aria-label="unit">' +
        '<option value="ayat"' +
        (tg.unit === "ayat" ? " selected" : "") +
        ">" +
        esc(t("qUnitAyat")) +
        "</option>" +
        '<option value="halaman"' +
        (tg.unit === "halaman" ? " selected" : "") +
        ">" +
        esc(t("qUnitHalaman")) +
        "</option>" +
        '<option value="juz"' +
        (tg.unit === "juz" ? " selected" : "") +
        ">" +
        esc(t("qUnitJuz")) +
        "</option></select></div></div>" +
        '<div class="bm-tg-actions">' +
        '<button type="button" class="btn gold" id="bmQSave">' +
        esc(t("save")) +
        "</button>" +
        (opts.allowSkip
          ? '<button type="button" class="btn ghost" id="bmQSkip">' + esc(t("qPickSkip")) + "</button>"
          : '<button type="button" class="btn ghost" id="bmQCancel">' + esc(t("close")) + "</button>") +
        "</div>"
    );
    var box = document.getElementById("bmQPresets");
    if (box) {
      box.querySelectorAll(".bm-q-preset").forEach(function (b) {
        b.onclick = function () {
          var p = PRESETS[+b.getAttribute("data-i")];
          var amt = document.getElementById("bmQAmt");
          var unt = document.getElementById("bmQUnit");
          if (amt) amt.value = p.amount;
          if (unt) unt.value = p.unit;
          box.querySelectorAll(".bm-q-preset").forEach(function (x) {
            x.classList.toggle("on", x === b);
          });
        };
      });
    }
    var saveBtn = document.getElementById("bmQSave");
    if (saveBtn)
      saveBtn.onclick = function () {
        var amt = parseFloat((document.getElementById("bmQAmt") || {}).value) || 1;
        var unt = (document.getElementById("bmQUnit") || {}).value || "halaman";
        setTarget(amt, unt);
        closeOv();
      };
    var skip = document.getElementById("bmQSkip");
    if (skip)
      skip.onclick = function () {
        setTarget(1, "halaman");
        closeOv();
      };
    var cancel = document.getElementById("bmQCancel");
    if (cancel) cancel.onclick = closeOv;
  }

  function renderSettingsCard() {
    var stack = document.getElementById("stStack");
    if (!stack) return;
    var card = document.getElementById("bmQTargetSettings");
    if (!card) {
      card = document.createElement("div");
      card.id = "bmQTargetSettings";
      card.className = "card";
      var loc = stack.querySelector('[data-v="location"]');
      var hostCard = loc && loc.closest ? loc.closest(".card") : null;
      if (hostCard && hostCard.nextSibling) stack.insertBefore(card, hostCard.nextSibling);
      else stack.appendChild(card);
    }
    var tg = getTarget();
    card.innerHTML =
      '<div class="eyebrow">' +
      esc(t("qSetTitle")) +
      "</div>" +
      '<p style="margin-top:6px;font-size:13px"><b>' +
      esc(goalQuranTitle(tg)) +
      "</b></p>" +
      '<p class="dim" style="font-size:11.5px;margin-top:4px">' +
      esc(t("qSetLead")) +
      "</p>" +
      '<button class="btn sm gold" type="button" id="bmQSetEdit" style="margin-top:8px">✏️ ' +
      esc(t("qEdit")) +
      "</button>";
    var b = document.getElementById("bmQSetEdit");
    if (b) b.onclick = function () {
      openTargetPicker();
    };
  }

  function render() {
    trackQuranProgress();
    var card = ensureCard();
    if (!card) return;
    var s = migrateStreak(state());
    var day = dkey();
    var g = goals(day, s);
    var need = g.needed;
    var have = g.doneCount;
    var pct = need ? have / need : 0;
    var pts = dompetPoin();
    var tg = getTarget(s);
    var qHave = progressHaveDisplay(s, day);
    var qSub = g.quran
      ? t("done")
      : t("gQuranProg", { have: fmtNum(qHave), need: fmtNum(tg.amount), unit: unitWord(tg.unit) });

    var qEdit =
      '<button type="button" class="bm-tg-qedit" id="bmTgQEdit" title="' +
      esc(t("qEdit")) +
      '" aria-label="' +
      esc(t("qEdit")) +
      '">✏️</button>';

    card.innerHTML =
      '<div class="bm-tg-top">' +
      '<div class="bm-tg-ring-wrap">' +
      ringSvg(pct) +
      '<div class="pct">' +
      esc(t("ofNeed", { n: have, m: need })) +
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
      goalRow("✨", t("gHikmah"), t("gHikmahSub"), g.hikmah, false) +
      "</div>" +
      (s.quranTargetSet
        ? '<div class="bm-tg-bonus" id="bmTgBonus">' +
          '<div class="bm-tg-bonus-lab">' +
          esc(t("bonus")) +
          " · " +
          esc(t("bonusSub")) +
          "</div>" +
          goalRow("📖", goalQuranTitle(tg), qSub + " · " + t("gQuranSub"), g.quran, false, qEdit, "bonus") +
          "</div>"
        : "") +
      renderSunnahBlock({ addQuran: !s.quranTargetSet }) +
      '<div class="bm-tg-actions">' +
      '<button type="button" class="btn sm ghost" id="bmTgUzur">' +
      esc(t("openUzur")) +
      "</button></div>";

    var goalsEl = card.querySelectorAll(".bm-tg-goals > .bm-tg-goal");
    if (goalsEl[0])
      goalsEl[0].onclick = function () {
        go("jadwal");
      };
    if (goalsEl[1])
      goalsEl[1].onclick = function () {
        go("beranda");
        setTimeout(function () {
          var b = document.querySelector("#pkToday [data-hkstart], #pkToday .hk-btn, #pkToday .hk-go");
          if (b) b.click();
          else {
            var slide = document.querySelector('.v2-hero-slide[data-hi="1"]');
            if (slide) slide.scrollIntoView({ inline: "center", behavior: "smooth" });
          }
        }, 200);
      };
    var bonusEl = card.querySelector(".bm-tg-bonus .bm-tg-goal");
    if (bonusEl)
      bonusEl.onclick = function (e) {
        if (e.target && e.target.closest && e.target.closest("#bmTgQEdit")) return;
        openQuranReader();
      };
    var ed = document.getElementById("bmTgQEdit");
    if (ed)
      ed.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        openTargetPicker();
      };
    var stBtn = document.getElementById("bmTgStreakBtn");
    if (stBtn) stBtn.onclick = openCalendar;
    var uzBtn = document.getElementById("bmTgUzur");
    if (uzBtn) uzBtn.onclick = openUzur;
    var addQ = document.getElementById("bmTgAddQuran");
    if (addQ)
      addQ.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        openTargetPicker({ allowSkip: true });
      };
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
    renderSettingsCard();
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
    s.quranTarget = { amount: 1, unit: "halaman" };
    s.quranTargetSet = false; /* opt-in bonus -- default hidden */
    for (var i = 1; i <= 12; i++) s.calendar[dAdd(today, -i)] = "full";
    s.calendar[dAdd(today, -5)] = "freeze";
    s.calendar[dAdd(today, -8)] = "uzur";
    sunnahOpen = mode === "sunnah-open" || mode === "sunnah";

    var log = {};
    for (var j = 1; j < 5; j++) {
      log[dAdd(today, -j)] = { jamaah: 1, rawatib: 1 };
    }

    if (mode === "done" || mode === "cele") {
      s.quranTargetSet = true;
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
      s.quranProg[today] = { ayat: { "1:1": 1 }, pages: { 1: 1 } };
      s.celebrated = {};
      delete s.calendar[today];
      log[today] = { jamaah: Date.now(), rawatib: Date.now(), dhuha: Date.now(), tahajjud: Date.now() };
      storeSet(SK_DOM, { saldo: 0, poin: 148, hist: [], claimed: {}, act: {} });
    } else if (mode === "quran-picker" || mode === "picker") {
      s.quranTargetSet = false;
      s.quran = {};
      storeSet("rk_salat_" + today, ["fajr", "dhuhr", "asr", "maghrib"]);
      storeSet("ks_hikmah", { day: today, doneToday: true, days: (function () { var o = {}; o[today] = 1; return o; })() });
      storeSet(SK_DOM, { saldo: 0, poin: 72, hist: [], claimed: {}, act: {} });
    } else if (mode === "quran-prog" || mode === "reader") {
      s.quranTarget = { amount: 10, unit: "ayat" };
      s.quranTargetSet = true;
      s.quranProg[today] = {
        ayat: { "1:1": 1, "1:2": 1, "1:3": 1 },
        pages: { 1: 1 }
      };
      storeSet("rk_q_last", { s: 1, a: 3, ts: Date.now() });
      storeSet("rk_q_lastpg", 1);
      storeSet("rk_salat_" + today, ["fajr", "dhuhr", "asr", "maghrib"]);
      storeSet("ks_hikmah", { day: today, doneToday: true, days: (function () { var o = {}; o[today] = 1; return o; })() });
      storeSet(SK_DOM, { saldo: 0, poin: 72, hist: [], claimed: {}, act: {} });
    } else if (mode === "quran-done") {
      s.quranTarget = { amount: 1, unit: "halaman" };
      s.quranTargetSet = true;
      s.quran[today] = 1;
      s.quranProg[today] = { ayat: { "1:1": 1, "1:2": 1 }, pages: { 1: 1 } };
      s.quranDoneToast = {};
      storeSet("rk_q_last", { s: 1, a: 7, ts: Date.now() });
      storeSet("rk_q_lastpg", 1);
      storeSet("rk_salat_" + today, ["fajr", "dhuhr", "asr", "maghrib"]);
      storeSet("ks_hikmah", { day: today, doneToday: true, days: (function () { var o = {}; o[today] = 1; return o; })() });
      storeSet(SK_DOM, { saldo: 0, poin: 72, hist: [], claimed: {}, act: {} });
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

  function markSalatFromNotif(prayer, day) {
    day = day || dkey();
    prayer = String(prayer || "").toLowerCase();
    var map = { subuh: "fajr", fajr: "fajr", dzuhur: "dhuhr", dhuhr: "dhuhr", ashar: "asr", asr: "asr", maghrib: "maghrib", isya: "isha", isha: "isha" };
    var n = map[prayer] || prayer;
    if (["fajr", "dhuhr", "asr", "maghrib", "isha"].indexOf(n) < 0) return { ok: false, reason: "bad_prayer" };
    try {
      if (window.RKPT && typeof RKPT.canCheck === "function") {
        var parts = day.split("-").map(Number);
        var d = new Date(parts[0], parts[1] - 1, parts[2]);
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

  function hookReader() {
    if (readerHooked) return;
    readerHooked = true;
    setInterval(function () {
      var r = document.getElementById("qReader");
      if (r && !r.hidden) {
        trackQuranProgress();
        updateReaderBar();
      }
    }, 900);
    var tries = 0;
    function wrap() {
      var Q = window.RKQuran;
      if (!Q) {
        if (tries++ < 40) setTimeout(wrap, 200);
        return;
      }
      if (Q._bmTgHook) return;
      Q._bmTgHook = 1;
      ["open", "openPage"].forEach(function (fn) {
        if (typeof Q[fn] !== "function") return;
        var orig = Q[fn];
        Q[fn] = function () {
          var ret = orig.apply(this, arguments);
          Promise.resolve(ret).then(function () {
            setTimeout(function () {
              trackQuranProgress();
              ensureReaderBar();
              updateReaderBar();
            }, 60);
          });
          return ret;
        };
      });
    }
    wrap();
  }

  function maybeFirstPrompt() {
    var s = state();
    if (s.quranTargetSet) return;
    /* optional / skippable — only show once after short delay on beranda */
    setTimeout(function () {
      var pg = document.getElementById("page-beranda");
      if (!pg || !pg.classList.contains("on")) return;
      if (state().quranTargetSet) return;
      if (document.getElementById("bmTgOv") && document.getElementById("bmTgOv").classList.contains("on")) return;
      openTargetPicker({ allowSkip: true });
    }, 700);
  }

  function boot() {
    var demo = null;
    try {
      var q = new URLSearchParams(location.search || "");
      demo = q.get("bm_target_demo") || q.get("bm_hari_demo");
      if (!demo && storeGet("rk_target_demo", null)) demo = storeGet("rk_target_demo", null);
    } catch (e) {}
    if (demo) seedDemo(demo === "1" ? "beranda" : demo);

    loadMeta();
    migrateStreak(state());
    var msgs = rollMisses();
    msgs.forEach(function (m) {
      if (m.type === "freeze") showToast(t("freezeUsed"));
      else if (m.type === "break") showToast(t("freezeGone"));
    });

    render();
    hookReader();
    renderSettingsCard();
    /* Quran target is opt-in via "+ Target Quran" -- no auto popup */
    if (demo === "quran-picker" || demo === "picker") setTimeout(function () { openTargetPicker({ allowSkip: true }); }, 400);
    if (demo === "quran-prog" || demo === "reader") setTimeout(openQuranReader, 500);
    if (demo === "quran-done") setTimeout(function () { openQuranReader(); setTimeout(openQuranDoneSheet, 600); }, 400);

    document.addEventListener("rk:salat-check", function () {
      setTimeout(render, 50);
    });
    document.addEventListener("rk:ibadah", function () {
      setTimeout(render, 50);
    });
    document.addEventListener("rk:lang", function () {
      setTimeout(function () {
        render();
        renderSettingsCard();
        updateReaderBar();
      }, 40);
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
        if (p === "settings") setTimeout(renderSettingsCard, 80);
        if (p === "mushaf" || p === "quran") setTimeout(updateReaderBar, 200);
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
    openTargetPicker: openTargetPicker,
    openQuranReader: openQuranReader,
    setTarget: setTarget,
    getTarget: getTarget,
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
