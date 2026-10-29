/* Best Muslim — Jejak Nur (local prototype social feed). Sample data only; no backend. */
(function () {
  "use strict";
  const PAGE = "jejak-nur";
  const SK_POSTS = "rk_jn_posts_v1";
  const SK_REACT = "rk_jn_react_v1";
  const SK_PROF = "rk_jn_prof_v1";
  const SK_SEED = "rk_jn_seed_v1";
  const SK_SEED2 = "rk_jn_seed_v2";
  const SK_CREATORS = "rk_jn_creators_v1";
  const SK_APPS = "rk_jn_creator_apps_v1";
  const SK_COMMENTS = "rk_jn_comments_v1";
  const SK_BLOCKED = "rk_jn_blocked_v1";
  const SK_SAVED = "rk_jn_saved_v1";
  const SK_CMT_REPORTS = "rk_jn_cmt_reports_v1";
  const SK_TOS = "rk_jn_tos_v1";

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
      more: "selengkapnya",
      less: "lebih sedikit",
      imgQuota: "Foto disimpan terpisah (IndexedDB) — aman dari kuota",
      imgFail: "Gagal menyimpan foto. Coba kompres ulang.",
      ownFeed: "Jejakmu",
      ordersYours: "Pesanan Anda",
      shopYours: "Toko Anda",
      openShop: "Buka Toko",
      ordersT: "Pesanan Anda",
      ordersEmpty: "Belum ada pesanan di Toko Berkah.",
      ordersEmptyS: "Voucher dan amal yang Anda beli akan muncul di sini.",
      ordersBrowse: "Jelajahi Toko Berkah",
      shopDashT: "Toko Anda",
      shopDashS: "Kelola etalase, pesanan masuk, dan donasi toko.",
      shopProducts: "Produk",
      shopOrdersIn: "Pesanan masuk",
      shopSoon: "Dasbor penjual · prototipe lokal",
      openShopT: "Buka Toko di Toko Berkah",
      openShopLead: "Jual produk halal & amal — bergabung sebagai penjual (segera).",
      openShopB1: "Etalase produk & voucher",
      openShopB2: "Pesanan masuk + notifikasi",
      openShopB3: "Sebagian hasil untuk sedekah",
      openShopCta: "Daftar penjual (segera)",
      openShopNote: "Pendaftaran nyata menyusul backend. Ini mockup lokal.",
      adminPanel: "Panel Admin",
      pesanBadge: "Pesan",
      verLong: "Tahan judul menu untuk Panel Admin (uji)",

      fabAria: "Tulis jejak",
      fabApply: "Ajukan jadi Kreator",
      fabApplyAria: "Ajukan jadi Kreator",
      applyEy: "Kreator terverifikasi",
      applyT: "Ajukan jadi Kreator",
      applyLead: "Hanya ustadz, lembaga resmi, dan influencer kebaikan yang boleh mengunggah konten. Pengguna lain tetap bisa bereaksi dan berkomentar.",
      applyName: "Nama lengkap / nama lembaga",
      applyType: "Jenis kreator",
      typeUstadz: "Ustadz / Ustadzah",
      typeLembaga: "Lembaga terverifikasi",
      typeInfluencer: "Influencer Kebaikan",
      applyBio: "Latar belakang dakwah",
      applyBioPh: "Ceritakan singkat perjalanan dakwah atau fokus konten…",
      applyProof: "Tautan bukti (sosmed / website / legalitas)",
      applyProofPh: "https://…",
      applySample: "Contoh konten",
      applySamplePh: "Ringkas contoh konten yang ingin dibagikan…",
      applyAgree: "Saya menyetujui Pedoman Konten Jamaah (konten kebaikan, tanpa fitnah, tanpa riba/iklan haram).",
      applySubmit: "Kirim pengajuan",
      applyNeed: "Lengkapi semua kolom dan centang persetujuan",
      applySent: "Pengajuan terkirim · menunggu tinjauan",
      applyPending: "Pengajuan menunggu tinjauan",
      applyRejected: "Pengajuan ditolak",
      applyApproved: "Anda kreator terverifikasi",
      applyStatus: "Status pengajuan",
      verifiedBadge: "Terverifikasi",
      onlyCreator: "Hanya kreator terverifikasi yang dapat mengunggah. Ajukan dulu ya.",
      feedPrompt: "Jamaah menjaga konten Islam yang terverifikasi. Reaksi & komentar terbuka untuk semua.",
      feedPromptCta: "Ajukan jadi Kreator",
      comments: "Komentar",
      commentPh: "Tulis komentar kebaikan…",
      commentSend: "Kirim",
      commentEmpty: "Belum ada komentar. Jadilah yang pertama.",
      commentBlocked: "Komentar ditahan: mengandung kata/tautan yang tidak diizinkan.",
      commentOk: "Komentar ditambahkan",
      commentReport: "Laporkan",
      commentBlock: "Blokir",
      commentReported: "Komentar dilaporkan ke Panel Admin",
      commentBlockedUser: "Pengguna diblokir (uji lokal)",
      savePost: "Simpan",
      sharePost: "Bagikan",
      savedOk: "Disimpan (lokal)",
      sharedOk: "Tautan disalin (uji)",
      creatorBanner: "Konten dari kreator terverifikasi"

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
      more: "more",
      less: "less",
      imgQuota: "Photo stored separately (IndexedDB) — safe from quota",
      imgFail: "Could not save photo. Try again.",
      ownFeed: "Your posts",
      ordersYours: "Your orders",
      shopYours: "Your shop",
      openShop: "Open shop",
      ordersT: "Your orders",
      ordersEmpty: "No orders in Blessed Shop yet.",
      ordersEmptyS: "Vouchers and charity purchases will show up here.",
      ordersBrowse: "Browse Blessed Shop",
      shopDashT: "Your shop",
      shopDashS: "Manage storefront, inbound orders, and shop giving.",
      shopProducts: "Products",
      shopOrdersIn: "Inbound orders",
      shopSoon: "Seller dashboard · local prototype",
      openShopT: "Open a shop on Blessed Shop",
      openShopLead: "Sell halal goods & charity — join as a seller (coming soon).",
      openShopB1: "Product & voucher storefront",
      openShopB2: "Inbound orders + alerts",
      openShopB3: "Share proceeds to sadaqah",
      openShopCta: "Seller signup (soon)",
      openShopNote: "Real signup comes with the backend. Local mockup only.",
      adminPanel: "Admin Panel",
      pesanBadge: "Messages",
      verLong: "Long-press menu title for Admin Panel (demo)",

      fabAria: "Write a trail",
      fabApply: "Apply as Creator",
      fabApplyAria: "Apply as Creator",
      applyEy: "Verified creators",
      applyT: "Apply as Creator",
      applyLead: "Only scholars, verified institutions, and goodness influencers may upload. Everyone else can still react and comment.",
      applyName: "Full name / institution name",
      applyType: "Creator type",
      typeUstadz: "Scholar (Ustadz/ah)",
      typeLembaga: "Verified institution",
      typeInfluencer: "Goodness influencer",
      applyBio: "Dawah background",
      applyBioPh: "Briefly share your dawah journey or content focus…",
      applyProof: "Proof link (social / website / legal docs)",
      applyProofPh: "https://…",
      applySample: "Sample content",
      applySamplePh: "Summarize the kind of content you will share…",
      applyAgree: "I agree to the Jamaah Content Guidelines (goodness only, no slander, no riba/haram ads).",
      applySubmit: "Submit application",
      applyNeed: "Fill every field and accept the guidelines",
      applySent: "Application sent · awaiting review",
      applyPending: "Application awaiting review",
      applyRejected: "Application rejected",
      applyApproved: "You are a verified creator",
      applyStatus: "Application status",
      verifiedBadge: "Verified",
      onlyCreator: "Only verified creators can upload. Please apply first.",
      feedPrompt: "Jamaah keeps Islam content verified. Reactions & comments stay open to all.",
      feedPromptCta: "Apply as Creator",
      comments: "Comments",
      commentPh: "Write a kind comment…",
      commentSend: "Send",
      commentEmpty: "No comments yet. Be the first.",
      commentBlocked: "Comment held: blocked word or link.",
      commentOk: "Comment added",
      commentReport: "Report",
      commentBlock: "Block",
      commentReported: "Comment reported to Admin Panel",
      commentBlockedUser: "User blocked (local demo)",
      savePost: "Save",
      sharePost: "Share",
      savedOk: "Saved (local)",
      sharedOk: "Link copied (demo)",
      creatorBanner: "Content from verified creators"

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
      more: "المزيد",
      less: "أقل",
      imgQuota: "تُحفظ الصورة في IndexedDB — بأمان من الحصة",
      imgFail: "تعذّر حفظ الصورة. أعد المحاولة.",
      ownFeed: "منشوراتك",
      ordersYours: "طلباتك",
      shopYours: "متجرك",
      openShop: "افتح متجرًا",
      ordersT: "طلباتك",
      ordersEmpty: "لا طلبات في متجر البركة بعد.",
      ordersEmptyS: "القسائم والصدقات التي تشتريها ستظهر هنا.",
      ordersBrowse: "تصفّح متجر البركة",
      shopDashT: "متجرك",
      shopDashS: "أدِر الواجهة والطلبات الواردة وعطاء المتجر.",
      shopProducts: "المنتجات",
      shopOrdersIn: "طلبات واردة",
      shopSoon: "لوحة البائع · نموذج محلي",
      openShopT: "افتح متجرًا في متجر البركة",
      openShopLead: "بِع منتجات حلالًا وصدقات — انضم كبائع (قريبًا).",
      openShopB1: "واجهة منتجات وقسائم",
      openShopB2: "طلبات واردة + تنبيهات",
      openShopB3: "جزء من العائد للصدقة",
      openShopCta: "تسجيل البائع (قريبًا)",
      openShopNote: "التسجيل الحقيقي مع الخادم لاحقًا. هذا نموذج محلي.",
      adminPanel: "لوحة الإدارة",
      pesanBadge: "الرسائل",
      verLong: "اضغط مطولًا على عنوان القائمة للوحة الإدارة",

      fabAria: "اكتب أثرًا",
      fabApply: "قدّم كمنشئ موثّق",
      fabApplyAria: "قدّم كمنشئ موثّق",
      applyEy: "منشئون موثّقون",
      applyT: "قدّم كمنشئ موثّق",
      applyLead: "فقط العلماء والمؤسسات الموثّقة ومؤثّرو الخير يمكنهم النشر. الباقون يتفاعلون ويعلّقون.",
      applyName: "الاسم الكامل / اسم المؤسسة",
      applyType: "نوع المنشئ",
      typeUstadz: "عالم / عالمة",
      typeLembaga: "مؤسسة موثّقة",
      typeInfluencer: "مؤثّر خير",
      applyBio: "خلفية الدعوة",
      applyBioPh: "نبذة قصيرة عن رحلتك الدعوية…",
      applyProof: "رابط إثبات (وسائل / موقع / وثائق)",
      applyProofPh: "https://…",
      applySample: "مثال المحتوى",
      applySamplePh: "لخّص نوع المحتوى الذي ستنشره…",
      applyAgree: "أوافق على إرشادات محتوى الجماعة (خير فقط، بلا نميمة، بلا ربا/إعلانات محرّمة).",
      applySubmit: "إرسال الطلب",
      applyNeed: "أكمل كل الحقول ووافق على الإرشادات",
      applySent: "أُرسل الطلب · بانتظار المراجعة",
      applyPending: "الطلب بانتظار المراجعة",
      applyRejected: "رُفض الطلب",
      applyApproved: "أنت منشئ موثّق",
      applyStatus: "حالة الطلب",
      verifiedBadge: "موثّق",
      onlyCreator: "المنشئون الموثّقون فقط يمكنهم النشر. قدّم أولًا.",
      feedPrompt: "الجماعة تحفظ المحتوى الإسلامي الموثّق. التفاعل والتعليق للجميع.",
      feedPromptCta: "قدّم كمنشئ",
      comments: "التعليقات",
      commentPh: "اكتب تعليقًا طيبًا…",
      commentSend: "إرسال",
      commentEmpty: "لا تعليقات بعد. كن الأول.",
      commentBlocked: "تعليق معلّق: كلمة أو رابط محظور.",
      commentOk: "أُضيف التعليق",
      commentReport: "إبلاغ",
      commentBlock: "حظر",
      commentReported: "أُبلغ عن التعليق للوحة الإدارة",
      commentBlockedUser: "حُظر المستخدم (تجربة محلية)",
      savePost: "حفظ",
      sharePost: "مشاركة",
      savedOk: "حُفظ (محليًا)",
      sharedOk: "نُسخ الرابط (تجريبي)",
      creatorBanner: "محتوى من منشئين موثّقين"

    }
  };

  const TYPES = [
    { id: "hijrah", ic: "🌱", t: "tHijrah", s: "tHijrahS" },
    { id: "refleksi", ic: "🕊️", t: "tRef", s: "tRefS" },
    { id: "pencapaian", ic: "🏅", t: "tAch", s: "tAchS" },
    { id: "doa", ic: "🤲", t: "tPray", s: "tPrayS" }
  ];

  /* Sample posts — verified creators only (demo names) */
  const CREATOR_TYPES = [
    { id: "ustadz", t: "typeUstadz" },
    { id: "lembaga", t: "typeLembaga" },
    { id: "influencer", t: "typeInfluencer" }
  ];
  const SEED_CREATORS = [
    { id: "cr_ustadz_ahmad", handle: "ustadzahmad", name: "Ustadz Ahmad Nur", type: "ustadz", av: "AN", bio: "Pengajar tafsir & adab · konten contoh", verified: true },
    { id: "cr_lembaga_cahaya", handle: "cahayaummah", name: "Yayasan Cahaya Ummah", type: "lembaga", av: "CU", bio: "Lembaga dakwah & pendidikan · konten contoh", verified: true },
    { id: "cr_inf_nurul", handle: "nurulkebaikan", name: "Nurul Kebaikan", type: "influencer", av: "NK", bio: "Konten hijrah & kebiasaan baik · contoh", verified: true }
  ];
  const SEED = [
    {
      id: "s1",
      type: "hijrah",
      author: "Ustadz Ahmad Nur",
      handle: "ustadzahmad",
      av: "AN",
      creatorType: "ustadz",
      verified: true,
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
      counts: { j: 42, a: 18, d: 27 },
      pending: false,
      own: false,
      comments: [
        { id: "c_s1_1", author: "Hamba Allah", handle: "hambaallah", text: "Barakallah, ustadz. Semoga istiqamah.", at: Date.now() - 7200000 }
      ]
    },
    {
      id: "s2",
      type: "pencapaian",
      author: "Yayasan Cahaya Ummah",
      handle: "cahayaummah",
      av: "CU",
      creatorType: "lembaga",
      verified: true,
      age: "5j",
      text: {
        id: "Alhamdulillah program tilawah 30 hari bersama 120 santri selesai. Bukan karena sempurna — karena Allah memberi kekuatan sedikit demi sedikit.",
        en: "Alhamdulillah — 30-day tilawah with 120 students done. Not because we are perfect — Allah gave strength little by little.",
        ar: "الحمد لله — برنامج تلاوة ٣٠ يومًا مع ١٢٠ طالبًا. لسنا كاملين؛ الله أعطى القوة شيئًا فشيئًا."
      },
      achievement: { streak: 30 },
      counts: { j: 88, a: 29, d: 45 },
      pending: false,
      own: false
    },
    {
      id: "s3",
      type: "refleksi",
      author: "Nurul Kebaikan",
      handle: "nurulkebaikan",
      av: "NK",
      creatorType: "influencer",
      verified: true,
      age: "8j",
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
      counts: { j: 56, a: 14, d: 22 },
      pending: false,
      own: false,
      comments: [
        { id: "c_s3_1", author: "Sahabat Nur", handle: "sahabatnur", text: "Masyaallah, tepat banget.", at: Date.now() - 5400000 },
        { id: "c_s3_2", author: "Hamba Allah", handle: "hambaallah", text: "Aamiin, semoga hati selalu hadir.", at: Date.now() - 3600000 }
      ]
    },
    {
      id: "s4",
      type: "doa",
      author: "Ustadz Ahmad Nur",
      handle: "ustadzahmad",
      av: "AN",
      creatorType: "ustadz",
      verified: true,
      age: "1h",
      text: {
        id: "Mohon doanya untuk para thullabul ilmi yang sedang ujian. Semoga Allah menjaga mata dan hati kita semua.",
        en: "Please keep students of knowledge in your du'a during exams. May Allah protect our eyes and hearts.",
        ar: "ادعوا لطلاب العلم في الامتحانات. حفظ الله أعيننا وقلوبنا جميعًا."
      },
      counts: { j: 16, a: 91, d: 62 },
      pending: false,
      own: false
    },
    {
      id: "s5",
      type: "pencapaian",
      author: "Yayasan Cahaya Ummah",
      handle: "cahayaummah",
      av: "CU",
      creatorType: "lembaga",
      verified: true,
      age: "Kemarin",
      text: {
        id: "Baru selesai khatam juz 1–5 bersama kelas tahsin. Pelan tapi konsisten. Yuk saling menguatkan.",
        en: "Just finished juz 1–5 with the tahsin class. Slow but steady. Let's strengthen each other.",
        ar: "أتممنا الأجزاء ١–٥ مع فصل التحسين. ببطء وثبات. لنشدّ بعضنا."
      },
      achievement: { khatam: 5 },
      counts: { j: 37, a: 16, d: 18 },
      pending: false,
      own: false
    },
    {
      id: "s6",
      type: "hijrah",
      author: "Nurul Kebaikan",
      handle: "nurulkebaikan",
      av: "NK",
      creatorType: "influencer",
      verified: true,
      age: "Baru",
      text: {
        id: "Langkah kecil: matikan notifikasi saat tilawah. Semoga hati lebih hadir. Mohon doanya.",
        en: "Small step: mute notifications during tilawah. May the heart be more present. Please pray for me.",
        ar: "خطوة صغيرة: أوقف التنبيهات أثناء التلاوة. ليحضر القلب. ادعوا لي."
      },
      counts: { j: 12, a: 8, d: 9 },
      pending: false,
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
  /* Returns true on success. Silent quota failures were the root cause of missing photos. */
  const storeSet = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      console.warn("[jn] localStorage set failed", k, e && e.name, e);
      return false;
    }
  };

  /* —— Image store: IndexedDB primary, localStorage dataURL fallback for tiny thumbs —— */
  const IDB_NAME = "rk_jn_idb_v1";
  const IDB_STORE = "images";
  const imgMem = Object.create(null); /* id -> objectURL | dataURL */
  let _idbProm = null;
  function idbOpen() {
    if (_idbProm) return _idbProm;
    _idbProm = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("no-idb"));
        return;
      }
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("idb"));
    });
    return _idbProm;
  }
  function dataUrlToBlob(dataUrl) {
    try {
      const m = String(dataUrl).match(/^data:([^;]+);base64,(.+)$/);
      if (!m) return null;
      const bin = atob(m[2]);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return new Blob([arr], { type: m[1] || "image/jpeg" });
    } catch (e) {
      return null;
    }
  }
  async function idbPut(key, dataUrl) {
    const blob = dataUrlToBlob(dataUrl) || dataUrl;
    const db = await idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(blob, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }
  async function idbGet(key) {
    const db = await idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }
  async function idbDel(key) {
    try {
      const db = await idbOpen();
      return new Promise((resolve) => {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).delete(key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch (e) {
      return false;
    }
  }
  function revokeImg(key) {
    const u = imgMem[key];
    if (u && String(u).startsWith("blob:")) {
      try {
        URL.revokeObjectURL(u);
      } catch (e) {}
    }
    delete imgMem[key];
  }
  async function savePostImage(key, dataUrl) {
    if (!dataUrl) return false;
    try {
      await idbPut(key, dataUrl);
      revokeImg(key);
      const blob = dataUrlToBlob(dataUrl);
      imgMem[key] = blob ? URL.createObjectURL(blob) : dataUrl;
      return true;
    } catch (e) {
      console.warn("[jn] IDB put failed, trying LS fallback", e);
      /* Fallback: only for small payloads (<90KB string) */
      try {
        if (String(dataUrl).length < 90000) {
          storeSet("rk_jn_img_" + key, dataUrl);
          imgMem[key] = dataUrl;
          return true;
        }
      } catch (e2) {}
      return false;
    }
  }
  async function loadPostImage(key) {
    if (!key) return null;
    if (imgMem[key]) return imgMem[key];
    try {
      const val = await idbGet(key);
      if (val) {
        if (val instanceof Blob) {
          imgMem[key] = URL.createObjectURL(val);
        } else if (typeof val === "string") {
          imgMem[key] = val;
        }
        return imgMem[key] || null;
      }
    } catch (e) {
      console.warn("[jn] IDB get failed", e);
    }
    const ls = storeGet("rk_jn_img_" + key, null);
    if (ls) {
      imgMem[key] = ls;
      return ls;
    }
    return null;
  }
  function postHasImg(p) {
    return !!(p && (p.hasImg || p.imgKey || (p.img && String(p.img).slice(0, 5) === "data:")));
  }
  function postImgKey(p) {
    if (!p) return null;
    return p.imgKey || (postHasImg(p) ? p.id : null);
  }
  /** Migrate legacy inline base64 img → IDB; strip from LS posts to free quota */
  async function migrateInlineImages() {
    const list = storeGet(SK_POSTS, []);
    if (!Array.isArray(list) || !list.length) return;
    let changed = false;
    for (const p of list) {
      if (p && p.img && String(p.img).slice(0, 5) === "data:") {
        const key = p.id;
        const ok = await savePostImage(key, p.img);
        if (ok) {
          p.hasImg = true;
          p.imgKey = key;
          delete p.img;
          changed = true;
        } else {
          /* keep hasImg false so we don't show broken tile; drop oversized inline */
          delete p.img;
          changed = true;
        }
      } else if (p && p.hasImg && !p.imgKey) {
        p.imgKey = p.id;
        changed = true;
      }
    }
    if (changed) storeSet(SK_POSTS, list);
  }
  async function hydrateImgs(root) {
    const host = root || document;
    const nodes = host.querySelectorAll ? host.querySelectorAll("[data-jn-img]") : [];
    for (const el of nodes) {
      const key = el.getAttribute("data-jn-img");
      if (!key) continue;
      const url = await loadPostImage(key);
      if (url) {
        if (el.tagName === "IMG") el.src = url;
        else {
          el.style.backgroundImage = "url(" + JSON.stringify(url).slice(1, -1) + ")";
        }
        el.classList.add("on");
      }
    }
  }
  const toast = (m) => {
    try {
      if (window.toast) return window.toast(m);
    } catch (e) {}
    console.log("[jn]", m);
  };


  function creators() {
    ensureCreators();
    return storeGet(SK_CREATORS, SEED_CREATORS.slice());
  }
  function saveCreators(list) {
    storeSet(SK_CREATORS, list || []);
  }
  function ensureCreators() {
    if (!storeGet("rk_jn_creators_seed_v1", false)) {
      storeSet(SK_CREATORS, SEED_CREATORS.slice());
      storeSet("rk_jn_creators_seed_v1", true);
    }
  }
  function myHandle() {
    const P = storeGet(SK_PROF, {}) || {};
    return String(P.handle || "hambaallah").replace(/^@/, "").toLowerCase();
  }
  function creatorOfHandle(handle) {
    const h = String(handle || "").replace(/^@/, "").toLowerCase();
    return creators().find((c) => c.verified && String(c.handle || "").toLowerCase() === h) || null;
  }
  function isVerifiedCreator(handle) {
    return !!creatorOfHandle(handle || myHandle());
  }
  function myApplication() {
    const apps = storeGet(SK_APPS, []) || [];
    const h = myHandle();
    return apps.find((a) => String(a.handle || "").toLowerCase() === h) || null;
  }
  function creatorTypeLabel(type) {
    const x = CREATOR_TYPES.find((z) => z.id === type);
    return x ? t(x.t) : "";
  }
  function verifiedBadgeHtml(size) {
    const s = size || 16;
    /* Original crescent + check — not a brand copy */
    return `<span class="jn-vbadge" title="${esc(t("verifiedBadge"))}" aria-label="${esc(t("verifiedBadge"))}"><svg viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="var(--accent,#e6c77a)"/><path d="M7.2 8.8c2.8-3.4 8.2-3.2 10.4.6 1.6 2.7.8 6.1-1.7 7.9-3.2 2.3-7.8 1.2-9.4-2.1" fill="none" stroke="#1a1208" stroke-width="1.5" stroke-linecap="round"/><path d="M8.2 12.2l2.2 2.2 5-5" fill="none" stroke="#1a1208" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
  }
  function authorLineHtml(p) {
    const verified = !!(p.verified || (p.handle && isVerifiedCreator(p.handle)) || (p.own && isVerifiedCreator()));
    const ctype = p.creatorType || (p.handle && (creatorOfHandle(p.handle) || {}).type) || (p.own && (creatorOfHandle(myHandle()) || {}).type) || "";
    const typeLab = ctype ? creatorTypeLabel(ctype) : "";
    return `<b class="jn-name-row">${esc(p.author || "Hamba Allah")}${verified ? verifiedBadgeHtml(15) : ""}</b>
      <span class="jn-ig-handle">${esc(p.handle ? "@" + String(p.handle).replace(/^@/, "") : handleOf(storeGet(SK_PROF, {})))}${typeLab ? " · " + esc(typeLab) : ""}</span>`;
  }
  function commentsMap() {
    return storeGet(SK_COMMENTS, {}) || {};
  }
  function saveCommentsMap(m) {
    storeSet(SK_COMMENTS, m || {});
  }
  function commentsFor(postId) {
    const m = commentsMap();
    const blocked = new Set((storeGet(SK_BLOCKED, []) || []).map((x) => String(x).toLowerCase()));
    return (m[postId] || []).filter((c) => !c.hidden && !blocked.has(String(c.handle || "").toLowerCase()));
  }
  function seedCommentsFromPosts() {
    if (storeGet("rk_jn_cmt_seed_v1", false)) return;
    const m = commentsMap();
    const list = storeGet(SK_POSTS, []) || [];
    let changed = false;
    for (const p of list) {
      if (p && p.comments && p.comments.length && !m[p.id]) {
        m[p.id] = p.comments.slice();
        changed = true;
      }
    }
    if (changed) saveCommentsMap(m);
    storeSet("rk_jn_cmt_seed_v1", true);
  }
  function filterCommentText(text) {
    const raw = String(text || "").trim();
    if (!raw) return { ok: false, reason: "empty" };
    const f = storeGet("rk_jn_filter_v1", null) || { words: ["judi", "porn", "crypto scam", "pinjol ilegal"], holdLinks: true };
    const lower = raw.toLowerCase();
    for (const w of f.words || []) {
      if (w && lower.includes(String(w).toLowerCase())) return { ok: false, reason: "word" };
    }
    if (f.holdLinks !== false && /https?:\/\/|www\.|bit\.ly|t\.co\//i.test(raw)) return { ok: false, reason: "link" };
    return { ok: true, text: raw.slice(0, 280) };
  }
  function addComment(postId, text) {
    const chk = filterCommentText(text);
    if (!chk.ok) return chk;
    const P = storeGet(SK_PROF, {}) || {};
    const m = commentsMap();
    const arr = m[postId] || [];
    arr.push({
      id: "c_" + Date.now(),
      author: P.name || "Hamba Allah",
      handle: myHandle(),
      text: chk.text,
      at: Date.now()
    });
    m[postId] = arr;
    saveCommentsMap(m);
    return { ok: true };
  }
  function reportComment(postId, commentId) {
    const m = commentsMap();
    const arr = m[postId] || [];
    const c = arr.find((x) => x.id === commentId);
    if (!c) return;
    c.reported = true;
    saveCommentsMap(m);
    const R = storeGet(SK_CMT_REPORTS, []) || [];
    R.unshift({
      id: "cr_" + commentId,
      postId,
      commentId,
      text: c.text,
      author: c.author,
      handle: c.handle,
      at: Date.now(),
      status: "open"
    });
    storeSet(SK_CMT_REPORTS, R);
  }
  function blockHandle(handle) {
    const h = String(handle || "").replace(/^@/, "").toLowerCase();
    if (!h) return;
    const list = storeGet(SK_BLOCKED, []) || [];
    if (!list.includes(h)) list.push(h);
    storeSet(SK_BLOCKED, list);
  }
  function isBlockedHandle(handle) {
    const h = String(handle || "").replace(/^@/, "").toLowerCase();
    return (storeGet(SK_BLOCKED, []) || []).map((x) => String(x).toLowerCase()).includes(h);
  }
  function hasAcceptedTos() {
    const v = storeGet(SK_TOS, null);
    return !!(v && v.accepted);
  }
  function acceptTos() {
    storeSet(SK_TOS, { accepted: true, at: Date.now(), ver: "jamaah-tos-v1" });
  }
  function openTos(thenAction) {
    state._tosThen = thenAction || null;
    openSheet(
      t("tosT"),
      `<div class="jn-tos">
        <p class="dim">${esc(t("tosLead"))}</p>
        <ul class="jn-tos-list">
          <li>${esc(t("tos1"))}</li>
          <li>${esc(t("tos2"))}</li>
          <li>${esc(t("tos3"))}</li>
          <li>${esc(t("tos4"))}</li>
        </ul>
        <label class="jn-agree"><input type="checkbox" id="jnTosAgree"> <span>${esc(t("tosAccept"))}</span></label>
        <div class="row" style="gap:8px;margin-top:14px;justify-content:flex-end">
          <button type="button" class="btn ghost" data-jn="sheetx">${esc(t("cancel"))}</button>
          <button type="button" class="btn gold" data-jn="tosok">${esc(t("tosAccept"))}</button>
        </div>
      </div>`
    );
  }
  function requireTos(thenAction) {
    if (hasAcceptedTos()) {
      if (typeof thenAction === "function") thenAction();
      return true;
    }
    openTos(thenAction);
    return false;
  }


  function ensureSeed() {
    ensureCreators();
    /* v2 seed: verified-creator demo feed (reseed once) */
    if (!storeGet(SK_SEED2, false)) {
      storeSet(SK_POSTS, SEED.slice());
      storeSet(SK_SEED, true);
      storeSet(SK_SEED2, true);
      storeSet("rk_jn_own_demo_v1", true); /* skip old own-demo for regular users */
      storeSet("rk_jn_cmt_seed_v1", false);
    } else if (!storeGet(SK_SEED, false)) {
      storeSet(SK_POSTS, SEED.slice());
      storeSet(SK_SEED, true);
    }
    seedCommentsFromPosts();
    if (!storeGet(SK_PROF, null)) {
      storeSet(SK_PROF, defaultProf());
    } else {
      const P = storeGet(SK_PROF, {});
      let changed = false;
      if (!P.handle) { P.handle = slugHandle(P.name || "hambaallah"); changed = true; }
      if (P.bio == null) { P.bio = ""; changed = true; }
      if (P.avatarUrl === undefined) { P.avatarUrl = null; changed = true; }
      if (P.hasShop === undefined) { P.hasShop = false; changed = true; }
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
      badges: ["Istiqamah 7", "Tilawah 10", "Hafiz Juz 30"],
      hasShop: false
    };
  }
  function seedOwnDemo() {
    /* Own demo posts only for verified creators (once) */
    if (storeGet("rk_jn_own_demo_v1", false)) return;
    if (!isVerifiedCreator()) {
      storeSet("rk_jn_own_demo_v1", true);
      return;
    }
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
          hasImg: !!demoImg,
          imgKey: demoImg ? "own_img1" : null,
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
          hasImg: false,
          imgKey: null,
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
          hasImg: !!demoImg2,
          imgKey: demoImg2 ? "own_img2" : null,
          counts: { j: 4, a: 2, d: 1 },
          own: true
        }
      );
      storeSet(SK_POSTS, list);
      /* fire-and-forget IDB seed */
      if (demoImg) savePostImage("own_img1", demoImg).catch(() => {});
      if (demoImg2) savePostImage("own_img2", demoImg2).catch(() => {});
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
    const cleaned = (p || []).map((x) => {
      if (!x) return x;
      const o = Object.assign({}, x);
      if (o.img && String(o.img).slice(0, 5) === "data:") {
        /* never persist base64 in LS — IDB only */
        o.hasImg = true;
        o.imgKey = o.imgKey || o.id;
        delete o.img;
      }
      return o;
    });
    const ok = storeSet(SK_POSTS, cleaned);
    if (!ok) toast("Storage full — foto tetap di IndexedDB bila ada");
    return ok;
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
    syncFab();
    applyEntry();
  }

  function syncFab() {
    let fab = $(".jn-fab");
    if (!fab) return;
    if (state.tab === "prof") {
      fab.style.display = "none";
      return;
    }
    fab.style.display = "";
    const verified = isVerifiedCreator();
    const label = verified ? t("compose") : t("fabApply");
    const aria = verified ? t("fabAria") : t("fabApplyAria");
    const act = verified ? "compose" : "apply";
    const ic = verified ? "+" : "✦";
    fab.innerHTML = `<button type="button" data-jn="${act}" class="${verified ? "" : "jn-fab-apply"}" aria-label="${esc(aria)}"><span aria-hidden="true">${ic}</span><span class="jn-fab-lab">${esc(label)}</span></button>`;
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
    /* hide FAB + community header on profile (TikTok-style) */
    syncProfChrome();
    render();
  }

  function syncProfChrome() {
    const root = $("#jnRoot");
    if (root) root.classList.toggle("is-prof", state.tab === "prof");
    syncFab();
    const top = $(".jn-top", root || document);
    const sample = $(".jn-sample", root || document);
    if (top) top.hidden = state.tab === "prof";
    if (sample) sample.hidden = state.tab === "prof";
  }

  const state = {
    tab: "feed",
    edit: null,
    compose: { type: "refleksi", text: "", img: null, dalil: null },
    picker: { mode: "q" }
  };

  function render() {
    applyI18n();
    syncProfChrome();
    $$("[data-jn-tab]").forEach((b) => b.classList.toggle("on", b.dataset.jnTab === state.tab));
    const view = $("#jnView");
    if (!view) return;
    if (state.tab === "prof") renderProfile(view);
    else renderFeed(view);
  }

  function captionHtml(text, id) {
    const full = String(text || "").trim();
    if (!full) return "";
    const short = full.length > 120;
    const snip = short ? full.slice(0, 120) + "…" : full;
    if (!short) return `<div class="jn-cap" data-cap="${esc(id)}"><span class="jn-cap-body">${esc(full)}</span></div>`;
    return `<div class="jn-cap" data-cap="${esc(id)}"><span class="jn-cap-body" data-full="${esc(full)}" data-short="${esc(snip)}">${esc(snip)}</span> <button type="button" class="jn-more" data-jn-more="${esc(id)}">${esc(t("more"))}</button></div>`;
  }

  function commentsHtml(postId) {
    const list = commentsFor(postId);
    const items = list.length
      ? list
          .map(
            (c) => `<div class="jn-cmt" data-cmt="${esc(c.id)}" data-cmt-handle="${esc(c.handle || "")}">
          <div class="jn-cmt-hd"><b>${esc(c.author || "")}</b><span>@${esc(c.handle || "")}</span></div>
          <p>${esc(c.text || "")}</p>
          <div class="jn-cmt-acts">
            <button type="button" data-jn-cmt-report="${esc(c.id)}">${esc(t("commentReport"))}</button>
            <button type="button" data-jn-cmt-block="${esc(c.handle || "")}">${esc(t("commentBlock"))}</button>
          </div>
        </div>`
          )
          .join("")
      : `<p class="jn-cmt-empty dim">${esc(t("commentEmpty"))}</p>`;
    return `<div class="jn-cmts" data-jn-cmts="${esc(postId)}">
      <div class="jn-cmts-lab">${esc(t("comments"))} · ${list.length}</div>
      <div class="jn-cmts-list">${items}</div>
      <div class="jn-cmt-compose">
        <input type="text" maxlength="280" placeholder="${esc(t("commentPh"))}" data-jn-cmt-in="${esc(postId)}">
        <button type="button" class="btn sm gold" data-jn-cmt-send="${esc(postId)}">${esc(t("commentSend"))}</button>
      </div>
    </div>`;
  }

  function igCardHtml(p, R, opts) {
    opts = opts || {};
    const my = R[p.id] || {};
    const counts = Object.assign({ j: 0, a: 0, d: 0 }, p.counts || {});
    const body = L3(p.text);
    const P = storeGet(SK_PROF, {});
    const handleStr = p.own ? handleOf(P) : "@" + String(p.handle || slugHandle(p.author || "user")).replace(/^@/, "");
    if (!p.handle && !p.own) p.handle = slugHandle(p.author || "user");
    const av = p.own && P.avatarUrl
      ? `<span class="jn-av sm has-img"><img src="${esc(P.avatarUrl)}" alt=""></span>`
      : `<span class="jn-av sm">${esc(p.av || initials(p.author))}</span>`;
    const has = postHasImg(p);
    const key = postImgKey(p);
    const media = has
      ? `<div class="jn-ig-media"><img data-jn-img="${esc(key)}" alt="" class="jn-ig-img"><div class="jn-ig-ph" aria-hidden="true"></div></div>`
      : "";
    const dalil = p.dalil
      ? `<div class="jn-dalil"><div class="ar" dir="rtl" lang="ar">${esc(p.dalil.ar)}</div><div class="mn">${esc(L3(p.dalil.mn))}</div><div class="lb">${esc(p.dalil.ref)}</div></div>`
      : "";
    const saved = (storeGet(SK_SAVED, []) || []).includes(p.id);
    return `<article class="jn-ig" data-id="${esc(p.id)}" ${opts.anchor ? 'id="jn-anchor-' + esc(p.id) + '"' : ""}>
      <header class="jn-ig-hd">
        ${av}
        <div class="jn-ig-who">
          ${authorLineHtml(p)}
        </div>
        <span class="jn-type chip">${esc(typeLabel(p.type))}</span>
        <time class="jn-ig-time">${esc(p.age || "")}</time>
      </header>
      ${media}
      <div class="jn-react jn-ig-react">
        <button type="button" data-jn-react="j" class="${my.j ? "on" : ""}">🤍 ${esc(t("reactJ"))} · ${counts.j + (my.j ? 1 : 0)}</button>
        <button type="button" data-jn-react="a" class="${my.a ? "on" : ""}">🤲 ${esc(t("reactA"))} · ${counts.a + (my.a ? 1 : 0)}</button>
        <button type="button" data-jn-react="d" class="${my.d ? "on" : ""}">🕊️ ${esc(t("reactD"))} · ${counts.d + (my.d ? 1 : 0)}</button>
        <button type="button" data-jn-save="1" class="${saved ? "on" : ""}">🔖 ${esc(t("savePost"))}</button>
        <button type="button" data-jn-share="1">↗ ${esc(t("sharePost"))}</button>
      </div>
      ${captionHtml(body, p.id)}
      ${dalil}
      ${p.pending ? `<div class="jn-pending">⏳ ${esc(t("pending"))}</div>` : ""}
      ${opts.compact ? "" : commentsHtml(p.id) + `
      <div class="jn-card-ft">
        <button type="button" class="jn-rep" data-jn-report="1">${esc(t("report"))}</button>
        ${!p.own ? `<button type="button" class="jn-rep" data-jn-block-author="${esc(p.handle || slugHandle(p.author || ""))}">${esc(t("commentBlock"))}</button>` : ""}
      </div>`}
    </article>`;
  }

  function renderFeed(view) {
    const list = posts().filter((p) => {
      if (p.hidden || p.status === "rejected") return false;
      if (!p.own && isBlockedHandle(p.handle || slugHandle(p.author || ""))) return false;
      return p.verified || p.own || p.pending;
    });
    /* Prefer verified posts in public feed; keep own pending visible */
    const pub = list.filter((p) => p.verified || (p.own && isVerifiedCreator()) || p.pending);
    const use = pub.length ? pub : list;
    const R = reacts();
    const prompt = isVerifiedCreator()
      ? ""
      : `<div class="jn-creator-prompt">
          <div><b>${esc(t("creatorBanner"))}</b><p>${esc(t("feedPrompt"))}</p></div>
          <button type="button" class="btn sm gold" data-jn="apply">${esc(t("feedPromptCta"))}</button>
        </div>`;
    view.innerHTML = prompt + `<div class="jn-feed jn-ig-feed">` + use.map((p) => igCardHtml(p, R)).join("") + `</div>`;
    hydrateImgs(view);
    syncFab();
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
    const mine = posts().filter((p) => p.own && !p.hidden);
    const bio = (P.bio || "").slice(0, 150);
    const storeB = window.bmStoreBuild && window.bmStoreBuild();
    const shopLab = storeB ? (window.BMStoreGate ? BMStoreGate.tt("minatT") : "Daftar minat") : (P.hasShop ? t("shopYours") : t("openShop"));
    const shopAct = storeB ? "storeminat" : (P.hasShop ? "shopdash" : "openshop");
    view.innerHTML = `<div class="jn-prof tt">
      <div class="jn-prof-bar">
        <button type="button" class="jn-icon-btn" data-jn="editprof" aria-label="${esc(t("editProf"))}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
        </button>
        <div class="jn-prof-bar-sp"></div>
        <button type="button" class="jn-icon-btn jn-msg-ico" data-jn="pesan" aria-label="${esc(t("pesanBadge"))}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
          <em>3</em>
        </button>
        <button type="button" class="jn-icon-btn" data-jn="profmenu" aria-label="${esc(t("menu"))}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
      <div class="jn-prof-head">
        ${avHtml(P, "jn-av lg")}
        <h2 class="jn-disp jn-disp-row">${esc(P.name || "Hamba Allah")}${isVerifiedCreator() ? verifiedBadgeHtml(18) : ""}</h2>
        <div class="jn-handle">${esc(handleOf(P))}${isVerifiedCreator() && creatorOfHandle(myHandle()) ? " · " + esc(creatorTypeLabel(creatorOfHandle(myHandle()).type)) : ""}</div>
        <p class="jn-bio">${bio ? esc(bio) : `<span class="dim">${esc(t("bioPh"))}</span>`}</p>
        ${creatorStatusHtml()}
        <div class="jn-pills">
          <button type="button" class="jn-pill has-dot" data-jn="orders" aria-label="${esc(t("ordersYours"))}">
            <svg class="jn-pill-ic" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7.5 7V6a4.5 4.5 0 0 1 9 0v1H19a1.5 1.5 0 0 1 1.5 1.5v11A2.5 2.5 0 0 1 18 22H6a2.5 2.5 0 0 1-2.5-2.5v-11A1.5 1.5 0 0 1 5 7h2.5zm1.75 0h5.5V6a2.75 2.75 0 0 0-5.5 0v1z"/></svg><span class="jn-pill-tx">${esc(t("ordersYours"))}</span><i class="jn-pill-dot" aria-hidden="true"></i>
          </button>
          <button type="button" class="jn-pill" data-jn="${shopAct}" aria-label="${esc(shopLab)}">
            <svg class="jn-pill-ic" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7.5 7V6a4.5 4.5 0 0 1 9 0v1H19a1.5 1.5 0 0 1 1.5 1.5v11A2.5 2.5 0 0 1 18 22H6a2.5 2.5 0 0 1-2.5-2.5v-11A1.5 1.5 0 0 1 5 7h2.5zm1.75 0h5.5V6a2.75 2.75 0 0 0-5.5 0v1z"/></svg><span class="jn-pill-tx">${esc(shopLab)}</span>
          </button>
        </div>
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
                const pend = p.pending ? `<em class="jn-tile-pend">⏳</em>` : "";
                const ic = esc((TYPES.find((z) => z.id === p.type) || {}).ic || "");
                if (postHasImg(p)) {
                  const key = postImgKey(p);
                  return `<button type="button" class="jn-tile img" data-jn-post="${esc(p.id)}"><img data-jn-img="${esc(key)}" alt="" src=""><span class="jn-tile-type">${ic}</span>${pend}</button>`;
                }
                return `<button type="button" class="jn-tile txt t-${esc(p.type || "refleksi")}" data-jn-post="${esc(p.id)}"><span class="jn-tile-snip">${esc(snip.slice(0, 90))}${snip.length > 90 ? "…" : ""}</span><span class="jn-tile-type">${ic}</span>${pend}</button>`;
              })
              .join("")
          : `<p class="jn-grid-empty dim">${esc(t("noPosts"))}</p>`
      }</div>
    </div>`;
    hydrateImgs(view);
  }


  function creatorStatusHtml() {
    if (isVerifiedCreator()) {
      const cr = creatorOfHandle(myHandle());
      return `<div class="jn-creator-status ok">${verifiedBadgeHtml(18)} <span>${esc(t("applyApproved"))}${cr && cr.type ? " · " + esc(creatorTypeLabel(cr.type)) : ""}</span></div>`;
    }
    const app = myApplication();
    if (app && app.status === "pending") {
      return `<div class="jn-creator-status pend">⏳ ${esc(t("applyPending"))}</div>`;
    }
    if (app && app.status === "rejected") {
      return `<div class="jn-creator-status rej">✕ ${esc(t("applyRejected"))}${app.rejectReason ? ": " + esc(app.rejectReason) : ""}
        <button type="button" class="btn sm gold" data-jn="apply" style="margin-top:8px">${esc(t("fabApply"))}</button></div>`;
    }
    return `<div class="jn-creator-status">
      <p>${esc(t("applyLead"))}</p>
      <button type="button" class="btn gold" data-jn="apply">${esc(t("fabApply"))}</button>
    </div>`;
  }

  function openApplyForm() {
    const app = myApplication();
    if (isVerifiedCreator()) {
      toast(t("applyApproved"));
      return;
    }
    if (app && app.status === "pending") {
      toast(t("applyPending"));
      return;
    }
    if (!hasAcceptedTos()) {
      requireTos(() => openApplyForm());
      return;
    }
    const P = storeGet(SK_PROF, {}) || {};
    const prev = app && app.status === "rejected" ? app : {};
    openSheet(
      t("applyT"),
      `<div class="jn-apply">
        <p class="dim jn-apply-lead">${esc(t("applyLead"))}</p>
        <label class="jn-field"><span>${esc(t("applyName"))}</span>
          <input type="text" id="jnAppName" maxlength="60" value="${esc(prev.name || P.name || "")}">
        </label>
        <div class="eyebrow" style="margin-top:8px">${esc(t("applyType"))}</div>
        <div class="jn-types jn-app-types">${CREATOR_TYPES.map(
          (x) => `<button type="button" data-jn-app-type="${x.id}" class="${(prev.type || "ustadz") === x.id ? "on" : ""}"><b>${esc(t(x.t))}</b></button>`
        ).join("")}</div>
        <input type="hidden" id="jnAppType" value="${esc(prev.type || "ustadz")}">
        <label class="jn-field"><span>${esc(t("applyBio"))}</span>
          <textarea id="jnAppBio" maxlength="400" rows="3" placeholder="${esc(t("applyBioPh"))}">${esc(prev.bio || "")}</textarea>
        </label>
        <label class="jn-field"><span>${esc(t("applyProof"))}</span>
          <input type="url" id="jnAppProof" maxlength="200" placeholder="${esc(t("applyProofPh"))}" value="${esc(prev.proof || "")}">
        </label>
        <label class="jn-field"><span>${esc(t("applySample"))}</span>
          <textarea id="jnAppSample" maxlength="400" rows="3" placeholder="${esc(t("applySamplePh"))}">${esc(prev.sample || "")}</textarea>
        </label>
        <label class="jn-agree"><input type="checkbox" id="jnAppAgree"> <span>${esc(t("applyAgree"))}</span></label>
        <div class="row" style="gap:8px;margin-top:14px;justify-content:flex-end">
          <button type="button" class="btn ghost" data-jn="sheetx">${esc(t("cancel"))}</button>
          <button type="button" class="btn gold" data-jn="submitapply">${esc(t("applySubmit"))}</button>
        </div>
      </div>`
    );
  }

  function submitApply() {
    const name = ($("#jnAppName") && $("#jnAppName").value.trim()) || "";
    const type = ($("#jnAppType") && $("#jnAppType").value) || "ustadz";
    const bio = ($("#jnAppBio") && $("#jnAppBio").value.trim()) || "";
    const proof = ($("#jnAppProof") && $("#jnAppProof").value.trim()) || "";
    const sample = ($("#jnAppSample") && $("#jnAppSample").value.trim()) || "";
    const agree = $("#jnAppAgree") && $("#jnAppAgree").checked;
    if (!name || !bio || !proof || !sample || !agree) {
      toast(t("applyNeed"));
      return;
    }
    const apps = (storeGet(SK_APPS, []) || []).filter((a) => String(a.handle || "").toLowerCase() !== myHandle());
    apps.unshift({
      id: "app_" + Date.now(),
      handle: myHandle(),
      name,
      type,
      bio,
      proof,
      sample,
      agreed: true,
      status: "pending",
      rejectReason: "",
      at: Date.now(),
      av: initials(name)
    });
    storeSet(SK_APPS, apps);
    closeSheet();
    toast(t("applySent"));
    if (state.tab === "prof") render();
    else syncFab();
  }


  function openProfMenu() {
    openSheet(
      t("menu"),
      `<div class="jn-prof-acts">
        <button type="button" data-jn="settings"><span>${esc(t("pengaturan"))}</span><em>›</em></button>
        <button type="button" data-jn="allfitur"><span>${esc(t("semuaFitur"))}</span><em>›</em></button>
        <button type="button" data-jn="editprof"><span>${esc(t("editProf"))}</span><em>›</em></button>
        <button type="button" class="jn-admin-hid" data-jn="admin" hidden><span>${esc(t("adminPanel"))}</span><em>›</em></button>
      </div>
      <p class="dim" style="font-size:11px;margin-top:10px;text-align:center">${esc(t("verLong") || "")}</p>`
    );
    /* Reveal Panel Admin after long-press on menu title area — also via #admin */
    const hid = $("#jnSheetBody .jn-admin-hid");
    const hd = $("#jnSheetT");
    if (hid && hd && !(window.bmStoreBuild && window.bmStoreBuild())) {
      let tm = null;
      const start = () => {
        tm = setTimeout(() => {
          hid.hidden = false;
        }, 700);
      };
      const cancel = () => {
        if (tm) clearTimeout(tm);
        tm = null;
      };
      hd.addEventListener("pointerdown", start);
      hd.addEventListener("pointerup", cancel);
      hd.addEventListener("pointerleave", cancel);
    }
  }

  function openOrders() {
    const orders = storeGet("rk_bb_orders_v1", []) || [];
    openSheet(
      t("ordersT"),
      orders.length
        ? `<div class="jn-orders">${orders
            .map(
              (o) =>
                `<div class="jn-order"><b>${esc(o.title || "Item")}</b><small>${esc(o.status || "")} · ${esc(o.when || "")}</small></div>`
            )
            .join("")}</div>`
        : `<div class="jn-empty-shop">
            <div class="big">🛍️</div>
            <b>${esc(t("ordersEmpty"))}</b>
            <p class="dim">${esc(t("ordersEmptyS"))}</p>
            <button type="button" class="btn gold" data-jn="gotobelanja">${esc(t("ordersBrowse"))}</button>
          </div>`
    );
  }

  function openShopDash() {
    openSheet(
      t("shopDashT"),
      `<div class="jn-shop-dash">
        <p class="muted">${esc(t("shopDashS"))}</p>
        <div class="jn-stats" style="margin-top:12px">
          <div><b>0</b><span>${esc(t("shopProducts"))}</span></div>
          <div><b>0</b><span>${esc(t("shopOrdersIn"))}</span></div>
          <div><b>—</b><span>Rp</span></div>
        </div>
        <p class="dim" style="margin-top:12px;font-size:12px">${esc(t("shopSoon"))}</p>
        <button type="button" class="btn sm ghost" data-jn="sheetx" style="margin-top:10px">${esc(t("back"))}</button>
      </div>`
    );
  }

  function openShopOnboard() {
    openSheet(
      t("openShopT"),
      `<div class="jn-shop-on">
        <div class="big">🏪</div>
        <p>${esc(t("openShopLead"))}</p>
        <ul class="jn-shop-bullets">
          <li>${esc(t("openShopB1"))}</li>
          <li>${esc(t("openShopB2"))}</li>
          <li>${esc(t("openShopB3"))}</li>
        </ul>
        <button type="button" class="btn gold" data-jn="shopcta">${esc(t("openShopCta"))}</button>
        <p class="dim" style="font-size:11.5px;margin-top:10px">${esc(t("openShopNote"))}</p>
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
    openOwnFeed(id);
  }

  function openOwnFeed(startId) {
    const mine = posts().filter((p) => p.own && !p.hidden);
    if (!mine.length) return;
    const R = reacts();
    const html =
      `<div class="jn-own-feed" id="jnOwnFeed">` +
      mine.map((p) => igCardHtml(p, R, { anchor: true, compact: true })).join("") +
      `</div>`;
    openSheet(t("ownFeed"), html);
    const body = $("#jnSheetBody");
    if (body) {
      body.dataset.ownFeed = "1";
      body.dataset.detailId = startId || "";
    }
    hydrateImgs(body || document).then(() => {
      const el = document.getElementById("jn-anchor-" + startId);
      if (el) {
        try {
          el.scrollIntoView({ block: "start", behavior: "auto" });
        } catch (e) {
          el.scrollIntoView();
        }
      }
    });
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
    if (!isVerifiedCreator()) {
      toast(t("onlyCreator"));
      openApplyForm();
      return;
    }
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

  async function publish() {
    const ta = $("#jnText");
    if (ta) state.compose.text = ta.value;
    const text = (state.compose.text || "").trim();
    const rawImg = state.compose.img;
    if (!text && !rawImg) {
      toast(t("needContent"));
      return;
    }
    const P = storeGet(SK_PROF, {});
    const id = "u" + Date.now();
    let hasImg = false;
    if (rawImg) {
      const ok = await savePostImage(id, rawImg);
      if (!ok) {
        toast(t("imgFail"));
        /* still allow text-only publish if text present */
        if (!text) return;
      } else {
        hasImg = true;
      }
    }
    const cr = creatorOfHandle(myHandle());
    const post = {
      id: id,
      type: state.compose.type,
      author: P.name || "Hamba Allah",
      handle: myHandle(),
      av: P.av || initials(P.name),
      age: "Baru",
      text: { id: text || " ", en: text || " ", ar: text || " " },
      dalil: state.compose.dalil,
      hasImg: hasImg,
      imgKey: hasImg ? id : null,
      counts: { j: 0, a: 0, d: 0 },
      pending: true,
      own: true,
      verified: !!cr,
      creatorType: cr ? cr.type : ""
    };
    try {
      const trust = storeGet("rk_jn_trust_v1", []) || [];
      const handle = (P.handle || "hambaallah").replace(/^@/, "");
      const u = trust.find((x) => x && x.handle === handle && x.auto);
      if (u) {
        post.pending = false;
        post.status = "approved";
      }
    } catch (e) {}
    const list = posts();
    list.unshift(post);
    savePosts(list);
    state.compose.img = null;
    closeSheet();
    toast(t("published"));
    state.tab = "prof";
    try { sessionStorage.setItem("rk_jn_tab", "prof"); } catch (e) {}
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
    if (g("[data-jn=orders]")) {
      e.preventDefault();
      openOrders();
      return;
    }
    if (g("[data-jn=storeminat]")) {
      e.preventDefault();
      if (window.BMStoreGate) BMStoreGate.showMinatSheet("shopSoon", "buka_toko");
      return;
    }
    if (g("[data-jn=openshop]")) {
      e.preventDefault();
      if (window.bmStoreBuild && window.bmStoreBuild()) {
        if (window.BMStoreGate) BMStoreGate.showMinatSheet("shopSoon", "buka_toko");
        return;
      }
      openShopOnboard();
      return;
    }
    if (g("[data-jn=shopdash]")) {
      e.preventDefault();
      openShopDash();
      return;
    }
    if (g("[data-jn=gotobelanja]")) {
      e.preventDefault();
      closeSheet();
      if (window.go) window.go("belanja");
      return;
    }
    if (g("[data-jn=shopcta]")) {
      e.preventDefault();
      if (window.bmStoreBuild && window.bmStoreBuild()) {
        if (window.BMStoreGate) BMStoreGate.showMinatSheet("shopSoon", "buka_toko");
        return;
      }
      /* Prototype: mark hasShop and show dashboard */
      const P = storeGet(SK_PROF, defaultProf());
      P.hasShop = true;
      storeSet(SK_PROF, P);
      toast(t("shopYours") + " ✓");
      openShopDash();
      return;
    }
    if (g("[data-jn=admin]")) {
      e.preventDefault();
      closeSheet();
      if (window.bmStoreBuild && window.bmStoreBuild()) return;
      if (window.RKAdmin) RKAdmin.open("queue");
      else if (window.go) window.go("admin");
      return;
    }
    if (g("[data-jn=closesshop]")) {
      e.preventDefault();
      closeSheet();
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
    const more = g("[data-jn-more]");
    if (more) {
      e.preventDefault();
      const cap = more.closest(".jn-cap");
      const body = cap && cap.querySelector(".jn-cap-body");
      if (body) {
        const expanded = more.dataset.open === "1";
        if (expanded) {
          body.textContent = body.dataset.short || body.textContent;
          more.textContent = t("more");
          more.dataset.open = "0";
        } else {
          body.textContent = body.dataset.full || body.textContent;
          more.textContent = t("less");
          more.dataset.open = "1";
        }
      }
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
      syncFab();
      $("#nav button").forEach((b) => b.classList.toggle("on", b.dataset.p === "profil"));
      try { history.replaceState(history.state, "", "#profil"); } catch (err) {}
      render();
      return;
    }
    if (g('[data-jn-tab="feed"]')) {
      e.preventDefault();
      state.tab = "feed";
      try { sessionStorage.setItem("rk_jn_tab", "feed"); } catch (err) {}
      syncFab();
      $("#nav button").forEach((b) => b.classList.toggle("on", b.dataset.p === "jejak-nur"));
      try { history.replaceState(history.state, "", "#jejak-nur"); } catch (err) {}
      render();
      return;
    }
    if (g("[data-jn=compose]")) {
      e.preventDefault();
      openCompose();
      return;
    }
    if (g("[data-jn=apply]")) {
      e.preventDefault();
      openApplyForm();
      return;
    }
    if (g("[data-jn=submitapply]")) {
      e.preventDefault();
      submitApply();
      return;
    }
    const appType = g("[data-jn-app-type]");
    if (appType) {
      e.preventDefault();
      const hid = $("#jnAppType");
      if (hid) hid.value = appType.dataset.jnAppType;
      $("[data-jn-app-type]").forEach((b) => b.classList.toggle("on", b === appType));
      return;
    }
    const cmtSend = g("[data-jn-cmt-send]");
    if (cmtSend) {
      e.preventDefault();
      const pid = cmtSend.dataset.jnCmtSend;
      const inp = document.querySelector('[data-jn-cmt-in="' + pid + '"]');
      const draft = inp ? inp.value : "";
      const send = () => {
        const res = addComment(pid, draft);
        if (!res.ok) {
          toast(res.reason === "empty" ? t("needText") : t("commentBlocked"));
          return;
        }
        toast(t("commentOk"));
        render();
      };
      if (!hasAcceptedTos()) {
        requireTos(send);
        return;
      }
      send();
      return;
    }
    if (g("[data-jn=tosok]")) {
      e.preventDefault();
      const box = $("#jnTosAgree");
      if (!box || !box.checked) {
        toast(t("tosNeed"));
        return;
      }
      acceptTos();
      toast(t("tosOk"));
      const then = state._tosThen;
      state._tosThen = null;
      closeSheet();
      if (typeof then === "function") setTimeout(then, 50);
      return;
    }
    const cmtRep = g("[data-jn-cmt-report]");
    if (cmtRep) {
      e.preventDefault();
      const card = g(".jn-ig[data-id]");
      if (card) reportComment(card.dataset.id, cmtRep.dataset.jnCmtReport);
      toast(t("commentReported"));
      return;
    }
    const cmtBlk = g("[data-jn-cmt-block]");
    if (cmtBlk) {
      e.preventDefault();
      blockHandle(cmtBlk.dataset.jnCmtBlock);
      toast(t("userBlockedOk"));
      render();
      return;
    }
    const blkAuth = g("[data-jn-block-author]");
    if (blkAuth) {
      e.preventDefault();
      blockHandle(blkAuth.dataset.jnBlockAuthor);
      toast(t("userBlockedOk"));
      render();
      return;
    }
    if (g("[data-jn-save]")) {
      e.preventDefault();
      const card = g(".jn-ig[data-id]");
      if (!card) return;
      const id = card.dataset.id;
      let saved = storeGet(SK_SAVED, []) || [];
      if (saved.includes(id)) saved = saved.filter((x) => x !== id);
      else saved.unshift(id);
      storeSet(SK_SAVED, saved);
      toast(t("savedOk"));
      render();
      return;
    }
    if (g("[data-jn-share]")) {
      e.preventDefault();
      const card = g(".jn-ig[data-id]");
      try {
        const url = location.origin + "/#jejak-nur";
        if (navigator.clipboard) navigator.clipboard.writeText(url);
      } catch (err) {}
      toast(t("sharedOk"));
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

    /* React from IG card (feed or own-feed sheet) */
    const ig = g(".jn-ig[data-id], .jn-card[data-id]");
    if (ig) {
      const id = ig.dataset.id;
      const rr = g("[data-jn-react]");
      if (rr) {
        e.preventDefault();
        const k = rr.dataset.jnReact;
        const R = reacts();
        R[id] = R[id] || {};
        R[id][k] = !R[id][k];
        saveReacts(R);
        const inSheet = !!(g("#jnSheet") && !$("#jnSheet").hidden);
        if (inSheet && $("#jnSheetBody") && $("#jnSheetBody").dataset.ownFeed) {
          openOwnFeed(id);
        } else {
          render();
        }
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
    migrateInlineImages().then(() => {
      try {
        const view = $("#jnView");
        if (view) hydrateImgs(view);
      } catch (e) {}
    });
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

  window.RKJejakNur = {
    open: showPage,
    render,
    t,
    openPesan,
    openCompose,
    openApplyForm,
    loadPostImage,
    savePostImage,
    postHasImg,
    migrateInlineImages,
    posts,
    creators,
    isVerifiedCreator,
    myApplication,
    commentsFor,
    reportComment,
    SK_APPS,
    SK_CREATORS,
    SK_CMT_REPORTS
  };
})();
