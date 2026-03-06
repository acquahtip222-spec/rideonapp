import React from 'react'

const HISTORY = [
  { id: 1, from: 'Current Location', to: 'Victoria Island', date: 'Today, 2:30 PM', price: '₦1,400', status: 'completed', driver: 'Adebayo K.', type: '🚙' },
  { id: 2, from: 'Ikeja', to: 'Murtala Muhammed Airport', date: 'Yesterday, 6:00 AM', price: '₦850', status: 'completed', driver: 'Emeka J.', type: '🚗' },
  { id: 3, from: 'Lekki Phase 1', to: 'The Palms Mall', date: 'Mar 3, 4:15 PM', price: '₦2,200', status: 'completed', driver: 'Tunde A.', type: '🚐' },
  { id: 4, from: 'Victoria Island', to: 'Eko Atlantic', date: 'Mar 2, 11:00 AM', price: '₦650', status: 'cancelled', driver: 'N/A', type: '🚗' },
  { id: 5, from: 'Mainland', to: 'Ikeja GRA', date: 'Mar 1, 8:30 AM', price: '₦1,100', status: 'completed', driver: 'Chuka O.', type: '🚙' },
]

export default function ActivityScreen() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: 'var(--bg)', overflowY: 'auto',
      paddingTop: 'calc(var(--safe-top) + 16px)',
      paddingBottom: 'calc(var(--safe-bottom) + 80px)',
    }}>
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Activity</div>
        <div style={{ color: 'var(--text2)', fontSize: 14 }}>Your ride history</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, padding: '0 20px 24px' }}>
        {[
          { label: 'Total Rides', value: '24', icon: '🚗' },
          { label: 'This Month', value: '₦6.5k', icon: '💳' },
          { label: 'Saved', value: '1h 20m', icon: '⏱' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: 'var(--surface)', borderRadius: 16,
            padding: '14px 12px', border: '1px solid var(--border)', textAlign: 'center'
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Ride history */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 }}>Recent Rides</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {HISTORY.map(ride => (
            <div key={ride.id} style={{
              background: 'var(--surface)', borderRadius: 18,
              border: '1px solid var(--border)', padding: '16px',
              display: 'flex', gap: 14, alignItems: 'flex-start'
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                background: ride.status === 'cancelled' ? 'rgba(255,50,50,0.1)' : 'var(--accent-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
              }}>{ride.type}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{ride.to}</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>From {ride.from}</div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
                    color: ride.status === 'cancelled' ? 'var(--text3)' : 'var(--text)',
                    textDecoration: ride.status === 'cancelled' ? 'line-through' : 'none'
                  }}>{ride.price}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{ride.date}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                    background: ride.status === 'cancelled' ? 'rgba(255,50,50,0.1)' : 'rgba(232,255,77,0.1)',
                    color: ride.status === 'cancelled' ? '#FF5050' : 'var(--accent)',
                  }}>{ride.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
