import { auth } from '../../utils/firebase'
import { host } from 'config'

import React from 'react'

import Button from '../../components/Button/Button'
import Overlay from '../../components/Overlay/Overlay'

import { useToasts } from '../../components/Toast/Toast'
import { useAuth } from '../../stores/auth'
import { useIntl } from 'react-intl'

import ProfileEditor from './ProfileEditor'

function CompleteProfile() {
	const { add } = useToasts()
	const { user } = useAuth()
	const { formatMessage: f } = useIntl()

	const onClose = () =>
		add({
			text: f({ id: 'warnings.profilenotcomplete' }),
			type: 'danger'
		})

	const resend = e => {
		e.preventDefault()
		auth.currentUser
			.sendEmailVerification({
				url: host
			})
			.then(() => {
				auth.currentUser.getIdToken(true)

				add({
					text: f({ id: 'actions.resendverification.success' }),
					type: 'success'
				})
			})
			.catch(() => {
				add({
					text: f({ id: 'errors.general' }),
					type: 'danger'
				})
			})
	}

	const logout = () => {
		add({
			text: f({ id: 'actions.logout.progress' }),
			type: 'info'
		})

		auth
			.signOut()
			.then(() => {
				add({
					text: f({ id: 'actions.logout.success' }),
					type: 'success'
				})
			})
			.catch(() => {
				add({
					text: f({ id: 'actions.logout.error' }),
					type: 'error'
				})
			})
	}

	//TODO: MOVE ALL FIREBASE ACTIONS TO EXTERNAL UTILS FILE FOR REUSE

	return (
		<Overlay
			title={f({ id: 'general.title' })}
			subtitle={f({ id: 'general.subtitle' })}
			onClose={onClose}
		>
			<ProfileEditor create />
			<Button onClick={logout} variant='link'>
				{f({ id: 'actions.logout' })}
			</Button>

			{user && !user.emailVerified ? (
				<Button onClick={resend} variant='link'>
					{f({ id: 'actions.verify' })}
				</Button>
			) : null}
		</Overlay>
	)
}

export default CompleteProfile
