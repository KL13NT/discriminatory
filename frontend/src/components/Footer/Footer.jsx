import React from 'react'

import styles from './Footer.module.sass'

function Footer() {
	return (
		<span className={styles.footer}>
			<a href='/'>About</a>
			<a href='/'>Feedback</a>
			<a href='/privacy'>Privacy Policy</a>
			<a href='/terms'>Terms</a>
			<a href='/guidelines'>Community Guidelines</a>
			<a href='/terms'>Terms</a>
		</span>
	)
}

export default Footer
