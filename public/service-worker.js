// Kill switch for the service worker that react-scripts used to generate.
// Browsers with the old worker installed fetch this file on their update check:
// it takes over, drops the cached app and unregisters itself, so they get the new build.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach(client => client.navigate(client.url));
    })(),
  );
});
