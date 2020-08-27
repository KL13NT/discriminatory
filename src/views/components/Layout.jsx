import React from 'react'

import Ads from '../../components/Ads/Ads'
import Navbar from '../../components/Navbar/Navbar'
import SearchInput from '../../components/TextInput/SearchInput'

import styles from './Layout.module.sass'
import { IntlErrorBoundary } from '../../components/Errors/PageError'

function Layout({ children, user }) {
	return (
		<div className={styles.layout}>
			<div className={styles.left}>
				<Navbar user={user} />
			</div>

			<div className={styles.content}>
				<IntlErrorBoundary>{children}</IntlErrorBoundary>
			</div>

			<div className={styles.right}>
				<SearchInput />
				<Ads />
			</div>
		</div>
	)
}

export default Layout
