import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { auth } from 'firebase'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'

import styles from './register.module.sass'
import logo from '../assets/logo_small.svg'

const actionCodeSettings = {
	url: 'https://discriminatorynetwork.netlify.app/verify',
	handleCodeInApp: true
}

function Login() {
	const onSubmit = e => {
		e.preventDefault()

		const data = new FormData(e.target)
		const email = data.get('email')

		auth()
			.sendSignInLinkToEmail(email, actionCodeSettings)
			.then(() => {
				window.localStorage.setItem('emailForSignIn', email)
				//TODO: add info
			})
			.catch(error => {
				console.log(error)
			})
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
				<title>Discriminatory - Login</title>
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
						<h1>Login</h1>
						<span>
							Don't have an account?{' '}
							<Link to='/register'>Register for free</Link>
						</span>
					</div>

					<div>
						<TextInput
							minimalist
							type='email'
							name='email'
							minLength='4'
							maxLength='50'
							required
							placeholder='Enter your email'
						/>
						<Button type='submit' minimalist>
							Continue
						</Button>
						<span className={styles.disclaimer}>
							A link will be sent to your email. Clicking it will sign you in
							and verify your account. You'll be redirected to the home page
							automatically.
						</span>
					</div>
				</form>
			</header>
		</>
	)
}

export default Login
