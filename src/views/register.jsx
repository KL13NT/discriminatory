import { auth } from '../utils/firebase'
import { host } from 'config'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'
import QuickLangSwitch from './components/QuickLangSwitch'
import LocaleSEO from './components/SEO'

import { useIntl } from 'react-intl'
import { useToasts } from '../components/Toast/Toast'

import styles from './auth.module.sass'

import logo from '../assets/logo_small.svg'

function Register() {
	const [fetching, setFetching] = useState(false)
	const [verificationSent, setVerificationSent] = useState(false)
	const { add } = useToasts()
	const { formatMessage: f } = useIntl()

	useEffect(() => {
		if (fetching)
			add({
				text: f({ id: 'actions.register.progress' }),
				type: 'info'
			})
	}, [fetching, add, f])

	const onSubmit = e => {
		e.preventDefault()

		const data = new FormData(e.target)
		const body = {
			email: data.get('email'),
			password: data.get('password')
		}

		setFetching(true)

		auth
			.createUserWithEmailAndPassword(body.email, body.password)
			.then(() => {
				return auth.currentUser.sendEmailVerification({
					url: host
				})
			})
			.then(() => {
				setVerificationSent(true)
				add({
					type: 'success',
					text: f({ id: 'actions.register.success' })
				})
			})
			.catch(err => {
				console.log('COPY THIS WHEN REPORTING', err)
				add({ type: 'danger', text: err.message })
			})
	}

	const resend = e => {
		e.preventDefault()
		auth.currentUser.sendEmailVerification()
	}

	return (
		<>
			<LocaleSEO
				title='titles.register'
				description='titles.register.description'
				path='/register'
			/>

			<div className={styles.language}>
				<QuickLangSwitch />
			</div>

			<header className={styles.register}>
				<div className={styles.header}>
					<img src={logo} alt={f({ id: 'images.registerheader' })} />
					<h1>{f({ id: 'login.header.title' })}</h1>
					<span>{f({ id: 'login.header.subtitle' })}</span>
				</div>
				<form className={styles.form} onSubmit={onSubmit}>
					<div>
						<h1>{f({ id: 'titles.register' })}</h1>
						<span>
							{f({ id: 'register.question' })}{' '}
							<Link to='/login'>{f({ id: 'register.link' })}</Link>
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
							placeholder={f({ id: 'register.password.placeholder' })}
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

						<span className='u-disclaimer'>
							{f({ id: 'register.disclaimer.base' })}{' '}
							<a href='/terms'>{f({ id: 'general.terms' })}</a>,{' '}
							<a href='/privacy'>{f({ id: 'general.privacy' })}</a>,{' '}
							{f({ id: 'register.disclaimer.emails' })}
						</span>
						<span className='u-warn'>
							{f({ id: 'disclaimers.register.age' })}
						</span>
					</div>
				</form>
			</header>
		</>
	)
}

export default Register
