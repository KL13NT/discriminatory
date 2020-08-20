import firebase from 'firebase'
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
			text: f({ id: 'labels.profileNotComplete' }),
			type: 'danger'
		})

	const resend = e => {
		e.preventDefault()
		firebase
			.auth()
			.currentUser.sendEmailVerification()
			.then(() => {
				firebase.auth().currentUser.getIdToken(true)

				add({
					text: f({ id: 'account.verification.resend.success' }),
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
			text: f({ id: 'logout.progress' }),
			type: 'info'
		})

		firebase
			.auth()
			.signOut()
			.then(() => {
				add({
					text: f({ id: 'logout.success' }),
					type: 'success'
				})
			})
			.catch(() => {
				add({
					text: f({ id: 'logout.error' }),
					type: 'error'
				})
			})
	}

	return (
		<Overlay
			title={f({ id: 'labels.title' })}
			subtitle={f({ id: 'labels.subtitle' })}
			onClose={onClose}
		>
			<ProfileEditor />
			<Button onClick={logout} variant='link'>
				{f({ id: 'labels.logout' })}
			</Button>

			{user && !user.emailVerified ? (
				<Button onClick={resend} variant='link'>
					{f({ id: 'labels.verify' })}
				</Button>
			) : null}
		</Overlay>
	)
}

export default CompleteProfile
