// Service Worker for Rubik Vision Bluetooth Timer
const CACHE_NAME = 'rubiks-timer-v19.3';
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

    // For HTML navigation requests: Network-First to immediately pick up new versions, fallback to Cache
    if (evt.request.mode === 'navigate' || evt.request.destination === 'document' || evt.request.url.endsWith('index.html') || evt.request.url.endsWith('/')) {
        evt.respondWith(
            fetch(evt.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(evt.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                return caches.match('/index.html', { ignoreSearch: true }) || caches.match(evt.request, { ignoreSearch: true });
            })
        );
        return;
    }

    // For other static assets (JS, CSS, images): Stale-While-Revalidate / Cache-First
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
            });

            return cachedResponse || fetchPromise;
        })
    );
});
