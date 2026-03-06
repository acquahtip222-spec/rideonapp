# 🚗 Ride On — Film Prop Ride-Hailing App

A fully interactive ride-hailing app built for film production use.  
Designed to feel and function like a real iPhone app when added to Home Screen.

---

## Features

- **Live map** with OpenStreetMap + Leaflet (dark-themed)
- **Real location search** powered by Nominatim (OSM geocoding)
- **Full ride booking flow**: Search → Choose ride type → Confirm → Driver match → Active trip → Rating
- **3 ride tiers**: Economy, Comfort, Premium — with prices & ETAs
- **Activity screen**: Ride history, stats, trip details
- **Profile screen**: Wallet balance, settings, toggles
- **PWA (Progressive Web App)**: Add to iPhone Home Screen → runs fullscreen like a native app

---

## Deploy to Vercel (5 minutes)

### Option 1: GitHub + Vercel (Recommended)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy** ✅

### Option 2: Vercel CLI

```bash
npm install -g vercel
cd rideon
npm install
vercel --prod
```

---

## Install on iPhone (PWA)

After deploying:

1. Open your Vercel URL in **Safari** on iPhone
2. Tap the **Share** button (box with arrow)
3. Tap **"Add to Home Screen"**
4. Tap **"Add"**
5. The app now appears on your home screen and opens fullscreen — no browser chrome!

---

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Tech Stack

- React 18 + Vite
- Leaflet / React-Leaflet (maps)
- Nominatim (OSM geocoding — free, no API key needed)
- vite-plugin-pwa (PWA / iPhone install support)
- Pure CSS animations
- Zero external UI libraries

---

## Customisation for Film

- Change `DRIVER` object in `HomeScreen.jsx` to match your cast
- Change prices, ride types, and plate numbers as needed
- The app uses Lagos, Nigeria as default location — update `defaultLocation` to your filming location
- Update `SUGGESTED_PLACES` with your filming locations
