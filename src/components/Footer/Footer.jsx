import React from 'react'

import styles from './Footer.module.sass'

function Footer() {
	return (
		<span className={styles.footer}>
			<a href='/'>About</a>
			<a href='/'>Feedback</a>
			<a href='/guidelines'>Guidelines</a>
			<a href='/terms'>Terms of Service</a>
			<a href='/privacy'>Privacy Policy</a>
		</span>
	)
}

export default Footer
