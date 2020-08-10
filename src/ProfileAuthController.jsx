import firebase from 'firebase'
import React, { useEffect } from 'react'
import { useQuery } from 'urql'
import { useAuth } from './stores/auth.js'
import { useToasts } from './components/Toast/Toast.jsx'
import { useProfile } from './stores/profile.js'
import { FullscreenLoader } from './components/Loading/LoadingPage'

export default function ProfileAuthController() {
	const { user, setUser } = useAuth()
	const { add } = useToasts()
	const { profile, update } = useProfile()

	const [response, reloadProfile] = useQuery({
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
		pause: !user || (profile && user)
	})

	useEffect(() => {
		reloadProfile()
	}, [user])

	useEffect(() => {
		const { data } = response

		if (!data || !data.profile) return

		update(data.profile)
	}, [response, update])

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (!user) return

			setUser(user)

			user
				.getIdToken()
				.then(token => {
					localStorage.setItem('AUTH_ID_TOKEN', token)
				})
				.catch(err =>
					add({
						text: `Failed to properly authenticate, sign in again to fix it or try again later. ${err.message}`,
						type: 'danger'
					})
				)

			if (!user.emailVerified)
				return add({
					type: 'danger',
					text: 'Verify your email to use the service'
				})
		})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return <FullscreenLoader loading={!user} />
}
