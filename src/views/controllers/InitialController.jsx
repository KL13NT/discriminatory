import firebase from 'firebase'

import React, { useEffect } from 'react'
import { useQuery } from 'urql'

import { useIntl } from 'react-intl'
import { useAuth } from '../../stores/auth.js'
import { useProfile } from '../../stores/profile.js'
import { useToasts } from '../../components/Toast/Toast.jsx'
import { useFullscreenLoader } from '../../stores/loading.js'

import CompleteProfile from '../components/CompleteProfile.jsx'

import { accountQuery } from '../../queries/profiles.js'
import { FullscreenLoader } from '../../components/Loading/LoadingPage.jsx'

function Renderer({ children }) {
	const { active } = useFullscreenLoader()

	if (active.length > 0) return <FullscreenLoader />

	return children
}

function InitialController({ children }) {
	const { user, setUser, clear: clearAuth } = useAuth()
	const { profile, update, clear: clearProfile } = useProfile()
	const { load, finish } = useFullscreenLoader()
	const { formatMessage: f } = useIntl()
	const { add } = useToasts()

	const [response, reloadProfile] = useQuery({
		query: accountQuery,
		pause: !user || (user && !user.emailVerified)
	})

	useEffect(() => {
		if (response.fetching) load('Loading your profile')
		else if (response.data && response.data.account) {
			update({
				...response.data.account,
				dateofbirth: new Date(response.data.account)
			})
			finish('Loading your profile')
			finish('Authenticating')
		}
	}, [response, load, finish, update, add, f])

	useEffect(() => {
		if (response.error) {
			if (response.error.graphQLErrors[0].extensions.code !== 'NOT_FOUND') {
				clearAuth()
				clearProfile()
				finish('Loading your profile')
				finish('Authenticating')
				add({ text: f({ id: 'errors.general' }), type: 'danger' })
			} else {
				finish('Loading your profile')
				finish('Authenticating')
			}
		}
	}, [add, clearAuth, clearProfile, f, finish, response.error])

	useEffect(() => {
		console.log(user)
		if (user && user.emailVerified) reloadProfile()
	}, [reloadProfile, user])

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			console.log(user)
			if (!user) {
				clearAuth()
				clearProfile()
				finish('Authenticating')
				return
			}

			user
				.getIdToken(true)
				.then(token => {
					setUser(user)
					localStorage.setItem('AUTH_ID_TOKEN', token)
				})
				.catch(err => {
					console.log('COPY THIS WHEN REPORING', err)
					clearAuth()
					clearProfile()
					add({
						text: f({ id: 'errors.verify' }),
						type: 'danger'
					})
				})
				.finally(() => {
					finish('Authenticating')
				})

			if (!user.emailVerified)
				return add({
					type: 'danger',
					text: f({ id: 'errors.verify' })
				})
		})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Renderer>
			{user && !profile ? <CompleteProfile /> : null}
			{children}
		</Renderer>
	)
}

export default InitialController
