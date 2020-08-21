import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/Button'

import styles from './Navbar.module.sass'

import { ReactComponent as FullLogo } from '../../assets/logo_full.svg'
import { ReactComponent as Home } from '../../assets/green 1.svg'
import { ReactComponent as Explore } from '../../assets/telescope 1.svg'
import { ReactComponent as Notifications } from '../../assets/comment 2.svg'
import { ReactComponent as Profile } from '../../assets/user 1.svg'
import { ReactComponent as Discriminators } from '../../assets/blocked 2.svg'
import { ReactComponent as Settings } from '../../assets/gear.inline.svg'
import { ReactComponent as Add } from '../../assets/plus 1.svg'

import { NavLink, useLocation } from 'react-router-dom'
import { useComposer } from '../../stores/composer'
import { useIntl } from 'react-intl'

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
	return children
}

function Navbar({ user }) {
	const { pathname } = useLocation()
	const { formatMessage: f } = useIntl()

	if (pathname === '/login' || pathname === '/register') return null
	return (
		<nav className={styles.container}>
			<FullLogo className={styles.logo} />
			<div className={styles.links}>
				<PrivateLink user={user}>
					<NavbarLink to='/home' name={f({ id: 'navbar.home' })} icon={Home} />
				</PrivateLink>

				<NavbarLink
					to='/explore'
					name={f({ id: 'navbar.explore' })}
					icon={Explore}
				/>

				<PrivateLink user={user}>
					<NavbarLink
						to='/notifications'
						name={f({ id: 'navbar.notifications' })}
						icon={Notifications}
					/>
				</PrivateLink>

				<PrivateLink user={user}>
					<NavbarLink
						to={`/${user ? user.uid : null}`}
						name={f({ id: 'navbar.profile' })}
						icon={Profile}
					/>
				</PrivateLink>

				<NavbarLink
					to='/discriminators'
					name={f({ id: 'navbar.discriminators' })}
					icon={Discriminators}
				/>
				<NavbarLink
					to='/settings'
					name={f({ id: 'navbar.settings' })}
					icon={Settings}
				/>
			</div>

			<PrivateLink user={user}>
				<Compose />
			</PrivateLink>
		</nav>
	)
}

const propTypes = {
	user: PropTypes.object.isRequired
}
const defaultProps = {}

Navbar.propTypes = propTypes
Navbar.defaultProps = defaultProps

export default Navbar
