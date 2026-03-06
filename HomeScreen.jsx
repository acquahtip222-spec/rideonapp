import React, { useState, useEffect, useRef } from 'react'
import MapView from '../components/MapView'

const RIDE_TYPES = [
  { id: 'economy', icon: '🚗', name: 'Economy', time: '3 min', price: '₦850', desc: 'Affordable everyday rides' },
  { id: 'comfort', icon: '🚙', name: 'Comfort', time: '5 min', price: '₦1,400', desc: 'Extra space & comfort' },
  { id: 'premium', icon: '🚐', name: 'Premium', time: '7 min', price: '₦2,200', desc: 'Luxury experience' },
]

const SUGGESTED_PLACES = [
  { name: 'Murtala Muhammed Airport', address: 'Airport Rd, Ikeja', coords: [6.5774, 3.3211], icon: '✈️' },
  { name: 'Victoria Island', address: 'VI, Lagos', coords: [6.4281, 3.4219], icon: '🏙️' },
  { name: 'Lekki Phase 1', address: 'Lekki, Lagos', coords: [6.4412, 3.5185], icon: '🏘️' },
  { name: 'The Palms Mall', address: 'Lekki, Lagos', coords: [6.4349, 3.4862], icon: '🛍️' },
  { name: 'Eko Atlantic', address: 'Bar Beach, Lagos', coords: [6.4087, 3.4156], icon: '🌊' },
  { name: 'Mainland Bridge', address: 'Lagos Island', coords: [6.4763, 3.3913], icon: '🌉' },
]

const DRIVER = {
  name: 'Adebayo K.',
  rating: 4.91,
  trips: '2.4k',
  car: 'Toyota Corolla',
  plate: 'LND 453 KJ',
  avatar: '👨🏾',
  eta: '4 min',
}

