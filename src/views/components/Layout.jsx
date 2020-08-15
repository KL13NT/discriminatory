import React from 'react'

import styles from './Layout.module.sass'
import Ads from '../../components/Ads/Ads'
import Navbar from '../../components/Navbar/Navbar'
import { useLocation } from 'react-router-dom'

function Layout({ children, user }) {
	const { pathname } = useLocation()
	const isApp = () => pathname !== '/register' && pathname !== '/login'

	return (
		<div className={styles.layout}>
			{isApp() ? (
				<div className={styles.left}>
					<Navbar user={user} />
				</div>
			) : null}
			<div className={styles.content}>{children}</div>
			{isApp() ? (
				<div className={styles.right}>
					<Ads />
					{/* search and ads go here */}
				</div>
			) : null}
		</div>
	)
}

export default Layout
