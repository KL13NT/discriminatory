import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as X } from '../../assets/x.svg'

import styles from './Banner.module.sass'
import cls from '../../utils/cls'

function Banner({ children, position, size, integrated, center, title, onDismiss }) {
	return (
		<div
			className={cls(
				styles.banner,
				styles[position],
				styles[size],
				styles[!center || 'center'],
				styles[!integrated || 'integrated']
			)}
		>
			<h1>{title}</h1>
			<span>{children}</span>

			{onDismiss ? (
				<button onClick={onDismiss} className={styles.button}>
					<X />
				</button>
			) : null}
		</div>
	)
}

Banner.propTypes = {
	/** What to be displayed as subtitle */
	children: PropTypes.any,
	center: PropTypes.bool,
	title: PropTypes.any,
	big: PropTypes.bool,
	position: PropTypes.oneOf(['top', 'bottom']),
	onDismiss: PropTypes.func
}

Banner.defaultProps = {
	position: 'bottom'
}

// TODO: add different variants for warn, danger, info

export default Banner
