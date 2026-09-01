// Service Worker for Rubik Vision Bluetooth Timer
const CACHE_NAME = 'rubiks-timer-v18.6';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/manifest.json',
    '/icon.svg',
    '/aes.js',
    '/min2phase.js',
    '/three.min.js',
    '/echarts.min.js',
    '/cube-engine.js',
    '/alg-database.js',
    '/method-analyzer.js',
    '/chart-engine.js',
    '/gan-bluetooth.js',
    '/audio-synth.js',
    '/renderer-3d.js',
    '/renderer-2d.js',
    '/timer-engine.js',
    '/ui-controller.js'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    if (evt.request.method !== 'GET') return;

    // Robust offline fallback with ignoreSearch: true (handles query parameters like ?v=17.0)
    evt.respondWith(
        caches.match(evt.request, { ignoreSearch: true }).then((cachedResponse) => {
            const fetchPromise = fetch(evt.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(evt.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                if (cachedResponse) return cachedResponse;
                if (evt.request.mode === 'navigate') {
                    return caches.match('/index.html', { ignoreSearch: true });
                }
            });

            return cachedResponse || fetchPromise;
        })
    );
});
