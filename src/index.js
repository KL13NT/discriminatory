import client from 'firebase'
import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { createClient, Provider, useMutation, useQuery } from 'urql'

import('./style/base.global.sass')

import Router from './router.jsx'
import { LoadingPage } from './components/Loading/LoadingPage.jsx'
import { ToastContainer } from './components/Toast/Toast.jsx'

import config from '../client.firebase.json'
import { useAuth } from './stores/auth.js'
import { useToasts } from './components/Toast/Toast.jsx'
import { useProfile } from './stores/profile.js'
import CompleteProfile from './views/components/CompleteProfile.jsx'

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
	const { profile, update } = useProfile()

	const [response, reexecuteQuery] = useQuery({
		query: `
			query ($id: String!){
				profile(id: $id) {
					id
					displayName
					email
					location
					dateofbirth
					tagline
				}
			}
	`,
		variables: {
			id: user ? user.uid : null
		},
		pause: !user
	})

	useEffect(() => {
		const { data, fetching, error } = response

		if (!data || !data.profile) return

		const newProfile = {
			email: data.profile.email,
			uid: data.profile.uid,
			displaName: data.profile.name,
			dateofbirth: data.profile.dateofbirth,
			location: data.profile.location,
			tagline: data.profile.tagline
		}

		update(newProfile)
	}, [response, update])

	useEffect(() => {
		client.auth().onAuthStateChanged(user => {
			if (!user) return

			setUser(user)

			if (!user.emailVerified)
				return add({
					type: 'danger',
					text: 'Verify your email to use the service'
				})

			reexecuteQuery()
		})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Provider value={graphql}>
			<Suspense fallback={<LoadingPage />}>
				<ToastContainer />
				<Router user={user} />
				{!profile ? <CompleteProfile /> : null}
			</Suspense>
		</Provider>
	)
}

ReactDOM.render(<App />, root)
