import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './PageTitle.module.sass'


function PageTitle ({ children, isCentered, variant, ...props }) {
	const classes = [ styles.pageTitle, styles[variant] ].join(' ')

	return (
		<h1	className={ classes } data-centered={ isCentered } { ...props }>
			{ children }
		</h1>
	)
}


const propTypes = {
	id: PropTypes.string,
	variant: PropTypes.oneOf([ 'page', 'section' ]).isRequired,
	children: PropTypes.node.isRequired,
	isCentered: PropTypes.boolean
}

const defaultProps = {
	isCentered: false
}

PageTitle.defaultProps = defaultProps
PageTitle.propTypes = propTypes


export { PageTitle }