import React, { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => onDone(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0A0A0A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      paddingTop: 'var(--safe-top)',
      paddingBottom: 'var(--safe-bottom)',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(232,255,77,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,255,77,0.04) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 0.8s ease'
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,255,77,0.15) 0%, transparent 70%)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 1s ease'
      }} />

      {/* Logo */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        position: 'relative', zIndex: 1
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 22,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36,
          boxShadow: '0 0 40px rgba(232,255,77,0.4)',
          animation: phase >= 2 ? 'car-move 1.5s ease infinite' : 'none'
        }}>🚗</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800,
            letterSpacing: '-2px', color: 'var(--text)', lineHeight: 1
          }}>RIDE ON</div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)',
            letterSpacing: '4px', textTransform: 'uppercase', marginTop: 6,
            opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.4s ease 0.2s'
          }}>Your ride. Your rules.</div>
        </div>
      </div>

      {/* Loading bar */}
      <div style={{
        position: 'absolute', bottom: 80, left: 40, right: 40,
        height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 4,
        overflow: 'hidden',
        opacity: phase >= 2 ? 1 : 0, transition: 'opacity 0.3s'
      }}>
        <div style={{
          height: '100%', background: 'var(--accent)', borderRadius: 4,
          width: phase >= 2 ? '100%' : '0%',
          transition: 'width 1.2s ease'
        }} />
      </div>
    </div>
  )
}
