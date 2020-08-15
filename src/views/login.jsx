import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { auth } from 'firebase'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'

import styles from './register.module.sass'
import logo from '../assets/logo_small.svg'
import { useToasts } from '../components/Toast/Toast'
import { useIntl } from 'react-intl'
import Select from '../components/Select/Select'
import { useSettings } from '../stores/settings'

function Login() {
	const [fetching, setFetching] = useState(false)
	const { add } = useToasts()
	const { formatMessage: f } = useIntl()
	const { settings, update } = useSettings()
	const { locales } = settings.display.language
	const languages = [
		{ value: 'en', name: 'English' },
		{ value: 'ar', name: 'Arabic - العربية' }
	]

	useEffect(() => {
		if (fetching) add({ text: 'Attempting to login', type: 'info' })
	}, [fetching, add])

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
					text: 'Login successful, redirecting you',
					type: 'success'
				})
			})
			.catch(error => {
				add({
					text: error.message,
					type: 'danger'
				})
			})
	}

	const onLanguageChange = target => {
		update({
			settings: {
				display: {
					language: {
						locales,
						selected: locales.find(locale => locale.locale === target.value)
					}
				}
			}
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
				<Select
					options={languages}
					defaultValue={0}
					canBeNull={false}
					onChange={onLanguageChange}
				/>
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
