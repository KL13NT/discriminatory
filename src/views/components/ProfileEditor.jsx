import { storage } from '../../utils/firebase'
import React, { useEffect, useState } from 'react'

import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import Uploader from '../../components/Uploader/Uploader'
import Label from '../../components/Label/Label'

import { ProfilePreview } from '../../components/ProfileHeader/ProfileHeader'

import { useToasts } from '../../components/Toast/Toast'
import { useAuth } from '../../stores/auth'
import { useMutation } from 'urql'
import { useProfile } from '../../stores/profile'
import { useIntl } from 'react-intl'

import * as queries from '../../queries/profiles'

import Placeholder from '../../assets/placeholder.png'

function ProfileEditor({ create }) {
	const { add } = useToasts()
	const { user } = useAuth()
	const { profile, update } = useProfile()
	const { formatMessage: f } = useIntl()
	const [data, setData] = useState(
		profile
			? profile
			: {
					displayName: f({ id: 'placeholders.displayName' }),
					tagline: f({ id: 'placeholders.tagline' }),
					location: f({ id: 'placeholders.location' }),
					dateofbirth: '2003-12-12'
			  }
	)
	const [avatar, setAvatar] = useState(
		create ? Placeholder : profile.avatar || Placeholder
	)
	const [avatarChanged, setAvatarChanged] = useState(false)
	const [canSubmit, setCanSubmit] = useState(false)

	const [response, updateProfile] = useMutation(queries.updateProfile)

	useEffect(() => {
		if (response.data) update(response.data.account)
	}, [add, f, response.data, update])

	useEffect(() => {
		if (response.data)
			add({
				text: f({ id: 'actions.completeprofile.success' }),
				type: 'success'
			})
		if (response.fetching)
			add({
				text: f({ id: 'general.progress' }),
				type: 'warn'
			})
		else if (response.error)
			add({ text: response.error.message, type: 'danger' })
	}, [add, f, response])

	const onAvatarProcess = files => {
		const reader = new FileReader()

		reader.readAsDataURL(files[0])
		reader.onloadend = () => {
			setAvatarChanged(true)
			setAvatar({ file: files[0], src: reader.result })
		}
	}

	const submitAvatar = avatar => {
		return storage.ref(`avatars/${user.uid}`).put(avatar.file)
	}

	const onSubmit = e => {
		e.preventDefault()
		e.stopPropagation()

		if (!confirm(f({ id: 'prompts.completeprofile' }))) return

		setCanSubmit(false)

		updateProfile({
			...data,
			dateofbirth: new Date(data.dateofbirth).getTime()
		})
			.then(res => {
				if (!res.error && avatar && avatarChanged) return submitAvatar(avatar)
				setCanSubmit(true)
			})
			.catch(() => {
				add({ text: f({ id: 'errors.general' }), type: 'danger' })
				setCanSubmit(true)
			})
	}

	const onChange = ({ currentTarget }) => {
		setCanSubmit(true)
		setData({ ...data, [currentTarget.name]: currentTarget.value })
	}

	return (
		<>
			<ProfilePreview
				displayName={data.displayName}
				tagline={data.tagline}
				avatar={avatar.src || avatar}
				location={data.location}
			/>
			<form onSubmitCapture={onSubmit}>
				<Label htmlFor='name'>{f({ id: 'general.displayName' })}</Label>
				<TextInput
					required
					minimalist
					type='text'
					name='displayName'
					id='name'
					minLength='4'
					maxLength='36'
					value={data.displayName}
					onChange={onChange}
					placeholder={f({ id: 'placeholders.displayName' })}
				/>
				<Label htmlFor='location'>{f({ id: 'general.location' })}</Label>
				<TextInput
					required
					minimalist
					type='text'
					name='location'
					id='location'
					value={data.location}
					onChange={onChange}
					placeholder={f({ id: 'placeholders.location' })}
				/>
				<Label htmlFor='tagline'>{f({ id: 'general.tagline' })}</Label>
				<TextInput
					required
					minimalist
					type='text'
					name='tagline'
					id='tagline'
					maxLength='160'
					value={data.tagline}
					onChange={onChange}
					placeholder={f({ id: 'placeholders.tagline' })}
				/>
				<Label htmlFor='avatar'>{f({ id: 'general.avatar' })}</Label>
				<Uploader
					onChange={onAvatarProcess}
					name='avatar'
					accept='image/jpg,image/jpeg,image/webp'
				/>
				<Button disabled={!canSubmit} type='submit' variant='info'>
					{f({ id: 'actions.completeprofile' })}
				</Button>
			</form>
		</>
	)
}

export default ProfileEditor
