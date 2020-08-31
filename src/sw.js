/* eslint-env serviceworker */

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

const { api } = require('config')

try {
	// Static caching
	precacheAndRoute(self.__WB_MANIFEST || self.__precacheManifest || [])

	// API caching
	registerRoute(
		new RegExp(`${api}`),
		new NetworkFirst({
			cacheName: 'data',
			plugins: [
				new ExpirationPlugin({
					maxAgeSeconds: 10 * 60 // 10 minutes
				})
			]
		})
	)

	// Programmatic updates
	addEventListener('message', event => {
		if (event.data && event.data.type === 'SKIP_WAITING') {
			skipWaiting().catch(console.log)
		}
	})
} catch (err) {
	console.log(err)
}
