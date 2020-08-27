import { initializeApp as initFirebase } from 'firebase'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import {
	createClient,
	dedupExchange,
	cacheExchange,
	fetchExchange,
	Provider as GraphqlProvider
} from 'urql'
import { retryExchange } from '@urql/exchange-retry'

import config from '../client.firebase.json'

import InitialController from './views/controllers/InitialController.jsx'
import IntlController from './views/controllers/IntlController'
import StyleController from './views/controllers/StyleController'

import Router from './router.jsx'

import { FullscreenLoader } from './components/Loading/LoadingPage'
import { ErrorBoundaryPage } from './components/Errors/PageError'
import { ToastContainer } from './components/Toast/Toast.jsx'
import { OverlayComposer } from './components/Composer/Composer'

import { useAuth } from './stores/auth.js'

import './style/base.global.sass'
import { useProfile } from './stores/profile'

/**
 * GraphQL & Firebase Initialisation
 */
initFirebase(config)
const graphql = createClient({
	url: `http://${process.env.api}/graphql`,
	fetchOptions: () => {
		const token = localStorage.getItem('AUTH_ID_TOKEN')
		return {
			headers: { authorization: token ? `Bearer ${token}` : '' }
		}
	},
	exchanges: [
		dedupExchange,
		cacheExchange,
		retryExchange({
			retryIf: err => err && err.networkError
		}), // Use the retryExchange factory to add a new exchange
		fetchExchange
	]
})

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then(registration => {
				console.log('SW registered: ', registration)
			})
			.catch(registrationError => {
				console.log('SW registration failed: ', registrationError)
			})
	})
}

const root = document.querySelector('#root')

if (process.env.NODE_ENV !== 'production') {
	const axe = require('react-axe')
	axe(React, ReactDOM, 1000)
}

function App() {
	const { user } = useAuth()
	const { profile } = useProfile()
	//TODO: add notifications banner

	return (
		<ErrorBoundaryPage>
			<StyleController>
				<GraphqlProvider value={graphql}>
					<IntlController>
						<InitialController>
							<Suspense fallback={<FullscreenLoader />}>
								<ToastContainer />
								<Router user={user} profile={profile} />
								<OverlayComposer />
							</Suspense>
						</InitialController>
					</IntlController>
				</GraphqlProvider>
			</StyleController>
		</ErrorBoundaryPage>
	)
}

ReactDOM.render(<App />, root)
