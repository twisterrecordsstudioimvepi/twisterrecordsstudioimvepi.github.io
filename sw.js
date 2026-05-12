const CACHE_NAME = 'twister-records-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/services.html',
  '/work.html',
  '/training.html',
  '/shop.html',
  '/why-us.html',
  '/contact.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/js/jquery.min.js',
  '/assets/js/util.js',
  '/assets/js/breakpoints.min.js',
  '/assets/js/browser.min.js'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
