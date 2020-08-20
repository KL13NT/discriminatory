import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.sass'
import cls from '../../utils/cls'
import { useEffect } from 'react'
import { getAvatarUrl } from '../../utils/profiles'
import { useState } from 'react'

import Placeholder from '../../assets/placeholder.png'
import { useAvatars } from '../../stores/avatars'

function Avatar({ avatar, _id, verified, displayName, variant, className }) {
	const { updateAvatars, getAvatar } = useAvatars()
	const [avatarSrc, setAvatarSrc] = useState(Placeholder)

	useEffect(() => {
		if(avatar){
			if (getAvatar(avatar)) setAvatarSrc(getAvatar(avatar))
			else {
				if (avatar)
					getAvatarUrl(avatar)
						.then(avatar => {
							setAvatarSrc(avatar)
							updateAvatars({ avatar, key: avatar })
						})
						.catch(e => {
							setAvatarSrc(Placeholder)
							updateAvatars({ avatar, _id })
							console.log('COPY THIS WHEN REPORTING', e)
						})
			}
		}
	}, [])

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
