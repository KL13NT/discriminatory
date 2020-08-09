// import firebase from 'firebase'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useMutation } from 'urql'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'

import styles from './register.module.sass'
import logo from '../assets/logo_small.svg'

function Register() {
	const [result, register] = useMutation(`
	mutation RegisterMutation($displayName: String!, $email: String!, $dateofbirth: String!, $location: String!){
			register (displayName: $displayName, email: $email, dateofbirth: $dateofbirth, location: $location) {
				id
			}
	}`)

	useEffect(() => {
		console.log(result)
	}, [result, register])

	const onSubmit = e => {
		e.preventDefault()

		const data = new FormData(e.target)
		const body = {
			displayName: data.get('name'),
			email: data.get('email'),
			dateofbirth: data.get('dateofbirth'),
			location: data.get('location')
		}

		try {
			register(body)
			// firebase
			// 	.auth()
			// 	.createUserWithEmailAndPassword(body.email, body.password)
			// 	.then(({ user }) => {
			// 		register({ displayName: body.displayName, uid: user.uid }).then(
			// 			() => {
			// 				alert('Registration successful, you can login now')
			// 			}
			// 		)
			// 	})
			// 	.catch(err => {
			// 		console.log(err)
			// 	})
		} catch (err) {
			console.log(result)
		}
	}

	return (
		<>
			<Helmet>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width initial-scale=1.0' />
				<link
					href='https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;900&display=swap'
					rel='stylesheet'
				/>
				<link href='/pages.css' rel='stylesheet' />
				<title>Discriminatory - Register</title>
			</Helmet>
			{result.fetching ? 'Fetching' : null}
			{result.error ? console.log(result.error) : null}

			<header className={styles.register} dir={'ltr'}>
				<div className={styles.header}>
					<img src={logo} alt='Discriminatory logo' />
					<h1>Join the cause against discrimination</h1>
					<span>
						Share, empathise, and enjoy your time on the first social network
						built specifically to fight discrimination. Available on all screens
						for free.
					</span>
				</div>
				<form className={styles.form} onSubmit={onSubmit}>
					<div>
						<h1>Join Discriminatory</h1>
						<span>
							Already registered? <Link to='/login'>Login instead</Link>
						</span>
					</div>

					<div>
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
						<label htmlFor='email'>Email</label>
						<TextInput
							minimalist
							type='email'
							name='email'
							id='email'
							minLength='4'
							maxLength='50'
							required
							placeholder='example@example.com'
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
						<Button type='submit' minimalist>
							Continue
						</Button>
						<span className={styles.disclaimer}>
							By clicking Continue, I confirm that I have read and agree to the
							<a href='/terms'>Terms Of Service</a>,{' '}
							<a href='/privacy'>Privacy Policy</a>, and to receive emails and
							updates.
						</span>
					</div>
				</form>
			</header>
		</>
	)
}

export default Register
