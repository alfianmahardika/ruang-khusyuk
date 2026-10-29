/*! Best Muslim v94 — Panduan Pengguna (in-app guide book).
 * Inspired by a “library book” reading UX; original BM theme (dark/light/Dusty Pink).
 * Body: id + en. Arabic UI chrome translated; ar body falls back to id (no MT of religious text).
 */
(function () {
  "use strict";

  var SK_POS = "rk_panduan_pos_v1";
  var SK_TIP = "rk_panduan_tip_dismiss_v1";
  var SK_SEEN = "rk_panduan_opened_v1";

  function lang() {
    try {
      if (window.I18N && I18N.lang) return I18N.lang;
      var v = localStorage.getItem("rk_lang");
      if (v) return JSON.parse(v);
    } catch (e) {}
    return "id";
  }
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
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function toast(m) {
    if (window.toast) return window.toast(m);
    try {
      console.log("[panduan]", m);
    } catch (e) {}
  }
  function isStore() {
    return !!(window.bmStoreBuild && window.bmStoreBuild());
  }
  function L3(o) {
    if (!o) return "";
    if (typeof o === "string") return o;
    var l = lang();
    if (l === "en" && o.en) return o.en;
    if (l === "ar") return o.ar || o.id || o.en || "";
    return o.id || o.en || "";
  }
  function bodyLang() {
    /* Guide body: id + en; ar falls back to id with note */
    return lang() === "en" ? "en" : "id";
  }
  function LB(o) {
    if (!o) return "";
    if (typeof o === "string") return o;
    var bl = bodyLang();
    return o[bl] || o.id || o.en || "";
  }

  var UI = {
    title: { id: "Panduan Best Muslim", en: "Best Muslim Guide", ar: "دليل Best Muslim" },
    author: { id: "Tim Best Muslim", en: "Best Muslim Team", ar: "فريق Best Muslim" },
    back: { id: "Kembali", en: "Back", ar: "رجوع" },
    toc: { id: "Daftar isi", en: "Contents", ar: "المحتويات" },
    searchPh: { id: "Cari di panduan…", en: "Search the guide…", ar: "ابحث في الدليل…" },
    copy: { id: "Salin", en: "Copy", ar: "نسخ" },
    share: { id: "Bagikan", en: "Share", ar: "مشاركة" },
    copied: { id: "Disalin", en: "Copied", ar: "تم النسخ" },
    openFeat: { id: "Buka fitur →", en: "Open feature →", ar: "افتح الميزة →" },
    tipT: { id: "Baru di sini? Baca panduan", en: "New here? Read the guide", ar: "جديد هنا؟ اقرأ الدليل" },
    tipL: {
      id: "Panduan singkat semua fitur Best Muslim — seperti buku di perpustakaan Anda.",
      en: "A short guide to every Best Muslim feature — like a book in your library.",
      ar: "دليل موجز لكل ميزات Best Muslim."
    },
    tipGo: { id: "Baca sekarang", en: "Read now", ar: "اقرأ الآن" },
    menuGuide: { id: "Panduan Pengguna", en: "User guide", ar: "دليل المستخدم" },
    setGuide: { id: "Panduan & Bantuan", en: "Guide & help", ar: "الدليل والمساعدة" },
    setGuideSub: {
      id: "Cara memakai seluruh fitur",
      en: "How to use every feature",
      ar: "كيف تستخدم كل الميزات"
    },
    bookT: { id: "Panduan Best Muslim", en: "Best Muslim Guide", ar: "دليل Best Muslim" },
    bookS: {
      id: "Buku panduan · Tim Best Muslim",
      en: "Guidebook · Best Muslim Team",
      ar: "كتاب الدليل · فريق Best Muslim"
    },
    bookEy: { id: "Mulai di sini", en: "Start here", ar: "ابدأ من هنا" },
    arNote: {
      id: "",
      en: "",
      ar: "نص الدليل معروض بالإندونيسية مؤقتًا — بدون ترجمة آلية للنصوص الدينية."
    },
    empty: { id: "Tidak ada hasil.", en: "No results.", ar: "لا نتائج." },
    resume: { id: "Lanjutkan baca", en: "Continue reading", ar: "تابع القراءة" },
    coverLead: {
      id: "Selamat datang. Panduan ini menjelaskan fitur yang benar-benar ada di aplikasi — singkat, hangat, dan bisa dilompati lewat daftar isi.",
      en: "Welcome. This guide covers features that actually ship in the app — short, warm, and jumpable via the table of contents.",
      ar: ""
    }
  };

  /* Content keyed to real product surfaces (no Admin panel). */
  var SECTIONS = [
    {
      id: "mulai",
      title: { id: "Mulai di Best Muslim", en: "Getting started" },
      cards: [
        {
          id: "apa",
          title: { id: "Apa itu Best Muslim?", en: "What is Best Muslim?" },
          body: {
            id: "Best Muslim membantu ibadah harian: salat tepat waktu, tilawah Al-Qur'an, kiblat, hafalan, belajar (Akademi), dan Jamaah. Tidak perlu akun untuk mulai. Preferensi dan progres tersimpan di HP Anda.",
            en: "Best Muslim supports daily worship: timely prayer, Qur’an reading, qibla, memorisation, Academy learning, and Jamaah. No account needed. Preferences and progress stay on your phone."
          },
          shot: "panduan/shots/beranda.jpg"
        },
        {
          id: "navigasi",
          title: { id: "Navigasi bawah", en: "Bottom navigation" },
          body: {
            id: "Lima pintasan utama: Beranda, Toko Berkah, Al-Qur'an (tengah — mushaf), Jamaah, dan Profil. Akademi Syahadah terbuka dari ikon Syahadah / tab Akademi. Pencarian ada di ikon kaca pembesar di header.",
            en: "Five main shortcuts: Home, Toko Berkah, Al-Qur’an (center — mushaf), Jamaah, and Profile. Shahadah Academy opens from the Shahadah icon / Academy tab. Search is the magnifier in the header."
          }
        }
      ]
    },
    {
      id: "beranda",
      title: { id: "Beranda · Hari ini", en: "Home · Today" },
      cards: [
        {
          id: "target",
          title: { id: "Target harian & streak", en: "Daily goals & streak" },
          body: {
            id: "Kartu Hari ini punya 2 target wajib: Sholat dan Hikmah Harian. Bonus tilawah Qur'an bersifat opsional dan tidak memengaruhi streak. Selesaikan keduanya untuk menjaga streak 🔥.",
            en: "The Today card has 2 required goals: Prayer and Daily Hikmah. Qur’an tilawah is an optional bonus and does not affect your streak. Finish both required goals to keep your 🔥 streak."
          },
          go: "beranda",
          shot: "panduan/shots/beranda.jpg"
        },
        {
          id: "pembeku",
          title: { id: "Pembeku streak", en: "Streak freeze" },
          body: {
            id: "Jika kemarin belum lengkap, aplikasi dapat memakai 🧊 Pembeku agar streak tidak putus (terbatas). Kalender streak menampilkan hari lengkap, pembeku, dan mode uzur.",
            en: "If yesterday was incomplete, the app may use a 🧊 Freeze so your streak is not broken (limited). The streak calendar shows complete days, freezes, and uzur mode."
          }
        },
        {
          id: "uzur",
          title: { id: "Mode uzur", en: "Uzur mode" },
          body: {
            id: "Mode uzur untuk kondisi yang membuat sholat tidak wajib atau memberatkan. Saat aktif, streak dijeda (tidak putus; pembeku tidak dipakai). Aktifkan dari kartu Hari ini.",
            en: "Uzur mode is for times when prayer is not obligatory or is a hardship. While on, your streak is paused (not broken; no freeze used). Turn it on from the Today card."
          }
        },
        {
          id: "dompet",
          title: { id: "Dompet poin / Poin Berkah", en: "Points wallet" },
          body: {
            id: "Dompet menampilkan Poin Berkah lokal di perangkat (bukan uang). Klaim poin dari aktivitas ibadah yang tersedia. Di build toko, fitur bayar Muslim Pay disembunyikan.",
            en: "The wallet shows on-device Poin Berkah (not money). Claim points from available worship actions. In the store build, Muslim Pay checkout is hidden."
          }
        }
      ]
    },
    {
      id: "hikmah",
      title: { id: "Hikmah Harian", en: "Daily Hikmah" },
      cards: [
        {
          id: "hikmah1",
          title: { id: "Putaran Hikmah", en: "Hikmah round" },
          body: {
            id: "Hikmah Harian adalah salah satu target wajib Hari ini. Selesaikan putaran yang ditampilkan (mis. Kata Qur'an / refleksi) agar goal Hikmah tercentang. Konten bersifat lokal dan tenang — tanpa autoplay paksa.",
            en: "Daily Hikmah is one of Today’s required goals. Finish the shown round (e.g. a Qur’an word / reflection) so the Hikmah goal checks off. Content stays local and calm — no forced autoplay."
          },
          go: "kata-quran"
        }
      ]
    },
    {
      id: "jadwal",
      title: { id: "Jadwal salat & azan", en: "Prayer times & azan" },
      cards: [
        {
          id: "jadwal1",
          title: { id: "Atur lokasi & metode", en: "Location & method" },
          body: {
            id: "Buka Jadwal → Gunakan lokasi saya atau cari kota. Pilih metode perhitungan dan madzhab Asar. Waktu berikutnya muncul di Beranda setelah lokasi tersimpan.",
            en: "Open Times → Use my location or search a city. Choose calculation method and Asr school. The next prayer appears on Home once location is saved."
          },
          go: "jadwal",
          shot: "panduan/shots/jadwal.jpg"
        },
        {
          id: "azan",
          title: { id: "Notifikasi & suara azan", en: "Notifications & azan sound" },
          body: {
            id: "Aktifkan notifikasi di kartu pengaturan Jadwal. Pilih suara (Makkah, Madinah, Mesir, Turki), notifikasi saja, atau senyap. Di Android/iOS native, azan bisa dijadwalkan saat aplikasi ditutup.",
            en: "Enable notifications in the Times settings card. Pick a voice (Makkah, Madinah, Egypt, Turkey), notification-only, or silent. On native Android/iOS, azan can schedule while the app is closed."
          }
        },
        {
          id: "exact",
          title: { id: "Tips alarm tepat waktu", en: "Exact-alarm tips" },
          body: {
            id: "Agar azan tidak molor di Android, izinkan alarm tepat waktu (SCHEDULE_EXACT_ALARM) saat diminta. Jika ditolak, pengingat tetap jalan secara tidak tepat waktu, dan aplikasi menampilkan edukasi singkat. Opsi abaikan optimasi baterai hanya setelah Anda menyetujui langkah keandalan — bukan di buka pertama.",
            en: "For on-time azan on Android, allow exact alarms when prompted. If denied, reminders still schedule inexactly and the app explains how to enable exact alarms. Battery unrestricted is only after you opt into the reliability step — never on first open."
          }
        }
      ]
    },
    {
      id: "kiblat",
      title: { id: "Kiblat & kamera AR", en: "Qibla & AR camera" },
      cards: [
        {
          id: "kiblat1",
          title: { id: "Kompas kiblat", en: "Qibla compass" },
          body: {
            id: "Dari Jadwal atau Fitur → Kiblat, kalibrasi dengan menggerakkan HP berbentuk angka 8 jika diminta. Arah Ka'bah dihitung dari lokasi Anda.",
            en: "From Times or Features → Qibla, calibrate by moving the phone in a figure-8 if prompted. Kaaba direction is computed from your location."
          },
          go: "kiblat",
          shot: "panduan/shots/kiblat.jpg"
        },
        {
          id: "ar",
          title: { id: "Pratinjau kamera AR", en: "AR camera preview" },
          body: {
            id: "Opsi kamera AR menampilkan pratinjau langsung di layar untuk membantu mengarah. Bingkai tidak disimpan ke galeri atau server Best Muslim.",
            en: "The AR camera option shows a live preview to help you aim. Frames are not saved to your gallery or Best Muslim servers."
          }
        }
      ]
    },
    {
      id: "quran",
      title: { id: "Al-Qur'an", en: "Qur’an" },
      cards: [
        {
          id: "mushaf",
          title: { id: "Mushaf di HP", en: "Mushaf on your phone" },
          body: {
            id: "Tab tengah Al-Qur'an membuka mushaf: daftar surat / halaman / juz / hizb / ruku' / penanda. Ketuk surat untuk membaca. Tombol Aa mengatur ukuran & mode baca.",
            en: "The center Al-Qur’an tab opens the mushaf: surah / page / juz / hizb / ruku’ / bookmarks. Tap a surah to read. Aa adjusts size & reading mode."
          },
          go: "mushaf",
          shot: "panduan/shots/quran.jpg"
        },
        {
          id: "lanjut",
          title: { id: "Lanjutkan membaca & target tilawah", en: "Continue reading & tilawah target" },
          body: {
            id: "Best Muslim mengingat posisi terakhir Anda (Lanjutkan membaca). Target tilawah Qur'an di Hari ini adalah bonus opsional — atur jumlah halaman/target dari kartu Hari ini bila tersedia.",
            en: "Best Muslim remembers your last position (Continue reading). Qur’an tilawah on Today is an optional bonus — set pages/target from the Today card when available."
          }
        },
        {
          id: "tafsir",
          title: { id: "Terjemahan & tafsir", en: "Translation & tafsir" },
          body: {
            id: "Terjemahan Indonesia memakai sumber Kemenag yang disertakan di aplikasi. Tafsir dapat dibuka dari ayat bila berkas tafsir tersedia secara lokal. Tidak ada terjemahan otomatis atas teks agama.",
            en: "Indonesian translation uses the bundled Kemenag source. Tafsir opens from an ayah when local tafsir files are present. There is no machine translation of religious text."
          }
        }
      ]
    },
    {
      id: "hafalan",
      title: { id: "Hafalan AI", en: "AI memorisation" },
      cards: [
        {
          id: "haf1",
          title: { id: "Murajaah di perangkat", en: "On-device murajaah" },
          body: {
            id: "Hafalan AI (beta) membantu latihan murajaah kata demi kata. Model suara opsional diunduh sekali (~233 MB) dan diproses di HP — rekaman tidak diunggah ke server Best Muslim. Anda bisa memakai cek mandiri jika mikrofon ditolak.",
            en: "Hafalan AI (beta) helps word-by-word murajaah. An optional voice model downloads once (~233 MB) and runs on-device — recordings are not uploaded to Best Muslim servers. Use self-check if the mic is denied."
          },
          go: "hafalan",
          shot: "panduan/shots/hafalan.jpg"
        }
      ]
    },
    {
      id: "akademi",
      title: { id: "Akademi Syahadah", en: "Shahadah Academy" },
      cards: [
        {
          id: "aka1",
          title: { id: "Qur'an · Hadis · Sirah", en: "Qur’an · Hadith · Seerah" },
          body: {
            id: "Akademi Syahadah (dari ikon Syahadah / tab Akademi) adalah ruang belajar tenang: jalur Al-Qur'an, Hadis Bukhari, dan Sirah. Hafalan AI juga punya pintu dari sini.",
            en: "Shahadah Academy (from the Shahadah icon / Academy tab) is a calm learning space: Qur’an, Bukhari hadith, and Seerah tracks. Hafalan AI also has an entry here."
          },
          go: "quran",
          shot: "panduan/shots/akademi.jpg"
        },
        {
          id: "game",
          title: { id: "Main & Uji Hafalan", en: "Play & test memory" },
          body: {
            id: "Di atas Akademi ada ruang Main & Uji Hafalan (game bacaan salat / kuis). Progres lencana tersimpan di perangkat. Ini terpisah dari Hafalan AI.",
            en: "Above the Academy is Play & Test Memory (prayer-recitation game / quizzes). Badge progress stays on-device. It is separate from Hafalan AI."
          }
        },
        {
          id: "shsl",
          title: { id: "Satu Hari Satu Langkah", en: "One Day, One Step" },
          body: {
            id: "Program opsional: 1 ayat · 1 hadis · 1 halaman sirah berurutan dari awal. Boleh dijeda atau dihentikan kapan saja dari pengaturan program.",
            en: "Optional programme: 1 verse · 1 hadith · 1 seerah page in order from the start. Pause or stop anytime from programme settings."
          }
        }
      ]
    },
    {
      id: "jamaah",
      title: { id: "Jamaah (Jejak Nur)", en: "Jamaah (Jejak Nur)" },
      cards: [
        {
          id: "feed",
          title: { id: "Feed kebaikan", en: "Goodness feed" },
          body: {
            id: "Tab Jamaah membuka Jejak Nur: unggahan refleksi/kebaikan. Reaksi (Jazakallah, Aamiin, Doakan), komentar, simpan, dan bagikan tersedia. Konten prototipe tersimpan di perangkat.",
            en: "The Jamaah tab opens Jejak Nur: reflection/goodness posts. Reactions (Jazakallah, Aameen, Pray), comments, save, and share are available. Prototype content stays on-device."
          },
          go: "jejak-nur",
          shot: "panduan/shots/jamaah.jpg"
        },
        {
          id: "kreator",
          title: { id: "Kreator terverifikasi", en: "Verified creators" },
          body: {
            id: "Ustadz, lembaga, atau influencer dapat Ajukan jadi Kreator dari Profil. Setelah disetujui, badge centang muncul. Gunakan Laporkan / Blokir bila ada konten bermasalah, dan ikuti pedoman komunitas saat mengunggah.",
            en: "Teachers, institutions, or influencers can Apply as Creator from Profile. After approval, a check badge appears. Use Report / Block for harmful content, and follow community guidelines when posting."
          }
        }
      ]
    },
    {
      id: "profil",
      title: { id: "Profil", en: "Profile" },
      cards: [
        {
          id: "prof1",
          title: { id: "Edit & lencana", en: "Edit & badges" },
          body: {
            id: "Di Profil, ketuk ikon pensil untuk mengedit nama/bio. Statistik streak, khatam, hafalan, dan lencana ditampilkan. Pill Pesanan / Toko membuka pesanan atau toko Anda (di build toko: daftar minat).",
            en: "On Profile, tap the pencil to edit name/bio. Streak, khatam, memorisation stats, and badges appear. Orders / Shop pills open your orders or shop (store build: interest list)."
          },
          go: "profil"
        }
      ]
    },
    {
      id: "toko",
      title: { id: "Toko Berkah & Muslim Pay", en: "Toko Berkah & Muslim Pay" },
      cards: [
        {
          id: "toko1",
          title: { id: "Status fitur", en: "Feature status" },
          body: isStore()
            ? {
                id: "Di versi toko aplikasi, pembayaran / checkout disembunyikan. Anda dapat mengisi daftar minat agar kami tahu Anda menunggu fitur ini — tanpa transaksi sungguhan.",
                en: "In the store build, checkout is hidden. You can join an interest list so we know you’re waiting — no real transactions."
              }
            : {
                id: "Di web saat ini, Toko Berkah & Muslim Pay ditampilkan sebagai segera hadir / alur prototipe. Belum ada pembayaran sungguhan yang wajib. Pantau pembaruan di aplikasi.",
                en: "On web today, Toko Berkah & Muslim Pay appear as coming soon / prototype flows. There is no required real checkout yet. Watch for app updates."
              },
          go: "belanja"
        }
      ]
    },
    {
      id: "cari",
      title: { id: "Pencarian", en: "Search" },
      cards: [
        {
          id: "cari1",
          title: { id: "Cari fitur & konten", en: "Find features & content" },
          body: {
            id: "Ikon kaca pembesar di header membuka lembar pencarian. Ketik nama fitur (jadwal, kiblat, zakat, hafalan, …) lalu ketuk hasil untuk langsung menuju halaman tersebut.",
            en: "The header magnifier opens the search sheet. Type a feature name (times, qibla, zakat, memorisation, …) and tap a result to jump there."
          }
        }
      ]
    },
    {
      id: "tema",
      title: { id: "Tema & bahasa", en: "Theme & language" },
      cards: [
        {
          id: "tema1",
          title: { id: "Pengaturan tampilan", en: "Display settings" },
          body: {
            id: "Pengaturan → Bahasa (Indonesia / English / العربية) dan Tema (Gold, Gelap, Terang, Dusty Pink). Pilihan tersimpan di HP. Tombol tema di header (✦/☀/☾/✿) juga memutar tema.",
            en: "Settings → Language (Indonesian / English / Arabic) and Theme (Gold, Dark, Light, Dusty Pink). Choices stay on your phone. The header theme button (✦/☀/☾/✿) also cycles themes."
          },
          go: "settings"
        }
      ]
    },
    {
      id: "ajak",
      title: { id: "Ajak sahabat & kartu bagikan", en: "Invite & share cards" },
      cards: [
        {
          id: "ajak1",
          title: { id: "Bagikan kebaikan", en: "Share the good" },
          body: {
            id: "Dari Pengaturan atau setelah target harian selesai, Anda bisa Ajak sahabat (tautan undangan) dan membagikan kartu pencapaian. Berbagi memakai lembar sistem HP Anda; Best Muslim tidak memaksa unggah ke server.",
            en: "From Settings or after daily goals, you can Invite friends (invite link) and share achievement cards. Sharing uses your phone’s system sheet; Best Muslim does not force uploads to a server."
          },
          go: "settings"
        }
      ]
    },
    {
      id: "privasi",
      title: { id: "Privasi & data", en: "Privacy & data" },
      cards: [
        {
          id: "priv1",
          title: { id: "Kebijakan & hapus data", en: "Policy & delete data" },
          body: {
            id: "Baca Privasi di aplikasi atau https://bestmuslim.app/privasi.html. Pengaturan → Hapus semua data membersihkan localStorage, sessionStorage, cache, dan IndexedDB Best Muslim di HP ini. Tidak bisa dibatalkan.",
            en: "Read Privacy in-app or at https://bestmuslim.app/privasi.html. Settings → Delete all data clears Best Muslim localStorage, sessionStorage, caches, and IndexedDB on this phone. This cannot be undone."
          },
          go: "privasi"
        }
      ]
    },
    {
      id: "faq",
      title: { id: "FAQ singkat", en: "Short FAQ" },
      cards: [
        {
          id: "faq1",
          title: { id: "Apakah perlu daftar akun?", en: "Do I need an account?" },
          body: {
            id: "Tidak. Anda bisa memakai hampir semua fitur tanpa akun. Profil lokal cukup untuk Jamaah di perangkat ini.",
            en: "No. You can use almost every feature without an account. A local profile is enough for Jamaah on this device."
          }
        },
        {
          id: "faq2",
          title: { id: "Apakah ada iklan?", en: "Are there ads?" },
          body: {
            id: "Tidak ada iklan pihak ketiga atau pelacak iklan di Best Muslim.",
            en: "There are no third-party ads or ad trackers in Best Muslim."
          }
        },
        {
          id: "faq3",
          title: { id: "Azan tidak berbunyi?", en: "Azan not sounding?" },
          body: {
            id: "Pastikan notifikasi diizinkan, mode bukan Senyap, dan (di Android) izin alarm tepat waktu / optimasi baterai sudah sesuai tips di bagian Jadwal. Di browser web, azan paling andal saat tab terbuka.",
            en: "Ensure notifications are allowed, mode is not Silent, and (on Android) exact-alarm / battery settings match the tips under Times. In a web browser, azan is most reliable while the tab is open."
          }
        }
      ]
    },
    {
      id: "tentang",
      title: { id: "Tentang Best Muslim", en: "About Best Muslim" },
      cards: [
        {
          id: "about",
          title: { id: "Penerbit & kontak", en: "Publisher & contact" },
          body: {
            id: "Best Muslim diterbitkan oleh PT East Kedaton Jayaland. Saran & pertanyaan: halo@bestmuslim.app · https://bestmuslim.app. Panduan ini diperbarui seiring fitur di aplikasi (v94).",
            en: "Best Muslim is published by PT East Kedaton Jayaland. Feedback: halo@bestmuslim.app · https://bestmuslim.app. This guide tracks features in the app (v94)."
          }
        }
      ]
    }
  ];

  function allCards() {
    var out = [];
    SECTIONS.forEach(function (s) {
      (s.cards || []).forEach(function (c) {
        out.push({ sec: s, card: c });
      });
    });
    return out;
  }

  function openGuide(opts) {
    opts = opts || {};
    try {
      storeSet(SK_SEEN, 1);
    } catch (e) {}
    if (window.go) window.go("panduan");
    setTimeout(function () {
      renderGuide(opts);
    }, 40);
  }

  function renderGuide(opts) {
    opts = opts || {};
    var root = document.getElementById("bmPanduanRoot");
    if (!root) return;
    var q = (opts.q || "").trim();
    var arNote = lang() === "ar" ? UI.arNote.ar : "";

    root.innerHTML =
      '<header class="bm-pd-bar">' +
      '<button type="button" class="bm-pd-back" data-pd="back" aria-label="' +
      esc(L3(UI.back)) +
      '">‹</button>' +
      '<div class="bm-pd-bar-mid"><b>' +
      esc(L3(UI.title)) +
      "</b><small>" +
      esc(L3(UI.author)) +
      "</small></div>" +
      '<button type="button" class="bm-pd-ico" data-pd="toc" aria-label="' +
      esc(L3(UI.toc)) +
      '">☰</button>' +
      "</header>" +
      '<div class="bm-pd-tools">' +
      '<input type="search" id="bmPdSearch" placeholder="' +
      esc(L3(UI.searchPh)) +
      '" value="' +
      esc(q) +
      '" enterkeyhint="search">' +
      '<button type="button" data-pd="toc">' +
      esc(L3(UI.toc)) +
      "</button>" +
      "</div>" +
      '<div class="bm-pd-scroll" id="bmPdScroll">' +
      (arNote ? '<p class="bm-pd-sec-t" style="font-style:normal;opacity:.8">' + esc(arNote) + "</p>" : "") +
      '<div class="bm-pd-cover" id="bmPdCover">' +
      '<div class="bm-pd-kicker">GUIDE · v94</div>' +
      "<h1>" +
      esc(LB(UI.title)) +
      "</h1>" +
      '<div class="bm-pd-author">' +
      esc(L3(UI.author)) +
      "</div>" +
      '<p class="bm-pd-lead">' +
      esc(LB(UI.coverLead)) +
      "</p>" +
      "</div>" +
      '<div id="bmPdBody"></div></div>' +
      '<div class="bm-pd-toc-sheet" id="bmPdToc" hidden>' +
      '<div class="bm-pd-toc-in" role="dialog" aria-modal="true">' +
      '<button type="button" class="bm-pd-toc-x" data-pd="tocx" aria-label="Close">✕</button>' +
      "<h2>" +
      esc(L3(UI.toc)) +
      "</h2>" +
      '<div id="bmPdTocList"></div></div></div>';

    fillBody(q);
    fillToc();
    bindGuide(root);

    var sc = document.getElementById("bmPdScroll");
    if (sc) {
      var pos = storeGet(SK_POS, null);
      if (opts.jump) {
        jumpTo(opts.jump);
      } else if (pos && pos.y > 80 && !q) {
        sc.scrollTop = pos.y | 0;
      }
      var saveT = null;
      sc.addEventListener("scroll", function () {
        clearTimeout(saveT);
        saveT = setTimeout(function () {
          storeSet(SK_POS, { y: sc.scrollTop | 0, at: Date.now() });
        }, 200);
      });
    }
  }

  function fillBody(q) {
    var body = document.getElementById("bmPdBody");
    if (!body) return;
    q = (q || "").trim().toLowerCase();
    var html = "";
    var hits = 0;
    SECTIONS.forEach(function (sec) {
      var cardsHtml = "";
      (sec.cards || []).forEach(function (c) {
        var title = LB(c.title);
        var text = LB(c.body);
        var blob = (title + " " + text + " " + LB(sec.title)).toLowerCase();
        if (q && blob.indexOf(q) === -1) return;
        hits++;
        var shownT = q ? highlight(title, q) : esc(title);
        var shownB = q ? highlight(text, q) : esc(text).replace(/\n/g, "<br>");
        cardsHtml +=
          '<article class="bm-pd-card" id="pd-' +
          esc(c.id) +
          '" data-pd-card="' +
          esc(c.id) +
          '">' +
          '<div class="bm-pd-card-top"><h3>' +
          shownT +
          '</h3><button type="button" class="bm-pd-more" data-pd-more="' +
          esc(c.id) +
          '" aria-label="More">⋯</button></div>' +
          "<p>" +
          shownB +
          "</p>" +
          (c.go
            ? '<button type="button" class="bm-pd-go" data-pd-go="' +
              esc(c.go) +
              '">' +
              esc(L3(UI.openFeat)) +
              "</button>"
            : "") +
          (c.shot
            ? '<div class="bm-pd-shot"><img src="' +
              esc(c.shot) +
              '" alt="" loading="lazy" width="720" height="1280"></div>'
            : "") +
          "</article>";
      });
      if (!cardsHtml) return;
      html +=
        '<section class="bm-pd-sec" id="pdsec-' +
        esc(sec.id) +
        '"><div class="bm-pd-sec-t">' +
        esc(LB(sec.title)) +
        "</div>" +
        cardsHtml +
        "</section>";
    });
    if (!html) html = '<p class="bm-pd-empty">' + esc(L3(UI.empty)) + "</p>";
    body.innerHTML = html;
  }

  function highlight(text, q) {
    var e = esc(text);
    if (!q) return e;
    try {
      var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      return e.replace(re, "<mark>$1</mark>");
    } catch (err) {
      return e;
    }
  }

  function fillToc() {
    var list = document.getElementById("bmPdTocList");
    if (!list) return;
    list.innerHTML = SECTIONS.map(function (s) {
      return (
        '<button type="button" class="bm-pd-toc-a" data-pd-jump="pdsec-' +
        esc(s.id) +
        '"><span>' +
        esc(LB(s.title)) +
        "</span><em>›</em></button>"
      );
    }).join("");
  }

  function jumpTo(id) {
    var el = document.getElementById(id);
    var sc = document.getElementById("bmPdScroll");
    if (el && sc) {
      var top = el.offsetTop - 8;
      sc.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  function bindGuide(root) {
    root.onclick = function (e) {
      var t = e.target;
      if (t.closest && t.closest("[data-pd=back]")) {
        e.preventDefault();
        if (window.go) window.go("beranda");
        return;
      }
      if (t.closest && t.closest("[data-pd=toc]")) {
        e.preventDefault();
        var sh = document.getElementById("bmPdToc");
        if (sh) sh.hidden = false;
        return;
      }
      if (t.closest && (t.closest("[data-pd=tocx]") || t.id === "bmPdToc")) {
        if (t.id === "bmPdToc" || t.closest("[data-pd=tocx]")) {
          var sh2 = document.getElementById("bmPdToc");
          if (sh2) sh2.hidden = true;
        }
        return;
      }
      var j = t.closest && t.closest("[data-pd-jump]");
      if (j) {
        e.preventDefault();
        var sh3 = document.getElementById("bmPdToc");
        if (sh3) sh3.hidden = true;
        jumpTo(j.getAttribute("data-pd-jump"));
        return;
      }
      var goB = t.closest && t.closest("[data-pd-go]");
      if (goB) {
        e.preventDefault();
        var dest = goB.getAttribute("data-pd-go");
        if (window.go) window.go(dest);
        return;
      }
      var more = t.closest && t.closest("[data-pd-more]");
      if (more) {
        e.preventDefault();
        openCardMenu(more);
        return;
      }
      if (!t.closest(".bm-pd-menu")) {
        root.querySelectorAll(".bm-pd-menu").forEach(function (m) {
          m.remove();
        });
      }
    };

    var inp = document.getElementById("bmPdSearch");
    if (inp) {
      var st = null;
      inp.addEventListener("input", function () {
        clearTimeout(st);
        st = setTimeout(function () {
          fillBody(inp.value);
        }, 120);
      });
    }
  }

  function openCardMenu(btn) {
    var root = document.getElementById("bmPanduanRoot");
    if (!root) return;
    root.querySelectorAll(".bm-pd-menu").forEach(function (m) {
      m.remove();
    });
    var card = btn.closest(".bm-pd-card");
    if (!card) return;
    var id = btn.getAttribute("data-pd-more");
    var found = allCards().find(function (x) {
      return x.card.id === id;
    });
    var title = found ? LB(found.card.title) : "";
    var text = found ? LB(found.card.body) : "";
    var menu = document.createElement("div");
    menu.className = "bm-pd-menu";
    menu.innerHTML =
      '<button type="button" data-pd-act="copy">' +
      esc(L3(UI.copy)) +
      '</button><button type="button" data-pd-act="share">' +
      esc(L3(UI.share)) +
      "</button>";
    card.appendChild(menu);
    menu.onclick = function (ev) {
      ev.stopPropagation();
      var act = ev.target.getAttribute("data-pd-act");
      var payload = title + "\n\n" + text + "\n\n— " + L3(UI.title) + " · https://bestmuslim.app";
      if (act === "copy") {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(payload).then(
            function () {
              toast(L3(UI.copied));
            },
            function () {
              fallbackCopy(payload);
            }
          );
        } else fallbackCopy(payload);
      } else if (act === "share") {
        if (navigator.share) {
          navigator.share({ title: title, text: payload }).catch(function () {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(payload).then(function () {
            toast(L3(UI.copied));
          });
        }
      }
      menu.remove();
    };
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast(L3(UI.copied));
    } catch (e) {}
  }

  /* ---------- Entry: Profil ☰ ---------- */
  function patchProfMenu() {
    var JN = window.BmJejakNur || window.JN;
    /* Hook via DOM: when prof menu sheet opens, inject top item */
    document.addEventListener(
      "click",
      function (e) {
        if (!e.target.closest || !e.target.closest("[data-jn=profmenu]")) return;
        setTimeout(injectProfMenuItem, 30);
      },
      true
    );
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-jn=panduan]");
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      try {
        var x = document.getElementById("jnSheetX");
        if (x) x.click();
      } catch (err) {}
      openGuide();
    });
  }

  function injectProfMenuItem() {
    var acts = document.querySelector("#jnSheetBody .jn-prof-acts");
    if (!acts || acts.querySelector("[data-jn=panduan]")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-jn", "panduan");
    btn.innerHTML = "<span>" + esc(L3(UI.menuGuide)) + "</span><em>›</em>";
    acts.insertBefore(btn, acts.firstChild);
  }

  /* ---------- Entry: Pengaturan ---------- */
  function injectSettings() {
    var stack = document.getElementById("stStack");
    if (!stack) return;
    var card = document.getElementById("bmPanduanSettings");
    if (!card) {
      card = document.createElement("div");
      card.id = "bmPanduanSettings";
      card.className = "card";
      var firstCard = stack.querySelector(".card");
      if (firstCard) stack.insertBefore(card, firstCard);
      else stack.appendChild(card);
    }
    card.innerHTML =
      '<button type="button" class="bm-pd-set-row" data-pd-open="1">' +
      "<div><div class=\"eyebrow\">📖</div><b style=\"display:block;margin-top:4px\">" +
      esc(L3(UI.setGuide)) +
      '</b><p class="dim" style="font-size:12px;margin-top:4px">' +
      esc(L3(UI.setGuideSub)) +
      "</p></div><em>›</em></button>";
    card.onclick = function (e) {
      if (e.target.closest("[data-pd-open]")) openGuide();
    };
  }

  /* ---------- Entry: Akademi book ---------- */
  function injectAkademiBook() {
    var home = document.getElementById("pkHome");
    if (!home) return;
    if (home.querySelector(".bm-pd-book")) return;
    var hh = home.querySelector(".pk-hh");
    var wrap = document.createElement("div");
    wrap.style.cssText = "padding:0 0 4px;margin:0 0 8px";
    wrap.innerHTML =
      '<button type="button" class="bm-pd-book" data-pd-open-book="1" aria-label="' +
      esc(L3(UI.bookT)) +
      '">' +
      '<div class="bm-pd-book-cover"><b>' +
      esc(L3(UI.bookT)) +
      "</b><span>GUIDE</span></div>" +
      '<div class="bm-pd-book-meta"><small class="dim">' +
      esc(L3(UI.bookEy)) +
      "</small><b>" +
      esc(L3(UI.bookT)) +
      "</b><small>" +
      esc(L3(UI.bookS)) +
      "</small></div></button>";
    if (hh && hh.nextSibling) home.insertBefore(wrap, hh.nextSibling);
    else home.insertBefore(wrap, home.firstChild);
    wrap.onclick = function (e) {
      if (e.target.closest("[data-pd-open-book]")) openGuide();
    };
  }

  /* ---------- Entry: Beranda tip ---------- */
  function injectBerandaTip() {
    if (storeGet(SK_TIP, 0)) return;
    if (storeGet(SK_SEEN, 0)) return;
    if (document.getElementById("bmPanduanTip")) return;
    var host =
      document.getElementById("v2Next") ||
      document.getElementById("bmDompet") ||
      document.getElementById("bmTargetHost") ||
      document.getElementById("v2PromoCard");
    if (!host || !host.parentNode) return;
    var tip = document.createElement("div");
    tip.id = "bmPanduanTip";
    tip.className = "bm-pd-tip";
    tip.innerHTML =
      "<div style=\"flex:1;min-width:0\"><b>" +
      esc(L3(UI.tipT)) +
      "</b><span>" +
      esc(L3(UI.tipL)) +
      '</span><button type="button" class="bm-pd-tip-go" data-pd-tip-go="1">' +
      esc(L3(UI.tipGo)) +
      " →</button></div>" +
      '<button type="button" class="bm-pd-tip-x" data-pd-tip-x="1" aria-label="Dismiss">✕</button>';
    host.parentNode.insertBefore(tip, host.nextSibling);
    tip.onclick = function (e) {
      if (e.target.closest("[data-pd-tip-x]")) {
        storeSet(SK_TIP, 1);
        tip.remove();
        return;
      }
      if (e.target.closest("[data-pd-tip-go]")) {
        storeSet(SK_TIP, 1);
        tip.remove();
        openGuide();
      }
    };
  }

  function hookGo() {
    var _go = window.go;
    if (typeof _go !== "function" || _go._bmPd) return;
    window.go = function (p) {
      _go.apply(this, arguments);
      if (p === "panduan") setTimeout(function () {
        renderGuide();
      }, 50);
      if (p === "settings") setTimeout(injectSettings, 60);
      if (p === "quran") setTimeout(injectAkademiBook, 120);
      if (p === "beranda") setTimeout(injectBerandaTip, 250);
    };
    window.go._bmPd = 1;
  }

  function boot() {
    hookGo();
    patchProfMenu();
    injectSettings();
    injectAkademiBook();
    injectBerandaTip();
    document.addEventListener("rk:lang", function () {
      if (document.getElementById("page-panduan") && document.getElementById("page-panduan").classList.contains("on")) {
        renderGuide({ q: (document.getElementById("bmPdSearch") || {}).value || "" });
      }
      injectSettings();
      var tip = document.getElementById("bmPanduanTip");
      if (tip) tip.remove();
      injectBerandaTip();
      var book = document.querySelector(".bm-pd-book");
      if (book) {
        var p = book.parentNode;
        if (p) p.remove();
      }
      injectAkademiBook();
    });
    /* Observe Akademi inject */
    var pg = document.getElementById("page-quran");
    if (pg && window.MutationObserver) {
      new MutationObserver(function () {
        injectAkademiBook();
      }).observe(pg, { childList: true, subtree: true });
    }
    if ((location.hash || "").replace("#", "") === "panduan") {
      setTimeout(function () {
        openGuide();
      }, 200);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else setTimeout(boot, 0);
  window.addEventListener("load", function () {
    setTimeout(boot, 100);
  });

  window.BmPanduan = { open: openGuide, render: renderGuide, sections: SECTIONS };
})();
