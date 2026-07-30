const CACHE_NAME = "muutoo-v22";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./src/styles.css",
  "./src/illustrations.css",
  "./src/results-gallery.css",
  "./src/daily.css",
  "./src/settings.css",
  "./src/release.css",
  "./src/app.js",
  "./src/daily.js",
  "./src/settings.js",
  "./src/share-card.js",
  "./src/result-artwork.js",
  "./src/mobile.js",
  "./src/audio.js",
  "./assets/icon.svg",
  "./assets/logo.svg",
  "./assets/zrzut_ekranu-krasula-mleczna-2-0.jpg",
  "./assets/png/cow-home.png",
  "./assets/webp/cow-home.webp",
  "./assets/webp/cow-question.webp",
  "./assets/webp/result-calm-cow.webp",
  "./assets/webp/result-pragmatist.webp",
  "./assets/webp/result-femitoxicy.webp",
  "./assets/webp/result-activist.webp",
  "./assets/webp/result-cowmander.webp",
  "./assets/webp/result-unhinged.webp",
  "./assets/audio/audio1.mp3",
  "./assets/audio/audio2.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});