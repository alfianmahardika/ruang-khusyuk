/*! Best Muslim v82 — Growth: share cards, invite, smart personal notifs.
 * Privacy-first localStorage. No ads. No autoplay audio. ID/EN/AR. Gold.
 * Quotes from kata-quran.json / known Tanzil+Kemenag ayat (no fabricated dalil).
 */
(function () {
  "use strict";
  var SK = "rk_growth";
  var SK_TARGET = "rk_target_harian";
  var STREAK_MILESTONES = [3, 7, 30, 100];
  var NOTIF_AM_ID = 88001;
  var NOTIF_PM_ID = 88002;
  var CHANNEL = "bm_smart_nudge";
  var kataCache = null;
  var lastShare = { story: null, square: null };
  var pendingKind = null;
  var pendingMeta = null;

  var I18N = {
    id: {
      shareTitle: "Bagikan pencapaianmu",
      shareLead: "Kartu siap untuk WA Status / IG Story. Tidak wajib — boleh nanti saja.",
      later: "Nanti saja",
      bagikan: "Bagikan",
      unduh: "Unduh kartu",
      nameAsk: "Nama di kartu (opsional)",
      namePh: "Kosongkan jika tidak ingin nama",
      footer: "Best Muslim App · bestmuslim.app",
      streakN: "Streak {n} hari 🔥",
      streakSub: "Istiqamah kecil yang konsisten.",
      quranDone: "Target Qur'an hari ini tercapai ✓",
      goalsDone: "Target harian lengkap!",
      khatam: "Khatam Al-Qur'an 📖",
      kataTitle: "Kata Qur'an untukmu",
      inviteTitle: "Ajak sahabat",
      inviteLead: "Bagikan undangan WhatsApp. Kode undangan tersimpan di perangkat ini saja.",
      inviteBtn: "Bagikan ke WhatsApp",
      inviteCopied: "Tautan disalin",
      inviteCode: "Kode Anda",
      inviteCount: "{n} undangan dibagikan",
      inviteBadge: "🏅 Penyeru Kebaikan",
      inviteBadgeHow: "Badge muncul setelah Anda membagikan undangan pertama.",
      streakDuo: "Streak berdua",
      streakDuoLead: "Lokal: Anda bisa menyimpan kode sahabat. Streak live bersama butuh server (belum ada).",
      streakDuoSave: "Simpan kode sahabat",
      streakDuoSaved: "Kode sahabat tersimpan di perangkat ini",
      notifTitle: "Pengingat pribadi",
      notifLead: "Maks. 2 per hari selain adzan. Default aktif — mudah dimatikan. Tanpa suara otomatis.",
      notifToggle: "Aktifkan pengingat pribadi",
      notifAm: "Pagi · Kata Qur'an (~06:30)",
      notifPm: "Sore · Nudge streak (30 mnt sebelum Isya, hanya jika target belum lengkap)",
      notifAmBody: "Kata Qur'an untukmu siap — buka Best Muslim ✨",
      notifPmBody: "Streak 🔥 {n} harimu tinggal {left} target lagi",
      notifPmBodyOne: "Streak 🔥 {n} harimu tinggal 1 target lagi",
      bannerAm: "Pengingat pagi: buka Kata Qur'an untukmu",
      bannerPm: "Streak {n} hari — masih ada target yang belum selesai",
      openApp: "Buka",
      dismiss: "Tutup",
      shareFail: "Gagal membagikan — coba unduh kartu",
      quoteLabel: "Renungan"
    },
    en: {
      shareTitle: "Share your milestone",
      shareLead: "Card ready for WA Status / IG Story. Optional — you can skip.",
      later: "Not now",
      bagikan: "Share",
      unduh: "Download card",
      nameAsk: "Name on card (optional)",
      namePh: "Leave blank for no name",
      footer: "Best Muslim App · bestmuslim.app",
      streakN: "{n}-day streak 🔥",
      streakSub: "Small, steady consistency.",
      quranDone: "Today's Qur'an target reached ✓",
      goalsDone: "Daily goals complete!",
      khatam: "Qur'an khatam 📖",
      kataTitle: "A Qur'an word for you",
      inviteTitle: "Invite a friend",
      inviteLead: "Share a WhatsApp invite. Your invite code stays on this device only.",
      inviteBtn: "Share on WhatsApp",
      inviteCopied: "Link copied",
      inviteCode: "Your code",
      inviteCount: "{n} invites shared",
      inviteBadge: "🏅 Caller to Good",
      inviteBadgeHow: "Badge appears after your first invite share.",
      streakDuo: "Streak together",
      streakDuoLead: "Local: you can save a friend's code. Live shared streak needs a server (not yet).",
      streakDuoSave: "Save friend's code",
      streakDuoSaved: "Friend code saved on this device",
      notifTitle: "Personal reminders",
      notifLead: "Max 2/day besides adhan. On by default — easy to turn off. No autoplay audio.",
      notifToggle: "Enable personal reminders",
      notifAm: "Morning · Qur'an word (~06:30)",
      notifPm: "Evening · Streak nudge (30 min before Isha, only if goals incomplete)",
      notifAmBody: "Your Qur'an word is ready — open Best Muslim ✨",
      notifPmBody: "🔥 {n}-day streak — {left} goals left",
      notifPmBodyOne: "🔥 {n}-day streak — 1 goal left",
      bannerAm: "Morning reminder: open A Qur'an Word for You",
      bannerPm: "{n}-day streak — some goals still open",
      openApp: "Open",
      dismiss: "Close",
      shareFail: "Share failed — try downloading the card",
      quoteLabel: "Reflection"
    },
    ar: {
      shareTitle: "شارك إنجازك",
      shareLead: "البطاقة جاهزة لحالة واتساب / قصة إنستغرام. اختياري — يمكنك التخطي.",
      later: "لاحقاً",
      bagikan: "شارك",
      unduh: "تنزيل البطاقة",
      nameAsk: "الاسم على البطاقة (اختياري)",
      namePh: "اتركه فارغًا بلا اسم",
      footer: "Best Muslim App · bestmuslim.app",
      streakN: "سلسلة {n} يوم 🔥",
      streakSub: "ثبات قليل مستمر.",
      quranDone: "تحقق هدف القرآن اليوم ✓",
      goalsDone: "اكتملت أهداف اليوم!",
      khatam: "ختم القرآن 📖",
      kataTitle: "كلمة من القرآن لك",
      inviteTitle: "ادعُ صديقًا",
      inviteLead: "شارك دعوة واتساب. رمز الدعوة يُحفظ على هذا الجهاز فقط.",
      inviteBtn: "شارك عبر واتساب",
      inviteCopied: "تم نسخ الرابط",
      inviteCode: "رمزك",
      inviteCount: "{n} دعوات مُشارَكة",
      inviteBadge: "🏅 داعي الخير",
      inviteBadgeHow: "تظهر الشارة بعد أول مشاركة دعوة.",
      streakDuo: "سلسلة معًا",
      streakDuoLead: "محليًا: يمكنك حفظ رمز صديق. السلسلة المشتركة الحية تحتاج خادمًا (غير متوفر بعد).",
      streakDuoSave: "حفظ رمز الصديق",
      streakDuoSaved: "حُفظ رمز الصديق على هذا الجهاز",
      notifTitle: "تذكيرات شخصية",
      notifLead: "حد أقصى 2 يوميًا غير الأذان. مفعّلة افتراضيًا — سهلة الإيقاف. بلا تشغيل صوت تلقائي.",
      notifToggle: "تفعيل التذكيرات الشخصية",
      notifAm: "صباحًا · كلمة القرآن (~06:30)",
      notifPm: "مساءً · تنبيه السلسلة (قبل العشاء بـ 30 د، إن بقيت أهداف)",
      notifAmBody: "كلمة القرآن جاهزة — افتح Best Muslim ✨",
      notifPmBody: "🔥 سلسلة {n} يوم — بقي {left} أهداف",
      notifPmBodyOne: "🔥 سلسلة {n} يوم — بقي هدف واحد",
      bannerAm: "تذكير صباحي: افتح كلمة من القرآن لك",
      bannerPm: "سلسلة {n} يوم — ما زالت أهداف مفتوحة",
      openApp: "فتح",
      dismiss: "إغلاق",
      shareFail: "فشلت المشاركة — جرّب تنزيل البطاقة",
      quoteLabel: "تأمّل"
    }
  };

  /* Curated real ayat (Tanzil Uthmani + Kemenag ID) — also used if kata-quran.json offline */
  var FALLBACK_QUOTES = [
    {
      ref: "Asy-Syarh 94:5",
      ar: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
      tr: {
        id: "Karena sesungguhnya sesudah kesulitan itu ada kemudahan,",
        en: "For indeed, with hardship will be ease.",
        ar: "فإن مع العسر يسرا"
      },
      hikmah: {
        id: "Istiqamah kecil mengantar pada kemudahan dari Allah.",
        en: "Steady small steps invite ease from Allah.",
        ar: "الثبات القليل يفتح يسر الله."
      }
    },
    {
      ref: "Al-Baqarah 2:152",
      ar: "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ",
      tr: {
        id: "Maka ingatlah kepada-Ku, Aku pun akan ingat kepadamu.",
        en: "So remember Me; I will remember you.",
        ar: "فاذكروني أذكركم"
      },
      hikmah: {
        id: "Mengingat Allah menjaga hati tetap dekat.",
        en: "Remembering Allah keeps the heart near.",
        ar: "ذكر الله يُدني القلب."
      }
    },
    {
      ref: "Ar-Ra'd 13:28",
      ar: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
      tr: {
        id: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenang.",
        en: "Unquestionably, by the remembrance of Allah hearts are assured.",
        ar: "ألا بذكر الله تطمئن القلوب"
      },
      hikmah: {
        id: "Ketenangan tumbuh dari zikir, bukan dari tergesa.",
        en: "Calm grows from remembrance, not haste.",
        ar: "الطمأنينة من الذكر لا من العجلة."
      }
    },
    {
      ref: "Al-'Ankabut 29:45",
      ar: "إِنَّ ٱلصَّلَوٰةَ تَنْهَىٰ عَنِ ٱلْفَحْشَآءِ وَٱلْمُنكَرِ",
      tr: {
        id: "Sesungguhnya salat itu mencegah dari perbuatan keji dan mungkar.",
        en: "Indeed, prayer prohibits immorality and wrongdoing.",
        ar: "إن الصلاة تنهى عن الفحشاء والمنكر"
      },
      hikmah: {
        id: "Salat yang khusyuk menjaga langkah hari ini.",
        en: "Focused prayer guards today's steps.",
        ar: "الصلاة الخاشعة تحفظ خطى اليوم."
      }
    },
    {
      ref: "Al-Muzzammil 73:20",
      ar: "فَٱقْرَءُوا۟ مَا تَيَسَّرَ مِنَ ٱلْقُرْءَانِ",
      tr: {
        id: "Maka bacalah apa yang mudah (bagimu) dari Al-Qur'an.",
        en: "So recite what is easy [for you] of the Qur'an.",
        ar: "فاقرءوا ما تيسر من القرآن"
      },
      hikmah: {
        id: "Yang penting konsisten — baca sesuai kemampuanmu.",
        en: "Consistency matters — read what you can.",
        ar: "الثبات أهم — اقرأ ما تيسر."
      }
    },
    {
      ref: "Ali 'Imran 3:200",
      ar: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱصْبِرُوا۟ وَصَابِرُوا۟",
      tr: {
        id: "Wahai orang-orang yang beriman! Bersabarlah kamu dan kuatkanlah kesabaranmu.",
        en: "O you who have believed, persevere and endure.",
        ar: "يا أيها الذين آمنوا اصبروا وصابروا"
      },
      hikmah: {
        id: "Streak adalah latihan sabar yang tampak.",
        en: "A streak is visible practice in patience.",
        ar: "السلسلة تدريب ظاهر على الصبر."
      }
    }
  ];

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
  function loc(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang()] || obj.id || obj.en || "";
  }

  function defaultState() {
    return {
      displayName: "",
      nameAsked: false,
      refCode: "",
      invitedBy: null,
      friendCode: null,
      inviteShares: 0,
      badgePenyeru: false,
      shareShown: {},
      notifSmart: true,
      lastBanner: null
    };
  }
  function state() {
    var s = storeGet(SK, null);
    if (!s || typeof s !== "object") s = defaultState();
    s.shareShown = s.shareShown || {};
    if (!s.refCode) {
      s.refCode = makeRef();
      save(s);
    }
    if (typeof s.notifSmart !== "boolean") s.notifSmart = true;
    return s;
  }
  function save(s) {
    storeSet(SK, s);
  }
  function makeRef() {
    var a = "abcdefghijklmnopqrstuvwxyz0123456789";
    var out = "";
    for (var i = 0; i < 8; i++) out += a[(Math.random() * a.length) | 0];
    return out;
  }

  function targetState() {
    return storeGet(SK_TARGET, {}) || {};
  }
  function streakNow() {
    return (targetState().streak | 0) || 0;
  }

  function loadKata() {
    if (kataCache) return Promise.resolve(kataCache);
    return fetch("kata-quran.json")
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (d) {
        kataCache = d;
        return d;
      })
      .catch(function () {
        return null;
      });
  }

  function pickQuote(kind) {
    return loadKata().then(function (d) {
      var cards = (d && d.cards) || [];
      var pool = cards.length ? cards : null;
      var L = lang();
      if (pool) {
        var i = Math.abs(hash(kind + dkey())) % pool.length;
        var c = pool[i];
        return {
          ref: c.ref,
          ar: c.ar,
          tr: c.trId || "",
          hikmah: loc(c.pesan) || loc(c.langkah) || ""
        };
      }
      var f = FALLBACK_QUOTES[Math.abs(hash(kind)) % FALLBACK_QUOTES.length];
      return {
        ref: f.ref,
        ar: f.ar,
        tr: f.tr[L] || f.tr.id,
        hikmah: f.hikmah[L] || f.hikmah.id
      };
    });
  }
  function hash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return h;
  }

  function achievementCopy(kind, meta) {
    meta = meta || {};
    if (kind === "streak") return { title: t("streakN", { n: meta.n | 0 }), sub: t("streakSub") };
    if (kind === "quran") return { title: t("quranDone"), sub: meta.label || "" };
    if (kind === "goals") return { title: t("goalsDone"), sub: t("streakN", { n: streakNow() }) };
    if (kind === "khatam") return { title: t("khatam"), sub: t("streakSub") };
    if (kind === "kata") return { title: t("kataTitle"), sub: meta.ref || "" };
    return { title: "Best Muslim", sub: "" };
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function wrapText(ctx, text, x, y, maxW, lineH, maxLines) {
    text = String(text || "");
    var words = text.split(/\s+/);
    var line = "";
    var lines = 0;
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, y);
        y += lineH;
        line = words[i];
        lines++;
        if (lines >= maxLines - 1) {
          var rest = words.slice(i).join(" ");
          while (ctx.measureText(rest + "…").width > maxW && rest.length > 1) rest = rest.slice(0, -1);
          ctx.fillText(rest + (rest.length < words.slice(i).join(" ").length ? "…" : ""), x, y);
          return y + lineH;
        }
      } else line = test;
    }
    if (line) {
      ctx.fillText(line, x, y);
      y += lineH;
    }
    return y;
  }

  function loadLogo() {
    return new Promise(function (res) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        res(img);
      };
      img.onerror = function () {
        res(null);
      };
      img.src = "icon-192.png";
    });
  }

  function paintCard(W, H, payload, logo) {
    var canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext("2d");
    var story = H > W;
    var pad = story ? 72 : 56;

    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#1c1710");
    g.addColorStop(0.5, "#12151c");
    g.addColorStop(1, "#0a0c12");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(230,199,122,.08)";
    ctx.beginPath();
    ctx.arc(W * 0.18, H * 0.1, W * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W * 0.85, H * 0.82, W * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(230,199,122,.5)";
    ctx.lineWidth = story ? 4 : 3;
    roundRect(ctx, pad * 0.5, pad * 0.5, W - pad, H - pad, story ? 40 : 28);
    ctx.stroke();

    var y = pad + (story ? 40 : 28);
    ctx.textAlign = "center";
    ctx.fillStyle = "#e6c77a";
    ctx.font = "800 " + (story ? 34 : 28) + "px system-ui,sans-serif";
    ctx.fillText("Best Muslim", W / 2, y);
    y += story ? 56 : 44;

    if (payload.name) {
      ctx.fillStyle = "rgba(243,233,212,.85)";
      ctx.font = "600 " + (story ? 26 : 22) + "px system-ui,sans-serif";
      ctx.fillText(payload.name, W / 2, y);
      y += story ? 48 : 36;
    }

    ctx.fillStyle = "#f0d79a";
    ctx.font = "800 " + (story ? 44 : 34) + "px Georgia,serif";
    y = wrapText(ctx, payload.title, W / 2, y, W - pad * 2.2, story ? 52 : 40, 3);
    y += story ? 12 : 8;

    if (payload.sub) {
      ctx.fillStyle = "rgba(243,233,212,.75)";
      ctx.font = "600 " + (story ? 26 : 20) + "px system-ui,sans-serif";
      y = wrapText(ctx, payload.sub, W / 2, y, W - pad * 2.4, story ? 34 : 28, 2);
    }

    y += story ? 36 : 24;
    ctx.fillStyle = "#f3e9d4";
    ctx.font = "400 " + (story ? 46 : 36) + "px 'Amiri Quran', Amiri, serif";
    ctx.direction = "rtl";
    y = wrapText(ctx, payload.ar || "", W / 2, y, W - pad * 2, story ? 60 : 48, story ? 5 : 4);
    ctx.direction = "ltr";

    if (payload.tr) {
      y += story ? 16 : 10;
      ctx.fillStyle = "rgba(216,207,189,.95)";
      ctx.font = "italic 400 " + (story ? 24 : 20) + "px Georgia,serif";
      y = wrapText(ctx, payload.tr, W / 2, y, W - pad * 2.2, story ? 34 : 28, story ? 5 : 4);
    }

    if (payload.hikmah) {
      y = Math.min(y + (story ? 28 : 18), H - (story ? 280 : 220));
      ctx.fillStyle = "rgba(230,199,122,.14)";
      roundRect(ctx, pad, y, W - pad * 2, story ? 160 : 130, 18);
      ctx.fill();
      ctx.fillStyle = "#e6c77a";
      ctx.font = "800 " + (story ? 18 : 15) + "px system-ui,sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(t("quoteLabel").toUpperCase(), pad + 24, y + (story ? 36 : 28));
      ctx.fillStyle = "#f3e9d4";
      ctx.font = "400 " + (story ? 24 : 20) + "px system-ui,sans-serif";
      ctx.textAlign = "center";
      wrapText(ctx, payload.hikmah, W / 2, y + (story ? 70 : 56), W - pad * 2.4, story ? 32 : 26, 3);
    }

    if (payload.ref) {
      ctx.fillStyle = "rgba(230,199,122,.8)";
      ctx.font = "700 " + (story ? 22 : 18) + "px system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(payload.ref, W / 2, H - (story ? 140 : 110));
    }

    var logoSize = story ? 56 : 44;
    var logoY = H - (story ? 110 : 86);
    if (logo) {
      try {
        ctx.save();
        roundRect(ctx, W / 2 - logoSize / 2, logoY - logoSize, logoSize, logoSize, 12);
        ctx.clip();
        ctx.drawImage(logo, W / 2 - logoSize / 2, logoY - logoSize, logoSize, logoSize);
        ctx.restore();
      } catch (e) {}
    }
    ctx.fillStyle = "#e6c77a";
    ctx.font = "800 " + (story ? 26 : 22) + "px system-ui,sans-serif";
    ctx.fillText(t("footer"), W / 2, H - (story ? 42 : 32));
    return canvas;
  }

  function ensureOv() {
    var ov = document.getElementById("bmGrOv");
    if (ov) return ov;
    ov = document.createElement("div");
    ov.id = "bmGrOv";
    ov.className = "bm-gr-ov";
    ov.innerHTML = '<div class="bm-gr-sheet" id="bmGrSheet" role="dialog" aria-modal="true"></div>';
    ov.addEventListener("click", function (e) {
      if (e.target === ov) closeOv();
    });
    document.body.appendChild(ov);
    return ov;
  }
  function closeOv() {
    var ov = document.getElementById("bmGrOv");
    if (ov) ov.classList.remove("on");
  }
  function openOv(html) {
    var ov = ensureOv();
    document.getElementById("bmGrSheet").innerHTML = html;
    ov.classList.add("on");
    var x = ov.querySelector(".bm-gr-x");
    if (x) x.onclick = closeOv;
  }

  function markShown(key) {
    var s = state();
    s.shareShown[key] = Date.now();
    save(s);
  }
  function wasShown(key) {
    return !!(state().shareShown || {})[key];
  }

  function offerShare(kind, meta) {
    meta = meta || {};
    var key =
      kind === "streak"
        ? "streak:" + (meta.n | 0)
        : kind === "quran"
          ? "quran:" + dkey()
          : kind === "goals"
            ? "goals:" + dkey()
            : kind === "khatam"
              ? "khatam"
              : kind === "kata"
                ? "kata:" + dkey()
                : kind + ":" + dkey();
    if (wasShown(key) && !meta.force) return false;
    pendingKind = kind;
    pendingMeta = meta;
    pickQuote(kind).then(function (q) {
      var copy = achievementCopy(kind, meta);
      var s = state();
      var showNameField = !s.nameAsked;
      openOv(
        '<button type="button" class="bm-gr-x" aria-label="close">×</button>' +
          "<h3>" +
          esc(t("shareTitle")) +
          "</h3>" +
          '<p class="lead">' +
          esc(t("shareLead")) +
          "</p>" +
          '<p style="font-size:15px;font-weight:800;color:#f0d79a;margin:0 0 4px">' +
          esc(copy.title) +
          "</p>" +
          (copy.sub ? '<p class="lead" style="margin-top:0">' + esc(copy.sub) + "</p>" : "") +
          (showNameField
            ? "<label style=\"font-size:12px;color:#e6c77a\">" +
              esc(t("nameAsk")) +
              '</label><input class="bm-gr-name" id="bmGrName" maxlength="40" placeholder="' +
              esc(t("namePh")) +
              '" value="' +
              esc(s.displayName || "") +
              '"/>'
            : s.displayName
              ? '<p class="lead" style="margin:0 0 8px">' + esc(s.displayName) + "</p>"
              : "") +
          '<canvas id="bmGrPrev" class="bm-gr-preview" width="1080" height="1920" style="width:100%;height:auto"></canvas>' +
          '<div class="bm-gr-actions">' +
          '<button type="button" class="btn gold" id="bmGrShare">' +
          esc(t("bagikan")) +
          "</button>" +
          '<button type="button" class="btn ghost" id="bmGrDl">' +
          esc(t("unduh")) +
          "</button>" +
          '<button type="button" class="btn ghost" id="bmGrLater">' +
          esc(t("later")) +
          "</button></div>"
      );
      var payload = {
        name: s.displayName || "",
        title: copy.title,
        sub: copy.sub,
        ar: q.ar,
        tr: q.tr,
        hikmah: q.hikmah,
        ref: q.ref
      };
      loadLogo().then(function (logo) {
        var story = paintCard(1080, 1920, payload, logo);
        var square = paintCard(1080, 1080, payload, logo);
        story.toBlob(function (b) {
          lastShare.story = b;
        }, "image/png");
        square.toBlob(function (b) {
          lastShare.square = b;
        }, "image/png");
        var prev = document.getElementById("bmGrPrev");
        if (prev) {
          var pctx = prev.getContext("2d");
          pctx.drawImage(story, 0, 0);
        }
        window.__bmGrowthLastShare = { story: story, square: square, payload: payload };
      });
      document.getElementById("bmGrLater").onclick = function () {
        markShown(key);
        closeOv();
      };
      document.getElementById("bmGrShare").onclick = function () {
        commitName();
        markShown(key);
        doShare(payload);
      };
      document.getElementById("bmGrDl").onclick = function () {
        commitName();
        markShown(key);
        downloadCards();
      };
    });
    return true;
  }

  function commitName() {
    var inp = document.getElementById("bmGrName");
    var s = state();
    if (inp) {
      s.displayName = String(inp.value || "").trim().slice(0, 40);
      s.nameAsked = true;
      save(s);
    } else if (!s.nameAsked) {
      s.nameAsked = true;
      save(s);
    }
  }

  async function doShare(payload) {
    var text =
      (payload.title || "") +
      (payload.name ? " — " + payload.name : "") +
      "\n" +
      (payload.ref || "") +
      "\nhttps://bestmuslim.app";
    try {
      if (!lastShare.story) {
        var logo = await loadLogo();
        var c = paintCard(1080, 1920, payload, logo);
        lastShare.story = await new Promise(function (r) {
          c.toBlob(r, "image/png");
        });
        var c2 = paintCard(1080, 1080, payload, logo);
        lastShare.square = await new Promise(function (r) {
          c2.toBlob(r, "image/png");
        });
      }
      var storyFile = new File([lastShare.story], "bestmuslim-share-story.png", { type: "image/png" });
      var squareFile = new File([lastShare.square], "bestmuslim-share-square.png", { type: "image/png" });
      if (navigator.share && navigator.canShare) {
        var payloadFiles = { files: [storyFile, squareFile], title: payload.title, text: text };
        if (navigator.canShare(payloadFiles)) {
          await navigator.share(payloadFiles);
          closeOv();
          return;
        }
        if (navigator.canShare({ files: [storyFile] })) {
          await navigator.share({ files: [storyFile], title: payload.title, text: text });
          closeOv();
          return;
        }
      }
      if (navigator.share) {
        await navigator.share({ title: payload.title, text: text, url: "https://bestmuslim.app" });
      }
      downloadCards();
      closeOv();
    } catch (e) {
      try {
        downloadCards();
      } catch (e2) {}
    }
  }
  function downloadCards() {
    if (!lastShare.story) return;
    var a = document.createElement("a");
    a.href = URL.createObjectURL(lastShare.story);
    a.download = "bestmuslim-share-story.png";
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      if (lastShare.square) {
        var a2 = document.createElement("a");
        a2.href = URL.createObjectURL(lastShare.square);
        a2.download = "bestmuslim-share-square.png";
        a2.click();
        setTimeout(function () {
          URL.revokeObjectURL(a2.href);
        }, 2000);
      }
    }, 300);
  }

  /* ---------- Invite ---------- */
  function inviteUrl() {
    return "https://bestmuslim.app/?ref=" + encodeURIComponent(state().refCode);
  }
  function captureRefFromUrl() {
    try {
      var q = new URLSearchParams(location.search || "");
      var ref = (q.get("ref") || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16);
      if (!ref) return;
      var s = state();
      if (ref === s.refCode) return;
      if (!s.invitedBy) {
        s.invitedBy = ref;
        save(s);
      }
    } catch (e) {}
  }
  function shareInvite() {
    var s = state();
    var url = inviteUrl();
    var text =
      lang() === "en"
        ? "Join me on Best Muslim — prayer, Qur'an, daily goals 🔥\n" + url
        : lang() === "ar"
          ? "انضم إليّ في Best Muslim — صلاة وقرآن وأهداف يومية 🔥\n" + url
          : "Yuk pakai Best Muslim bareng aku — sholat, Qur'an, target harian 🔥\n" + url;
    var wa = "https://wa.me/?text=" + encodeURIComponent(text);
    s.inviteShares = (s.inviteShares | 0) + 1;
    if (s.inviteShares >= 1) s.badgePenyeru = true;
    save(s);
    try {
      window.open(wa, "_blank", "noopener");
    } catch (e) {
      try {
        navigator.clipboard.writeText(text);
      } catch (e2) {}
    }
    renderSettings();
    return { url: url, badge: s.badgePenyeru };
  }

  function openInviteSheet() {
    var s = state();
    openOv(
      '<button type="button" class="bm-gr-x">×</button>' +
        "<h3>" +
        esc(t("inviteTitle")) +
        "</h3>" +
        '<p class="lead">' +
        esc(t("inviteLead")) +
        "</p>" +
        '<div class="bm-gr-invite"><div>' +
        esc(t("inviteCode")) +
        ': <span class="code">' +
        esc(s.refCode) +
        "</span></div>" +
        "<div style=\"margin-top:6px;font-size:12px;opacity:.85\">" +
        esc(t("inviteCount", { n: s.inviteShares | 0 })) +
        "</div>" +
        (s.badgePenyeru
          ? '<div class="bm-gr-badge">' + esc(t("inviteBadge")) + "</div>"
          : '<p style="font-size:11.5px;margin:8px 0 0;opacity:.7">' + esc(t("inviteBadgeHow")) + "</p>") +
        "</div>" +
        '<div class="bm-gr-invite" style="margin-top:10px"><b>' +
        esc(t("streakDuo")) +
        "</b><p class=\"lead\" style=\"margin:6px 0 8px\">" +
        esc(t("streakDuoLead")) +
        "</p>" +
        '<input class="bm-gr-name" id="bmGrFriend" maxlength="16" placeholder="kode sahabat" value="' +
        esc(s.friendCode || s.invitedBy || "") +
        '"/>' +
        '<button type="button" class="btn sm" id="bmGrFriendSave">' +
        esc(t("streakDuoSave")) +
        "</button>" +
        (s.invitedBy
          ? '<p style="font-size:11.5px;margin-top:8px;opacity:.75">ref: ' + esc(s.invitedBy) + "</p>"
          : "") +
        "</div>" +
        '<div class="bm-gr-actions">' +
        '<button type="button" class="btn gold" id="bmGrWa">' +
        esc(t("inviteBtn")) +
        "</button>" +
        '<button type="button" class="btn ghost" id="bmGrClose">' +
        esc(t("later")) +
        "</button></div>"
    );
    document.getElementById("bmGrWa").onclick = function () {
      shareInvite();
      closeOv();
      setTimeout(openInviteSheet, 400);
    };
    document.getElementById("bmGrClose").onclick = closeOv;
    document.getElementById("bmGrFriendSave").onclick = function () {
      var v = String((document.getElementById("bmGrFriend") || {}).value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 16);
      var st = state();
      st.friendCode = v || null;
      save(st);
      alert(t("streakDuoSaved"));
    };
  }

  /* ---------- Smart notifications ---------- */
  function isNative() {
    try {
      return !!(window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform());
    } catch (e) {
      return false;
    }
  }
  function getLN() {
    try {
      return window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.LocalNotifications;
    } catch (e) {
      return null;
    }
  }
  function goalsLeft() {
    try {
      if (window.BmTargetHarian && BmTargetHarian.goals) {
        var g = BmTargetHarian.goals();
        return Math.max(0, (g.needed | 0) - (g.doneCount | 0));
      }
    } catch (e) {}
    return 1;
  }
  function ishaDate(dayOffset) {
    dayOffset = dayOffset || 0;
    try {
      var d = new Date();
      d.setDate(d.getDate() + dayOffset);
      d.setHours(0, 0, 0, 0);
      if (window.RKPT && typeof RKPT.times === "function") {
        var tm = RKPT.times(d);
        if (tm && tm.isha instanceof Date) return tm.isha;
        if (tm && typeof tm.isha === "number") {
          /* hours float */
          var h = tm.isha;
          var out = new Date(d);
          out.setHours(Math.floor(h), Math.round((h % 1) * 60), 0, 0);
          return out;
        }
      }
    } catch (e) {}
    var fallback = new Date();
    fallback.setDate(fallback.getDate() + dayOffset);
    fallback.setHours(19, 0, 0, 0);
    return fallback;
  }
  function morningDate(dayOffset) {
    var d = new Date();
    d.setDate(d.getDate() + (dayOffset || 0));
    d.setHours(6, 30, 0, 0);
    return d;
  }

  async function cancelSmartNotifs() {
    var LN = getLN();
    if (!LN) return;
    try {
      await LN.cancel({ notifications: [{ id: NOTIF_AM_ID }, { id: NOTIF_PM_ID }] });
    } catch (e) {}
  }

  async function scheduleSmartNotifs() {
    if (!state().notifSmart) {
      await cancelSmartNotifs();
      return { ok: true, scheduled: 0, off: true };
    }
    if (!isNative()) {
      maybeWebBanners();
      return { ok: true, web: true };
    }
    var LN = getLN();
    if (!LN) return { ok: false, reason: "no_ln" };
    try {
      await LN.requestPermissions();
    } catch (e) {}
    try {
      if (typeof LN.createChannel === "function") {
        await LN.createChannel({
          id: CHANNEL,
          name: "Best Muslim personal",
          description: "Morning Qur'an word & streak nudge (silent)",
          importance: 3,
          sound: undefined,
          visibility: 1
        });
      }
    } catch (e) {}
    await cancelSmartNotifs();
    var now = Date.now();
    var list = [];
    /* schedule today+tomorrow morning */
    for (var i = 0; i < 2; i++) {
      var am = morningDate(i);
      if (+am > now + 60000) {
        list.push({
          id: NOTIF_AM_ID + i * 10,
          title: "Best Muslim",
          body: t("notifAmBody"),
          schedule: { at: am, allowWhileIdle: true },
          channelId: CHANNEL,
          extra: { bm: "smart_am" }
        });
      }
    }
    /* evening nudge only if goals incomplete — schedule for today (and tomorrow tentatively) */
    for (var j = 0; j < 2; j++) {
      if (j === 0 && goalsLeft() <= 0) continue;
      var isha = ishaDate(j);
      var pm = new Date(+isha - 30 * 60 * 1000);
      if (+pm > now + 60000) {
        var left = j === 0 ? goalsLeft() : 2;
        var n = streakNow();
        var body =
          left === 1 ? t("notifPmBodyOne", { n: n }) : t("notifPmBody", { n: n, left: left });
        list.push({
          id: NOTIF_PM_ID + j * 10,
          title: "Best Muslim",
          body: body,
          schedule: { at: pm, allowWhileIdle: true },
          channelId: CHANNEL,
          extra: { bm: "smart_pm" }
        });
      }
    }
    /* Cap to 2 unique slots conceptually: we schedule am+pm per day but cancel/reschedule on open */
    try {
      if (list.length) await LN.schedule({ notifications: list.slice(0, 4) });
    } catch (e) {
      console.warn("[bm-growth] smart notif schedule", e);
    }
    return { ok: true, scheduled: list.length };
  }

  function maybeWebBanners() {
    if (!state().notifSmart || isNative()) return;
    var now = new Date();
    var s = state();
    var h = now.getHours();
    var m = now.getMinutes();
    var key = null;
    var title = "";
    var body = "";
    if (h === 6 && m >= 25 && m <= 45) {
      key = "am:" + dkey();
      title = t("notifAm");
      body = t("bannerAm");
    } else if (goalsLeft() > 0) {
      var isha = ishaDate(0);
      var diff = +isha - 30 * 60 * 1000 - +now;
      if (diff > -5 * 60 * 1000 && diff < 15 * 60 * 1000) {
        key = "pm:" + dkey();
        title = t("notifPm");
        body = t("bannerPm", { n: streakNow() });
      }
    }
    if (!key || s.lastBanner === key) return;
    s.lastBanner = key;
    save(s);
    showBanner(title, body, key.indexOf("am") === 0 ? "kata" : "beranda");
  }
  function showBanner(title, body, goTo) {
    var el = document.getElementById("bmGrBanner");
    if (!el) {
      el = document.createElement("div");
      el.id = "bmGrBanner";
      el.className = "bm-gr-banner";
      document.body.appendChild(el);
    }
    el.innerHTML =
      "<b>" +
      esc(title) +
      "</b><p>" +
      esc(body) +
      '</p><div class="row"><button type="button" class="btn gold" id="bmGrBanGo">' +
      esc(t("openApp")) +
      '</button><button type="button" class="btn ghost" id="bmGrBanX">' +
      esc(t("dismiss")) +
      "</button></div>";
    el.classList.add("on");
    document.getElementById("bmGrBanX").onclick = function () {
      el.classList.remove("on");
    };
    document.getElementById("bmGrBanGo").onclick = function () {
      el.classList.remove("on");
      try {
        if (goTo === "kata" && window.__BM_KATA_QURAN && __BM_KATA_QURAN.open) __BM_KATA_QURAN.open();
        else if (window.go) window.go("beranda");
      } catch (e) {}
    };
  }

  /* ---------- Settings UI ---------- */
  function renderSettings() {
    var stack = document.getElementById("stStack");
    if (!stack) return;
    var card = document.getElementById("bmGrowthSettings");
    if (!card) {
      card = document.createElement("div");
      card.id = "bmGrowthSettings";
      card.className = "card";
      stack.appendChild(card);
    }
    var s = state();
    card.innerHTML =
      '<div class="eyebrow">' +
      esc(t("inviteTitle")) +
      "</div>" +
      '<p class="dim" style="font-size:12px;margin-top:6px">' +
      esc(t("inviteLead")) +
      "</p>" +
      '<button type="button" class="btn sm gold" id="bmGrInviteBtn" style="margin-top:8px">' +
      esc(t("inviteBtn")) +
      "</button>" +
      (s.badgePenyeru ? '<div class="bm-gr-badge">' + esc(t("inviteBadge")) + "</div>" : "") +
      '<div class="eyebrow" style="margin-top:16px">' +
      esc(t("notifTitle")) +
      "</div>" +
      '<p class="dim" style="font-size:12px;margin-top:6px">' +
      esc(t("notifLead")) +
      "</p>" +
      '<label class="bm-gr-tog"><span>' +
      esc(t("notifToggle")) +
      '</span><input type="checkbox" id="bmGrNotifTog"' +
      (s.notifSmart ? " checked" : "") +
      "/></label>" +
      '<p class="dim" style="font-size:11.5px;margin:4px 0">' +
      esc(t("notifAm")) +
      "<br>" +
      esc(t("notifPm")) +
      "</p>";
    var inv = document.getElementById("bmGrInviteBtn");
    if (inv)
      inv.onclick = function () {
        openInviteSheet();
      };
    var tog = document.getElementById("bmGrNotifTog");
    if (tog)
      tog.onchange = function () {
        var st = state();
        st.notifSmart = !!tog.checked;
        save(st);
        scheduleSmartNotifs();
      };
  }

  /* ---------- Achievement watchers ---------- */
  /* Auto share ONLY when both required Hari ini goals are done (Sholat + Hikmah; once/day via goals:YYYY-MM-DD).
     Qur'an is optional bonus and does not trigger share/streak. Streak still appears on the goals card. */
  function checkStreakMilestones() {
    /* retained for API compat — no auto-popup */
    return false;
  }
  function checkKhatam() {
    /* retained for API compat — no auto-popup */
    return false;
  }

  function onQuranTargetReached(meta) {
    /* no auto-popup on Qur'an target alone */
    return false;
  }
  function onGoalsComplete(meta) {
    meta = meta || {};
    if (meta.streak == null) meta.streak = streakNow();
    return offerShare("goals", meta);
  }
  function onStreakMaybe() {
    /* no auto-popup on streak milestones alone */
  }

  function hookTarget() {
    var T = window.BmTargetHarian;
    if (!T || T._bmGrHook) return;
    T._bmGrHook = 1;
    var _cele = T.openCelebration;
    if (typeof _cele === "function") {
      T.openCelebration = function (s) {
        _cele.apply(this, arguments);
        setTimeout(function () {
          onGoalsComplete({ streak: (s && s.streak) || streakNow() });
        }, 900);
      };
    }
  }

  function boot() {
    captureRefFromUrl();
    renderSettings();
    hookTarget();
    scheduleSmartNotifs();
    setInterval(maybeWebBanners, 60000);
    maybeWebBanners();

    var _go = window.go;
    if (typeof _go === "function" && !_go._bmGr) {
      window.go = function (p) {
        _go.apply(this, arguments);
        if (p === "settings") setTimeout(renderSettings, 80);
        if (p === "beranda") setTimeout(function () {
          hookTarget();
          scheduleSmartNotifs();
        }, 200);
      };
      window.go._bmGr = 1;
    }
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) scheduleSmartNotifs();
    });
    document.addEventListener("rk:lang", function () {
      setTimeout(renderSettings, 40);
    });

    /* Demo hooks for screenshots */
    try {
      var q = new URLSearchParams(location.search || "");
      var demo = q.get("bm_growth_demo");
      if (demo === "share-streak7" || demo === "streak7") {
        /* force-only demo; not an auto trigger in production */
        setTimeout(function () {
          offerShare("streak", { n: 7, force: true });
        }, 600);
      }
      if (demo === "share-story" || demo === "story" || demo === "share-allgoals" || demo === "allgoals") {
        setTimeout(function () {
          offerShare("goals", { force: true, streak: streakNow() });
        }, 600);
      }
      if (demo === "invite") {
        setTimeout(openInviteSheet, 500);
      }
      if (demo === "notif" || demo === "notif-settings") {
        setTimeout(function () {
          if (window.go) window.go("settings");
          setTimeout(renderSettings, 200);
        }, 400);
      }
    } catch (e) {}
  }

  window.BmGrowth = {
    offerShare: offerShare,
    onQuranTargetReached: onQuranTargetReached,
    onGoalsComplete: onGoalsComplete,
    onStreakMaybe: onStreakMaybe,
    openInviteSheet: openInviteSheet,
    shareInvite: shareInvite,
    scheduleSmartNotifs: scheduleSmartNotifs,
    renderSettings: renderSettings,
    state: state,
    inviteUrl: inviteUrl,
    /* Explicit report for parent */
    backendNeeds: {
      inviteAttribution: "Count installs/opens per ref code across devices; reward inviter.",
      streakBerdua: "Sync two users' live streaks; verify friend link; anti-cheat.",
      shareAnalytics: "Optional aggregate share counts (privacy-preserving).",
      pushServer: "Remote push beyond local scheduling (not required for current 2/day local notifs)."
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
