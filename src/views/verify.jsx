import { auth } from '../utils/firebase'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'

import { useToasts } from '../components/Toast/Toast'

function Verify() {
	const { add } = useToasts()
	const [loading, setLoading] = useState(false)
	const [redirect, setRedirect] = useState(null)

	useEffect(() => {
		if (loading) add({ text: 'Verifying your credentials', type: 'info' })
	}, [add, loading])

	useEffect(() => {
		if (auth.isSignInWithEmailLink(window.location.href)) {
			setLoading(true)

			const email = window.localStorage.getItem('emailForSignIn')
			if (!email) setRedirect('/login')

			auth
				.signInWithEmailLink(email, window.location.href)
				.then(() => {
					window.localStorage.removeItem('emailForSignIn')
					setRedirect('/home')
				})
				.catch(() => {
					setRedirect('/login')
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
