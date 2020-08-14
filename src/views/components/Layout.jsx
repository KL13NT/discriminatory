import React from 'react'

import styles from './Layout.module.sass'
import Ads from '../../components/Ads/Ads'

function Layout({ children }) {
	return (
		<div className={styles.layout}>
			<div className={styles.left}></div>
			<div className={styles.content}>{children}</div>
			<div className={styles.right}>
				<Ads />
				{/* search and ads go here */}
			</div>
		</div>
	)
}

export default Layout
