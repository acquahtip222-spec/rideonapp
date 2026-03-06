import React, { useState, useEffect } from 'react'
import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/HomeScreen'
import ActivityScreen from './screens/ActivityScreen'
import ProfileScreen from './screens/ProfileScreen'

const TABS = [
  { id: 'home', icon: '🗺', label: 'Ride' },
  { id: 'activity', icon: '📋', label: 'Activity' },
  { id: 'profile', icon: '👤', label: 'Profile' },
]

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const [userLocation, setUserLocation] = useState([6.5244, 3.3792]) // Lagos default

  // Get real user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => {} // Keep Lagos default on error
      )
    }
  }, [])

  if (showSplash) return <SplashScreen onDone={() => setShowSplash(false)} />

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--bg)', position: 'relative', overflow: 'hidden'
    }}>
      {/* Main content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {activeTab === 'home' && <HomeScreen userLocation={userLocation} />}
        {activeTab === 'activity' && <ActivityScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(16,16,16,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'var(--safe-bottom)',
        zIndex: 500,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0 2px' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 4, padding: '6px 0',
                opacity: activeTab === tab.id ? 1 : 0.45,
                transition: 'all 0.2s',
                transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <div style={{
                fontSize: activeTab === tab.id ? 24 : 22,
                filter: activeTab === tab.id
                  ? 'drop-shadow(0 0 8px rgba(232,255,77,0.5))'
                  : 'none',
                transition: 'all 0.2s'
              }}>{tab.icon}</div>
              <span style={{
                fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 600,
                letterSpacing: '0.5px',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text2)',
                transition: 'color 0.2s'
              }}>{tab.label}</span>
              {activeTab === tab.id && (
                <div style={{
                  position: 'absolute', bottom: 'calc(var(--safe-bottom) + 2px)',
                  width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)',
                  boxShadow: '0 0 6px var(--accent)'
                }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
