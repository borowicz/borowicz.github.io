const CACHE_NAME = "shortcuts-pwa-v3";
const REPO_BASE = "/borowicz.github.io";
const APP_BASE = `${REPO_BASE}/html/shortcuts`;

const URLS_TO_CACHE = [
    `${APP_BASE}/`,
    `${APP_BASE}/shortcuts.html`,
    `${APP_BASE}/manifest.webmanifest`,
    `${APP_BASE}/icon-192.png`,
    `${APP_BASE}/icon-512.png`,
    `${APP_BASE}/apple-touch-icon.png`,
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request)
                .then((networkResponse) => {
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }

                    const responseClone = networkResponse.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });

                    return networkResponse;
                })
                .catch(() => caches.match(`${APP_BASE}/shortcuts.html`))
        })
    );
});