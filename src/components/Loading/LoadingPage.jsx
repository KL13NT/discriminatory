import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './LoadingPage.module.sass'
import { useEffect } from 'react'
import { useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

const context = require.context('../../assets/loading', false, /\.gif$/)

const gifs = {}
function importAll(r) {
	r.keys().forEach(key => (gifs[key] = r(key)))
}
const messages = [
	<FormattedMessage id='loading.random[0]' key='loading.random[0]' />,
	<FormattedMessage id='loading.random[1]' key='loading.random[1]' />,
	<FormattedMessage id='loading.random[2]' key='loading.random[2]' />,
	<FormattedMessage id='loading.random[3]' key='loading.random[3]' />,
	<FormattedMessage id='loading.random[4]' key='loading.random[4]' />,
	<FormattedMessage id='loading.random[5]' key='loading.random[5]' />,
	<FormattedMessage id='loading.random[6]' key='loading.random[6]' />
]

importAll(context)

const randomMessage = () => {
	const index = Math.floor(Math.random() * messages.length)
	return messages[index]
}

const randomGif = () => {
	const filename = Object.values(gifs)[
		Math.floor(Math.random() * Object.keys(gifs).length)
	].default

	return filename
}

export const FullscreenLoader = ({ title, subtitle, err }) => {
	const [src, setSrc] = useState(randomGif())
	const [error, setError] = useState(false)
	const { formatMessage: f } = useIntl()
	const timeout = useRef(0)

	useEffect(() => {
		timeout.current = setTimeout(() => setError(true), 10 * 1000)

		return () => clearTimeout(timeout.current)
	}, [])

	return (
		<div
			className={styles.fullscreenLoader}
			role='progressbar'
			aria-valuetext={title || f({ id: 'loading.title' })}
			aria-busy='true'
			aria-live='assertive'
			aria-valuemin='0'
			aria-valuemax='100'
		>
			<img src={src} alt={f({ id: 'images.loading' })} />
			<span>{title || <FormattedMessage id='loading.title' />}</span>
			<p>{subtitle || randomMessage()}</p>
			{error ? <p>{err || <FormattedMessage id='loading.warning' />}</p> : null}
		</div>
	)
}

export const Spinner = () => (
	<div className={styles.spinnerContainer}>
		<div></div>
		<div></div>
	</div>
)

const propTypes = {
	/** Text to be displayed when loading */
	children: PropTypes.node
}

const defaultProps = {
	children: "We're working hard to bring you that page in no time!"
}

FullscreenLoader.propTypes = propTypes
FullscreenLoader.defaultProps = defaultProps
