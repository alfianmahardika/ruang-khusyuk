# Azan audio sources
Downloaded 2026-10-26 from GitHub repo achaudhry/adhan (Raspberry Pi Adhan Clock), raw URLs verified with curl (HTTP 200, audio/mpeg):
- azan-makkah.mp3  <- https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-Makkah.mp3 (Masjid al-Haram)
- azan-madinah.mp3 <- https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-Madinah.mp3 (Masjid an-Nabawi)
- azan-subuh.mp3   <- https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-fajr.mp3 (Fajr adhan)
- azan-short.mp3   = first 29 s of azan-makkah.mp3 with fade-out (for iOS notification sound, <30 s)
Re-encoded with ffmpeg: mono, 22.05 kHz, 40 kbps.
LICENSING: the repo has NO license file (GitHub API license: null), and the original reciters/recording owners are not credited.
Fine for personal testing; before commercial / store release, replace with recordings that have explicit permission or a clear license.
