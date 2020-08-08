import React, { useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useMutation } from 'urql'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'

import styles from './register.module.sass'
import logo from '../assets/logo_small.svg'

function Register() {
	const [result, register] = useMutation(`
	mutation RegisterMutation($displayName: String!, $email: String!, $password: String!){
			register (displayName: $displayName, email: $email, password: $password) {
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
			password: data.get('password')
		}

		console.log('submitting', body)

		try {
			console.log(`${process.env.api}/graphql`)
			register(body)
		} catch (err) {
			console.log(result)
		}
		// submitconst Todos = () => {
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
						<TextInput
							minimalist
							type='text'
							name='name'
							minLength='4'
							maxLength='36'
							required
							placeholder='Enter your first name and surname'
						/>
						<TextInput
							minimalist
							type='email'
							name='email'
							minLength='4'
							maxLength='50'
							required
							placeholder='Add your email'
						/>
						<TextInput
							minimalist
							type='password'
							name='password'
							minLength='4'
							maxLength='50'
							required
							placeholder='Choose a string password'
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
