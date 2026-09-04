// Service Worker for Rubik Vision Bluetooth Timer
const CACHE_NAME = 'rubiks-timer-v20.12';
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
