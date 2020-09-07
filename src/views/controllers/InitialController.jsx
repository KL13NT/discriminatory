import { auth } from '../../utils/firebase'

import { Workbox } from 'workbox-window'
import React, { useEffect } from 'react'
import { useQuery } from 'urql'

import { useIntl, FormattedMessage } from 'react-intl'
import { useAuth } from '../../stores/auth.js'
import { useProfile } from '../../stores/profile.js'
import { useToasts } from '../../components/Toast/Toast.jsx'
import { useFullscreenLoader } from '../../stores/loading.js'

import CompleteProfile from '../components/CompleteProfile.jsx'

import { accountQuery } from '../../queries/profiles.js'
import { FullscreenLoader } from '../../components/Loading/LoadingPage.jsx'
import { useState } from 'react'
import Banner from '../../components/Banner/Banner'
import Button from '../../components/Button/Button'
import { getApolloErrorCode } from '../../utils/general'

const wb = new Workbox('/sw.js')

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
	const [hasUpdate, setHasUpdate] = useState()

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
			const code = getApolloErrorCode(response.error)
			if (code !== 'NOT_FOUND') {
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
		if (user && user.emailVerified) reloadProfile()
	}, [reloadProfile, user])

	useEffect(() => {
		auth.onAuthStateChanged(user => {
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

	//TODO: move this to a 'versions' controllers
	useEffect(() => {
		if (typeof navigator.serviceWorker !== 'undefined' && wb) {
			const wait = () => setHasUpdate(true)

			const load = () => {
				wb.register()
				wb.addEventListener('waiting', wait)
			}

			window.addEventListener('load', load)

			return () => {
				wb.removeEventListener('waiting', wait)
				wb.removeEventListener('load', load)
			}
		}
	}, [])

	const updateApp = () => {
		// Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
		wb.addEventListener('controlling', () => {
			window.location.reload()
		})

		// Send a message telling the service worker to skip waiting.
		// This will trigger the `controlling` event handler above.
		wb.messageSW({
			type: 'SKIP_WAITING'
		})
	}

	return (
		<Renderer>
			{hasUpdate ? (
				<Banner position='top' size='tiny' center integrated>
					<FormattedMessage id='banners.update.subtitle' />{' '}
					<Button variant='link' onClick={updateApp}>
						<FormattedMessage id='actions.update' />
					</Button>
				</Banner>
			) : null}
			{user && !profile ? <CompleteProfile /> : null}
			{children}
		</Renderer>
	)
}

export default InitialController
