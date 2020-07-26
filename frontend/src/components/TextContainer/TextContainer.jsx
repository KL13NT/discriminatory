import React from 'react'
import PropTypes from 'prop-types'

import styles from './TextContainer.module.sass'


const TextContainerField = ({ children, title }) =>
	<div className={ styles.textContainerField }>
		{
			title? <h6>{ title }</h6>: null
		}
		<p>
			{
				children
			}
		</p>
	</div>



const TextContainer = ({ children, ...props }) => {
	const classes = [ styles.textContainer ]

	return (
		<div	className={ classes } { ...props }>
			{ children }
		</div>
	)
}


const propTypes = {
	children: PropTypes.node.isRequired
}

const defaultProps = {}

TextContainer.defaultProps = defaultProps
TextContainer.propTypes = propTypes

TextContainerField.defaultProps = defaultProps
TextContainerField.propTypes = propTypes



export { TextContainer, TextContainerField }