import config from 'config'

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

const graphql = createClient({
	url: config.api,
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

const root = document.querySelector('#root')

if (process.env.NODE_ENV !== 'production') {
	const axe = require('react-axe')
	axe(React, ReactDOM, 1000)
}

function App() {
	const { user } = useAuth()
	const { profile } = useProfile()

	return (
		<ErrorBoundaryPage>
			<StyleController>
				<IntlController>
					<GraphqlProvider value={graphql}>
						<InitialController>
							<Suspense fallback={<FullscreenLoader />}>
								<ToastContainer />
								<Router user={user} profile={profile} />
								<OverlayComposer />
							</Suspense>
						</InitialController>
					</GraphqlProvider>
				</IntlController>
			</StyleController>
		</ErrorBoundaryPage>
	)
}

ReactDOM.render(<App />, root)
