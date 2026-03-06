// DRIFT Rider Service Worker v1.0
const CACHE = 'drift-rider-v1';
const ASSETS = [
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install — cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', e => {
  // Don't intercept non-GET or cross-origin tile requests
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.hostname.includes('tile.openstreetmap') || url.hostname.includes('fonts.googleapis') || url.hostname.includes('unpkg.com')) {
    // Network-only for external resources
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache a copy of successful responses
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Background sync placeholder
self.addEventListener('sync', e => {
  if (e.tag === 'sync-ride-data') {
    console.log('[SW] Background sync: ride data');
  }
});

// Push notifications placeholder
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'DRIFT', body: 'You have a new update.' };
  e.waitUntil(
    self.registration.showNotification(data.title || 'DRIFT', {
      body: data.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/index.html' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url || '/index.html'));
});
