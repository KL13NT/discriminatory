import React from 'react'
import PropTypes from 'prop-types'


import { NavLink } from 'react-router-dom'


import LoadingSVG from '../../assets/loading.svg'
import SpinnerSVG from '../../assets/sand-clock.svg'


import styles from './LoadingPage.module.sass'


const Spinner = () =>
	<div className={ styles.spinnerContainer }>
		<img alt='loading spinner' src={ SpinnerSVG }/>
		<p>Our bots are assembling. Please wait.</p>
	</div>


/**
 * Use `LoadingPage` when loading full views.
 * Use `Spinner` when loading specific sections.
 */
const LoadingPage = ({ children }) => {
	return(
		<div className={ styles.loadingContainer }>
			<img alt='loading illustration' src={ LoadingSVG }/>
			<h1>Loading</h1>
			<p>{ children }</p>
		</div>
	)
}



const propTypes = {
	/** Text to be displayed when loading */
	children: PropTypes.node
}

const defaultProps = {
	children: 'We\'re working hard to bring you that page in no time!'
}

LoadingPage.propTypes = propTypes
LoadingPage.defaultProps = defaultProps


export { Spinner, LoadingPage }