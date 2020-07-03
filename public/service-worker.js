importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([{
    url: '/',
    revision: '1'
  }, {
    url: '/manifest.json',
    revision: '1'
  }, {
    url: '/register-sw.js',
    revision: '1'
  }, {
    url: '/fball-logo.ico',
    revision: '1'
  }, {
    url: '/nav.html',
    revision: '1'
  }, {
    url: '/index.html',
    revision: '1'
  }, {
    url: '/team.html',
    revision: '1'
  }, {
    url: '/pages/home.html',
    revision: '1'
  }, {
    url: '/assets/css/materialize.min.css',
    revision: '1'
  }, {
    url: '/assets/css/style.css',
    revision: '1'
  }, {
    url: '/assets/css/material-icons.css',
    revision: '1'
  }, {
    url: '/assets/css/preloader.css',
    revision: '1'
  }, {
    url: '/assets/js/materialize.min.js',
    revision: '1'
  }, {
    url: '/assets/js/api.js',
    revision: '1'
  }, {
    url: '/assets/js/db.js',
    revision: '1'
  }, {
    url: '/assets/js/idb.js',
    revision: '1'
  }, {
    url: '/assets/js/nav.js',
    revision: '1'
  }, {
    url: '/assets/js/for-teams.js',
    revision: '1'
  }, {
    url: '/assets/js/for-index.js',
    revision: '1'
  }, {
    url: '/assets/js/jquery-3.4.1.min.js',
    revision: '1'
  }, {
    url: '/assets/js/preloader.js',
    revision: '1'
  }, {
    url: '/assets/fonts/MaterialIcons-Regular.woff2',
    revision: '1'
  }, {
    url: '/assets/fonts/MaterialIcons-Regular.woff',
    revision: '1'
  }, {
    url: '/assets/fonts/MaterialIcons-Regular.ttf',
    revision: '1'
  }, {
    url: '/assets/fonts/MaterialIcons-Regular.eot',
    revision: '1'
  }, {
    url: '/assets/images/icons/icon-72x72.png',
    revision: '1'
  }, {
    url: '/assets/images/icons/icon-96x96.png',
    revision: '1'
  }, {
    url: '/assets/images/icons/icon-128x128.png',
    revision: '1'
  }, {
    url: '/assets/images/icons/icon-144x144.png',
    revision: '1'
  }, {
    url: '/assets/images/icons/icon-152x152.png',
    revision: '1'
  }, {
    url: '/assets/images/icons/icon-192x192.png',
    revision: '1'
  }, {
    url: '/assets/images/icons/icon-384x384.png',
    revision: '1'
  }, {
    url: '/assets/images/icons/icon-512x512.png',
    revision: '1'
  }, {
    url: '/assets/images/2000.jpg',
    revision: '1'
  }, {
    url: '/assets/images/2001.jpg',
    revision: '1'
  }, {
    url: '/assets/images/2021.jpg',
    revision: '1'
  }, {
    url: '/assets/images/soccerball.jpg',
    revision: '1'
  }, {
    url: '/assets/images/favorite-soccer.jpg',
    revision: '1'
  }, {
    url: '/assets/sweetalert2/sweetalert2.all.min.js',
    revision: '1'
  }, {
    url: '/assets/sweetalert2/sweetalert2.min.js',
    revision: '1'
  }, {
    url: '/assets/sweetalert2/sweetalert2.min.css',
    revision: '1'
  }], {
    ignoreUrlParametersMatching: [/.*/]
  });


  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );


  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "api-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );

} else {
  console.log(`Workbox gagal dimuat`);
}

// menerima push notification
self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    badge: '/assets/images/icons/icon-192x192.png',
    icon: '/assets/images/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});