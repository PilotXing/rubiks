// Service Worker for Rubik Vision Bluetooth Timer
const CACHE_NAME = 'rubiks-timer-v16.3';
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
    // Network-first with cache fallback
    evt.respondWith(
        fetch(evt.request).catch(() => caches.match(evt.request))
    );
});
