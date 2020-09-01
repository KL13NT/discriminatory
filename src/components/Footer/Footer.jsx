import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from './Footer.module.sass'

function Footer() {
	return (
		<span className={styles.footer}>
			<a href='/about'>
				<FormattedMessage id='general.about' />
			</a>
			<a href='/guidelines'>
				<FormattedMessage id='general.guidelines' />
			</a>
			<a href='/terms'>
				<FormattedMessage id='general.terms' />
			</a>
			<a href='/privacy'>
				<FormattedMessage id='general.privacy' />
			</a>
		</span>
	)
}

export default Footer
