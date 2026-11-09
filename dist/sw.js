// Service worker for the docs site. build.js generates dist/sw.js from this file
// by filling in two values below: the cache name (docs-<version>-<hash of every
// precached file>, so any change to the site produces a new cache and a new
// worker) and the list of files that make the site work offline.
//
// Strategy:
//   pages          network first (a new release shows up immediately when online),
//                  falling back to the cache when offline or slow
//   own assets     stale-while-revalidate (instant, refreshed in the background)
//   CDN assets     stale-while-revalidate too (fonts, highlight.js)
//   version.json   never touched — it reports which release is running

const CACHE = 'docs-1.1.0-8765f047';
const PRECACHE = [
  "./",
  "index.html",
  "repository-pattern.html",
  "options-pattern.html",
  "api-response.html",
  "jwt-auth.html",
  "cookie-auth.html",
  "exception-middleware.html",
  "webhooks.html",
  "permissions-roles.html",
  "view-only-guard.html",
  "blazor-auth-state.html",
  "http-service.html",
  "toast-notifications.html",
  "blazor-js-interop.html",
  "blazor-confirm-dialog.html",
  "angular-auth.html",
  "angular-http-service.html",
  "winforms-app.html",
  "mapping-validation.html",
  "in-memory-caching.html",
  "background-jobs.html",
  "email-confirmation.html",
  "automation-worker.html",
  "composable-repositories.html",
  "audit-logging.html",
  "pagination-pattern.html",
  "database-migrations.html",
  "docker-nginx.html",
  "docker-local-dev.html",
  "ci-pipeline.html",
  "versioning-releases.html",
  "release-pipeline.html",
  "release-notes-app-version.html",
  "cli-tool.html",
  "json-serialization.html",
  "unit-testing-moq.html",
  "elo-rating-system.html",
  "stock-allocation.html",
  "shift-scheduling.html",
  "assets/main.css",
  "assets/main.js",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/icon.svg",
  "manifest.webmanifest"
];
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('docs-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function fetchWithTimeout(request, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetchWithTimeout(request, NETWORK_TIMEOUT_MS);
    // a redirected response can't be served for a navigation, so don't store one
    if (response.ok && !response.redirected) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (
      (await cache.match(request, { ignoreSearch: true })) ||
      (await cache.match('index.html')) ||
      Response.error()
    );
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      // opaque (cross-origin, no-cors) responses are fine to keep: fonts and scripts
      if (response.ok || response.type === 'opaque') cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);
  return cached || (await refresh) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin === self.location.origin && url.pathname.endsWith('/version.json')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
