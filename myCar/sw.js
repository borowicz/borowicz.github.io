/* myCar PWA service worker */
/* eslint-disable no-restricted-globals */

const CACHE_VERSION = 'mycar-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './m.xml',
  './assets/app.js',
  './assets/style.css',
  './assets/i18n.js',
  './assets/mycar-data.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

const CDN_CACHE = 'mycar-cdn-v1';
const CHART_CDN =
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(APP_SHELL);
      try {
        const cdn = await caches.open(CDN_CACHE);
        await cdn.add(CHART_CDN);
      } catch (_) {
        // CDN optional at install; runtime will retry
      }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== CACHE_VERSION && k !== CDN_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

/**
 * Same-origin: network-first for navigation/HTML & XML data,
 * cache-first for hashed static assets (app shell).
 * CDN: stale-while-revalidate.
 */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Chart.js CDN
  if (url.href === CHART_CDN || url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(staleWhileRevalidate(req, CDN_CACHE));
    return;
  }

  // Only handle same-origin for app shell
  if (url.origin !== self.location.origin) {
    return;
  }

  const path = url.pathname;
  const isNav = req.mode === 'navigate';
  const isHtml = path.endsWith('.html') || path.endsWith('/') || path === '';
  const isData = path.endsWith('.xml') || path.endsWith('.webmanifest');

  if (isNav || isHtml || isData) {
    event.respondWith(networkFirst(req, CACHE_VERSION));
    return;
  }

  event.respondWith(cacheFirst(req, CACHE_VERSION));
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const fallback = await cache.match('./index.html');
    if (fallback) return fallback;
    throw err;
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const cached =
      (await cache.match(req, { ignoreSearch: true })) ||
      (await cache.match('./index.html'));
    if (cached) return cached;
    throw err;
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const networkPromise = fetch(req)
    .then((res) => {
      if (res && res.ok) {
        cache.put(req, res.clone());
      }
      return res;
    })
    .catch(() => null);

  if (cached) {
    // fire-and-forget background update
    networkPromise.catch(() => {});
    return cached;
  }
  const res = await networkPromise;
  if (res) return res;
  throw new Error('CDN offline and not cached');
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
