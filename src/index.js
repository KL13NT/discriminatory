import config from '../client.firebase.json'

import React, { Suspense, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Router from './router.jsx'
import ProfileAuthController from './ProfileAuthController.jsx'
import CompleteProfile from './views/components/CompleteProfile.jsx'
import PageError from './views/components/PageError'
import { initializeApp as initFirebase } from 'firebase'
import { createClient, Provider } from 'urql'
import { ToastContainer } from './components/Toast/Toast.jsx'
import { useAuth } from './stores/auth.js'
import { useProfile } from './stores/profile.js'
import { FullscreenLoader } from './components/Loading/LoadingPage'
import { IntlProvider } from 'react-intl'
import { useSettings } from './stores/settings'
import { useLocale } from './stores/locale'

import './style/base.global.sass'
import { Helmet } from 'react-helmet'

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

	const EnFonts = (
		<Helmet>
			<link
				href='https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
				rel='stylesheet'
			/>
			<link
				href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;900&display=swap'
				rel='stylesheet'
			/>
		</Helmet>
	)

	const ArFonts = (
		<Helmet>
			<link
				href='https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'
				rel='stylesheet'
			/>
		</Helmet>
	)

	return (
		<div dir={dir}>
			{dir === 'ltr' ? <EnFonts /> : <ArFonts />}
			{children}
		</div>
	)
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
