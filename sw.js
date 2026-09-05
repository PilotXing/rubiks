// Service Worker for Rubik Vision Bluetooth Timer
const CACHE_NAME = 'rubiks-timer-v20.25';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css?v=20.25',
    '/manifest.json',
    '/icon.svg',
    '/icon-192.png',
    '/icon-512.png',
    '/lib/aes.js?v=20.24',
    '/lib/min2phase.js?v=20.24',
    '/lib/three.min.js?v=20.24',
    '/lib/echarts.min.js?v=20.24',
    '/src/bluetooth/gan-bluetooth.js?v=20.24',
    '/src/audio/audio-synth.js?v=20.24',
    '/src/core/cube-engine.js?v=20.24',
    '/src/core/alg-database.js?v=20.24',
    '/src/core/method-analyzer.js?v=20.24',
    '/src/core/timer-engine.js?v=20.24',
    '/src/renderers/renderer-3d.js?v=20.24',
    '/src/renderers/renderer-2d.js?v=20.24',
    '/src/ui/chart-engine.js?v=20.24',
    '/src/ui/ui-controller.js?v=20.24'
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

    const url = new URL(evt.request.url);
    const isCodeAsset = evt.request.mode === 'navigate' ||
                        evt.request.destination === 'document' ||
                        url.pathname.endsWith('.html') ||
                        url.pathname.endsWith('.js') ||
                        url.pathname.endsWith('.css') ||
                        url.pathname.endsWith('/');

    // For Code Assets (HTML, JS, CSS): Network-First to immediately apply updates, fallback to Cache when offline
    if (isCodeAsset) {
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
                return caches.match(evt.request) || caches.match('/index.html', { ignoreSearch: true });
            })
        );
        return;
    }

    // For static images / media: Cache-First, fallback to Network
    evt.respondWith(
        caches.match(evt.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return fetch(evt.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(evt.request, responseToCache);
                    });
                }
                return networkResponse;
            });
        })
    );
});
