const CACHE_NAME = 'CinemaScope_serviceWorker_2020_2-v1';

const cacheUrls = [
    '/',
    '/index.html',
    '/static/index.js',
    '/static/img/favicon.svg',
    '/static/img/logo.png',
    '/static/img/NoAvatar.jpg',
    '/static/img/ticket.svg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
            .catch((err) => {
                console.error('failed to open caches: ', err);
            }),
    );
});

self.addEventListener('fetch', (event) => {
    if (navigator.onLine) {
        return fetch(event.request);
    }

    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
            .catch((err) => {
                console.error('failed to match caches: ', err);
            }),
    );
});
