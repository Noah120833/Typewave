const CACHE_NAME = 'typewave-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/typewavestyle.css',
  '/typewavescript.js',
  '/manifest.json',
  '/sounds/src_audio_nk-cream_l.wav',
  '/sounds/src_audio_nk-cream_enter.wav',
  '/sounds/src_audio_nk-cream_backspace.wav',
  '/sounds/src_audio_nk-cream_caps lock.wav',
  '/sounds/src_audio_nk-cream_shift.wav',
  '/sounds/src_audio_nk-cream_space.wav',
  '/sounds/src_audio_nk-cream_tab.wav'
];

// Installieren des Service Workers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivieren des Service Workers
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch-Event (Offline-Unterstützung)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});
