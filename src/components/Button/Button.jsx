import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.module.sass'
import cls from '../../utils/cls'

function Button({
	disabled,
	onClick,
	className,
	children,
	variant,
	minimalist,
	...rest
}) {
	const classes = cls(
		styles.button,
		styles[variant],
		minimalist ? styles.minimalist : null,
		className
	)

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
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
	minimalist: PropTypes.bool,
	variant: PropTypes.oneOf(['info', 'danger', 'warn', 'link'])
}

const defaultProps = {
	disabled: false,
	variant: 'info',
	minimalist: false
}

Button.defaultProps = defaultProps
Button.propTypes = propTypes

export default Button
