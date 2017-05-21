import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

(function() {
	if('serviceWorker' in navigator){
		navigator.serviceWorker
			.register('./service-worker.js')
			.then(function(res) {
				// console.log('Service Worker Registered', res); 
		}).catch(function(err){
			// console.log('ServiceWorker registration failed', err);
		});
	}
})();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
