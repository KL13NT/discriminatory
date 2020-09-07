import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import styles from './Footer.module.sass'

const links = ['about', 'terms', 'privacy']

function Footer() {
	const { locale } = useIntl()

	return (
		<span className={styles.footer}>
			{links.map(link => (
				<a href={`/${locale}/${link}`} key={link}>
					<FormattedMessage id={`general.${link}`} />
				</a>
			))}
		</span>
	)
}

export default Footer
