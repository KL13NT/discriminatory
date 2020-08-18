import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './LoadingPage.module.sass'
import LoadingSVG from '../../assets/loading.svg'

const context = require.context('../../assets/loading', false, /\.gif$/)

const gifs = {}
function importAll(r) {
	r.keys().forEach(key => (gifs[key] = r(key)))
}
const messages = [
	'Adding randomly mispeled words into text',
	'Attaching beards to dwarves',
	'Does anyone actually read this?',
	'Dusting off spellbooks',
	'Ensuring everything works perfektly',
	"Hitting your keyboard won't make this faster",
	"If you squeeze dark elves you don't get wine"
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

export const FullscreenLoader = ({ children }) => {
	const [src, setSrc] = useState(randomGif())

	const onClick = () => {
		setSrc(randomGif())
	}

	return (
		<div
			onClick={onClick}
			onKeyDown={onClick}
			role={alert}
			className={styles.fullscreenLoader}
		>
			<img src={src} alt='Loading gif' />
			<span>Loading</span>
			<p>{children || randomMessage()}</p>
		</div>
	)
}

export const Spinner = () => (
	<div className={styles.spinnerContainer}>
		<p>Our bots are assembling. Please wait.</p>
	</div>
)

/**
 * Use `LoadingPage` when loading full views.
 * Use `Spinner` when loading specific sections.
 */
export const LoadingPage = ({ children }) => {
	return (
		<div className={styles.loadingContainer}>
			<img alt='loading illustration' src={LoadingSVG} />
			<h1>Loading</h1>
			<p>{children}</p>
		</div>
	)
}

const propTypes = {
	/** Text to be displayed when loading */
	children: PropTypes.node
}

const defaultProps = {
	children: "We're working hard to bring you that page in no time!"
}

LoadingPage.propTypes = propTypes
LoadingPage.defaultProps = defaultProps

FullscreenLoader.propTypes = {
	...propTypes,
	loading: PropTypes.bool.isRequired
}
FullscreenLoader.defaultProps = defaultProps
