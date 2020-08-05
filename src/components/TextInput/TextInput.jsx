import React from 'react'
import PropTypes from 'prop-types'

import styles from './TextInput.module.sass'
import cls from '../../utils/cls'

/**
 * Props are forwarded to the input, not containing div
 */
function TextInput({ minimalist, icon: Icon, className, onChange, ...props }) {
	return (
		<div
			className={cls(
				styles.container,
				minimalist ? styles.minimalist : styles.full
			)}
		>
			{Icon && !minimalist ? <Icon /> : null}
			<input
				className={cls(styles.input, className)}
				onChange={onChange}
				{...props}
			/>
		</div>
	)
}

const propTypes = {
	name: PropTypes.string.isRequired,
	icon: PropTypes.node,
	minimalist: PropTypes.bool,
	onChange: PropTypes.func.isRequired
}

const defaultProps = {
	minimalist: false,
	icon: undefined
}

TextInput.defaultProps = defaultProps
TextInput.propTypes = propTypes

export default TextInput
