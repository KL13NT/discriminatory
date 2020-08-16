import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as X } from '../../assets/x.svg'

import styles from './Banner.module.sass'
import cls from '../../utils/cls'

function Banner({ children, position, big, title, onDismiss }) {
	return (
		<div
			className={cls(styles.banner, styles[position], styles[!big || 'big'])}
		>
			<h1>{title}</h1>
			<span>{children}</span>

			{onDismiss ? (
				<button onClick={onDismiss}>
					<X />
				</button>
			) : null}
		</div>
	)
}

Banner.propTypes = {
	/** What to be displayed as subtitle */
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	big: PropTypes.bool.isRequired,
	position: PropTypes.oneOf(['top', 'bottom']),
	onDismiss: PropTypes.func
}

Banner.defaultProps = {
	position: 'bottom'
}

export default Banner
