import config from '../client.firebase.json'

import firebase from 'firebase'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import Router from './router.jsx'
import ProfileAuthController from './ProfileAuthController.jsx'
import CompleteProfile from './views/components/CompleteProfile.jsx'
import { createClient, Provider } from 'urql'
import { LoadingPage } from './components/Loading/LoadingPage.jsx'
import { ToastContainer } from './components/Toast/Toast.jsx'
import { useAuth } from './stores/auth.js'
import { useProfile } from './stores/profile.js'

import './style/base.global.sass'

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
	return (
		<Provider value={graphql}>
			<Suspense fallback={<LoadingPage />}>
				<App />
			</Suspense>
		</Provider>
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

ReactDOM.render(<Wrappers />, root)
