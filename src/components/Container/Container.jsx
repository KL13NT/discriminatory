import React from 'react'

import styles from './Container.module.sass'
import cls from '../../utils/cls'

function Container({ children, className, ...rest }) {
	const classes = cls(styles.container, className)

	return (
		<div className={classes} {...rest}>
			{children}
		</div>
	)
}

export default Container
