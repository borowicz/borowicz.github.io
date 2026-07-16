/* myCar PWA service worker */
/* eslint-disable no-restricted-globals */

const CACHE_VERSION = 'mycar-v3';
const DATA_CACHE = 'mycar-data-v1';
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
        /* CDN optional at install */
      }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([CACHE_VERSION, CDN_CACHE, DATA_CACHE]);
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  if (url.href === CHART_CDN || url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(staleWhileRevalidate(req, CDN_CACHE));
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Uploaded/saved XML datasets
  if (url.pathname.includes('/cached-data/')) {
    event.respondWith(cacheFirst(req, DATA_CACHE));
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

self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (msg.type === 'CACHE_XML' && msg.hash && msg.xml != null) {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(DATA_CACHE);
        const url = new URL('./cached-data/' + msg.hash + '.xml', self.location.href)
          .href;
        await cache.put(
          url,
          new Response(msg.xml, {
            headers: {
              'Content-Type': 'text/xml; charset=utf-8',
              'X-MyCar-Source': msg.source || 'data.xml',
            },
          })
        );
      })()
    );
  }
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
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
    if (res && res.ok) cache.put(req, res.clone());
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
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);

  if (cached) {
    networkPromise.catch(() => {});
    return cached;
  }
  const res = await networkPromise;
  if (res) return res;
  throw new Error('CDN offline and not cached');
}
