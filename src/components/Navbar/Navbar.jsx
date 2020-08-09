import React from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import styles from './Navbar.module.sass'

import { ReactComponent as FullLogo } from '../../assets/logo_full.svg'
import { ReactComponent as Home } from '../../assets/green 1.svg'
import { ReactComponent as Explore } from '../../assets/telescope 1.svg'
import { ReactComponent as Notifications } from '../../assets/comment 2.svg'
import { ReactComponent as Profile } from '../../assets/user 1.svg'
import { ReactComponent as Discriminators } from '../../assets/blocked 2.svg'
import { ReactComponent as Settings } from '../../assets/gear.inline.svg'
import { ReactComponent as Add } from '../../assets/plus 1.svg'

import { useComposer } from '../../stores/composer'
import Button from '../Button/Button'

import firebase from 'firebase'
import { useToasts } from '../Toast/Toast'

function Compose() {
	const { toggle } = useComposer()
	return (
		<Button className={styles.compose} onClick={toggle} aria-label='Compose'>
			<span>Compose</span>
			<Add />
		</Button>
	)
}

function NavbarLink({ to, name, icon: Icon }) {
	return (
		<NavLink className={styles.link} aria-label={`Go to ${name}`} to={to}>
			<Icon />
			<span>{name}</span>
		</NavLink>
	)
}

function PrivateLink({ user, children }) {
	if (!user || !user.emailVerified) return null
	else return children
}

function Navbar({ user }) {
	const { pathname } = useLocation()
	const { add } = useToasts()

	const resend = e => {
		e.preventDefault()
		firebase
			.auth()
			.currentUser.sendEmailVerification()
			.then(() => {
				add({ text: 'Resent verification link to your email', type: 'success' })
			})
			.catch(err => {
				add({ text: err.message, type: 'danger' })
			})
	}

	if (pathname === '/login' || pathname === '/register') return null
	return (
		<nav className={styles.container}>
			<FullLogo className={styles.logo} />
			<div className={styles.links}>
				<PrivateLink user={user}>
					<NavbarLink to='/home' name='Home' icon={Home} />
				</PrivateLink>

				<NavbarLink to='/explore' name='Explore' icon={Explore} />

				<PrivateLink user={user}>
					<NavbarLink
						to='/notifications'
						name='Notifications'
						icon={Notifications}
					/>{' '}
				</PrivateLink>

				<PrivateLink user={user}>
					<NavbarLink to='/profile' name='Profile' icon={Profile} />
				</PrivateLink>

				<NavbarLink
					to='/discriminators'
					name='Discriminators'
					icon={Discriminators}
				/>
				<NavbarLink to='/settings' name='Settings' icon={Settings} />
			</div>
			{user && !user.emailVerified ? (
				<button className='u-link' onClick={resend}>
					Resend verification link
				</button>
			) : null}
			<PrivateLink user={user}>
				<Compose />
			</PrivateLink>
		</nav>
	)
}

const propTypes = {}
const defaultProps = {}

Navbar.propTypes = propTypes
Navbar.defaultProps = defaultProps

export default Navbar
