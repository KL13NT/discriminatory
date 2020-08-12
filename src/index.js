import config from '../client.firebase.json'

import firebase from 'firebase'
import React, { Suspense, useEffect, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Router from './router.jsx'
import ProfileAuthController from './ProfileAuthController.jsx'
import CompleteProfile from './views/components/CompleteProfile.jsx'
import PageError from './views/components/PageError'
import { createClient, Provider } from 'urql'
import { ToastContainer } from './components/Toast/Toast.jsx'
import { useAuth } from './stores/auth.js'
import { useProfile } from './stores/profile.js'
import { FullscreenLoader } from './components/Loading/LoadingPage'
import { IntlProvider } from 'react-intl'
import { useSettings } from './stores/settings'

/**
 * Global Styling
 */
import './style/base.global.sass'
import { useLocale } from './stores/locale'
import Banner from './components/Banner/Banner'
import { useLocation } from 'react-router-dom'

/**
 * GraphQL & Firebase Initialisation
 */
firebase.initializeApp(config)
const graphql = createClient({
	url: `http://${process.env.api}/graphql`,
	fetchOptions: () => {
		const token = localStorage.getItem('AUTH_ID_TOKEN')
		return {
			headers: { authorization: token ? `Bearer ${token}` : '' }
		}
	}
})

const root = document.querySelector('#root')

if (process.env.NODE_ENV !== 'production') {
	const axe = require('react-axe')
	axe(React, ReactDOM, 1000)
}

function Wrappers() {
	const { settings } = useSettings()
	const { locales, messages, updateMessages } = useLocale()

	const fetchAndUpdateLocale = useCallback(path => {
		fetch(path)
			.then(res => res.json())
			.then(messages => {
				updateMessages(messages)
				console.log('MESSAGESS', messages)
			})
			.catch(console.log)
	}, []) // eslint-disable-line

	useEffect(() => {
		fetchAndUpdateLocale(locales[settings.display.language.selected.locale])
	}, [fetchAndUpdateLocale, locales, settings.display.language])

	if (!messages) return <FullscreenLoader loading={true} />
	return (
		<PageError>
			<Provider value={graphql}>
				<Suspense fallback={<FullscreenLoader loading={true} />}>
					<IntlProvider
						locale={settings.display.language.selected.locale}
						messages={messages}
					>
						<LanguageWrapper>
							<App />
						</LanguageWrapper>
					</IntlProvider>
				</Suspense>
			</Provider>
		</PageError>
	)
}

function LanguageWrapper({ children }) {
	const { settings } = useSettings()
	const { dir } = settings.display.language.selected

	return <div dir={dir}>{children}</div>
}

function App() {
	const { user } = useAuth()
	const { profile } = useProfile()

	return (
		<>
			<ToastContainer />
			<Router user={user} />
			<ProfileAuthController />
			{user && !profile ? <CompleteProfile /> : null}
		</>
	)
}

ReactDOM.render(
	<PageError>
		<Wrappers />
	</PageError>,
	root
)
