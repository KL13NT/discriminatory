// import firebase from 'firebase'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'

import styles from './auth.module.sass'
import logo from '../assets/logo_small.svg'

import firebase from 'firebase'
import { useState } from 'react'
import { useToasts } from '../components/Toast/Toast'
import { useIntl } from 'react-intl'
import QuickLangSwitch from './components/QuickLangSwitch'

function Register() {
	const [fetching, setFetching] = useState(false)
	const [verificationSent, setVerificationSent] = useState(false)
	const { add } = useToasts()
	const { formatMessage: f } = useIntl()

	useEffect(() => {
		if (fetching)
			add({
				text: f({ id: 'register.progress' }),
				type: 'info'
			})
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
							text: f({ id: 'register.succes' })
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
				<link href='/pages.css' rel='stylesheet' />
				<title>{f({ id: 'register.title' })}</title>
			</Helmet>

			<div className={styles.language}>
				<QuickLangSwitch />
			</div>

			<header className={styles.register}>
				<div className={styles.header}>
					<img src={logo} alt={f({ id: 'login.header.logoAlt' })} />
					<h1>{f({ id: 'login.header.title' })}</h1>
					<span>{f({ id: 'login.header.subtitle' })}</span>
				</div>
				<form className={styles.form} onSubmit={onSubmit}>
					<div>
						<h1>{f({ id: 'register.form.title' })}</h1>
						<span>
							{f({ id: 'register.form.question' })}{' '}
							<Link to='/login'>{f({ id: 'register.form.link' })}</Link>
						</span>
					</div>

					<div>
						<label htmlFor='email'>{f({ id: 'login.form.email.label' })}</label>
						<TextInput
							minimalist
							type='email'
							name='email'
							id='email'
							minLength='4'
							maxLength='50'
							required
							placeholder={f({ id: 'login.form.email.placeholder' })}
						/>
						<label htmlFor='password'>
							{f({ id: 'login.form.password.label' })}
						</label>
						<span className={styles.labelSub}>
							{f({ id: 'register.password.strength' })}
						</span>
						<TextInput
							minimalist
							type='password'
							name='password'
							id='password'
							minLength='8'
							maxLength='50'
							required
							placeholder={f({ id: 'register.form.password.placeholder' })}
						/>
						<Button type='submit' minimalist>
							{f({ id: 'login.form.submit' })}
						</Button>

						{verificationSent ? (
							<span>
								{f({ id: 'register.verification.question' })}
								<button className='u-link' onClick={resend}>
									{f({ id: 'register.verification.link' })}
								</button>
								<br />
							</span>
						) : null}

						<span className={styles.disclaimer}>
							{f({ id: 'register.disclaimer.base' })}
							<a href='/terms'>{f({ id: 'shared.terms.long' })}</a>,{' '}
							<a href='/privacy'>{f({ id: 'shared.privacy.long' })}</a>,{' '}
							{f({ id: 'register.disclaimer.emails' })}
						</span>
					</div>
				</form>
			</header>
		</>
	)
}

export default Register
