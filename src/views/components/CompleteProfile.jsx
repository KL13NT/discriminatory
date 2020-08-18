import firebase from 'firebase'
import React, { useEffect } from 'react'

import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import Overlay from '../../components/Overlay/Overlay'

import { useToasts } from '../../components/Toast/Toast'
import { useAuth } from '../../stores/auth'
import { useMutation } from 'urql'
import { useProfile } from '../../stores/profile'
import { useIntl } from 'react-intl'
import { useSettings } from '../../stores/settings'

function CompleteProfile() {
	const { add } = useToasts()
	const { user } = useAuth()
	const { update } = useProfile()
	const { formatMessage: f } = useIntl()
	const { settings } = useSettings()
	const { dir } = settings.display.language.selected

	const [response, updateProfile] = useMutation(`
	mutation AccountMutation ($displayName: String!, $email: String!, $dateofbirth: String!, $location: String!, $tagline: String!){
			account (displayName: $displayName, email: $email, dateofbirth: $dateofbirth, location: $location, tagline: $tagline) {
				displayName
				email
				location
				dateofbirth
				tagline
			}
	}`)

	useEffect(() => {
		if (response.data) {
			update(response.data.account)
			add({
				text: f({ id: 'setup.success' }),
				type: 'success'
			})
		}
	}, [add, f, response.data, update])

	useEffect(() => {
		if (response.fetching)
			add({
				text: f({ id: 'setup.progress' }),
				type: 'warn'
			})
		else if (response.error)
			add({ text: response.error.message, type: 'danger' })
	}, [add, f, response.error, response.fetching])

	const onSubmit = e => {
		e.preventDefault()

		const data = new FormData(e.target)
		const body = {
			email: user.email,
			displayName: data.get('name'),
			dateofbirth: data.get('dateofbirth'),
			location: data.get('location'),
			tagline: data.get('tagline')
		}

		updateProfile(body)
	}

	const onClose = () => {
		add({
			text: f({ id: 'setup.profileNotComplete' }),
			type: 'danger'
		})
	}

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
			.catch(err => {
				add({
					text: err.message,
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
			title={f({ id: 'setup.title' })}
			subtitle={f({ id: 'setup.subtitle' })}
			onClose={onClose}
			dir={dir}
		>
			<form onSubmit={onSubmit}>
				<label htmlFor='name'>{f({ id: 'setup.name' })}</label>
				<TextInput
					minimalist
					type='text'
					name='name'
					id='name'
					minLength='4'
					maxLength='36'
					required
					placeholder={f({ id: 'setup.name.placeholder' })}
				/>
				<label htmlFor='dateofbirth'>{f({ id: 'setup.dateofbirth' })}</label>
				<TextInput
					minimalist
					type='date'
					name='dateofbirth'
					id='dateofbirth'
					minLength='4'
					maxLength='50'
					required
				/>
				<label htmlFor='location'>{f({ id: 'setup.location' })}</label>
				<TextInput
					minimalist
					type='text'
					name='location'
					id='location'
					placeholder={f({ id: 'setup.location.placeholder' })}
					required
				/>
				<label htmlFor='tagline'>{f({ id: 'setup.tagline' })}</label>
				<TextInput
					minimalist
					type='text'
					name='tagline'
					id='tagline'
					maxLength='160'
					placeholder={f({ id: 'setup.tagline.placeholder' })}
					required
				/>
				<Button type='submit' variant='info'>
					{f({ id: 'setup.submit' })}
				</Button>

				<Button onClick={logout} variant='link'>
					{f({ id: 'setup.logout' })}
				</Button>

				{user && !user.emailVerified ? (
					<Button onClick={resend} variant='link'>
						{f({ id: 'setup.verify' })}
					</Button>
				) : null}
			</form>
		</Overlay>
	)
}

export default CompleteProfile
