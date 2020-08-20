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

function ProfileAuthController({ children }) {
	const { user, setUser, clear: clearAuth } = useAuth()
	const { profile, update, clear: clearProfile } = useProfile()
	const { load, finish } = useFullscreenLoader()
	const { formatMessage: f } = useIntl()
	const { add } = useToasts()

	const [response, reloadProfile] = useQuery({
		query: accountQuery,
		pause: !user
	})

	useEffect(() => {
		finish('Authenticating')

		if (response.fetching) load('Loading your profile')
		else if (response.data && response.data.account) {
			update({ ...response.data.account })
			finish('Loading your profile')
		} else if (response.error) {
			finish('Loading your profile')
			add({ text: f({ id: 'errors.general' }), type: 'danger' })
		}
	}, [response, load, finish, update, add, f])

	useEffect(() => {
		if (user) reloadProfile()
	}, [user, reloadProfile])

	useEffect(() => {
		const { data } = response

		if (!data || !data.account) return

		update(data.account)
	}, [response, update])

	useEffect(() => {
		load('Authenticating')
		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				clearAuth()
				clearProfile()
				return
			}

			setUser(user)

			user
				.getIdToken(true)
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

	return (
		<>
			{user && !profile ? <CompleteProfile /> : null}
			{children}
		</>
	)
}

export default ProfileAuthController
