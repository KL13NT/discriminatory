// import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import firebase from 'firebase'
import { Link, Redirect } from 'react-router-dom'

import styles from './register.module.sass'
import logo from '../assets/logo_small.svg'
import Container from '../components/Container/Container'

function Verify() {
	const [loading, setLoading] = useState(false)
	const [redirect, setRedirect] = useState(null)

	useEffect(() => {
		if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
			setLoading(true)

			const email = window.localStorage.getItem('emailForSignIn')
			if (!email) setRedirect('/login')

			firebase
				.auth()
				.signInWithEmailLink(email, window.location.href)
				.then(() => {
					window.localStorage.removeItem('emailForSignIn')
					setRedirect('/home')
				})
				.catch(function(error) {
					// Some error occurred, you can inspect the code: error.code
					// Common errors could be invalid email and invalid or expired OTPs.
				})
		} else setRedirect('/login')
	}, [])

	if (typeof redirect === 'string') return <Redirect to={redirect} />
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
				<title>Discriminatory - Verify</title>
			</Helmet>

			<div>
				<span>Logging you in, hang tight!</span>

				<Link to='/home'>
					Click here if you're not redirected automatically.
				</Link>
			</div>
		</>
	)
}

export default Verify
