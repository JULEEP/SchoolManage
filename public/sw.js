const CACHE_NAME = "school-app-cache-v1";
const urlsToCache = ["/", "/index.html", "/static/js/bundle.js"];

// Install Event → Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Caching Files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Event → Cached Response Ya Network Se Data Lena
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Service Worker Se Message Send Karna
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_BUTTON") {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: "ADD_BUTTON" });
      });
    });
  }
});
