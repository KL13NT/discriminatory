import React from 'react'
import PropTypes from 'prop-types'

import styles from './Banner.module.sass'
import cls from '../../utils/cls'

function Banner({ children, position, size }) {
	return (
		<div className={cls(styles.banner, styles[position], styles[size])}>
			{children}
		</div>
	)
}

Banner.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOf(['big', 'small']),
	position: PropTypes.oneOf(['top', 'bottom'])
}

Banner.defaultProps = {
	size: 'small',
	position: 'bottom'
}

export default Banner
