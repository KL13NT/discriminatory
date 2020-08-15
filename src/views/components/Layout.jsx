import React from 'react'

import styles from './Layout.module.sass'
import Ads from '../../components/Ads/Ads'
import Navbar from '../../components/Navbar/Navbar'

function Layout({ children, user }) {
	return (
		<div className={styles.layout}>
			{!user ? null : (
				<div className={styles.left}>
					<Navbar user={user} />
				</div>
			)}
			<div className={styles.content}>{children}</div>
			{!user ? null : (
				<div className={styles.right}>
					<Ads />
					{/* search and ads go here */}
				</div>
			)}
		</div>
	)
}

export default Layout
