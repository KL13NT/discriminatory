import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.module.sass'

function Button({ disabled, onClick, className, children, variant, ...rest }) {
	const classes = [styles.button, styles[variant], className].join(' ')

	return (
		<button
			className={classes}
			disabled={disabled}
			onClick={disabled ? null : onClick}
			{...rest}
		>
			{children}
		</button>
	)
}

const propTypes = {
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.boolean,
	className: PropTypes.string,
	children: PropTypes.children,
	variant: PropTypes.oneOf(['info', 'danger'])
}

const defaultProps = {
	disabled: false,
	variant: 'info'
}

Button.defaultProps = defaultProps
Button.propTypes = propTypes

export default Button
