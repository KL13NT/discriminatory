import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.sass'
import cls from '../../utils/cls'

function Avatar({ avatar, verified, className }) {
	return (
		<div className={cls(styles.avatar, className)} data-verified={verified}>
			<img src={avatar} alt={`${name}'s Avatar`} />
		</div>
	)
}

Avatar.propTypes = {
	avatar: PropTypes.string.isRequired,
	verified: PropTypes.bool
}

Avatar.defaultProps = {
	verified: false
}

export default Avatar
