import client from 'firebase'
import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { createClient, Provider } from 'urql'

import('./style/base.global.sass')

import Router from './router.jsx'
import { LoadingPage } from './components/Loading/LoadingPage.jsx'
import { ToastContainer } from './components/Toast/Toast.jsx'

import config from '../client.firebase.json'
import { useAuth } from './stores/auth.js'
import { useToasts } from './components/Toast/Toast.jsx'

client.initializeApp(config)
const graphql = createClient({ url: `http://${process.env.api}/graphql` })

const root = document.querySelector('#root')

if (process.env.NODE_ENV !== 'production') {
	const axe = require('react-axe')
	axe(React, ReactDOM, 1000)
}

function App() {
	const { user, setUser } = useAuth()
	const { add } = useToasts()

	useEffect(() => {
		client.auth().onAuthStateChanged(user => {
			if (!user) return

			setUser(user)

			if (!user.emailVerified)
				add({ type: 'danger', text: 'Verify your email to use the service' })
		})
	}, [])

	return (
		<Provider value={graphql}>
			<Suspense fallback={<LoadingPage />}>
				<ToastContainer />
				<Router user={user} />
			</Suspense>
		</Provider>
	)
}

ReactDOM.render(<App />, root)
