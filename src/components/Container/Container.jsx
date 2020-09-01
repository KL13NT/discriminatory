import React from 'react'

import styles from './Container.module.sass'
import cls from '../../utils/cls'

function Container({ children, title, subtitle, className, ...rest }) {
	const classes = cls(styles.container, className)

	return (
		<div className={classes} {...rest}>
			{title || subtitle ? (
				<div className={styles.meta}>
					<div>
						{title ? <span>{title}</span> : null}
						{subtitle ? <span>{subtitle}</span> : null}
					</div>
				</div>
			) : null}
			{children}
		</div>
	)
}

export default Container
