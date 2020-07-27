import React from 'react'

import styles from './Container.module.sass'

function Container({ children, ...rest }) {
	return (
		<div className={styles.container} {...rest}>
			{children}
		</div>
	)
}

export default Container
