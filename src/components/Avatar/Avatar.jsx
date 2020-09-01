import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.sass'
import cls from '../../utils/cls'

import Placeholder from '../../assets/placeholder.png'

function Avatar({ avatar, verified, displayName, variant, className }) {
	const src = avatar || Placeholder

	return (
		<div
			className={cls(styles.avatar, className, styles[variant])}
			data-verified={verified}
		>
			<img src={src} alt={`${displayName}'s Avatar`} />
		</div>
	)
}

Avatar.propTypes = {
	avatar: PropTypes.string,
	verified: PropTypes.bool,
	variant: PropTypes.oneOf(['big', 'small', 'tiny'])
}

Avatar.defaultProps = {
	verified: false,
	variant: 'small'
}

export default Avatar
