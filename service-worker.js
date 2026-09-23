const CACHE_NAME = 'maiz-calc-v1';
const APP_RESOURCES = [
  './',
  './index.html',
  './vendor/bootstrap.min.css',
  './vendor/bootstrap.bundle.min.js',
  './icons/bootstrap-icons.min.css',
  './icons/fonts/bootstrap-icons.woff2'
];

// Al instalar, guarda en caché todos los archivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_RESOURCES))
  );
});

// Al activar, limpia cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    )
  );
});

// Intercepta peticiones: primero caché, si no hay, va a la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});