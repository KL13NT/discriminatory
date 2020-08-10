import React, { useEffect } from 'react'

import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'

import { useToasts } from '../../components/Toast/Toast'
import { useAuth } from '../../stores/auth'
import { useMutation } from 'urql'
import { useProfile } from '../../stores/profile'
import Overlay from '../../components/Overlay/Overlay'

function CompleteProfile() {
	const [response, updateProfile] = useMutation(`
	mutation ProfileMutation ($displayName: String!, $email: String!, $dateofbirth: String!, $location: String!, $tagline: String!, $id: String!){
			profile (displayName: $displayName, email: $email, dateofbirth: $dateofbirth, location: $location, tagline: $tagline, id: $id) {
				id
				displayName
				email
				location
				dateofbirth
				tagline
			}
	}`)
	const { add } = useToasts()
	const { user } = useAuth()
	const { update } = useProfile()

	useEffect(() => {
		if (response.data) {
			update(response.data.profile)
			add({
				text: 'Profile updated successfully.',
				type: 'success'
			})
		}
	}, [response.data, update])

	useEffect(() => {
		if (response.fetching) add({ text: 'Saving your profile', type: 'info' })
		else if (response.error)
			add({ text: response.error.message, type: 'danger' })
	}, [add, response.error, response.fetching])

	const onSubmit = e => {
		e.preventDefault()

		const data = new FormData(e.target)
		const body = {
			email: user.email,
			id: user.uid,
			displayName: data.get('name'),
			dateofbirth: data.get('dateofbirth'),
			location: data.get('location'),
			tagline: data.get('tagline')
		}

		updateProfile(body)
	}

	const onClose = () => {
		add({
			text: "You can't fully use the service without a complete profile",
			type: 'danger'
		})
	}

	return (
		<Overlay
			title='First time setup'
			subtitle='Complete your profile to fully use the service'
			onClose={onClose}
		>
			<form onSubmit={onSubmit}>
				<label htmlFor='name'>Name</label>
				<TextInput
					minimalist
					type='text'
					name='name'
					id='name'
					minLength='4'
					maxLength='36'
					required
					placeholder='John Doe'
				/>
				<label htmlFor='dateofbirth'>Date of birth</label>
				<TextInput
					minimalist
					type='date'
					name='dateofbirth'
					id='dateofbirth'
					minLength='4'
					maxLength='50'
					required
				/>
				<label htmlFor='location'>Location</label>
				<TextInput
					minimalist
					type='text'
					name='location'
					id='location'
					placeholder='The Spiderverse'
					required
				/>
				<label htmlFor='tagline'>Tagline</label>
				<TextInput
					minimalist
					type='text'
					name='tagline'
					id='tagline'
					maxLength='160'
					placeholder='The Spiderverse'
					required
				/>
				<Button type='submit' variant='info'>
					Submit
				</Button>
			</form>
		</Overlay>
	)
}

export default CompleteProfile
