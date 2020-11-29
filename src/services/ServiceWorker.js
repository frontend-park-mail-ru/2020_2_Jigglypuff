import Routes from 'consts/Routes';

const CACHE_NAME = 'CinemaScope_serviceWorker_2020_2-v2';

const cacheUrls = [
    '/',
    '/index.html',
    '/static/noInternet.html',
    '/static/index.js',
    '/static/sw.js',
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

    if ((event.request.method === 'GET') &&
        !(event.request.url.includes(Routes.HostAPI))) {
        event.respondWith(
            caches
                .match(event.request, {cacheName: CACHE_NAME, ignoreVary: true})
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(event.request);
                })
                .catch(() => {
                    return caches.match('/static/noInternet.html');
                }),
        );
    }
});
