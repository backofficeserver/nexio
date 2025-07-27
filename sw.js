const CACHE_NAME = 'nexio-v2';
const OFFLINE_URL = '/nexio/offline.html';
const urlsToCache = [
  '/nexio/',
  '/nexio/index.html',
  '/nexio/styles/main.css',
  '/nexio/scripts/app.js',
  '/nexio/icons/icon-32x32.svg',
  '/nexio/icons/icon-32x32.png',
  '/nexio/icons/icon-512x512.svg',
  OFFLINE_URL
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});