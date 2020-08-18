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

import ProfileAuthController from './views/controllers/ProfileAuthController.jsx'
import IntlController from './views/controllers/IntlController'

import Router from './router.jsx'

import { FullscreenLoader } from './components/Loading/LoadingPage'
import { ErrorBoundaryPage } from './components/Errors/PageError'
import { ToastContainer } from './components/Toast/Toast.jsx'

import { useAuth } from './stores/auth.js'
import { useFullscreenLoader } from './stores/loading'

import './style/base.global.sass'

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
			retryIf: err => err
		}), // Use the retryExchange factory to add a new exchange
		fetchExchange
	]
})

const root = document.querySelector('#root')

if (process.env.NODE_ENV !== 'production') {
	const axe = require('react-axe')
	axe(React, ReactDOM, 1000)
}

function Wrappers() {
	return (
		<ErrorBoundaryPage>
			<GraphqlProvider value={graphql}>
				<IntlController>
					<ProfileAuthController>
						<Suspense fallback={<FullscreenLoader />}>
							<App />
						</Suspense>
					</ProfileAuthController>
				</IntlController>
			</GraphqlProvider>
		</ErrorBoundaryPage>
	)
}

function App() {
	const { user } = useAuth()
	const { active } = useFullscreenLoader()

	if (active.length > 0)
		return <FullscreenLoader>{active[0].name}</FullscreenLoader>

	return (
		<>
			<ToastContainer />
			<Router user={user} />
		</>
	)
}

ReactDOM.render(<Wrappers />, root)
