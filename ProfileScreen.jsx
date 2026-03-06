import React, { useState } from 'react'

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true)
  const [shareLocation, setShareLocation] = useState(true)

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} style={{
      width: 48, height: 28, borderRadius: 14,
      background: value ? 'var(--accent)' : 'var(--bg4)',
      border: 'none', cursor: 'pointer', position: 'relative',
      transition: 'background 0.2s'
    }}>
      <div style={{
        position: 'absolute', top: 3, left: value ? 23 : 3,
        width: 22, height: 22, borderRadius: '50%',
        background: value ? '#0A0A0A' : 'var(--text3)',
        transition: 'left 0.2s', boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
      }} />
    </button>
  )

  return (
    <div style={{
      flex: 1, overflowY: 'auto', background: 'var(--bg)',
      paddingTop: 'calc(var(--safe-top) + 16px)',
      paddingBottom: 'calc(var(--safe-bottom) + 80px)',
    }}>
      {/* Profile header */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 20 }}>Profile</div>
        <div style={{
          background: 'var(--surface)', borderRadius: 24, padding: '20px',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 16
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--accent)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 30, flexShrink: 0
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>Chidi Okonkwo</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>chidi.ok@email.com</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <div style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 20,
                background: 'var(--accent-dim)', color: 'var(--accent)',
                fontWeight: 600
              }}>⭐ 4.9 Rating</div>
              <div style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 20,
                background: 'rgba(255,107,53,0.1)', color: 'var(--accent2)',
                fontWeight: 600
              }}>24 Rides</div>
            </div>
          </div>
          <button style={{
            padding: '8px 14px', background: 'var(--bg4)',
            border: '1px solid var(--border)', borderRadius: 10,
            color: 'var(--text2)', fontSize: 12, cursor: 'pointer',
            fontFamily: 'var(--font-body)'
          }}>Edit</button>
        </div>
      </div>

      {/* Wallet */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a1a0a 0%, #0a1a0a 50%, #0a0a1a 100%)',
          borderRadius: 20, padding: 20,
          border: '1px solid rgba(232,255,77,0.2)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -20,
            width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,255,77,0.1) 0%, transparent 70%)'
          }} />
          <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 4 }}>Ride On Wallet</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>₦12,500</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>Available balance</div>
          <button style={{
            marginTop: 16, padding: '10px 20px', background: 'var(--accent)',
            border: 'none', borderRadius: 10, fontFamily: 'var(--font-display)',
            fontWeight: 700, fontSize: 13, color: '#0A0A0A', cursor: 'pointer'
          }}>+ Top Up</button>
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 }}>Settings</div>

        {[
          { icon: '🔔', label: 'Push Notifications', toggle: true, value: notifications, onChange: setNotifications },
          { icon: '📍', label: 'Share Location', toggle: true, value: shareLocation, onChange: setShareLocation },
          { icon: '🛡', label: 'Safety Center', arrow: true },
          { icon: '💳', label: 'Payment Methods', arrow: true },
          { icon: '🤝', label: 'Refer a Friend', arrow: true },
          { icon: '❓', label: 'Help & Support', arrow: true },
          { icon: '⚙️', label: 'Preferences', arrow: true },
        ].map((item, i) => (
          <button key={i} style={{
            width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '15px 16px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8,
            transition: 'background 0.15s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ flex: 1, fontSize: 14, color: 'var(--text)', textAlign: 'left', fontFamily: 'var(--font-body)' }}>{item.label}</span>
            {item.toggle && <Toggle value={item.value} onChange={item.onChange} />}
            {item.arrow && <span style={{ color: 'var(--text3)', fontSize: 14 }}>›</span>}
          </button>
        ))}

        <button style={{
          width: '100%', background: 'rgba(255,50,50,0.08)', border: '1px solid rgba(255,50,50,0.2)',
          borderRadius: 14, padding: '15px', cursor: 'pointer', marginTop: 8,
          fontFamily: 'var(--font-body)', fontSize: 14, color: '#FF5050'
        }}>Sign Out</button>
      </div>
    </div>
  )
}
