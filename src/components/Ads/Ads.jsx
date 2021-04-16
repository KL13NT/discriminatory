/* eslint-disable jsx-a11y/img-redundant-alt */

import React from 'react'
import Container from '../Container/Container'

import styles from './Ads.module.sass'

import { FormattedMessage } from 'react-intl'

function Placeholder({ enabled }) {
	const reason = enabled ? (
		<FormattedMessage id='errors.ads.network' />
	) : (
		<FormattedMessage id='errors.ads.disabled' />
	)

	return (
		<div className={styles.placeholder}>
			<div>
				<img
					src='https://source.unsplash.com/featured/?nature'
					alt='A random nature image from Unsplash.com'
				/>
				<span className={styles.credits}>
					<a href='https://unsplash.com' target='_blank' rel='noreferrer'>
						Unsplash.com
					</a>
				</span>
			</div>
			<span>{reason}</span>
		</div>
	)
}

//TODO: Hook to Google Adsense
function Ads() {
	return (
		<>
			<Container className={styles.ads}>
				<h1>
					<FormattedMessage id='titles.ads' />{' '}
					<span className='u-tick'>
						<FormattedMessage
							id={status ? 'general.enabled' : 'general.disabled'}
						/>
					</span>
				</h1>
				<Placeholder enabled={status} />
			</Container>
		</>
	)
}

export default Ads
