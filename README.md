# Best Muslim

Static PWA (single `index.html`, no build step) — daily ibadah checklist with dalil, prayer focus tools, tasbih, journal, Qur'an recitation audio. Languages: Indonesia / English / العربية (RTL).

## Deploy to Vercel via GitHub
1. Create a GitHub repo (e.g. `ruang-khusyuk`) and push the files from this folder (index.html, manifest.json, icon.svg, icon-192.png, icon-512.png, README.md) to the repo root.
2. Vercel → Add New → Project → import the repo → Framework Preset: **Other**; leave Build Command and Output Directory empty → Deploy.

Source files `build.py`, `addon.js`, `addon.css`, `harian.html` regenerate `index.html` from the v2 artifact export (optional; can be omitted from the repo).

Audio: Mishary Rashid Alafasy via server8.mp3quran.net (fallback download.quranicaudio.com). Data is stored only in the browser's localStorage.
