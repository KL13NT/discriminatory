import firebase from 'firebase'
import React, { useEffect, useState } from 'react'

import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import Placeholder from '../../assets/placeholder.png'
import Uploader from '../../components/Uploader/Uploader'
import Label from '../../components/Label/Label'
import { ProfilePreview } from '../../components/ProfileHeader/ProfileHeader'

import { useToasts } from '../../components/Toast/Toast'
import { useAuth } from '../../stores/auth'
import { useMutation } from 'urql'
import { useProfile } from '../../stores/profile'
import { useIntl } from 'react-intl'

function ProfileEditor() {
	const { add } = useToasts()
	const { user } = useAuth()
	const { update } = useProfile()
	const { formatMessage: f } = useIntl()
	const [data, setData] = useState({
		displayName: f({ id: 'labels.displayName.placeholder' }),
		tagline: f({ id: 'labels.tagline.placeholder' }),
		location: f({ id: 'labels.location.placeholder' }),
		dateofbirth: '2003-12-12'
	})
	const [avatar, setAvatar] = useState(null)

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
		if (response.data) update(response.data.account)
	}, [add, f, response.data, update])

	useEffect(() => {
		if (response.data)
			add({
				text: f({ id: 'labels.success' }),
				type: 'success'
			})
		if (response.fetching)
			add({
				text: f({ id: 'labels.progress' }),
				type: 'warn'
			})
		else if (response.error)
			add({ text: response.error.message, type: 'danger' })
	}, [add, f, response])

	const onAvatarProcess = files => {
		const reader = new FileReader()

		reader.readAsDataURL(files[0])
		reader.onloadend = () => {
			setAvatar({ file: files[0], src: reader.result })
		}
	}

	const onSubmit = e => {
		e.preventDefault()

		const body = {
			email: user.email,
			...data
		}

		if (!prompt(f({ id: 'promps.ProfileEditor' }))) return

		if (avatar)
			firebase
				.storage()
				.ref(`avatars/${user.uid}`)
				.put(avatar.file)
				.then(() => {
					add({ text: f({ id: 'alerts.avatar.success', type: 'success' }) })
				})
				.catch(() => {
					add({ text: f({ id: 'alerts.avatar.error', type: 'danger' }) })
				})

		updateProfile(body)
	}

	const onChange = ({ currentTarget }) =>
		setData({ ...data, [currentTarget.name]: currentTarget.value })

	return (
		<>
			<ProfilePreview
				displayName={data.displayName}
				tagline={data.tagline}
				avatar={avatar ? avatar.src : Placeholder}
				location={data.location}
			/>
			<form onSubmit={onSubmit}>
				<Label htmlFor='name'>{f({ id: 'labels.displayName' })}</Label>
				<TextInput
					minimalist
					type='text'
					name='displayName'
					id='name'
					minLength='4'
					maxLength='36'
					value={data.displayName}
					onChange={onChange}
					required
					placeholder={f({ id: 'labels.displayName.placeholder' })}
				/>
				<Label htmlFor='dateofbirth'>{f({ id: 'labels.dateofbirth' })}</Label>
				<TextInput
					minimalist
					type='date'
					name='dateofbirth'
					id='dateofbirth'
					minLength='4'
					maxLength='50'
					value={data.dateofbirth}
					onChange={onChange}
					required
				/>
				<Label htmlFor='location'>{f({ id: 'labels.location' })}</Label>
				<TextInput
					minimalist
					type='text'
					name='location'
					id='location'
					value={data.location}
					onChange={onChange}
					placeholder={f({ id: 'labels.location.placeholder' })}
					required
				/>
				<Label htmlFor='tagline'>{f({ id: 'labels.tagline' })}</Label>
				<TextInput
					minimalist
					type='text'
					name='tagline'
					id='tagline'
					maxLength='160'
					value={data.tagline}
					onChange={onChange}
					placeholder={f({ id: 'labels.tagline.placeholder' })}
					required
				/>
				<Label htmlFor='avatar'>{f({ id: 'labels.avatar' })}</Label>
				<Uploader
					onChange={onAvatarProcess}
					name='avatar'
					accept='image/jpg,image/jpeg,image/webp'
				/>
				<Button type='submit' variant='info'>
					{f({ id: 'labels.submit' })}
				</Button>
			</form>
		</>
	)
}

export default ProfileEditor
