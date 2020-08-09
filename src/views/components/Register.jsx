// import firebase from 'firebase'
import React, { useEffect } from 'react'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'
import Container from '../../components/Container/Container'

import styles from './register.module.sass'

import { useToasts } from '../components/Toast/Toast'
import { useAuth } from '../../stores/auth'
import { useMutation } from 'urql'

function Register() {
	const [result, register] = useMutation(`
	mutation RegisterMutation($displayName: String!, $email: String!, $dateofbirth: String!, $location: String!, $tagline: String!, $uid: String!){
			register (displayName: $displayName, email: $email, dateofbirth: $dateofbirth, location: $location, tagline: $tagline, uid: $uid) {
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

	useEffect(() => {
		if (result.fetching) add({ text: 'Saving your profile', type: 'info' })
	}, [result, add])

	const onSubmit = e => {
		e.preventDefault()

		const data = new FormData(e.target)
		const body = {
			email: user.email,
			uid: user.uid,
			displaName: data.get('name'),
			dateofbirth: data.get('dateofbirth'),
			location: data.get('location'),
			tagline: data.get('tagline')
		}

		register(body)
			.then(() => {
				add({ type: 'success', text: 'Profile updated successfully' })
			})
			.catch(err => {
				add({ type: 'danger', text: err })
			})
	}

	return (
		<Container>
			<h1>Complete your profile</h1>
			<form className={styles.form} onSubmit={onSubmit}>
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
					placeholder='The Spiderverse'
					required
				/>
				<Button type='submit' variant='info'>
					Submit
				</Button>
			</form>
		</Container>
	)
}

export default Register
