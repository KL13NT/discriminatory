import React from 'react'

import styles from './Container.module.sass'

function Container({ children, className, ...rest }) {
	const classes = [styles.container, className].join(' ')

	return (
		<div className={classes} {...rest}>
			{children}
		</div>
	)
}

export default Container
