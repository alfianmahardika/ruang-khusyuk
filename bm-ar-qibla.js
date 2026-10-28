/*! Best Muslim v78 — AR Qibla (Arah Kiblat) camera view.
 * Privacy-first: camera used only while AR is open; never recorded or uploaded.
 * Marker: original SVG Ka'bah (not a brand logo). */
(function () {
  "use strict";
  var FOV = 60; // approx horizontal FOV degrees
  var ALIGN_DEG = 3;
  var KAABA = { lat: 21.4225, lng: 39.8262 };
  var stream = null;
  var oriHandler = null;
  var oriAbsolute = false;
  var heading = null;
  var alignedOnce = false;
  var raf = 0;
  var open = false;

  var STR = {
    id: {
      title: "AR Kiblat",
      open: "Mode AR (kamera)",
      close: "Tutup",
      deg: "Kiblat",
      dist: "Jarak ke Makkah",
      heading: "Arah perangkat",
      turnL: "Putar ke kiri",
      turnR: "Putar ke kanan",
      aligned: "Kiblat tepat",
      search: "Arahkan kamera ke kiblat",
      calib: "Akurasi rendah — gerakkan ponsel membentuk angka 8, jauhkan dari magnet/logam.",
      privacy: "Kamera hanya dipakai di layar ini. Tidak direkam, tidak diunggah.",
      noCam: "Kamera tidak tersedia. Izinkan akses kamera, atau gunakan kompas di layar Kiblat.",
      noSensor: "Sensor kompas tidak tersedia di perangkat ini. Gunakan mode kompas biasa, atau buka di ponsel.",
      needLoc: "Lokasi belum diatur. Atur lokasi di Jadwal dulu agar arah kiblat akurat.",
      permCam: "Izin kamera diperlukan untuk Mode AR.",
      permOri: "Izin orientasi diperlukan agar penanda kiblat akurat."
    },
    en: {
      title: "AR Qibla",
      open: "AR mode (camera)",
      close: "Close",
      deg: "Qibla",
      dist: "Distance to Makkah",
      heading: "Device heading",
      turnL: "Turn left",
      turnR: "Turn right",
      aligned: "On Qibla",
      search: "Point the camera toward the Qibla",
      calib: "Low accuracy — move your phone in a figure-8, away from magnets/metal.",
      privacy: "Camera is used only on this screen. Nothing is recorded or uploaded.",
      noCam: "Camera unavailable. Allow camera access, or use the compass on the Qibla screen.",
      noSensor: "No compass sensor on this device. Use the regular compass, or open on a phone.",
      needLoc: "Location not set. Set your location in Prayer Times first for an accurate Qibla.",
      permCam: "Camera permission is required for AR mode.",
      permOri: "Orientation permission is required for an accurate Qibla marker."
    },
    ar: {
      title: "قبلة الواقع المعزز",
      open: "وضع الواقع المعزز (الكاميرا)",
      close: "إغلاق",
      deg: "القبلة",
      dist: "المسافة إلى مكة",
      heading: "اتجاه الجهاز",
      turnL: "ادر يسارًا",
      turnR: "ادر يمينًا",
      aligned: "أنت مستقبل القبلة",
      search: "وجّه الكاميرا نحو القبلة",
      calib: "دقة منخفضة — حرّك الهاتف على شكل الرقم 8 بعيدًا عن المغناطيس والمعادن.",
      privacy: "تُستخدم الكاميرا في هذه الشاشة فقط. لا تسجيل ولا رفع.",
      noCam: "الكاميرا غير متاحة. اسمح بالوصول أو استخدم البوصلة في شاشة القبلة.",
      noSensor: "لا يوجد مستشعر بوصلة. استخدم البوصلة العادية أو افتحه على هاتف.",
      needLoc: "الموقع غير محدد. حدّد موقعك في مواقيت الصلاة أولًا.",
      permCam: "يلزم إذن الكاميرا لوضع الواقع المعزز.",
      permOri: "يلزم إذن الاتجاه لعلامة القبلة الدقيقة."
    }
  };

  function lang() {
    try {
      var l = JSON.parse(localStorage.getItem("rk_lang") || '"id"');
      return STR[l] ? l : "id";
    } catch (e) {
      return "id";
    }
  }
  function t(k) {
    var L = STR[lang()] || STR.id;
    return L[k] || STR.en[k] || k;
  }
  function loc() {
    try {
      return JSON.parse(localStorage.getItem("rk_loc") || "null");
    } catch (e) {
      return null;
    }
  }
  function fix(a, b) {
    a = a % b;
    return a < 0 ? a + b : a;
  }
  function toRad(d) {
    return (d * Math.PI) / 180;
  }
  function qiblaBearing(lat, lng) {
    if (window.RKPray && typeof window.RKPray.qibla === "function") {
      return window.RKPray.qibla(lat, lng);
    }
    var kl = KAABA.lat,
      kg = KAABA.lng;
    var φ1 = toRad(lat),
      φ2 = toRad(kl);
    var Δλ = toRad(kg - lng);
    var y = Math.sin(Δλ) * Math.cos(φ2);
    var x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return fix((Math.atan2(y, x) * 180) / Math.PI, 360);
  }
  function haversineKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = toRad(lat2 - lat1),
      dLon = toRad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  function deltaHeading(target, head) {
    return ((target - head + 540) % 360) - 180;
  }

  var KAABA_SVG =
    '<svg viewBox="0 0 64 64" aria-hidden="true">' +
    '<defs><linearGradient id="bmArGold" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#f0d78a"/><stop offset="100%" stop-color="#c9a44a"/>' +
    "</linearGradient></defs>" +
    '<path d="M8 22 L32 10 L56 22 L56 52 L8 52 Z" fill="#1a1510" stroke="url(#bmArGold)" stroke-width="2"/>' +
    '<path d="M8 22 L32 10 L56 22 L32 34 Z" fill="#2a2218" stroke="url(#bmArGold)" stroke-width="1.5"/>' +
    '<rect x="8" y="34" width="48" height="5" fill="url(#bmArGold)"/>' +
    '<rect x="28" y="42" width="8" height="10" rx="1" fill="url(#bmArGold)"/>' +
    '<circle cx="32" cy="28" r="3" fill="url(#bmArGold)"/>' +
    "</svg>";

  function ensureDom() {
    if (document.getElementById("bmArQibla")) return;
    var el = document.createElement("div");
    el.id = "bmArQibla";
    el.className = "bm-ar-ov";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML =
      '<video class="bm-ar-video" id="bmArVideo" playsinline muted autoplay></video>' +
      '<div class="bm-ar-layer" id="bmArLayer">' +
      '<div class="bm-ar-cross" aria-hidden="true"></div>' +
      '<div class="bm-ar-marker" id="bmArMarker" style="left:50%;opacity:0">' +
      KAABA_SVG +
      '<span class="lab">Ka\'bah</span></div>' +
      '<div class="bm-ar-edge left" id="bmArEdgeL" aria-hidden="true">‹</div>' +
      '<div class="bm-ar-edge right" id="bmArEdgeR" aria-hidden="true">›</div>' +
      "</div>" +
      '<div class="bm-ar-hud">' +
      '<div class="row"><h2 id="bmArTitle"></h2>' +
      '<button type="button" class="bm-ar-close" id="bmArClose" aria-label="Close">×</button></div>' +
      '<div class="bm-ar-meta">' +
      '<span id="bmArDegMeta"></span><span id="bmArDistMeta"></span><span id="bmArHeadMeta"></span>' +
      "</div>" +
      '<div class="bm-ar-status" id="bmArStatus"></div>' +
      '<p class="bm-ar-privacy" id="bmArPrivacy"></p>' +
      "</div>" +
      '<div class="bm-ar-footer"><div class="bm-ar-hint" id="bmArHint" hidden></div></div>' +
      '<div class="bm-ar-fallback" id="bmArFallback"><div class="box">' +
      "<h3 id=\"bmArFbTitle\"></h3><p id=\"bmArFbBody\"></p></div></div>";
    document.body.appendChild(el);
    document.getElementById("bmArClose").addEventListener("click", close);
  }

  function applyStrings() {
    var btn = document.getElementById("bmArOpen");
    if (btn) btn.textContent = t("open");
    var title = document.getElementById("bmArTitle");
    if (title) title.textContent = t("title");
    var priv = document.getElementById("bmArPrivacy");
    if (priv) priv.textContent = t("privacy");
    var closeBtn = document.getElementById("bmArClose");
    if (closeBtn) closeBtn.setAttribute("aria-label", t("close"));
  }

  function stopCamera() {
    if (stream) {
      try {
        stream.getTracks().forEach(function (tr) {
          tr.stop();
        });
      } catch (e) {}
      stream = null;
    }
    var v = document.getElementById("bmArVideo");
    if (v) {
      try {
        v.srcObject = null;
      } catch (e) {}
    }
  }

  function stopOri() {
    if (oriHandler) {
      window.removeEventListener("deviceorientationabsolute", oriHandler, true);
      window.removeEventListener("deviceorientation", oriHandler, true);
      oriHandler = null;
    }
  }

  function showFallback(msg) {
    var fb = document.getElementById("bmArFallback");
    if (!fb) return;
    document.getElementById("bmArFbTitle").textContent = t("title");
    document.getElementById("bmArFbBody").textContent = msg;
    fb.classList.add("on");
  }
  function hideFallback() {
    var fb = document.getElementById("bmArFallback");
    if (fb) fb.classList.remove("on");
  }

  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showFallback(t("noCam"));
      return false;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      var v = document.getElementById("bmArVideo");
      v.srcObject = stream;
      await v.play().catch(function () {});
      return true;
    } catch (e) {
      showFallback(t("permCam") + " " + t("noCam"));
      return false;
    }
  }

  async function requestOriPermission() {
    try {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        var p = await DeviceOrientationEvent.requestPermission();
        if (p !== "granted") {
          showFallback(t("permOri") + " " + t("noSensor"));
          return false;
        }
      }
    } catch (e) {
      showFallback(t("permOri"));
      return false;
    }
    if (typeof DeviceOrientationEvent === "undefined") {
      showFallback(t("noSensor"));
      return false;
    }
    return true;
  }

  function onOri(e) {
    var h = null;
    var acc = null;
    if (typeof e.webkitCompassHeading === "number") {
      h = e.webkitCompassHeading;
      if (typeof e.webkitCompassAccuracy === "number") acc = e.webkitCompassAccuracy;
    } else if (e.absolute && e.alpha != null) {
      h = 360 - e.alpha;
    } else if (e.alpha != null && oriAbsolute === false) {
      // relative — still usable as last resort
      h = 360 - e.alpha;
    }
    if (h == null || !isFinite(h)) return;
    heading = fix(h, 360);
    var hint = document.getElementById("bmArHint");
    if (hint) {
      if (acc != null && acc > 25) {
        hint.hidden = false;
        hint.textContent = t("calib");
      } else if (acc != null && acc >= 0 && acc <= 25) {
        hint.hidden = true;
      }
    }
    paint();
  }

  function startOri() {
    stopOri();
    oriHandler = onOri;
    oriAbsolute = "ondeviceorientationabsolute" in window;
    if (oriAbsolute) {
      window.addEventListener("deviceorientationabsolute", oriHandler, true);
    } else {
      window.addEventListener("deviceorientation", oriHandler, true);
    }
    // desktop / no-sensor detection
    setTimeout(function () {
      if (!open) return;
      if (heading == null) {
        showFallback(t("noSensor"));
      }
    }, 2800);
  }

  function paint() {
    if (!open) return;
    var L = loc();
    if (!L) return;
    var q = qiblaBearing(L.lat, L.lng);
    var dist = haversineKm(L.lat, L.lng, KAABA.lat, KAABA.lng);
    var degEl = document.getElementById("bmArDegMeta");
    var distEl = document.getElementById("bmArDistMeta");
    var headEl = document.getElementById("bmArHeadMeta");
    var st = document.getElementById("bmArStatus");
    if (degEl) degEl.innerHTML = t("deg") + ": <b>" + q.toFixed(1) + "°</b>";
    if (distEl)
      distEl.innerHTML =
        t("dist") + ": <b>" + (dist >= 100 ? Math.round(dist) : dist.toFixed(1)) + " km</b>";
    if (headEl)
      headEl.innerHTML =
        t("heading") + ": <b>" + (heading == null ? "—" : heading.toFixed(0) + "°") + "</b>";

    var marker = document.getElementById("bmArMarker");
    var edgeL = document.getElementById("bmArEdgeL");
    var edgeR = document.getElementById("bmArEdgeR");
    if (heading == null) {
      if (st) {
        st.className = "bm-ar-status";
        st.textContent = t("search");
      }
      if (marker) marker.style.opacity = "0";
      if (edgeL) edgeL.classList.remove("on");
      if (edgeR) edgeR.classList.remove("on");
      return;
    }
    var d = deltaHeading(q, heading);
    var half = FOV / 2;
    var aligned = Math.abs(d) <= ALIGN_DEG;
    if (st) {
      st.className = "bm-ar-status" + (aligned ? " ok" : "");
      if (aligned) st.textContent = t("aligned");
      else if (d < 0) st.textContent = t("turnL") + " (" + Math.round(Math.abs(d)) + "°)";
      else st.textContent = t("turnR") + " (" + Math.round(Math.abs(d)) + "°)";
    }
    if (aligned) {
      if (!alignedOnce && navigator.vibrate) {
        try {
          navigator.vibrate([40, 30, 40]);
        } catch (e) {}
      }
      alignedOnce = true;
    } else {
      alignedOnce = false;
    }
    if (Math.abs(d) > half) {
      if (marker) marker.style.opacity = "0";
      if (edgeL) edgeL.classList.toggle("on", d < 0);
      if (edgeR) edgeR.classList.toggle("on", d > 0);
    } else {
      if (edgeL) edgeL.classList.remove("on");
      if (edgeR) edgeR.classList.remove("on");
      var pct = 50 + (d / half) * 50;
      if (marker) {
        marker.style.left = pct + "%";
        marker.style.opacity = "1";
        marker.classList.toggle("aligned", aligned);
      }
    }
  }

  async function openAr() {
    ensureDom();
    applyStrings();
    var L = loc();
    if (!L || !isFinite(L.lat) || !isFinite(L.lng)) {
      ensureDom();
      document.getElementById("bmArQibla").classList.add("on");
      open = true;
      showFallback(t("needLoc"));
      return;
    }
    // Request permissions only on user tap (this function)
    var okOri = await requestOriPermission();
    document.getElementById("bmArQibla").classList.add("on");
    open = true;
    heading = null;
    alignedOnce = false;
    applyStrings();
    paint();
    var camOk = await startCamera();
    if (okOri) {
      hideFallback();
      startOri();
    } else if (camOk) {
      /* camera ok but no sensor — keep sensor fallback visible over video */
    } else {
      /* both failed — fallback already shown */
    }
    document.addEventListener("visibilitychange", onVis);
  }

  function onVis() {
    if (document.hidden) {
      stopCamera();
      stopOri();
    } else if (open) {
      startCamera();
      startOri();
    }
  }

  function close() {
    open = false;
    document.removeEventListener("visibilitychange", onVis);
    stopCamera();
    stopOri();
    heading = null;
    var ov = document.getElementById("bmArQibla");
    if (ov) ov.classList.remove("on");
    hideFallback();
  }

  function wireButton() {
    var btn = document.getElementById("bmArOpen");
    if (!btn || btn._bmAr) return;
    btn._bmAr = 1;
    applyStrings();
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openAr();
    });
  }

  // Test hooks for Playwright
  window.BmArQibla = {
    open: openAr,
    close: close,
    injectHeading: function (h, acc) {
      onOri({ webkitCompassHeading: h, webkitCompassAccuracy: acc == null ? 5 : acc, absolute: true });
    },
    setFov: function (f) {
      FOV = f;
    },
    isOpen: function () {
      return open;
    },
    getHeading: function () {
      return heading;
    }
  };

  function boot() {
    ensureDom();
    wireButton();
    applyStrings();
    // re-apply strings on lang change
    window.addEventListener("storage", function (e) {
      if (!e.key || e.key === "rk_lang") applyStrings();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
