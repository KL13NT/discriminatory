// import firebase from 'firebase'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'

import styles from './register.module.sass'
import logo from '../assets/logo_small.svg'

import firebase from 'firebase'
import { useState } from 'react'
import { useToasts } from '../components/Toast/Toast'

function Register() {
	// const [result, register] = useMutation(`
	// mutation RegisterMutation($displayName: String!, $email: String!, $dateofbirth: String!, $location: String!, $password: String!){
	// 		register (displayName: $displayName, email: $email, dateofbirth: $dateofbirth, location: $location, password: $password) {
	// 			id
	// 		}
	// }`)
	const [fetching, setFetching] = useState(false)
	const [verificationSent, setVerificationSent] = useState(false)
	const { add } = useToasts()

	useEffect(() => {
		if (fetching) add({ text: 'Attempting to register', type: 'info' })
	}, [fetching, add])

	const onSubmit = e => {
		e.preventDefault()

		const data = new FormData(e.target)
		const body = {
			email: data.get('email'),
			password: data.get('password')
		}

		setFetching(true)

		firebase
			.auth()
			.createUserWithEmailAndPassword(body.email, body.password)
			.then(() => {
				firebase
					.auth()
					.currentUser.sendEmailVerification()
					.then(() => {
						setVerificationSent(true)
						add({
							type: 'success',
							text: 'A verification link has been sent to your email.'
						})
					})
			})
			.catch(err => {
				add({ type: 'danger', text: err.message })
			})
	}

	const resend = e => {
		e.preventDefault()
		firebase.auth().currentUser.sendEmailVerification()
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
						<label htmlFor='password'>Password</label>
						<TextInput
							minimalist
							type='password'
							name='password'
							id='password'
							minLength='8'
							maxLength='50'
							required
							placeholder='********'
						/>
						<Button type='submit' minimalist>
							Continue
						</Button>

						{verificationSent ? (
							<span>
								Verification email not sent?
								<button className='u-link' onClick={resend}>
									Try again
								</button>
								<br />
							</span>
						) : null}

						<span className={styles.disclaimer}>
							By clicking Continue, I confirm that I have read and agree to the{' '}
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
