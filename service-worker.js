var version = 1;
var cacheName = 'tic-tac-toe-v' + version;
var dataCacheName = 'tic-tac-toe-appData-v' + version;
var filesToCache = [
	'./',
	'./index.html',
	'./favicon.ico',
	'./img/tic-tac-toe.png',
	'./img/tic-tac-toe-128x128.png',
	'./img/tic-tac-toe-144x144.png',
	'./img/tic-tac-toe-152x152.png',
	'./img/tic-tac-toe-192x192.png',
	'./img/tic-tac-toe-256x256.png',
	'./fonts/shojumaru-regular.eot',
	'./fonts/shojumaru-regular.ttf',
	'./fonts/shojumaru-regular.woff',
	'./fonts/shojumaru-regular.woff2',
];

self.addEventListener('install', function(e){
	console.log('[ServiceWorker] install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache){
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function(e){
	console.log('[ServiceWorker] Activated');
	e.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all(keyList.map(function(key){
				if(key !== changeName && key !== dataCacheName){
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});
