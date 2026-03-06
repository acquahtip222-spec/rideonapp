import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const DRIVER_POSITIONS = [
  [6.5244, 3.3792],
  [6.5280, 3.3850],
  [6.5200, 3.3700],
  [6.5310, 3.3900],
  [6.5150, 3.3820],
]

export default function MapView({ userLocation, destination, rideState }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const routeRef = useRef(null)
  const userMarkerRef = useRef(null)
  const destMarkerRef = useRef(null)

  const defaultLocation = userLocation || [6.5244, 3.3792] // Lagos

  useEffect(() => {
    if (mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: defaultLocation,
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map)

    mapInstanceRef.current = map

    // User location marker (pulsing dot)
    const userIcon = L.divIcon({
      html: `<div style="
        width:18px;height:18px;border-radius:50%;
        background:#E8FF4D;border:3px solid #0A0A0A;
        box-shadow:0 0 0 4px rgba(232,255,77,0.3);
        position:relative;
      ">
        <div style="
          position:absolute;inset:-8px;border-radius:50%;
          border:2px solid rgba(232,255,77,0.4);
          animation:pulse-ring 1.5s ease infinite;
        "></div>
      </div>`,
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    })

    userMarkerRef.current = L.marker(defaultLocation, { icon: userIcon }).addTo(map)

    // Add nearby driver markers
    DRIVER_POSITIONS.forEach(pos => {
      const driverIcon = L.divIcon({
        html: `<div style="font-size:22px;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6))">🚗</div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })
      const m = L.marker(pos, { icon: driverIcon }).addTo(map)
      markersRef.current.push(m)
    })

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Update user location
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(userLocation)
    }
    mapInstanceRef.current.panTo(userLocation, { animate: true, duration: 1 })
  }, [userLocation])

  // Draw route when destination is set
  useEffect(() => {
    if (!mapInstanceRef.current) return

    if (routeRef.current) {
      routeRef.current.remove()
      routeRef.current = null
    }
    if (destMarkerRef.current) {
      destMarkerRef.current.remove()
      destMarkerRef.current = null
    }

    if (!destination?.coords) return

    const from = userLocation || defaultLocation
    const to = destination.coords

    // Destination marker
    const destIcon = L.divIcon({
      html: `<div style="
        width:28px;height:28px;border-radius:50% 50% 50% 0;
        background:#FF6B35;border:3px solid #fff;
        transform:rotate(-45deg);
        box-shadow:0 4px 12px rgba(255,107,53,0.5);
      "></div>`,
      className: '',
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    })
    destMarkerRef.current = L.marker(to, { icon: destIcon }).addTo(mapInstanceRef.current)

    // Draw route line
    const midLat = (from[0] + to[0]) / 2 + 0.003
    const midLng = (from[1] + to[1]) / 2

    routeRef.current = L.polyline(
      [from, [midLat, midLng], to],
      {
        color: '#E8FF4D',
        weight: 4,
        opacity: 0.9,
        dashArray: rideState === 'searching' ? '8 8' : null,
        lineCap: 'round',
      }
    ).addTo(mapInstanceRef.current)

    // Fit bounds
    const bounds = L.latLngBounds([from, to])
    mapInstanceRef.current.fitBounds(bounds, { padding: [80, 80] })
  }, [destination, rideState])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  )
}
