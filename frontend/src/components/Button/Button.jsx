import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.module.sass'


function Button (props) {
	const { disabled, label, onClick, size, variant, ...rest } = props
	const classes = [ styles.button, styles[size], styles[variant] ].join(' ')

	return (
		<button
			aria-label={ label }
			className={ classes }
			disabled={ disabled }
			onClick={ disabled? null: onClick }
			{ ...rest }>
			<span>
				{ label }
			</span>
			{
				size === 'small'
					? null
					: <span className={ styles.icon } label='button icon'/>
			}
		</button>
	)

}


const propTypes = {
	type: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	size: PropTypes.oneOf([ 'small', 'big' ]).isRequired,
	variant: PropTypes.oneOf([ 'error', 'info' ]).isRequired,
	tabIndex: PropTypes.number,
	disabled: PropTypes.boolean
}

const defaultProps = {
	tabIndex: 0,
	disabled: false
}

Button.defaultProps = defaultProps
Button.propTypes = propTypes


export { Button }