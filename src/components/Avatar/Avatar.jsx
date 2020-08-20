import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.sass'
import cls from '../../utils/cls'
import { useEffect } from 'react'
import { getAvatarUrl } from '../../utils/profiles'
import { useState } from 'react'

import Placeholder from '../../assets/placeholder.png'

function Avatar({ avatar, verified, displayName, className }) {
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
		<div className={cls(styles.avatar, className)} data-verified={verified}>
			<img src={avatarSrc} alt={`${displayName}'s Avatar`} />
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
