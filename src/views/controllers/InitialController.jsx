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

	console.log(active, active.length)

	if (active.length > 0)
		return <FullscreenLoader>{active[active.length - 1].name}</FullscreenLoader>

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
			update({ ...response.data.account })
			finish('Loading your profile')
			finish('Authenticating')
		} else if (response.error) {
			finish('Loading your profile')
			finish('Authenticating')
			add({ text: f({ id: 'errors.general' }), type: 'danger' })
		}
	}, [response, load, finish, update, add, f])

	useEffect(() => {
		const { data } = response

		if (!data || !data.account) return

		update(data.account)
	}, [response, update])

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				clearAuth()
				clearProfile()
				finish('Authenticating')
				return
			}

			user
				.getIdToken(true)
				.then(token => {
					localStorage.setItem('AUTH_ID_TOKEN', token)
				})
				.catch(err => {
					console.log('COPY THIS WHEN REPORING', err)
					add({
						text: f({ id: 'errors.verify' }),
						type: 'danger'
					})
				})
				.finally(() => {
					setUser(user)
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
