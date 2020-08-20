import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.sass'
import cls from '../../utils/cls'
import { useEffect } from 'react'
import { getAvatarUrl } from '../../utils/profiles'

import Placeholder from '../../assets/placeholder.png'
import { useAvatars } from '../../stores/avatars'

function Avatar({ avatar, _id, verified, displayName, variant, className }) {
	const { avatars, updateAvatars } = useAvatars()
	const av = avatars.find(av => av.key === avatar)
	const src = av ? av.avatar : Placeholder

	useEffect(() => {
		if (src === Placeholder && avatar) {
			getAvatarUrl(avatar)
				.then(av => {
					updateAvatars({ avatar: av, key: avatar })
				})
				.catch(e => {
					console.log('COPY THIS WHEN REPORTING', e)
				})
		}
	}, [_id, avatar, avatars, src, updateAvatars])

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
	variant: PropTypes.oneOf(['big', 'small'])
}

Avatar.defaultProps = {
	verified: false,
	variant: 'small'
}

export default Avatar
