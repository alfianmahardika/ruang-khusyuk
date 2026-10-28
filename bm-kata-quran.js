/* Best Muslim v76 — Kata Qur'an untukmu. Local-only; silent; Kemenag ID from JSON. No autoplay. */
(function () {
  "use strict";
  const DATA_URL = "kata-quran.json";
  const SK_FAV = "rk_kata_fav";
  const SK_DRAWS = "rk_kata_draws";
  const SK_LANGKAH = "rk_kata_langkah";
  const SK_DOM = "rk_dompet";
  const PTS = 5;
  const LIMIT = 3;

  const UI = {
    id: {
      ey: "Untuk hatimu",
      title: "Kata Qur'an untukmu",
      sub: "Pilih perasaanmu, ambil satu ayat hari ini",
      open: "Buka",
      moodQ: "Bagaimana perasaanmu hari ini?",
      ask: "Apa kata Qur'an untukku?",
      pesan: "Pesan untukmu",
      langkah: "Langkah kecil hari ini",
      pts: "+{n} poin",
      ptsGot: "Poin ditambahkan",
      simpan: "Simpan",
      tersimpan: "Tersimpan",
      bagikan: "Bagikan",
      ambil: "Ambil lagi",
      limit: "Batas hari ini: {n}/{max} untuk perasaan ini",
      limitHit: "Sudah {max} kali hari ini untuk perasaan ini. Coba lagi besok atau pilih perasaan lain.",
      shareHead: "Kata Qur'an tentang aku hari ini",
      shareFail: "Tidak bisa membagikan",
      copied: "Tersalin",
      loading: "Memuat…",
      err: "Gagal memuat. Coba lagi.",
      back: "Kembali",
      pickMood: "Pilih perasaan dulu",
      cta: "Ambil ayat",
      jarLab: "Quranic Jar",
      skipAnim: "Ketuk untuk lewati"
    },
    en: {
      ey: "For your heart",
      title: "A Qur'an Word for You",
      sub: "Choose how you feel, draw one ayah today",
      open: "Open",
      moodQ: "How are you feeling today?",
      ask: "What does the Qur'an say to me?",
      pesan: "A message for you",
      langkah: "A small step today",
      pts: "+{n} pts",
      ptsGot: "Points added",
      simpan: "Save",
      tersimpan: "Saved",
      bagikan: "Share",
      ambil: "Draw again",
      limit: "Today's limit: {n}/{max} for this feeling",
      limitHit: "You've drawn {max} times today for this feeling. Try tomorrow or another feeling.",
      shareHead: "A Qur'an word about me today",
      shareFail: "Could not share",
      copied: "Copied",
      loading: "Loading…",
      err: "Failed to load. Try again.",
      back: "Back",
      pickMood: "Pick a feeling first",
      cta: "Draw an ayah",
      jarLab: "Quranic Jar",
      skipAnim: "Tap to skip"
    },
    ar: {
      ey: "لقلبك",
      title: "كلمة من القرآن لك",
      sub: "اختر شعورك واسحب آية اليوم",
      open: "افتح",
      moodQ: "كيف تشعر اليوم؟",
      ask: "ماذا يقول القرآن لي؟",
      pesan: "رسالة لك",
      langkah: "خطوة صغيرة اليوم",
      pts: "+{n} نقطة",
      ptsGot: "أُضيفت النقاط",
      simpan: "حفظ",
      tersimpan: "محفوظ",
      bagikan: "شارك",
      ambil: "اسحب مجددًا",
      limit: "حد اليوم: {n}/{max} لهذا الشعور",
      limitHit: "سحبت {max} مرات اليوم لهذا الشعور. حاول غدًا أو شعورًا آخر.",
      shareHead: "كلمة من القرآن عني اليوم",
      shareFail: "تعذر المشاركة",
      copied: "تم النسخ",
      loading: "جارٍ التحميل…",
      err: "فشل التحميل. أعد المحاولة.",
      back: "رجوع",
      pickMood: "اختر شعورًا أولًا",
      cta: "خذ آية",
      jarLab: "Quranic Jar",
      skipAnim: "انقر للتخطّي"
    }
  };

  let DATA = null;
  let mood = null;
  let card = null;
  let drawing = false;

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
    const L = UI[lang()] || UI.id;
    let s = L[k] != null ? L[k] : UI.en[k] != null ? UI.en[k] : k;
    if (vars)
      Object.keys(vars).forEach((x) => {
        s = String(s).replace("{" + x + "}", vars[x]);
      });
    return s;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function toast(msg) {
    try {
      if (window.__rkToast) return __rkToast(msg);
    } catch (e) {}
    try {
      if (window.showToast) return showToast(msg);
    } catch (e) {}
  }
  function loc(obj) {
    if (!obj || typeof obj !== "object") return String(obj || "");
    const l = lang();
    return obj[l] || obj.id || obj.en || "";
  }
  function reduced() {
    try {
      return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  function jarHTML(cls, opts) {
    opts = opts || {};
    var rise =
      opts.noRise
        ? ""
        : '<div class="bm-kq-rise"' +
          (opts.riseId === false ? "" : ' id="bmKqPop"') +
          '><span class="spark"></span></div>';
    return (
      '<div class="bm-kq-jar ' +
      (cls || "") +
      '" aria-hidden="true">' +
      '<div class="lid"></div><div class="neck"></div>' +
      '<div class="body"><span class="scroll"></span><span class="scroll"></span><span class="scroll"></span></div>' +
      rise +
      "</div>"
    );
  }

  function openFeature() {
    if (window.go) go("kata-quran");
    else location.hash = "kata-quran";
  }
  /** Wire Beranda hero slide 3 (Kata Qur'an); no standalone Beranda block. */
  function ensureEntry() {
    const btn = document.getElementById("bmKqHero");
    if (btn && !btn.dataset.kqWired) {
      btn.dataset.kqWired = "1";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openFeature();
      });
    }
    // Remove legacy standalone entry if any residual markup
    const legacy = document.getElementById("bmKqEntry");
    if (legacy && legacy.parentNode) legacy.parentNode.removeChild(legacy);
    paintEntry();
  }

  function paintEntry() {
    const root = document.getElementById("bmKqHero");
    if (!root) return;
    root.querySelectorAll("[data-kq]").forEach((el) => {
      const k = el.getAttribute("data-kq");
      el.textContent = t(k);
    });
    const lab = root.querySelector(".bm-kq-jar-lab");
    if (lab) lab.textContent = t("jarLab");
  }

  function ensurePage() {
    let sec = document.getElementById("page-kata-quran");
    if (!sec) {
      const lain = document.getElementById("page-lainnya");
      sec = document.createElement("section");
      sec.className = "page";
      sec.id = "page-kata-quran";
      sec.innerHTML =
        '<div class="stack bm-kq-wrap">' +
        '<button type="button" class="btn sm ghost" id="bmKqBack" style="align-self:flex-start">← <span data-kq="back"></span></button>' +
        '<div class="bm-kq-head"><h2 data-kq="title"></h2><p data-kq="sub"></p></div>' +
        '<div class="bm-kq-stage" id="bmKqStage">' +
        jarHTML("lg",{noRise:true}) +
        "</div>" +
        '<p class="bm-kq-mood-q" data-kq="moodQ"></p>' +
        '<div class="bm-kq-moods" id="bmKqMoods"></div>' +
        '<button type="button" class="bm-kq-ask" id="bmKqAsk" disabled data-kq="ask"></button>' +
        '<p class="bm-kq-limit" id="bmKqLimit"></p>' +
        '<div class="bm-kq-sheet" id="bmKqSheet"></div>' +
        "</div>";
      if (lain && lain.parentNode) lain.parentNode.insertBefore(sec, lain);
      else document.body.appendChild(sec);
    }
    const back = document.getElementById("bmKqBack");
    if (back && !back.dataset.kqWired) {
      back.dataset.kqWired = "1";
      back.onclick = () => {
        if (window.go) go("beranda");
      };
    }
    const ask = document.getElementById("bmKqAsk");
    if (ask && !ask.dataset.kqWired) {
      ask.dataset.kqWired = "1";
      ask.onclick = () => draw();
    }
  }

  function paintChrome() {
    document.querySelectorAll("#page-kata-quran [data-kq], #bmKqHero [data-kq]").forEach((el) => {
      const k = el.getAttribute("data-kq");
      if (k === "ask") el.textContent = t("ask");
      else el.textContent = t(k);
    });
    paintMoods();
    updateLimit();
    const ask = document.getElementById("bmKqAsk");
    if (ask) ask.disabled = !mood;
  }

  function paintMoods() {
    const box = document.getElementById("bmKqMoods");
    if (!box || !DATA) return;
    const L = lang();
    box.innerHTML = DATA.moods
      .map((m) => {
        const lab = (m.label && (m.label[L] || m.label.id)) || m.id;
        const on = mood === m.id ? " on" : "";
        return (
          '<button type="button" class="bm-kq-chip' +
          on +
          '" data-mood="' +
          esc(m.id) +
          '"><span aria-hidden="true">' +
          esc(m.emoji || "") +
          "</span> " +
          esc(lab) +
          "</button>"
        );
      })
      .join("");
    box.querySelectorAll("[data-mood]").forEach((b) => {
      b.onclick = () => {
        mood = b.getAttribute("data-mood");
        card = null;
        const sheet = document.getElementById("bmKqSheet");
        if (sheet) {
          sheet.classList.remove("on");
          sheet.innerHTML = "";
        }
        paintMoods();
        updateLimit();
        const ask = document.getElementById("bmKqAsk");
        if (ask) ask.disabled = false;
      };
    });
  }

  function drawKey() {
    return (mood || "") + "-" + dkey();
  }
  function drawsToday() {
    const o = storeGet(SK_DRAWS, {}) || {};
    return o[drawKey()] | 0;
  }
  function bumpDraw() {
    const o = storeGet(SK_DRAWS, {}) || {};
    const k = drawKey();
    o[k] = (o[k] | 0) + 1;
    // prune old keys
    const today = dkey();
    Object.keys(o).forEach((x) => {
      if (!x.endsWith(today)) delete o[x];
    });
    storeSet(SK_DRAWS, o);
  }
  function updateLimit() {
    const el = document.getElementById("bmKqLimit");
    if (!el) return;
    if (!mood) {
      el.textContent = "";
      return;
    }
    const n = drawsToday();
    const max = (DATA && DATA.limitPerMoodPerDay) || LIMIT;
    el.textContent = t("limit", { n, max });
  }

  function pickCard() {
    const pool = (DATA.cards || []).filter((c) => c.mood === mood);
    if (!pool.length) return null;
    const fav = storeGet(SK_FAV, []) || [];
    // prefer unseen today: track last ids in session
    const seen = (window.__bmKqSeen = window.__bmKqSeen || {});
    const sk = drawKey();
    seen[sk] = seen[sk] || [];
    let cand = pool.filter((c) => seen[sk].indexOf(c.id) < 0);
    if (!cand.length) cand = pool.slice();
    const c = cand[Math.floor(Math.random() * cand.length)];
    seen[sk].push(c.id);
    return c;
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  let animSkip = false;
  let animResolve = null;

  function ensureAnim() {
    let ov = document.getElementById("bmKqAnim");
    if (ov) return ov;
    ov = document.createElement("div");
    ov.id = "bmKqAnim";
    ov.className = "bm-kq-anim";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.innerHTML =
      '<div class="bm-kq-anim-stage" id="bmKqAnimStage">' +
      '<div class="bm-kq-anim-jar" id="bmKqAnimJar">' +
      jarHTML("lg",{noRise:true}) +
      "</div>" +
      '<div class="bm-kq-anim-scroll" id="bmKqAnimScroll" aria-hidden="true"><span class="spark"></span></div>' +
      '<div class="bm-kq-anim-card" id="bmKqAnimCard"></div>' +
      '<button type="button" class="bm-kq-anim-skip" id="bmKqAnimSkip"></button>' +
      "</div>";
    document.body.appendChild(ov);
    const skip = () => {
      animSkip = true;
      if (animResolve) animResolve();
    };
    ov.addEventListener("click", (e) => {
      if (e.target.id === "bmKqAnimSkip" || e.target.closest("#bmKqAnimStage") || e.target === ov) skip();
    });
    return ov;
  }

  function setAnimPhase(phase) {
    const ov = ensureAnim();
    ov.classList.remove("phase-lid", "phase-rise", "phase-float", "phase-unroll", "phase-done");
    if (phase) ov.classList.add("phase-" + phase);
    return ov;
  }

  function waitOrSkip(ms) {
    if (reduced() || animSkip) return Promise.resolve();
    return new Promise((res) => {
      const timer = setTimeout(() => {
        if (animResolve === finish) animResolve = null;
        res();
      }, ms);
      function finish() {
        clearTimeout(timer);
        animResolve = null;
        res();
      }
      animResolve = finish;
    });
  }

  async function playDrawAnim(cardHtml) {
    animSkip = false;
    const ov = ensureAnim();
    const skipBtn = document.getElementById("bmKqAnimSkip");
    if (skipBtn) skipBtn.textContent = t("skipAnim");
    const jarHost = document.getElementById("bmKqAnimJar");
    if (jarHost) jarHost.innerHTML = jarHTML("lg",{noRise:true});
    const scroll = document.getElementById("bmKqAnimScroll");
    if (scroll) {
      scroll.innerHTML = '<span class="spark"></span>';
      scroll.style.cssText = "";
    }
    const cardEl = document.getElementById("bmKqAnimCard");
    if (cardEl) cardEl.innerHTML = cardHtml || "";

    ov.classList.add("on");
    if (reduced()) {
      setAnimPhase("done");
      await sleep(40);
      return;
    }

    setAnimPhase("lid");
    await waitOrSkip(380);
    if (animSkip) {
      setAnimPhase("done");
      return;
    }

    setAnimPhase("rise");
    await waitOrSkip(480);
    if (animSkip) {
      setAnimPhase("done");
      return;
    }

    setAnimPhase("float");
    await waitOrSkip(420);
    if (animSkip) {
      setAnimPhase("done");
      return;
    }

    setAnimPhase("unroll");
    await waitOrSkip(520);
    if (animSkip) {
      setAnimPhase("done");
      return;
    }

    setAnimPhase("done");
    await waitOrSkip(320);
  }

  function closeAnim() {
    const ov = document.getElementById("bmKqAnim");
    if (!ov) return;
    ov.classList.remove("on", "phase-lid", "phase-rise", "phase-float", "phase-unroll", "phase-done");
  }

  async function draw() {
    if (drawing) return;
    if (!mood) {
      toast(t("pickMood"));
      return;
    }
    const max = (DATA && DATA.limitPerMoodPerDay) || LIMIT;
    if (drawsToday() >= max) {
      toast(t("limitHit", { max }));
      return;
    }
    if (!DATA) {
      toast(t("err"));
      return;
    }
    drawing = true;
    const ask = document.getElementById("bmKqAsk");
    if (ask) ask.disabled = true;
    const sheet = document.getElementById("bmKqSheet");
    if (sheet) {
      sheet.classList.remove("on");
      sheet.innerHTML = "";
    }

    // Stage jar: lid pop + local rise hint while overlay runs
    const jar = document.querySelector("#bmKqStage .bm-kq-jar");
    if (jar) {
      jar.classList.remove("lid-open", "shake");
      void jar.offsetWidth;
      jar.classList.add("lid-open", "shake");
    }
    const rise = document.getElementById("bmKqPop");
    if (rise) {
      rise.className = "bm-kq-rise";
      rise.innerHTML = '<span class="spark"></span>';
      void rise.offsetWidth;
      rise.classList.add("on");
    }

    card = pickCard();
    bumpDraw();
    updateLimit();
    if (!card) {
      drawing = false;
      if (ask) ask.disabled = false;
      closeAnim();
      toast(t("err"));
      return;
    }

    // Build card HTML for anim reveal; keep page sheet hidden until done
    renderCard(false);
    const sheetHtml = (document.getElementById("bmKqSheet") || {}).innerHTML || "";
    if (sheet) {
      sheet.classList.remove("on");
      sheet.innerHTML = "";
    }

    await playDrawAnim(sheetHtml);

    closeAnim();
    if (sheet) {
      sheet.innerHTML = sheetHtml;
      sheet.classList.add("on");
      const el = document.getElementById("bmKqCard");
      if (el) el.classList.add("unroll");
      wireCardBtns();
    }
    if (jar) jar.classList.remove("shake");
    drawing = false;
    if (ask) ask.disabled = drawsToday() >= max;
  }

  function isFav(id) {
    return (storeGet(SK_FAV, []) || []).indexOf(id) >= 0;
  }
  function toggleFav(id) {
    let a = storeGet(SK_FAV, []) || [];
    const i = a.indexOf(id);
    if (i >= 0) a.splice(i, 1);
    else {
      a.unshift(id);
      if (a.length > 40) a.length = 40;
    }
    storeSet(SK_FAV, a);
  }
  function langkahKey(id) {
    return id + "-" + dkey();
  }
  function langkahDone(id) {
    const o = storeGet(SK_LANGKAH, {}) || {};
    return !!o[langkahKey(id)];
  }
  function awardLangkah(id) {
    if (langkahDone(id)) return false;
    const o = storeGet(SK_LANGKAH, {}) || {};
    o[langkahKey(id)] = 1;
    // prune
    const today = dkey();
    Object.keys(o).forEach((k) => {
      if (!k.endsWith(today)) delete o[k];
    });
    storeSet(SK_LANGKAH, o);
    const pts = (DATA && DATA.pointsOnLangkah) || PTS;
    const dom = storeGet(SK_DOM, null) || { saldo: 0, poin: 0, hist: [], claimed: {}, act: {} };
    dom.poin = (dom.poin | 0) + pts;
    dom.hist = dom.hist || [];
    dom.hist.unshift({ ts: Date.now(), day: dkey(), pts, note: "Kata Qur'an" });
    if (dom.hist.length > 80) dom.hist.length = 80;
    storeSet(SK_DOM, dom);
    try {
      if (window.renderStrip) renderStrip();
      if (window.KusyuDompet && KusyuDompet.render) KusyuDompet.render();
    } catch (e) {}
    return true;
  }

  function renderCard(animate) {
    const sheet = document.getElementById("bmKqSheet");
    if (!sheet || !card) return;
    const pesan = loc(card.pesan) || (card.pesan && card.pesan.id) || "";
    const langkah = loc(card.langkah) || (card.langkah && card.langkah.id) || "";
    const done = langkahDone(card.id);
    const fav = isFav(card.id);
    const pts = (DATA && DATA.pointsOnLangkah) || PTS;
    sheet.innerHTML =
      '<div class="bm-kq-scroll-card' +
      (animate && !reduced() ? "" : " unroll") +
      '" id="bmKqCard">' +
      '<div class="bm-kq-roll-top"></div>' +
      '<div class="bm-kq-scroll-inner">' +
      '<p class="bm-kq-ref">' +
      esc(card.ref) +
      "</p>" +
      '<p class="bm-kq-ar">' +
      esc(card.ar) +
      "</p>" +
      '<p class="bm-kq-tr">' +
      esc(card.trId || "") +
      "</p>" +
      '<div class="bm-kq-sec"><h4>' +
      esc(t("pesan")) +
      "</h4><p>" +
      esc(pesan) +
      "</p></div>" +
      '<button type="button" class="bm-kq-langkah' +
      (done ? " on" : "") +
      '" id="bmKqLangkah">' +
      '<span class="bm-kq-check" aria-hidden="true">' +
      (done ? "✓" : "") +
      "</span>" +
      "<span><strong>" +
      esc(t("langkah")) +
      "</strong><br>" +
      esc(langkah) +
      '<div class="bm-kq-langkah-pts">' +
      esc(t("pts", { n: pts })) +
      "</div></span></button>" +
      '<div class="bm-kq-actions">' +
      '<button type="button" class="btn-kq' +
      (fav ? " saved" : "") +
      '" id="bmKqSave">' +
      esc(fav ? t("tersimpan") : t("simpan")) +
      "</button>" +
      '<button type="button" class="btn-kq primary" id="bmKqShare">' +
      esc(t("bagikan")) +
      "</button>" +
      '<button type="button" class="btn-kq" id="bmKqAgain">' +
      esc(t("ambil")) +
      "</button>" +
      "</div></div>" +
      '<div class="bm-kq-roll-bot"></div></div>';
    // Fix: card.id is the content id string; Indonesian translation is also under key "id" in JSON!
    // Our JSON has both "id": "lelah-94-5" AND we used "id" for Kemenag text. CONFLICT.
    // Look at JSON structure - I used "id" for card id AND the translation field was also "id" for Kemenag.
    // Need to fix JSON to use "tr" or "idText" for translation.
    sheet.classList.add("on");
    const el = document.getElementById("bmKqCard");
    if (animate && !reduced() && el) {
      requestAnimationFrame(() => {
        el.classList.add("unroll");
      });
    }
    wireCardBtns();
  }

  // NOTE: JSON field collision — will fix JSON to use translation key "trId"
  function wireCardBtns() {
    const lg = document.getElementById("bmKqLangkah");
    if (lg)
      lg.onclick = () => {
        if (!card) return;
        if (langkahDone(card.id)) return;
        if (awardLangkah(card.id)) {
          lg.classList.add("on");
          lg.querySelector(".bm-kq-check").textContent = "✓";
          toast(t("ptsGot") + " · " + t("pts", { n: (DATA && DATA.pointsOnLangkah) || PTS }));
        }
      };
    const sv = document.getElementById("bmKqSave");
    if (sv)
      sv.onclick = () => {
        if (!card) return;
        toggleFav(card.id);
        const fav = isFav(card.id);
        sv.textContent = fav ? t("tersimpan") : t("simpan");
        sv.classList.toggle("saved", fav);
      };
    const sh = document.getElementById("bmKqShare");
    if (sh) sh.onclick = () => shareCard();
    const ag = document.getElementById("bmKqAgain");
    if (ag) ag.onclick = () => draw();
  }

  async function shareCard() {
    if (!card) return;
    const head = t("shareHead");
    const pesan = loc(card.pesan) || "";
    const tr = card.trId || card.translation || "";
    try {
      const canvas = document.createElement("canvas");
      const W = 720,
        H = 1080;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      // bg
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#1c1710");
      g.addColorStop(0.5, "#12151c");
      g.addColorStop(1, "#0e1118");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      // gold border
      ctx.strokeStyle = "rgba(230,199,122,.45)";
      ctx.lineWidth = 3;
      roundRect(ctx, 28, 28, W - 56, H - 56, 28);
      ctx.stroke();
      // header
      ctx.fillStyle = "#e6c77a";
      ctx.font = "700 22px system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(head, W / 2, 80);
      ctx.fillStyle = "rgba(243,233,212,.7)";
      ctx.font = "600 16px system-ui,sans-serif";
      ctx.fillText(card.ref, W / 2, 118);
      // arabic
      ctx.fillStyle = "#f3e9d4";
      ctx.font = "400 34px 'Amiri Quran', Amiri, serif";
      ctx.direction = "rtl";
      wrapText(ctx, card.ar, W / 2, 180, W - 100, 48, 6);
      ctx.direction = "ltr";
      // translation
      ctx.fillStyle = "rgba(216,207,189,.95)";
      ctx.font = "italic 400 18px system-ui,sans-serif";
      const trY = wrapText(ctx, tr, W / 2, 420, W - 110, 28, 8);
      // pesan box
      const boxY = Math.max(trY + 30, 560);
      ctx.fillStyle = "rgba(230,199,122,.12)";
      roundRect(ctx, 60, boxY, W - 120, 160, 16);
      ctx.fill();
      ctx.fillStyle = "#e6c77a";
      ctx.font = "800 14px system-ui,sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(t("pesan").toUpperCase(), 80, boxY + 28);
      ctx.fillStyle = "#f3e9d4";
      ctx.font = "400 18px system-ui,sans-serif";
      wrapTextLeft(ctx, pesan, 80, boxY + 56, W - 160, 26, 4);
      // footer
      ctx.fillStyle = "#e6c77a";
      ctx.font = "800 20px system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("bestmuslim.app", W / 2, H - 56);
      ctx.fillStyle = "rgba(243,233,212,.55)";
      ctx.font = "600 14px system-ui,sans-serif";
      ctx.fillText("Best Muslim", W / 2, H - 80);

      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
      if (!blob) throw new Error("blob");
      const file = new File([blob], "kata-quran-bestmuslim.png", { type: "image/png" });
      const text = head + " — " + card.ref + "\nhttps://bestmuslim.app";
      try {
        if (window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.Share) {
          const b64 = await blobToDataUrl(blob);
          await Capacitor.Plugins.Share.share({
            title: head,
            text,
            url: "https://bestmuslim.app",
            dialogTitle: t("bagikan")
          });
          // Also try Web Share with file when available
          void b64;
          return;
        }
      } catch (e) {}
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: head, text, url: "https://bestmuslim.app" });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: head, text, url: "https://bestmuslim.app" });
        return;
      }
      // fallback download
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "kata-quran-bestmuslim.png";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch (e) {
      try {
        await navigator.clipboard.writeText(t("shareHead") + " — " + card.ref + "\nhttps://bestmuslim.app");
        toast(t("copied"));
      } catch (e2) {
        toast(t("shareFail"));
      }
    }
  }

  function blobToDataUrl(blob) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(blob);
    });
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
  function wrapText(ctx, text, x, y, maxW, lh, maxLines) {
    const words = String(text || "").split(/\s+/);
    let line = "",
      lines = 0,
      yy = y;
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, yy);
        line = words[i];
        yy += lh;
        lines++;
        if (lines >= maxLines) {
          ctx.fillText(line + "…", x, yy);
          return yy + lh;
        }
      } else line = test;
    }
    if (line) {
      ctx.fillText(line, x, yy);
      yy += lh;
    }
    return yy;
  }
  function wrapTextLeft(ctx, text, x, y, maxW, lh, maxLines) {
    ctx.textAlign = "left";
    return wrapText(ctx, text, x, y, maxW, lh, maxLines);
  }

  async function loadData() {
    if (DATA) return DATA;
    const r = await fetch(DATA_URL, { cache: "no-cache" });
    if (!r.ok) throw new Error(r.status);
    DATA = await r.json();
    return DATA;
  }

  function registerPage() {
    try {
      if (window.PAGES && PAGES.indexOf("kata-quran") < 0) PAGES.push("kata-quran");
    } catch (e) {}
    // Patch go() allow-list by wrapping — PAGES is const in index; go checks PAGES.includes
    // So we must mutate the array if accessible, or intercept go.
    const _go = window.go;
    if (_go && !window.__bmKqGoPatched) {
      window.__bmKqGoPatched = true;
      window.go = function (p) {
        if (p === "kata-quran") {
          ensurePage();
          // force show even if not in PAGES: temporarily poke
          try {
            if (typeof PAGES !== "undefined" && PAGES.indexOf("kata-quran") < 0) PAGES.push("kata-quran");
          } catch (e) {}
          _go("kata-quran");
          paintChrome();
          loadData()
            .then(() => {
              paintMoods();
              updateLimit();
            })
            .catch(() => toast(t("err")));
          return;
        }
        _go(p);
        if (p === "beranda") {
          ensureEntry();
          paintEntry();
        }
      };
    }
  }

  function addLainnyaTile() {
    // Soft entry also from Lainnya without removing anything — inject tile once after render
    const hook = () => {
      const g = document.getElementById("lnGrid");
      if (!g || g.querySelector('[data-tile="kata-quran"]')) return;
      const b = document.createElement("button");
      b.type = "button";
      b.className = g.classList.contains("k3-grid") ? "k3-tile" : "v2-tile";
      b.setAttribute("data-tile", "kata-quran");
      const lab = t("title");
      b.innerHTML = "<i>📜</i><b>" + esc(lab) + "</b>" + (g.classList.contains("k3-grid") ? "<small>" + esc(t("sub")) + "</small>" : "");
      b.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.go) go("kata-quran");
      });
      g.appendChild(b);
    };
    document.addEventListener("click", (e) => {
      const t = e.target.closest('[data-tile="kata-quran"]');
      if (t) {
        e.preventDefault();
        e.stopPropagation();
        if (window.go) go("kata-quran");
      }
    }, true);
    const obs = new MutationObserver(hook);
    if (document.getElementById("lnGrid")) {
      hook();
      obs.observe(document.getElementById("lnGrid"), { childList: true });
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(hook, 200);
        const g = document.getElementById("lnGrid");
        if (g) obs.observe(g, { childList: true });
      });
    }
  }

  function boot() {
    ensurePage();
    ensureEntry();
    paintEntry();
    registerPage();
    addLainnyaTile();
    // Fix translation field on render — patch renderCard after JSON fix
    document.addEventListener("rk:lang", () => {
      paintEntry();
      paintChrome();
      if (card) renderCard(false);
    });
    try {
      loadData();
    } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  // Expose for shots / debug
  window.__BM_KATA_QURAN = {
    draw,
    setMood: (m) => {
      mood = m;
      paintMoods();
      updateLimit();
      const ask = document.getElementById("bmKqAsk");
      if (ask) ask.disabled = !mood;
    },
    getCard: () => card,
    loadData,
    shareCard,
    t,
    playDrawAnim,
    setAnimPhase,
    ensureAnim,
    closeAnim,
    /** Force anim phase for screenshots (lid|rise|float|unroll|done) */
    showPhase: async (phase, withCard) => {
      ensureAnim();
      document.getElementById("bmKqAnim").classList.add("on");
      if (withCard && !card) {
        mood = mood || "cemas";
        await loadData();
        card = pickCard();
        renderCard(false);
      }
      if (withCard) {
        const sheetHtml = (document.getElementById("bmKqSheet") || {}).innerHTML || "";
        const cardEl = document.getElementById("bmKqAnimCard");
        if (cardEl) cardEl.innerHTML = sheetHtml;
        const jarHost = document.getElementById("bmKqAnimJar");
        if (jarHost) jarHost.innerHTML = jarHTML("lg",{noRise:true});
      }
      setAnimPhase(phase);
    }
  };
})();
