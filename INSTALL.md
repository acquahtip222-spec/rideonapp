# 🚗 RideOn — Installation Guide

## Deploy to Vercel (Easiest — No Build Step!)

Unlike the React version, this PWA is a **single HTML file** — no npm, no build process needed.

### Option 1: Drag & Drop on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New → Project"**
3. Drag the entire **RideOn-PWA** folder onto the upload area
4. Click **Deploy** — done in seconds!

### Option 2: GitHub + Vercel
1. Create a new GitHub repo
2. Push the entire `RideOn-PWA` folder contents to the repo root
3. Go to vercel.com → New Project → Import your repo
4. **No build settings needed** — just click Deploy!

### Option 3: Any Static Host
This works on **GitHub Pages**, **Netlify**, **Cloudflare Pages**, or any static web host.
Just upload the folder and it works instantly.

---

## Install as a Mobile App (PWA)

Once deployed, users can install RideOn directly to their phone home screen:

**On iPhone/Safari:**
1. Open your deployed URL in Safari
2. Tap the Share button (□↑)
3. Tap "Add to Home Screen"
4. Tap "Add" — RideOn icon appears on your home screen!

**On Android/Chrome:**
1. Open your deployed URL in Chrome
2. Tap the 3-dot menu
3. Tap "Add to Home Screen" or "Install App"
4. Confirm — RideOn installs like a native app!

---

## File Structure

```
RideOn-PWA/
├── index.html       ← Entire app (HTML + CSS + JS in one file)
├── manifest.json    ← PWA metadata (name, icons, display mode)
├── sw.js            ← Service worker (offline support)
├── icons/
│   ├── icon-192.png ← App icon (small)
│   └── icon-512.png ← App icon (large)
└── INSTALL.md       ← This file
```

## Features
- 🌟 Animated splash screen
- 🗺️ Interactive map with moving cars
- 🔍 Destination search (10 Lagos locations)
- 🚗 5 ride types with live pricing in ₦
- 🎟️ Promo codes (try **RIDEON20** for 20% off)
- 💳 Payment method selection
- 📍 Live ride tracking with driver card
- ⭐ Post-ride rating system
- 📋 Ride history with stats
- 👤 Full profile screen with wallet
- 💾 Wallet balance persists across sessions (localStorage)
- 📱 Installable as PWA on iPhone & Android
