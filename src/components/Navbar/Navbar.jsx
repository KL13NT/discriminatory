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

function PrivateLink({ user, ...props }) {
	if (!user || !user.emailVerified) return null
	else return <NavbarLink {...props} />
}

function Navbar({ user }) {
	const { pathname } = useLocation()

	if (pathname === '/login' || pathname === '/register') return null
	return (
		<nav className={styles.container}>
			<FullLogo className={styles.logo} />
			<div className={styles.links}>
				<PrivateLink to='/home' name='Home' icon={Home} user={user} />
				<NavbarLink to='/explore' name='Explore' icon={Explore} />
				<PrivateLink
					to='/notifications'
					name='Notifications'
					icon={Notifications}
					user={user}
				/>
				<PrivateLink to='/profile' name='Profile' icon={Profile} user={user} />
				<NavbarLink
					to='/discriminators'
					name='Discriminators'
					icon={Discriminators}
				/>
				<NavbarLink to='/settings' name='Settings' icon={Settings} />
			</div>
			<Compose />
		</nav>
	)
}

const propTypes = {}
const defaultProps = {}

Navbar.propTypes = propTypes
Navbar.defaultProps = defaultProps

export default Navbar
