import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { auth } from 'firebase'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'
import QuickLangSwitch from './components/QuickLangSwitch'
import { useToasts } from '../components/Toast/Toast'
import { useIntl } from 'react-intl'

import styles from './auth.module.sass'
import logo from '../assets/logo_small.svg'

function Login() {
	const [fetching, setFetching] = useState(false)
	const { add } = useToasts()
	const { formatMessage: f } = useIntl()

	useEffect(() => {
		if (fetching)
			add({
				text: f({ id: 'login.progress' }),
				type: 'info'
			})
	}, [fetching, add, f])

	const onSubmit = e => {
		e.preventDefault()

		const data = new FormData(e.target)
		const email = data.get('email')
		const password = data.get('password')

		setFetching(true)

		auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				add({
					text: f({ id: 'login.success' }),
					type: 'success'
				})
			})
			.catch(err => {
				console.log('COPY THIS WHEN REPORTING', err)
				add({
					text: f({ id: `errors.${err.code}` }),
					type: 'danger'
				})
			})
	}

	return (
		<>
			<Helmet>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width initial-scale=1.0' />
				<link href='/pages.css' rel='stylesheet' />
				<title>{f({ id: 'login.title' })}</title>
			</Helmet>

			<div className={styles.language}>
				<QuickLangSwitch />
			</div>

			<header className={styles.register} dir={'ltr'}>
				<div className={styles.header}>
					<img src={logo} alt={f({ id: 'login.header.logoAlt' })} />
					<h1>{f({ id: 'login.header.title' })}</h1>
					<span>{f({ id: 'login.header.subtitle' })}</span>
				</div>
				<form className={styles.form} onSubmit={onSubmit}>
					<div>
						<h1>{f({ id: 'login.form.title' })}</h1>
						<span>
							{f({ id: 'login.form.question' })}{' '}
							<Link to='/register'>{f({ id: 'login.form.link' })}</Link>
						</span>
					</div>

					<div>
						<label htmlFor='email'>{f({ id: 'login.form.email.label' })}</label>
						<TextInput
							type='email'
							name='email'
							minLength='4'
							maxLength='50'
							required
							minimalist
							placeholder={f({ id: 'login.form.email.placeholder' })}
						/>
						<label htmlFor='password'>
							{f({ id: 'login.form.password.label' })}
						</label>
						<TextInput
							type='password'
							name='password'
							minLength='8'
							maxLength='50'
							required
							minimalist
							placeholder={f({ id: 'login.form.password.placeholder' })}
						/>
						<Button type='submit' minimalist>
							{f({ id: 'login.form.submit' })}
						</Button>
					</div>
				</form>
			</header>
		</>
	)
}

export default Login
