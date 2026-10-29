/* Best Muslim — Jejak Nur (local prototype social feed). Sample data only; no backend. */
(function () {
  "use strict";
  const PAGE = "jejak-nur";
  const SK_POSTS = "rk_jn_posts_v1";
  const SK_REACT = "rk_jn_react_v1";
  const SK_PROF = "rk_jn_prof_v1";
  const SK_SEED = "rk_jn_seed_v1";

  const UI = {
    id: {
      ey: "Komunitas",
      title: "Jejak Nur",
      sub: "Berbagi jejak kebaikan — konten contoh (uji lokal)",
      sample: "Konten contoh · bukan orang sungguhan · uji lokal",
      tabFeed: "Feed",
      tabMine: "Profil",
      compose: "Tulis jejak",
      publish: "Bagikan",
      cancel: "Batal",
      back: "Kembali",
      ph: "Tuliskan refleksi atau doamu…",
      type: "Jenis jejak",
      tHijrah: "Cerita Hijrah",
      tHijrahS: "Perjalanan mendekat ke Allah",
      tRef: "Refleksi Harian",
      tRefS: "Renungan singkat hari ini",
      tAch: "Pencapaian",
      tAchS: "Streak, khatam, hafalan",
      tPray: "Minta Didoakan",
      tPrayS: "Mohon doa sahabat",
      addImg: "Tambah foto",
      rmImg: "Hapus",
      sisip: "Sisipkan ayat/hadis",
      pickQ: "Al-Qur'an",
      pickH: "Hadis",
      pickTitle: "Pilih dalil terverifikasi",
      pickHint: "Hanya dari koleksi Qur'an (Kemenag) / hadis di aplikasi — tidak bisa diketik bebas.",
      loading: "Memuat…",
      emptyPick: "Tidak ada hasil",
      reactJ: "Jazakallah",
      reactA: "Aamiin",
      reactD: "Doakan",
      report: "Laporkan",
      reported: "Laporan terkirim (uji)",
      pending: "Menunggu tinjauan",
      pendingNote: "Akun baru · menunggu tinjauan sebelum tampil publik",
      chip1: "Barakallah",
      chip2: "Semangat terus",
      chip3: "Doaku menyertai",
      chip4: "Masyaallah",
      chipOk: "Komentar contoh ditambahkan",
      profEy: "Profil contoh",
      streak: "Streak",
      khatam: "Khatam",
      hafalan: "Hafalan",
      badges: "Lencana",
      own: "Jejakmu",
      none: "Belum ada jejak",
      needText: "Tulis isi dulu",
      published: "Jejak dibagikan (tersimpan lokal)",
      entryT: "Jejak Nur",
      entryS: "Feed kebaikan · komunitas contoh",
      days: "hari",
      juz: "juz",
      open: "Buka",
      pesan: "Pesan",
      pesanT: "Pesan masuk",
      pesanEmpty: "Belum ada pesan. Doa dan salam akan muncul di sini.",
      pesanSample: "Konten contoh kotak masuk",
      thread1: "Sahabat Nur",
      thread1p: "Barakallah atas streak-mu 🌿",
      thread2: "Hamba Allah",
      thread2p: "Aamiin, semoga istiqamah",
      threadSys: "Jejak Nur",
      threadSysp: "Selamat datang di Jamaah — uji lokal",
      semuaFitur: "Semua fitur",
      pengaturan: "Pengaturan",
      editProf: "Edit profil",
      editProfT: "Edit profil",
      saveProf: "Simpan",
      displayName: "Nama tampilan",
      handle: "Username",
      bio: "Bio",
      bioPh: "Ceritakan singkat tentang perjalananmu…",
      bioMax: "Maks. 150 karakter",
      changeAv: "Ganti foto",
      cropAv: "Geser untuk membingkai",
      avHint: "Foto dari perangkat · dikompres otomatis",
      menu: "Menu",
      postsGrid: "Jejak",
      postDetail: "Detail jejak",
      noPosts: "Belum ada jejak. Bagikan foto atau refleksi pertamamu.",
      imgOnly: "Gambar saja (tanpa video)",
      needContent: "Tambahkan teks atau foto",
      handlePh: "@username",
      handleInvalid: "Username: 3–20 huruf/angka/_",
      fabAria: "Tulis jejak"
    },
    en: {
      ey: "Community",
      title: "Jejak Nur",
      sub: "Share trails of goodness — sample content (local demo)",
      sample: "Sample content · not real people · local demo",
      tabFeed: "Feed",
      tabMine: "Profile",
      compose: "Write a trail",
      publish: "Share",
      cancel: "Cancel",
      back: "Back",
      ph: "Write a reflection or prayer…",
      type: "Trail type",
      tHijrah: "Hijrah Story",
      tHijrahS: "A journey closer to Allah",
      tRef: "Daily Reflection",
      tRefS: "A short thought for today",
      tAch: "Achievement",
      tAchS: "Streak, khatam, memorization",
      tPray: "Ask for Du'a",
      tPrayS: "Request prayers from friends",
      addImg: "Add photo",
      rmImg: "Remove",
      sisip: "Insert ayah/hadith",
      pickQ: "Qur'an",
      pickH: "Hadith",
      pickTitle: "Choose verified evidence",
      pickHint: "Only from the app's Qur'an (Kemenag) / hadith — no free-typed dalil.",
      loading: "Loading…",
      emptyPick: "No results",
      reactJ: "Jazakallah",
      reactA: "Aameen",
      reactD: "Pray for them",
      report: "Report",
      reported: "Report sent (demo)",
      pending: "Awaiting review",
      pendingNote: "New account · awaiting review before public view",
      chip1: "Barakallah",
      chip2: "Keep going",
      chip3: "My du'a is with you",
      chip4: "MashaAllah",
      chipOk: "Sample comment added",
      profEy: "Sample profile",
      streak: "Streak",
      khatam: "Khatam",
      hafalan: "Memorization",
      badges: "Badges",
      own: "Your trails",
      none: "No trails yet",
      needText: "Write something first",
      published: "Trail shared (saved locally)",
      entryT: "Jejak Nur",
      entryS: "Goodness feed · sample community",
      days: "days",
      juz: "juz",
      open: "Open",
      pesan: "Messages",
      pesanT: "Inbox",
      pesanEmpty: "No messages yet. Du'as and greetings will show here.",
      pesanSample: "Sample inbox content",
      thread1: "Sahabat Nur",
      thread1p: "Barakallah on your streak 🌿",
      thread2: "Hamba Allah",
      thread2p: "Aameen — may you stay steadfast",
      threadSys: "Jejak Nur",
      threadSysp: "Welcome to Jamaah — local demo",
      semuaFitur: "All features",
      pengaturan: "Settings",
      editProf: "Edit profile",
      editProfT: "Edit profile",
      saveProf: "Save",
      displayName: "Display name",
      handle: "Username",
      bio: "Bio",
      bioPh: "A short note about your journey…",
      bioMax: "Max 150 characters",
      changeAv: "Change photo",
      cropAv: "Drag to frame",
      avHint: "Photo from device · auto-compressed",
      menu: "Menu",
      postsGrid: "Posts",
      postDetail: "Post",
      noPosts: "No posts yet. Share your first photo or reflection.",
      imgOnly: "Images only (no video)",
      needContent: "Add text or a photo",
      handlePh: "@username",
      handleInvalid: "Username: 3–20 letters/numbers/_",
      fabAria: "Write a trail"
    },
    ar: {
      ey: "المجتمع",
      title: "أثر النور",
      sub: "شارك أثر الخير — محتوى تجريبي محلي",
      sample: "محتوى تجريبي · ليست أسماء حقيقية · عرض محلي",
      tabFeed: "الخلاصة",
      tabMine: "الملف",
      compose: "اكتب أثرًا",
      publish: "انشر",
      cancel: "إلغاء",
      back: "رجوع",
      ph: "اكتب تأمّلًا أو دعاءً…",
      type: "نوع الأثر",
      tHijrah: "قصة الهجرة",
      tHijrahS: "رحلة الاقتراب من الله",
      tRef: "تأمّل يومي",
      tRefS: "خاطرة قصيرة لليوم",
      tAch: "إنجاز",
      tAchS: "سلسلة وختم وحفظ",
      tPray: "اطلب الدعاء",
      tPrayS: "اطلب دعاء الأصدقاء",
      addImg: "أضف صورة",
      rmImg: "حذف",
      sisip: "أدرج آية/حديثًا",
      pickQ: "القرآن",
      pickH: "الحديث",
      pickTitle: "اختر دليلًا موثّقًا",
      pickHint: "من مجموعة القرآن (وزارة الشؤون الدينية) / الحديث في التطبيق فقط — بلا كتابة حرّة.",
      loading: "جارٍ التحميل…",
      emptyPick: "لا نتائج",
      reactJ: "جزاك الله",
      reactA: "آمين",
      reactD: "ادعُ له",
      report: "إبلاغ",
      reported: "تم الإبلاغ (تجريبي)",
      pending: "بانتظار المراجعة",
      pendingNote: "حساب جديد · بانتظار المراجعة قبل الظهور",
      chip1: "بارك الله",
      chip2: "واصل",
      chip3: "دعائي معك",
      chip4: "ما شاء الله",
      chipOk: "أُضيف تعليق تجريبي",
      profEy: "ملف تجريبي",
      streak: "سلسلة",
      khatam: "ختم",
      hafalan: "حفظ",
      badges: "أوسمة",
      own: "آثارك",
      none: "لا آثار بعد",
      needText: "اكتب المحتوى أولًا",
      published: "نُشر الأثر (محليًا)",
      entryT: "أثر النور",
      entryS: "خلاصة الخير · مجتمع تجريبي",
      days: "يومًا",
      juz: "جزء",
      open: "افتح",
      pesan: "الرسائل",
      pesanT: "الوارد",
      pesanEmpty: "لا رسائل بعد. ستظهر الأدعية والسلام هنا.",
      pesanSample: "محتوى وارد تجريبي",
      thread1: "صحبة النور",
      thread1p: "بارك الله في سلسلتك 🌿",
      thread2: "عبد الله",
      thread2p: "آمين — ثبّتك الله",
      threadSys: "أثر النور",
      threadSysp: "مرحبًا في الجماعة — عرض محلي",
      semuaFitur: "كل الميزات",
      pengaturan: "الإعدادات",
      editProf: "تعديل الملف",
      editProfT: "تعديل الملف",
      saveProf: "حفظ",
      displayName: "الاسم المعروض",
      handle: "اسم المستخدم",
      bio: "نبذة",
      bioPh: "نبذة قصيرة عن رحلتك…",
      bioMax: "بحد أقصى 150 حرفًا",
      changeAv: "تغيير الصورة",
      cropAv: "حرّك للإطار",
      avHint: "صورة من الجهاز · تُضغط تلقائيًا",
      menu: "القائمة",
      postsGrid: "المنشورات",
      postDetail: "المنشور",
      noPosts: "لا منشورات بعد. شارك أول صورة أو تأمّل.",
      imgOnly: "صور فقط (بدون فيديو)",
      needContent: "أضف نصًا أو صورة",
      handlePh: "@username",
      handleInvalid: "اسم المستخدم: 3–20 حرفًا/رقمًا/_",
      fabAria: "اكتب أثرًا"
    }
  };

  const TYPES = [
    { id: "hijrah", ic: "🌱", t: "tHijrah", s: "tHijrahS" },
    { id: "refleksi", ic: "🕊️", t: "tRef", s: "tRefS" },
    { id: "pencapaian", ic: "🏅", t: "tAch", s: "tAchS" },
    { id: "doa", ic: "🤲", t: "tPray", s: "tPrayS" }
  ];

  /* Sample posts — generic names only */
  const SEED = [
    {
      id: "s1",
      type: "hijrah",
      author: "Hamba Allah",
      av: "HA",
      age: "2j",
      text: {
        id: "Dulu aku menunda salat. Sekarang azan pertama jadi pengingat paling manis. Semoga istiqamah.",
        en: "I used to delay prayer. Now the first adhan is my sweetest reminder. May I stay steadfast.",
        ar: "كنت أؤخّر الصلاة. الآن الأذان الأول أجمل تذكير لي. اللهم ثبّتني."
      },
      dalil: {
        kind: "quran",
        ref: "QS. Thaha 20:14",
        ar: "إِنَّنِىٓ أَنَا ٱللَّهُ لَآ إِلَٰهَ إِلَّآ أَنَا۠ فَٱعْبُدْنِى وَأَقِمِ ٱلصَّلَوٰةَ لِذِكْرِى",
        mn: {
          id: "Sungguh, Aku ini Allah, tidak ada tuhan selain Aku, maka sembahlah Aku dan tegakkanlah salat untuk mengingat-Ku.",
          en: "Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance.",
          ar: "إنني أنا الله لا إله إلا أنا فاعبدني وأقم الصلاة لذكري"
        }
      },
      counts: { j: 12, a: 4, d: 7 },
      pending: false,
      own: false
    },
    {
      id: "s2",
      type: "pencapaian",
      author: "Sahabat Nur",
      av: "SN",
      age: "5j",
      text: {
        id: "Alhamdulillah streak tilawah 30 hari. Bukan karena sempurna — karena Allah memberi kekuatan sedikit demi sedikit.",
        en: "Alhamdulillah — 30-day tilawah streak. Not because I am perfect — Allah gave strength little by little.",
        ar: "الحمد لله — سلسلة تلاوة ٣٠ يومًا. لست كاملًا؛ الله أعطى القوة شيئًا فشيئًا."
      },
      achievement: { streak: 30 },
      counts: { j: 28, a: 9, d: 15 },
      pending: false,
      own: false
    },
    {
      id: "s3",
      type: "doa",
      author: "Hamba Allah",
      av: "HA",
      age: "8j",
      text: {
        id: "Mohon doanya, sedang berjuang menjaga mata dan hati di tengah hiruk kerja. Semoga Allah menjaga kita semua.",
        en: "Please keep me in your du'a — striving to guard eyes and heart at work. May Allah protect us all.",
        ar: "ادعوا لي — أجاهد لحفظ العين والقلب في العمل. حفظنا الله جميعًا."
      },
      counts: { j: 6, a: 31, d: 22 },
      pending: false,
      own: false
    },
    {
      id: "s4",
      type: "refleksi",
      author: "Sahabat Nur",
      av: "SN",
      age: "1h",
      text: {
        id: "Hari ini belajar: khusyuk bukan suasana — tapi pilihan untuk hadir di hadapan Allah, satu ayat demi satu ayat.",
        en: "Today's lesson: khushu' is not a mood — it is choosing to be present before Allah, one ayah at a time.",
        ar: "درس اليوم: الخشوع ليس مزاجًا — بل اختيار الحضور بين يدي الله آيةً آيةً."
      },
      dalil: {
        kind: "hadith",
        ref: "HR Bukhari & Muslim",
        ar: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
        mn: {
          id: "Sesungguhnya amal itu tergantung niatnya.",
          en: "Actions are but by intentions.",
          ar: "إنما الأعمال بالنيات"
        }
      },
      counts: { j: 9, a: 3, d: 5 },
      pending: false,
      own: false
    },
    {
      id: "s5",
      type: "pencapaian",
      author: "Hamba Allah",
      av: "HA",
      age: "Kemarin",
      text: {
        id: "Baru selesai khatam juz 1–5 bulan ini. Pelan tapi konsisten. Yuk saling menguatkan.",
        en: "Just finished juz 1–5 this month. Slow but steady. Let's strengthen each other.",
        ar: "أتممت الأجزاء ١–٥ هذا الشهر. ببطء وثبات. لنشدّ بعضنا."
      },
      achievement: { khatam: 5 },
      counts: { j: 17, a: 6, d: 8 },
      pending: false,
      own: false
    },
    {
      id: "s6",
      type: "hijrah",
      author: "Sahabat Nur",
      av: "SN",
      age: "Baru",
      text: {
        id: "Akun baru di Jejak Nur. Sedang belajar menata niat. Mohon doanya agar konten ini bermanfaat.",
        en: "New on Jejak Nur. Learning to set intention. Please pray this content benefits others.",
        ar: "حساب جديد في أثر النور. أتعلّم تصحيح النيّة. ادعوا أن ينفع هذا المحتوى."
      },
      counts: { j: 0, a: 1, d: 2 },
      pending: true,
      own: false
    }
  ];

  /* Curated verified picks (Kemenag ID / known sahih) — no free typing */
  const Q_PICKS = [
    { s: 1, a: 1, ref: "QS. Al-Fatihah 1:1", ar: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", id: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.", en: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
    { s: 2, a: 152, ref: "QS. Al-Baqarah 2:152", ar: "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ", id: "Maka ingatlah kepada-Ku, Aku pun akan ingat kepadamu. Bersyukurlah kepada-Ku, dan janganlah kamu ingkar kepada-Ku.", en: "So remember Me; I will remember you. And be grateful to Me and do not deny Me." },
    { s: 2, a: 286, ref: "QS. Al-Baqarah 2:286", ar: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا", id: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.", en: "Allah does not charge a soul except [with that within] its capacity." },
    { s: 13, a: 28, ref: "QS. Ar-Ra'd 13:28", ar: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ", id: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenang.", en: "Unquestionably, by the remembrance of Allah hearts are assured." },
    { s: 20, a: 14, ref: "QS. Thaha 20:14", ar: "وَأَقِمِ ٱلصَّلَوٰةَ لِذِكْرِى", id: "…dan tegakkanlah salat untuk mengingat-Ku.", en: "…and establish prayer for My remembrance." },
    { s: 94, a: 5, ref: "QS. Ash-Sharh 94:5", ar: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", id: "Maka sesungguhnya bersama kesulitan ada kemudahan.", en: "For indeed, with hardship [will be] ease." }
  ];

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
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
  const L3 = (o) => {
    if (!o) return "";
    if (typeof o === "string") return o;
    return o[lang()] || o.id || o.en || "";
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
    } catch (e) {}
  };
  const toast = (m) => {
    try {
      if (window.toast) return window.toast(m);
    } catch (e) {}
    console.log("[jn]", m);
  };

  function ensureSeed() {
    if (!storeGet(SK_SEED, false)) {
      storeSet(SK_POSTS, SEED.slice());
      storeSet(SK_SEED, true);
    }
    if (!storeGet(SK_PROF, null)) {
      storeSet(SK_PROF, defaultProf());
    } else {
      const P = storeGet(SK_PROF, {});
      let changed = false;
      if (!P.handle) { P.handle = slugHandle(P.name || "hambaallah"); changed = true; }
      if (P.bio == null) { P.bio = ""; changed = true; }
      if (P.avatarUrl === undefined) { P.avatarUrl = null; changed = true; }
      if (changed) storeSet(SK_PROF, P);
    }
    seedOwnDemo();
  }

  function slugHandle(name) {
    return String(name || "user")
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "")
      .slice(0, 16) || "user";
  }
  function defaultProf() {
    return {
      name: "Hamba Allah",
      handle: "hambaallah",
      bio: "Belajar istiqamah, satu langkah sehari. 🌿",
      av: "HA",
      avatarUrl: null,
      streak: 12,
      khatam: 2,
      hafalan: 3,
      badges: ["Istiqamah 7", "Tilawah 10", "Hafiz Juz 30"]
    };
  }
  function seedOwnDemo() {
    /* Ensure a few own posts exist for grid demo (once) */
    if (storeGet("rk_jn_own_demo_v1", false)) return;
    const list = storeGet(SK_POSTS, SEED.slice());
    const hasOwn = list.some((p) => p.own);
    if (!hasOwn) {
      const demoImg = makeDemoThumb("#0F3D2E", "#c9a24a", "Alhamdulillah");
      const demoImg2 = makeDemoThumb("#6E4A54", "#F3E4E6", "Istiqamah");
      list.unshift(
        {
          id: "own_img1",
          type: "pencapaian",
          author: "Hamba Allah",
          av: "HA",
          age: "1j",
          text: { id: "Streak tilawah 30 hari — alhamdulillah.", en: "30-day tilawah streak — alhamdulillah.", ar: "سلسلة تلاوة ٣٠ يومًا — الحمد لله." },
          img: demoImg,
          counts: { j: 8, a: 3, d: 2 },
          own: true
        },
        {
          id: "own_txt1",
          type: "refleksi",
          author: "Hamba Allah",
          av: "HA",
          age: "3j",
          text: { id: "Khusyuk bukan suasana — ia adalah keputusan hati.", en: "Khushu' is not a mood — it is a decision of the heart.", ar: "الخشوع ليس مزاجًا — بل قرار القلب." },
          img: null,
          counts: { j: 5, a: 1, d: 0 },
          own: true
        },
        {
          id: "own_img2",
          type: "hijrah",
          author: "Hamba Allah",
          av: "HA",
          age: "1h",
          text: { id: "Langkah kecil menuju masjid.", en: "Small steps toward the mosque.", ar: "خطوات صغيرة نحو المسجد." },
          img: demoImg2,
          counts: { j: 4, a: 2, d: 1 },
          own: true
        }
      );
      storeSet(SK_POSTS, list);
    }
    storeSet("rk_jn_own_demo_v1", true);
  }
  function makeDemoThumb(a, b, label) {
    try {
      const c = document.createElement("canvas");
      c.width = 480;
      c.height = 480;
      const ctx = c.getContext("2d");
      const g = ctx.createLinearGradient(0, 0, 480, 480);
      g.addColorStop(0, a);
      g.addColorStop(1, b);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 480, 480);
      ctx.fillStyle = "rgba(255,255,255,.9)";
      ctx.font = "600 28px system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, 240, 250);
      return c.toDataURL("image/webp", 0.82);
    } catch (e) {
      return null;
    }
  }

  function posts() {
    ensureSeed();
    return storeGet(SK_POSTS, SEED.slice());
  }
  function savePosts(p) {
    storeSet(SK_POSTS, p);
  }
  function reacts() {
    return storeGet(SK_REACT, {});
  }
  function saveReacts(r) {
    storeSet(SK_REACT, r);
  }

  function typeLabel(id) {
    const x = TYPES.find((z) => z.id === id) || TYPES[0];
    return x.ic + " " + t(x.t);
  }

  function mountPage() {
    let sec = $("#page-jejak-nur");
    const body = `
      <div class="stack" id="jnRoot">
        <div class="jn-top">
          <button type="button" class="btn sm ghost" data-jn="back"></button>
          <div>
            <div class="eyebrow" data-jn-i="ey"></div>
            <h1 data-jn-i="title"></h1>
          </div>
          <button type="button" class="jn-msg" data-jn="pesan" aria-label="Pesan">💬<em>3</em></button>
        </div>
        <p class="jn-sample" data-jn-i="sample"></p>
        <div class="jn-tabs" role="tablist">
          <button type="button" class="on" data-jn-tab="feed" data-jn-i="tabFeed"></button>
          <button type="button" data-jn-tab="prof" data-jn-i="tabMine"></button>
        </div>
        <div id="jnView"></div>
        <div class="jn-fab"><button type="button" data-jn="compose" aria-label="Compose"><span aria-hidden="true">+</span><span class="jn-fab-lab" data-jn-i="compose"></span></button></div>
      </div>
      <div class="jn-sheet" id="jnSheet" hidden>
        <div class="jn-sheet-in" role="dialog" aria-modal="true" aria-labelledby="jnSheetT">
          <div class="jn-sheet-hd"><h2 id="jnSheetT"></h2><button type="button" class="btn sm ghost" data-jn="sheetx">✕</button></div>
          <div id="jnSheetBody"></div>
        </div>
      </div>`;
    if (sec) {
      if (!$("#jnRoot", sec)) sec.innerHTML = body;
      return;
    }
    sec = document.createElement("section");
    sec.className = "page";
    sec.id = "page-jejak-nur";
    sec.innerHTML = body;
    const host = $("#view") || document.body;
    host.appendChild(sec);
  }

  function entryCard() {
    /* v88: Jejak Nur entry superseded by Jamaah tab + Fitur grid */
    const old = $("#jnBerandaCard");
    if (old) old.remove();
    return;
    const stack = $("#page-beranda .stack");
    if (!stack || $("#jnBerandaCard")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "jnBerandaCard";
    btn.className = "jn-entry";
    btn.dataset.go = PAGE;
    btn.innerHTML = `<span class="jn-entry-ic" aria-hidden="true">✨</span><span><b data-jn-entry="t"></b><small data-jn-entry="s"></small></span><span class="jn-chev" aria-hidden="true">›</span>`;
    const anchor = $("#bmDompet") || $("#bmTargetHost") || $("#v2PromoCard");
    if (anchor) anchor.before(btn);
    else stack.appendChild(btn);
    applyEntry();
  }

  function applyEntry() {
    const b = $("#jnBerandaCard");
    if (!b) return;
    const tb = b.querySelector('[data-jn-entry="t"]');
    const sb = b.querySelector('[data-jn-entry="s"]');
    if (tb) tb.textContent = t("entryT");
    if (sb) sb.textContent = t("entryS");
  }

  function applyI18n() {
    $$("[data-jn-i]").forEach((el) => {
      const k = el.getAttribute("data-jn-i");
      if (k) el.textContent = t(k);
    });
    const back = $('[data-jn="back"]');
    if (back) back.textContent = "← " + t("back");
    const msg = $('[data-jn="pesan"]');
    if (msg) msg.setAttribute("aria-label", t("pesan"));
    const fabBtn = $('.jn-fab [data-jn="compose"]');
    if (fabBtn) fabBtn.setAttribute("aria-label", t("fabAria"));
    applyEntry();
  }

  function patchPages() {
    try {
      if (Array.isArray(window.PAGES) && !window.PAGES.includes(PAGE)) window.PAGES.push(PAGE);
    } catch (e) {}
    /* Hook go's page list via wrapping — PAGES is const in IIFE; wrap window.go */
    const _go = window.go;
    if (_go && !_go._jn) {
      window.go = function (p) {
        if (p === PAGE) {
          showPage();
          return;
        }
        return _go(p);
      };
      window.go._jn = true;
      /* also keep reference for internal nav that uses bare go from outer scope — data-go uses window.go */
    }
  }

  function showPage(tab) {
    mountPage();
    if (tab === "prof" || tab === "feed") state.tab = tab;
    else {
      try {
        const s = sessionStorage.getItem("rk_jn_tab");
        if (s === "prof" || s === "feed") state.tab = s;
      } catch (e) {}
    }
    applyI18n();
    $$(".page").forEach((s) => s.classList.toggle("on", s.id === "page-" + PAGE));
    /* highlight Jamaah vs Profil in new nav */
    $$("#nav button").forEach((b) => {
      const p = b.dataset.p;
      let on = false;
      if (state.tab === "prof") on = p === "profil";
      else on = p === "jejak-nur" || p === PAGE;
      b.classList.toggle("on", !!on);
    });
    try {
      history.replaceState(history.state, "", "#" + (state.tab === "prof" ? "profil" : PAGE));
      sessionStorage.setItem("rk_jn_tab", state.tab || "feed");
    } catch (e) {}
    const root = $("#view");
    if (root) root.scrollTop = 0;
    state.tab = state.tab || "feed";
    /* hide FAB on profile */
    const fab = $(".jn-fab");
    if (fab) fab.style.display = state.tab === "prof" ? "none" : "";
    render();
  }

  const state = {
    tab: "feed",
    edit: null,
    compose: { type: "refleksi", text: "", img: null, dalil: null },
    picker: { mode: "q" }
  };

  function render() {
    applyI18n();
    $$("[data-jn-tab]").forEach((b) => b.classList.toggle("on", b.dataset.jnTab === state.tab));
    const view = $("#jnView");
    if (!view) return;
    if (state.tab === "prof") renderProfile(view);
    else renderFeed(view);
  }

  function renderFeed(view) {
    const list = posts();
    const R = reacts();
    view.innerHTML =
      `<div class="jn-feed">` +
      list
        .map((p) => {
          const my = R[p.id] || {};
          const counts = Object.assign({ j: 0, a: 0, d: 0 }, p.counts || {});
          const body = L3(p.text);
          const ach = p.achievement
            ? p.achievement.streak
              ? `<div class="jn-type">🔥 ${p.achievement.streak} ${esc(t("days"))}</div>`
              : p.achievement.khatam
                ? `<div class="jn-type">📖 ${p.achievement.khatam} ${esc(t("juz"))}</div>`
                : ""
            : "";
          const dalil = p.dalil
            ? `<div class="jn-dalil"><div class="ar" dir="rtl" lang="ar">${esc(p.dalil.ar)}</div><div class="mn">${esc(L3(p.dalil.mn))}</div><div class="lb">${esc(p.dalil.ref)} · ${p.dalil.kind === "quran" ? "Kemenag" : esc(p.dalil.ref)}</div></div>`
            : "";
          const img = p.img ? `<img class="jn-img" src="${esc(p.img)}" alt="">` : "";
          return `<article class="jn-card" data-id="${esc(p.id)}">
          <div class="jn-card-hd"><span class="jn-av">${esc(p.av || "?")}</span><div class="jn-meta"><b>${esc(p.author)}</b><small>${esc(p.age || "")}${p.own ? " · " + esc(t("own")) : ""}</small></div></div>
          <div class="jn-type">${esc(typeLabel(p.type))}</div>
          ${ach}
          <div class="jn-body">${esc(body)}</div>
          ${img}${dalil}
          ${p.pending ? `<div class="jn-pending">⏳ ${esc(t("pending"))} — ${esc(t("pendingNote"))}</div>` : ""}
          <div class="jn-react">
            <button type="button" data-jn-react="j" class="${my.j ? "on" : ""}">${esc(t("reactJ"))} · ${counts.j + (my.j ? 1 : 0)}</button>
            <button type="button" data-jn-react="a" class="${my.a ? "on" : ""}">${esc(t("reactA"))} · ${counts.a + (my.a ? 1 : 0)}</button>
            <button type="button" data-jn-react="d" class="${my.d ? "on" : ""}">${esc(t("reactD"))} · ${counts.d + (my.d ? 1 : 0)}</button>
          </div>
          <div class="jn-chips">
            <button type="button" data-jn-chip="1">${esc(t("chip1"))}</button>
            <button type="button" data-jn-chip="2">${esc(t("chip2"))}</button>
            <button type="button" data-jn-chip="3">${esc(t("chip3"))}</button>
            <button type="button" data-jn-chip="4">${esc(t("chip4"))}</button>
          </div>
          <div class="jn-card-ft"><button type="button" class="jn-rep" data-jn-report="1">${esc(t("report"))}</button></div>
        </article>`;
        })
        .join("") +
      `</div>`;
  }

  function avHtml(P, cls) {
    const c = cls || "jn-av";
    if (P.avatarUrl) return `<span class="${c} has-img"><img src="${esc(P.avatarUrl)}" alt=""></span>`;
    return `<span class="${c}">${esc(P.av || initials(P.name))}</span>`;
  }
  function initials(name) {
    const p = String(name || "HA").trim().split(/\s+/).slice(0, 2);
    return p.map((x) => x[0] || "").join("").toUpperCase() || "HA";
  }
  function handleOf(P) {
    const h = (P.handle || slugHandle(P.name || "user")).replace(/^@/, "");
    return "@" + h;
  }
  function renderProfile(view) {
    ensureSeed();
    const P = storeGet(SK_PROF, {});
    const mine = posts().filter((p) => p.own);
    const bio = (P.bio || "").slice(0, 150);
    view.innerHTML = `<div class="jn-prof tt">
      <div class="jn-prof-top">
        <button type="button" class="jn-icon-btn" data-jn="profmenu" aria-label="${esc(t("menu"))}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/></svg>
        </button>
        <button type="button" class="jn-icon-btn" data-jn="settings" aria-label="${esc(t("pengaturan"))}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.26.6.9 1 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z"/></svg>
        </button>
      </div>
      <div class="jn-prof-head">
        ${avHtml(P, "jn-av lg")}
        <h2 class="jn-disp">${esc(P.name || "Hamba Allah")}</h2>
        <div class="jn-handle">${esc(handleOf(P))}</div>
        <p class="jn-bio">${bio ? esc(bio) : `<span class="dim">${esc(t("bioPh"))}</span>`}</p>
        <button type="button" class="jn-edit-btn" data-jn="editprof">${esc(t("editProf"))}</button>
      </div>
      <div class="jn-stats">
        <div><b>${P.streak || 0}</b><span>${esc(t("streak"))}</span></div>
        <div><b>${P.khatam || 0}</b><span>${esc(t("khatam"))}</span></div>
        <div><b>${P.hafalan || 0}</b><span>${esc(t("hafalan"))}</span></div>
      </div>
      <div class="jn-badges">${(P.badges || []).map((b) => `<span>${esc(b)}</span>`).join("")}</div>
      <div class="jn-grid-lab"><span>${esc(t("postsGrid"))}</span><em>${mine.length}</em></div>
      <div class="jn-grid">${
        mine.length
          ? mine
              .map((p) => {
                const snip = L3(p.text) || "";
                if (p.img) {
                  return `<button type="button" class="jn-tile img" data-jn-post="${esc(p.id)}"><img src="${esc(p.img)}" alt=""><span class="jn-tile-type">${esc((TYPES.find((z) => z.id === p.type) || {}).ic || "")}</span>${p.pending ? `<em class="jn-tile-pend">⏳</em>` : ""}</button>`;
                }
                return `<button type="button" class="jn-tile txt t-${esc(p.type || "refleksi")}" data-jn-post="${esc(p.id)}"><span class="jn-tile-snip">${esc(snip.slice(0, 90))}${snip.length > 90 ? "…" : ""}</span><span class="jn-tile-type">${esc((TYPES.find((z) => z.id === p.type) || {}).ic || "")}</span>${p.pending ? `<em class="jn-tile-pend">⏳</em>` : ""}</button>`;
              })
              .join("")
          : `<p class="jn-grid-empty dim">${esc(t("noPosts"))}</p>`
      }</div>
    </div>`;
  }

  function openProfMenu() {
    openSheet(
      t("menu"),
      `<div class="jn-prof-acts">
        <button type="button" data-jn="settings"><span>${esc(t("pengaturan"))}</span><em>›</em></button>
        <button type="button" data-jn="allfitur"><span>${esc(t("semuaFitur"))}</span><em>›</em></button>
        <button type="button" data-jn="editprof"><span>${esc(t("editProf"))}</span><em>›</em></button>
      </div>`
    );
  }

  function openEditProf() {
    ensureSeed();
    const P = storeGet(SK_PROF, {});
    state.edit = {
      name: P.name || "",
      handle: (P.handle || "").replace(/^@/, ""),
      bio: P.bio || "",
      avatarUrl: P.avatarUrl || null,
      av: P.av || initials(P.name)
    };
    paintEditProf();
  }

  function paintEditProf() {
    const E = state.edit || {};
    const bioLen = (E.bio || "").length;
    openSheet(
      t("editProfT"),
      `<div class="jn-edit">
        <div class="jn-edit-av">
          ${E.avatarUrl ? `<span class="jn-av xl has-img"><img src="${esc(E.avatarUrl)}" alt=""></span>` : `<span class="jn-av xl">${esc(E.av || "HA")}</span>`}
          <button type="button" class="btn sm" data-jn="pickav">${esc(t("changeAv"))}</button>
          <input type="file" id="jnAvFile" accept="image/*" hidden>
          <p class="dim jn-av-hint">${esc(t("avHint"))}</p>
        </div>
        <label class="jn-field"><span>${esc(t("displayName"))}</span>
          <input type="text" id="jnName" maxlength="40" value="${esc(E.name || "")}">
        </label>
        <label class="jn-field"><span>${esc(t("handle"))}</span>
          <div class="jn-handle-in"><em>@</em><input type="text" id="jnHandle" maxlength="20" value="${esc(E.handle || "")}" placeholder="username"></div>
        </label>
        <label class="jn-field"><span>${esc(t("bio"))} <small id="jnBioCount">${bioLen}/150</small></span>
          <textarea id="jnBio" maxlength="150" rows="3" placeholder="${esc(t("bioPh"))}">${esc(E.bio || "")}</textarea>
        </label>
        <p class="dim" style="font-size:11.5px">${esc(t("bioMax"))}</p>
        <div class="row" style="gap:8px;margin-top:14px;justify-content:flex-end">
          <button type="button" class="btn ghost" data-jn="sheetx">${esc(t("cancel"))}</button>
          <button type="button" class="btn gold" data-jn="saveprof">${esc(t("saveProf"))}</button>
        </div>
      </div>`
    );
    const bio = $("#jnBio");
    if (bio) {
      bio.addEventListener("input", () => {
        const c = $("#jnBioCount");
        if (c) c.textContent = bio.value.length + "/150";
      });
    }
  }

  function saveEditProf() {
    const nameEl = $("#jnName");
    const handEl = $("#jnHandle");
    const bioEl = $("#jnBio");
    let name = (nameEl ? nameEl.value : state.edit.name || "").trim().slice(0, 40);
    let handle = (handEl ? handEl.value : state.edit.handle || "").trim().replace(/^@/, "").toLowerCase();
    let bio = (bioEl ? bioEl.value : state.edit.bio || "").slice(0, 150);
    if (!/^[a-z0-9_]{3,20}$/.test(handle)) {
      toast(t("handleInvalid"));
      return;
    }
    if (!name) name = "Hamba Allah";
    const P = storeGet(SK_PROF, defaultProf());
    P.name = name;
    P.handle = handle;
    P.bio = bio;
    P.avatarUrl = (state.edit && state.edit.avatarUrl) || null;
    P.av = initials(name);
    storeSet(SK_PROF, P);
    closeSheet();
    toast(t("saveProf") + " ✓");
    state.tab = "prof";
    render();
  }

  function openPostDetail(id) {
    const p = posts().find((x) => x.id === id);
    if (!p) return;
    const R = reacts()[id] || {};
    openSheet(
      t("postDetail"),
      `<article class="jn-detail">
        <div class="jn-meta">
          <span class="jn-av sm">${esc(p.av || "?")}</span>
          <div><b>${esc(p.author)}</b><small>${esc(p.age || "")} · ${esc(typeLabel(p.type))}</small></div>
        </div>
        ${p.img ? `<div class="jn-detail-img"><img src="${esc(p.img)}" alt=""></div>` : ""}
        <div class="jn-body">${esc(L3(p.text))}</div>
        ${
          p.dalil
            ? `<div class="jn-dalil"><div class="ar" dir="rtl">${esc(p.dalil.ar)}</div><div class="mn">${esc(L3(p.dalil.mn))}</div><div class="lb">${esc(p.dalil.ref)}</div></div>`
            : ""
        }
        ${p.pending ? `<div class="jn-pending">⏳ ${esc(t("pending"))}</div>` : ""}
        <div class="jn-reacts">
          <button type="button" data-jn-react="j" class="${R.j ? "on" : ""}">🤍 ${esc(t("reactJ"))} · ${p.counts.j + (R.j ? 1 : 0)}</button>
          <button type="button" data-jn-react="a" class="${R.a ? "on" : ""}">🤲 ${esc(t("reactA"))} · ${p.counts.a + (R.a ? 1 : 0)}</button>
          <button type="button" data-jn-react="d" class="${R.d ? "on" : ""}">🕊️ ${esc(t("reactD"))} · ${p.counts.d + (R.d ? 1 : 0)}</button>
        </div>
      </article>`
    );
    /* stash for react from detail */
    const body = $("#jnSheetBody");
    if (body) body.dataset.detailId = id;
  }

  function openSheet(title, html) {
    const sh = $("#jnSheet");
    const body = $("#jnSheetBody");
    const ht = $("#jnSheetT");
    if (!sh || !body) return;
    if (ht) ht.textContent = title;
    body.innerHTML = html;
    sh.hidden = false;
  }
  function closeSheet() {
    const sh = $("#jnSheet");
    if (sh) sh.hidden = true;
  }

  function openPesan() {
    openSheet(
      t("pesanT"),
      `<p class="jn-sample" style="text-align:start">${esc(t("pesanSample"))}</p>
      <div class="jn-inbox">
        <button type="button" class="jn-inbox-item"><span class="jn-av">SN</span><span><b>${esc(t("thread1"))}</b><small>${esc(t("thread1p"))}</small></span></button>
        <button type="button" class="jn-inbox-item"><span class="jn-av">HA</span><span><b>${esc(t("thread2"))}</b><small>${esc(t("thread2p"))}</small></span></button>
        <button type="button" class="jn-inbox-item"><span class="jn-av">✨</span><span><b>${esc(t("threadSys"))}</b><small>${esc(t("threadSysp"))}</small></span></button>
      </div>
      <div class="jn-inbox-empty" style="margin-top:8px"><div class="big">🕊️</div><div>${esc(t("pesanEmpty"))}</div></div>`
    );
  }

  function openCompose() {
    state.compose = { type: state.compose.type || "refleksi", text: "", img: null, dalil: null };
    paintCompose();
  }

  function paintCompose() {
    const c = state.compose;
    openSheet(
      t("compose"),
      `<div class="eyebrow">${esc(t("type"))}</div>
      <div class="jn-types">${TYPES.map(
        (x) =>
          `<button type="button" data-jn-type="${x.id}" class="${c.type === x.id ? "on" : ""}"><b>${x.ic} ${esc(t(x.t))}</b><small>${esc(t(x.s))}</small></button>`
      ).join("")}</div>
      <textarea class="jn-ta" id="jnText" placeholder="${esc(t("ph"))}">${esc(c.text || "")}</textarea>
      <div class="jn-img-prev" id="jnImgPrev" ${c.img ? "" : "hidden"}>${
        c.img ? `<img src="${esc(c.img)}" alt=""><button type="button" data-jn="rmimg" aria-label="${esc(t("rmImg"))}">✕</button>` : ""
      }</div>
      ${
        c.dalil
          ? `<div class="jn-dalil" id="jnDalilPrev"><div class="ar" dir="rtl">${esc(c.dalil.ar)}</div><div class="mn">${esc(L3(c.dalil.mn))}</div><div class="lb">${esc(c.dalil.ref)}</div><button type="button" class="btn sm ghost" data-jn="rmdalil" style="margin-top:6px">✕</button></div>`
          : ""
      }
      <div class="jn-compose-acts">
        <button type="button" class="btn sm" data-jn="addimg">${esc(t("addImg"))}</button>
        <button type="button" class="btn sm" data-jn="sisip">${esc(t("sisip"))}</button>
        <input type="file" id="jnFile" accept="image/*" hidden>
      </div>
      <p class="dim" style="font-size:11.5px;margin-top:8px">${esc(t("imgOnly"))}</p>
      <div class="row" style="gap:8px;margin-top:14px;justify-content:flex-end">
        <button type="button" class="btn ghost" data-jn="sheetx">${esc(t("cancel"))}</button>
        <button type="button" class="btn gold" data-jn="publish">${esc(t("publish"))}</button>
      </div>
      <p class="dim" style="font-size:11.5px;margin-top:10px">${esc(t("sample"))}</p>`
    );
  }

  function openPicker() {
    state.picker.mode = state.picker.mode || "q";
    paintPicker();
  }

  function paintPicker() {
    const mode = state.picker.mode;
    let list = "";
    if (mode === "q") {
      list = Q_PICKS.map(
        (q) =>
          `<button type="button" data-jn-pick-q="${q.s}:${q.a}"><b>${esc(q.ref)}</b><span class="ar" dir="rtl" lang="ar">${esc(q.ar)}</span><small>${esc(lang() === "en" ? q.en : q.id)} · Kemenag</small></button>`
      ).join("");
    } else {
      const H = (window.RKV2DATA && window.RKV2DATA.H) || [];
      const items = H.filter((h) => h.ar && h.src).slice(0, 12);
      list = items.length
        ? items
            .map((h, i) => {
              const name = Array.isArray(h.name) ? h.name[{ id: 0, en: 1, ar: 2 }[lang()] || 0] : h.name;
              const mean = Array.isArray(h.m) ? h.m[{ id: 0, en: 1, ar: 2 }[lang()] || 0] : h.m || h.tr || "";
              return `<button type="button" data-jn-pick-h="${i}"><b>${esc(name || h.id)}</b><span class="ar" dir="rtl" lang="ar">${esc(h.ar)}</span><small>${esc(mean)} · ${esc(h.src)}</small></button>`;
            })
            .join("")
        : /* fallback curated sahih */
          `<button type="button" data-jn-pick-hf="0"><b>Niat</b><span class="ar" dir="rtl">إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ</span><small>${esc(lang() === "en" ? "Actions are but by intentions." : "Sesungguhnya amal itu tergantung niatnya.")} · HR Bukhari & Muslim</small></button>`;
    }
    openSheet(
      t("pickTitle"),
      `<p class="dim" style="font-size:12.5px">${esc(t("pickHint"))}</p>
      <div class="jn-picker-seg">
        <button type="button" data-jn-pmode="q" class="${mode === "q" ? "on" : ""}">${esc(t("pickQ"))}</button>
        <button type="button" data-jn-pmode="h" class="${mode === "h" ? "on" : ""}">${esc(t("pickH"))}</button>
      </div>
      <div class="jn-picker-list">${list || `<p class="dim">${esc(t("emptyPick"))}</p>`}</div>
      <button type="button" class="btn ghost" data-jn="backcompose" style="margin-top:10px">← ${esc(t("compose"))}</button>`
    );
  }

  function compressImage(file, opts) {
    opts = opts || {};
    const maxSide = opts.maxSide || 1080;
    const maxBytes = opts.maxBytes || 200 * 1024;
    const square = !!opts.square;
    return new Promise((resolve, reject) => {
      if (file && file.type && file.type.startsWith("video/")) {
        reject(new Error("video"));
        return;
      }
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (square) {
          const side = Math.min(sw, sh);
          sx = Math.floor((sw - side) / 2);
          sy = Math.floor((sh - side) / 2);
          sw = sh = side;
        }
        let w = sw, h = sh;
        if (w > maxSide || h > maxSide) {
          const r = Math.min(maxSide / w, maxSide / h);
          w = Math.round(w * r);
          h = Math.round(h * r);
        }
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        c.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
        URL.revokeObjectURL(url);
        const tryEnc = (mime, q) => {
          try {
            return c.toDataURL(mime, q);
          } catch (e) {
            return null;
          }
        };
        let out = null;
        let q = 0.82;
        for (let i = 0; i < 8; i++) {
          out = tryEnc("image/webp", q) || tryEnc("image/jpeg", q);
          if (!out) break;
          const bytes = Math.ceil((out.length - (out.indexOf(",") + 1)) * 0.75);
          if (bytes <= maxBytes || q <= 0.4) break;
          q -= 0.08;
        }
        resolve(out || tryEnc("image/jpeg", 0.6));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject();
      };
      img.src = url;
    });
  }

  function publish() {
    const ta = $("#jnText");
    if (ta) state.compose.text = ta.value;
    const text = (state.compose.text || "").trim();
    if (!text && !state.compose.img) {
      toast(t("needContent"));
      return;
    }
    const P = storeGet(SK_PROF, {});
    const post = {
      id: "u" + Date.now(),
      type: state.compose.type,
      author: P.name || "Hamba Allah",
      av: P.av || initials(P.name),
      age: "Baru",
      text: { id: text || " ", en: text || " ", ar: text || " " },
      dalil: state.compose.dalil,
      img: state.compose.img,
      counts: { j: 0, a: 0, d: 0 },
      pending: true,
      own: true
    };
    const list = posts();
    list.unshift(post);
    savePosts(list);
    closeSheet();
    toast(t("published"));
    state.tab = "feed";
    render();
  }

  function onClick(e) {
    const g = (sel) => e.target.closest(sel);

    if (g("[data-jn=back]")) {
      e.preventDefault();
      if (window.go) window.go("beranda");
      return;
    }
    if (g("[data-jn=pesan]")) {
      e.preventDefault();
      openPesan();
      return;
    }
    if (g("[data-jn=settings]")) {
      e.preventDefault();
      closeSheet();
      if (window.go) window.go("settings");
      return;
    }
    if (g("[data-jn=allfitur]")) {
      e.preventDefault();
      closeSheet();
      if (window.go) window.go("lainnya");
      return;
    }
    if (g("[data-jn=profmenu]")) {
      e.preventDefault();
      openProfMenu();
      return;
    }
    if (g("[data-jn=editprof]")) {
      e.preventDefault();
      openEditProf();
      return;
    }
    if (g("[data-jn=saveprof]")) {
      e.preventDefault();
      saveEditProf();
      return;
    }
    if (g("[data-jn=pickav]")) {
      e.preventDefault();
      const f = $("#jnAvFile");
      if (f) f.click();
      return;
    }
    const tile = g("[data-jn-post]");
    if (tile) {
      e.preventDefault();
      openPostDetail(tile.dataset.jnPost);
      return;
    }
    if (g("[data-jn=prof]") || g('[data-jn-tab="prof"]')) {
      e.preventDefault();
      state.tab = "prof";
      try { sessionStorage.setItem("rk_jn_tab", "prof"); } catch (err) {}
      const fab = $(".jn-fab");
      if (fab) fab.style.display = "none";
      $$("#nav button").forEach((b) => b.classList.toggle("on", b.dataset.p === "profil"));
      try { history.replaceState(history.state, "", "#profil"); } catch (err) {}
      render();
      return;
    }
    if (g('[data-jn-tab="feed"]')) {
      e.preventDefault();
      state.tab = "feed";
      try { sessionStorage.setItem("rk_jn_tab", "feed"); } catch (err) {}
      const fab = $(".jn-fab");
      if (fab) fab.style.display = "";
      $$("#nav button").forEach((b) => b.classList.toggle("on", b.dataset.p === "jejak-nur"));
      try { history.replaceState(history.state, "", "#jejak-nur"); } catch (err) {}
      render();
      return;
    }
    if (g("[data-jn=compose]")) {
      e.preventDefault();
      openCompose();
      return;
    }
    if (g("[data-jn=sheetx]")) {
      e.preventDefault();
      closeSheet();
      return;
    }
    if (g("#jnSheet") === e.target) {
      closeSheet();
      return;
    }

    const typ = g("[data-jn-type]");
    if (typ) {
      state.compose.type = typ.dataset.jnType;
      const ta = $("#jnText");
      if (ta) state.compose.text = ta.value;
      paintCompose();
      return;
    }
    if (g("[data-jn=addimg]")) {
      const f = $("#jnFile");
      if (f) f.click();
      return;
    }
    if (g("[data-jn=rmimg]")) {
      state.compose.img = null;
      const ta = $("#jnText");
      if (ta) state.compose.text = ta.value;
      paintCompose();
      return;
    }
    if (g("[data-jn=rmdalil]")) {
      state.compose.dalil = null;
      const ta = $("#jnText");
      if (ta) state.compose.text = ta.value;
      paintCompose();
      return;
    }
    if (g("[data-jn=sisip]")) {
      const ta = $("#jnText");
      if (ta) state.compose.text = ta.value;
      openPicker();
      return;
    }
    if (g("[data-jn=backcompose]")) {
      paintCompose();
      return;
    }
    if (g("[data-jn=publish]")) {
      publish();
      return;
    }

    const pm = g("[data-jn-pmode]");
    if (pm) {
      state.picker.mode = pm.dataset.jnPmode;
      paintPicker();
      return;
    }
    const pq = g("[data-jn-pick-q]");
    if (pq) {
      const [s, a] = pq.dataset.jnPickQ.split(":").map(Number);
      const q = Q_PICKS.find((x) => x.s === s && x.a === a);
      if (q) {
        state.compose.dalil = {
          kind: "quran",
          ref: q.ref,
          ar: q.ar,
          mn: { id: q.id, en: q.en, ar: q.ar }
        };
      }
      paintCompose();
      return;
    }
    const ph = g("[data-jn-pick-h]");
    if (ph) {
      const H = (window.RKV2DATA && window.RKV2DATA.H) || [];
      const h = H[+ph.dataset.jnPickH];
      if (h) {
        const mean = Array.isArray(h.m) ? { id: h.m[0], en: h.m[1] || h.m[0], ar: h.m[2] || h.ar } : { id: h.m || h.tr, en: h.tr || h.m, ar: h.ar };
        state.compose.dalil = { kind: "hadith", ref: h.src, ar: h.ar, mn: mean };
      }
      paintCompose();
      return;
    }
    if (g("[data-jn-pick-hf]")) {
      state.compose.dalil = {
        kind: "hadith",
        ref: "HR Bukhari & Muslim",
        ar: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
        mn: {
          id: "Sesungguhnya amal itu tergantung niatnya.",
          en: "Actions are but by intentions.",
          ar: "إنما الأعمال بالنيات"
        }
      };
      paintCompose();
      return;
    }

    /* React from post detail sheet */
    const detailBody = $("#jnSheetBody");
    if (detailBody && detailBody.dataset.detailId && g("[data-jn-react]") && g("#jnSheet")) {
      const id = detailBody.dataset.detailId;
      const rr = g("[data-jn-react]");
      const k = rr.dataset.jnReact;
      const R = reacts();
      R[id] = R[id] || {};
      R[id][k] = !R[id][k];
      saveReacts(R);
      openPostDetail(id);
      return;
    }

    const card = g(".jn-card[data-id]");
    if (card) {
      const id = card.dataset.id;
      const rr = g("[data-jn-react]");
      if (rr) {
        const k = rr.dataset.jnReact;
        const R = reacts();
        R[id] = R[id] || {};
        R[id][k] = !R[id][k];
        saveReacts(R);
        render();
        return;
      }
      if (g("[data-jn-chip]")) {
        toast(t("chipOk"));
        return;
      }
      if (g("[data-jn-report]")) {
        toast(t("reported"));
        return;
      }
    }
  }

  function onChange(e) {
    if (!e.target || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (e.target.id === "jnFile") {
      if (file.type && file.type.startsWith("video/")) {
        toast(t("imgOnly"));
        e.target.value = "";
        return;
      }
      compressImage(file, { maxSide: 1080, maxBytes: 200 * 1024 })
        .then((data) => {
          state.compose.img = data;
          const ta = $("#jnText");
          if (ta) state.compose.text = ta.value;
          paintCompose();
        })
        .catch(() => toast("Image error"));
      e.target.value = "";
      return;
    }
    if (e.target.id === "jnAvFile") {
      if (file.type && file.type.startsWith("video/")) {
        toast(t("imgOnly"));
        e.target.value = "";
        return;
      }
      /* Square crop + smaller avatar budget */
      const nameEl = $("#jnName");
      const handEl = $("#jnHandle");
      const bioEl = $("#jnBio");
      if (state.edit) {
        if (nameEl) state.edit.name = nameEl.value;
        if (handEl) state.edit.handle = handEl.value;
        if (bioEl) state.edit.bio = bioEl.value;
      }
      compressImage(file, { maxSide: 512, maxBytes: 120 * 1024, square: true })
        .then((data) => {
          if (!state.edit) state.edit = {};
          state.edit.avatarUrl = data;
          paintEditProf();
        })
        .catch(() => toast("Image error"));
      e.target.value = "";
    }
  }

  function patchLainnya() {
    /* Extend renderLainnya tile list by wrapping */
    const _rl = window.renderLainnya;
    /* renderLainnya is not on window — hook via MutationObserver on #lnGrid after renderAll */
  }

  function injectLainnyaTile() {
    /* v88: Lainnya tab removed; Fitur grid on Beranda covers discovery */
    return;
    const g = $("#lnGrid");
    if (!g || g.querySelector('[data-tile="jejak-nur"]')) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.tile = PAGE;
    if (g.classList.contains("k3-grid") && window.K3D) {
      btn.className = "k3-tile";
      const lab = t("entryT");
      const d = t("entryS");
      btn.title = lab;
      btn.setAttribute("aria-label", lab + " · " + d);
      const ic = window.K3D.icon("hafalan", 46) || "✨";
      btn.innerHTML = `<i aria-hidden="true">${ic}</i><b>${esc(lab)}</b><small>${esc(d)}</small>`;
    } else {
      btn.className = "v2-tile";
      btn.innerHTML = `<i>✨</i><b>${esc(t("entryT"))}</b>`;
    }
    g.appendChild(btn);
  }

  function patchK3D() {
    try {
      if (window.K3D && window.K3D.tile) {
        /* TL is closed; injectLainnyaTile handles UI */
      }
    } catch (e) {}
  }

  function registerPageInGo() {
    /* Override go to accept jejak-nur even if not in PAGES const */
    const tryWrap = () => {
      if (!window.go) return false;
      if (window.go._jnWrapped) return true;
      const inner = window.go;
      window.go = function (p) {
        if (p === PAGE) {
          showPage();
          return;
        }
        return inner.apply(this, arguments);
      };
      window.go._jnWrapped = true;
      return true;
    };
    if (!tryWrap()) {
      document.addEventListener("DOMContentLoaded", tryWrap);
      setTimeout(tryWrap, 50);
      setTimeout(tryWrap, 500);
    }
  }

  function onTileClick(e) {
    const tEl = e.target.closest('[data-tile="jejak-nur"]');
    if (tEl) {
      e.preventDefault();
      e.stopPropagation();
      showPage();
    }
  }

  function boot() {
    ensureSeed();
    mountPage();
    entryCard();
    registerPageInGo();
    patchK3D();
    document.addEventListener("click", onClick);
    document.addEventListener("change", onChange);
    document.addEventListener("click", onTileClick, true);
    document.addEventListener("rk:lang", () => {
      applyI18n();
      if ($("#page-jejak-nur") && $("#page-jejak-nur").classList.contains("on")) render();
    });
    /* Re-inject entry + lainnya tile after beranda/lainnya renders */
    const mo = new MutationObserver(() => {
      entryCard();
      injectLainnyaTile();
    });
    const ber = $("#page-beranda");
    const lain = $("#page-lainnya");
    if (ber) mo.observe(ber, { childList: true, subtree: true });
    if (lain) mo.observe(lain, { childList: true, subtree: true });
    setTimeout(() => {
      entryCard();
      injectLainnyaTile();
      registerPageInGo();
    }, 800);
    setTimeout(injectLainnyaTile, 2000);
    if (location.hash === "#" + PAGE) setTimeout(showPage, 600);
    const pg = $("#page-jejak-nur");
    if (pg) {
      new MutationObserver(() => {
        if (pg.classList.contains("on")) {
          mountPage();
          applyI18n();
          render();
        }
      }).observe(pg, { attributes: true, attributeFilter: ["class"] });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.RKJejakNur = { open: showPage, render, t, openPesan, openCompose };
})();
