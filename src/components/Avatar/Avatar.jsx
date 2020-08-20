import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.sass'
import cls from '../../utils/cls'
import { useEffect } from 'react'
import { getAvatarUrl } from '../../utils/profiles'
import { useState } from 'react'

import Placeholder from '../../assets/placeholder.png'

function Avatar({ avatar, verified, displayName, variant, className }) {
	const [avatarSrc, setAvatarSrc] = useState(Placeholder)

	useEffect(() => {
		if (avatar)
			getAvatarUrl(avatar)
				.then(avatar => {
					setAvatarSrc(avatar)
				})
				.catch(e => {
					setAvatarSrc(Placeholder)
					console.log('COPY THIS WHEN REPORTING', e)
				})
	}, [avatar])

	return (
		<div
			className={cls(styles.avatar, className, styles[variant])}
			data-verified={verified}
		>
			<img src={avatarSrc} alt={`${displayName}'s Avatar`} />
		</div>
	)
}

Avatar.propTypes = {
	avatar: PropTypes.string,
	verified: PropTypes.bool,
	variant: PropTypes.oneOf(['big', 'small'])
}

Avatar.defaultProps = {
	verified: false,
	variant: 'small'
}

export default Avatar
