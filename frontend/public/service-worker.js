self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open("träna").then(function(cache) {
            return cache.addAll(
                [
                '/',
                '/appicon.png',
                '/favicon.png',
                '/logo_backdrop.jpg',
                '/index.html',
                '/Gidolinya-Regular.otf',
                '/Virtuous-Slab.otf',
                '/Virtuous-Slab-Bold.otf',
                '/Virtuous-Slab-Thin.otf',
                '/manifest.json',
                '/service-worker.js',
                '/left-arrow.png',
                '/right-arrow.png',
                '/add.png',
                '/share.png',
                '/delete.png',
                '/return.png',
                '/edit.png',
                '/style.css',
                '/build/bundle.js'
                ]
            );
        })
    );
});

// Fall back to local cache strategy
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});