var version = "0.2.1";
var cacheName = 'tic-tac-toe-v' + version;
var dataCacheName = 'tic-tac-toe-appData-v' + version;
var filesToCache = [
	'./',
	'./index.html',
	'./favicon.ico',
	'./img/tic-tac-toe.png',
	'./fonts/shojumaru-regular.eot',
	'./fonts/shojumaru-regular.ttf',
	'./fonts/shojumaru-regular.woff',
	'./fonts/shojumaru-regular.woff2',
];

self.addEventListener('install', function(e){
	// console.log('[ServiceWorker] install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache){
			// console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function(e){
	// console.log('[ServiceWorker] Activated');
	e.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all(keyList.map(function(key){
				if(key !== cacheName && key !== dataCacheName){
					// console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});