function LocationSearch({ value, onChange, onSelect, placeholder, isFocused, setFocused }) {
  const [query, setQuery] = useState(value || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)

  const searchOSM = async (q) => {
    if (!q || q.length < 3) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&countrycodes=ng`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data = await res.json()
      setResults(data.map(r => ({
        name: r.display_name.split(',')[0],
        address: r.display_name.split(',').slice(1, 3).join(','),
        coords: [parseFloat(r.lat), parseFloat(r.lon)],
        icon: '📍'
      })))
    } catch { setResults([]) }
    setLoading(false)
  }

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchOSM(query), 400)
  }, [query])

  const handleSelect = (place) => {
    setQuery(place.name)
    setResults([])
    setFocused(false)
    onSelect(place)
  }

  const showSuggested = isFocused && query.length < 3

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--bg3)', borderRadius: 14,
        padding: '12px 14px',
        border: isFocused ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
        transition: 'border 0.2s'
      }}>
        <span style={{ fontSize: 16 }}>{placeholder === 'Where to?' ? '🎯' : '📍'}</span>
        <input
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 15,
            fontWeight: 400
          }}
          placeholder={placeholder}
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value) }}
          onFocus={() => setFocused(true)}
        />
        {loading && (
          <div style={{
            width: 16, height: 16, border: '2px solid var(--text3)',
            borderTopColor: 'var(--accent)', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
        )}
        {query && !loading && (
          <button onClick={() => { setQuery(''); onChange(''); setResults([]); onSelect(null) }}
            style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 18, cursor: 'pointer' }}>×</button>
        )}
      </div>

      {isFocused && (showSuggested || results.length > 0) && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
          background: 'var(--bg3)', borderRadius: 16, overflow: 'hidden',
          border: '1px solid var(--border)', zIndex: 100,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          animation: 'fadeUp 0.2s ease'
        }}>
          {showSuggested && (
            <>
              <div style={{ padding: '10px 14px 6px', fontSize: 11, color: 'var(--text3)', letterSpacing: '1px', textTransform: 'uppercase' }}>Suggested</div>
              {SUGGESTED_PLACES.map((p, i) => (
                <PlaceRow key={i} place={p} onClick={() => handleSelect(p)} />
              ))}
            </>
          )}
          {results.map((p, i) => (
            <PlaceRow key={i} place={p} onClick={() => handleSelect(p)} />
          ))}
        </div>
      )}
    </div>
  )
}

function PlaceRow({ place, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px', textAlign: 'left',
      transition: 'background 0.15s'
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg4)'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10, background: 'var(--bg4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0
      }}>{place.icon}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{place.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{place.address}</div>
      </div>
    </button>
  )
}

export default function HomeScreen({ userLocation }) {
  const [panel, setPanel] = useState('idle') // idle | search | select_ride | searching | active | arrived
  const [destination, setDestination] = useState(null)
  const [selectedRide, setSelectedRide] = useState('economy')
  const [searchFocused, setSearchFocused] = useState(false)
  const [countdown, setCountdown] = useState(4)
  const [tripTime, setTripTime] = useState(0)

  // Trip timer
  useEffect(() => {
    if (panel !== 'active') return
    const t = setInterval(() => setTripTime(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [panel])

  // Searching countdown
  useEffect(() => {
    if (panel !== 'searching') return
    setCountdown(4)
    const t = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(t); setPanel('active'); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [panel])

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const handleBook = () => {
    if (!destination) return
    setPanel('searching')
  }

  const handleCancel = () => {
    setPanel('idle')
    setDestination(null)
    setTripTime(0)
  }

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
      {/* MAP */}
      <MapView
        userLocation={userLocation}
        destination={destination}
        rideState={panel}
      />

      {/* TOP BAR */}
      {(panel === 'idle' || panel === 'search' || panel === 'select_ride') && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          paddingTop: 'calc(var(--safe-top) + 12px)',
          paddingLeft: 16, paddingRight: 16, paddingBottom: 12,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.95) 70%, transparent)',
          zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>RIDE ON</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 1 }}>👋 Good day, Chidi</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={iconBtn}>🔔</button>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--accent)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18, cursor: 'pointer'
              }}>👤</div>
            </div>
          </div>

          {/* Search bar */}
          <div style={{
            background: 'var(--surface)', borderRadius: 18, padding: 12,
            border: '1px solid var(--border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: destination ? 8 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 14, gap: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                {destination && <>
                  <div style={{ width: 1.5, height: 18, background: 'var(--border)' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent2)' }} />
                </>}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{
                  padding: '10px 12px', background: 'var(--bg3)', borderRadius: 10,
                  fontSize: 13, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <span>📍</span>
                  <span>Current location</span>
                </div>
                {destination && (
                  <div style={{
                    padding: '10px 12px', background: 'var(--bg3)', borderRadius: 10,
                    fontSize: 13, color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    <span>{destination.name}</span>
                    <button onClick={() => { setDestination(null); setPanel('idle') }} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 16 }}>×</button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setPanel('search')}
              style={{
                width: '100%', padding: '13px', borderRadius: 12,
                background: destination ? 'var(--accent)' : 'var(--bg4)',
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 14, letterSpacing: '0.5px',
                color: destination ? '#0A0A0A' : 'var(--text2)',
                transition: 'all 0.2s',
                display: destination ? 'none' : 'block'
              }}
            >
              Where are you going?
            </button>

            {destination && (
              <button onClick={() => setPanel('select_ride')} style={{
                width: '100%', padding: 13, borderRadius: 12,
                background: 'var(--accent)', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 14, color: '#0A0A0A', letterSpacing: '0.5px'
              }}>
                Choose Ride →
              </button>
            )}
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY */}
      {panel === 'search' && (
        <div style={{
          position: 'absolute', inset: 0, background: 'var(--bg)',
          zIndex: 200, display: 'flex', flexDirection: 'column',
          paddingTop: 'var(--safe-top)',
          animation: 'slide-up 0.3s ease'
        }}>
          <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setPanel('idle')} style={iconBtn}>←</button>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>Set Destination</div>
          </div>
          <div style={{ padding: 16, flex: 1, overflow: 'auto' }}>
            <LocationSearch
              placeholder="Where to?"
              value=""
              onChange={() => {}}
              onSelect={(place) => {
                if (place) { setDestination(place); setPanel('select_ride') }
              }}
              isFocused={true}
              setFocused={() => {}}
            />
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>Popular destinations</div>
              {SUGGESTED_PLACES.map((p, i) => (
                <PlaceRow key={i} place={p} onClick={() => { setDestination(p); setPanel('select_ride') }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RIDE SELECTION PANEL */}
      {panel === 'select_ride' && destination && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--surface)',
          borderRadius: '24px 24px 0 0',
          paddingBottom: 'var(--safe-bottom)',
          border: '1px solid var(--border)',
          borderBottom: 'none',
          zIndex: 100,
          animation: 'slide-up 0.35s cubic-bezier(0.34,1.56,0.64,1)'
        }}>
          {/* Handle */}
          <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 2, margin: '12px auto 0' }} />

          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Choose your ride</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>
              To: {destination.name}
            </div>

            {/* Ride options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {RIDE_TYPES.map(ride => (
                <button key={ride.id} onClick={() => setSelectedRide(ride.id)} style={{
                  background: selectedRide === ride.id ? 'var(--accent-dim)' : 'var(--bg3)',
                  border: `1.5px solid ${selectedRide === ride.id ? 'var(--accent)' : 'transparent'}`,
                  borderRadius: 16, padding: '14px 16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 14,
                  transition: 'all 0.2s'
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: selectedRide === ride.id ? 'rgba(232,255,77,0.15)' : 'var(--bg4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0
                  }}>{ride.icon}</div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{ride.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{ride.time} away • {ride.desc}</div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
                    color: selectedRide === ride.id ? 'var(--accent)' : 'var(--text)'
                  }}>{ride.price}</div>
                </button>
              ))}
            </div>

            {/* Payment row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', background: 'var(--bg3)', borderRadius: 14, marginBottom: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>💳</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Cash</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)' }}>Payment method</div>
                </div>
              </div>
              <span style={{ color: 'var(--text3)', fontSize: 14 }}>›</span>
            </div>

            <button onClick={handleBook} style={{
              width: '100%', padding: '16px',
              background: 'var(--accent)', border: 'none', borderRadius: 16,
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16,
              color: '#0A0A0A', cursor: 'pointer', letterSpacing: '0.5px'
            }}>
              Book {RIDE_TYPES.find(r => r.id === selectedRide)?.name} — {RIDE_TYPES.find(r => r.id === selectedRide)?.price}
            </button>
          </div>
        </div>
      )}

      {/* SEARCHING */}
      {panel === 'searching' && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.85)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 300, backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
            {/* Pulsing ring */}
            <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 24px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: '2px solid var(--accent)',
                  animation: `pulse-ring 1.8s ease ${i * 0.6}s infinite`,
                  opacity: 0
                }} />
              ))}
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 40
              }}>🚗</div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Finding your driver</div>
            <div style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 6 }}>Connecting you with nearby drivers...</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800,
              color: 'var(--accent)', marginTop: 16
            }}>{countdown}</div>
          </div>
        </div>
      )}

      {/* ACTIVE RIDE */}
      {panel === 'active' && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--surface)',
          borderRadius: '24px 24px 0 0',
          paddingBottom: 'var(--safe-bottom)',
          border: '1px solid var(--border)', borderBottom: 'none',
          zIndex: 100, animation: 'slide-up 0.35s ease'
        }}>
          <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 2, margin: '12px auto 0' }} />

          {/* Driver info */}
          <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Your driver is on the way</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginTop: 2 }}>ETA: {DRIVER.eta}</div>
              </div>
              <div style={{
                background: 'var(--accent)', borderRadius: 12, padding: '8px 14px',
                fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0A0A0A', fontSize: 20
              }}>{formatTime(tripTime)}</div>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px', background: 'var(--bg3)', borderRadius: 16, marginBottom: 14
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', background: 'var(--bg4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28
              }}>{DRIVER.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{DRIVER.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
                  ⭐ {DRIVER.rating} · {DRIVER.trips} trips
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 1 }}>
                  {DRIVER.car} · <span style={{
                    background: 'var(--bg4)', padding: '1px 6px', borderRadius: 6,
                    fontWeight: 600, letterSpacing: '1px'
                  }}>{DRIVER.plate}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  width: 42, height: 42, borderRadius: '50%', background: 'var(--accent-dim)',
                  border: '1px solid var(--accent)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18, cursor: 'pointer'
                }}>📞</button>
                <button style={{
                  width: 42, height: 42, borderRadius: '50%', background: 'var(--bg4)',
                  border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18, cursor: 'pointer'
                }}>💬</button>
              </div>
            </div>

            {/* Route summary */}
            <div style={{
              padding: '12px 14px', background: 'var(--bg3)', borderRadius: 14, marginBottom: 14,
              display: 'flex', alignItems: 'center', gap: 10
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>To</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{destination?.name}</div>
              </div>
              <div style={{ width: 1, height: 30, background: 'var(--border)' }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Fare</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>
                  {RIDE_TYPES.find(r => r.id === selectedRide)?.price}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setPanel('arrived')} style={{
                flex: 1, padding: 14, background: 'var(--accent)', border: 'none', borderRadius: 14,
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#0A0A0A', cursor: 'pointer'
              }}>Arrived ✓</button>
              <button onClick={handleCancel} style={{
                padding: '14px 20px', background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.3)',
                borderRadius: 14, color: '#FF5050', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ARRIVED / RATING */}
      {panel === 'arrived' && (
        <div style={{
          position: 'absolute', inset: 0, background: 'var(--bg)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 24, zIndex: 400, paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>You've arrived!</div>
          <div style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 4 }}>Total trip time: {formatTime(tripTime)}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--accent)', marginBottom: 32 }}>
            {RIDE_TYPES.find(r => r.id === selectedRide)?.price}
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 16 }}>Rate your driver</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
            {[1,2,3,4,5].map(s => (
              <button key={s} style={{
                fontSize: 36, background: 'none', border: 'none', cursor: 'pointer',
                filter: 'grayscale(0)'
              }}>⭐</button>
            ))}
          </div>

          <button onClick={handleCancel} style={{
            width: '100%', padding: 16, background: 'var(--accent)',
            border: 'none', borderRadius: 16, fontFamily: 'var(--font-display)',
            fontWeight: 800, fontSize: 16, color: '#0A0A0A', cursor: 'pointer'
          }}>Book another ride</button>
        </div>
      )}

      {/* LOCATE ME BUTTON */}
      {(panel === 'idle' || panel === 'select_ride') && (
        <button style={{
          position: 'absolute', right: 16, bottom: panel === 'select_ride' ? 320 : 120,
          width: 44, height: 44, borderRadius: '50%', background: 'var(--surface)',
          border: '1px solid var(--border)', cursor: 'pointer', zIndex: 99,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)', transition: 'bottom 0.3s ease'
        }}>📡</button>
      )}
    </div>
  )
}

const iconBtn = {
  width: 40, height: 40, borderRadius: '50%',
  background: 'var(--surface)', border: '1px solid var(--border)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', fontSize: 16, color: 'var(--text)'
}
