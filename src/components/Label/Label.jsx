import React from 'react'
import PropTypes from 'prop-types'

import styles from './Label.module.sass'

import cls from '../../utils/cls'

/**
 * Used as label for forms
 */
function Label({ htmlFor, sub, children, className, ...props }) {
	return (
		<label
			className={cls(styles.label, className)}
			htmlFor={htmlFor}
			{...props}
		>
			{sub ? <span>{sub}</span> : null}
			{children}
		</label>
	)
}

Label.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	sub: PropTypes.string
}

export default Label
