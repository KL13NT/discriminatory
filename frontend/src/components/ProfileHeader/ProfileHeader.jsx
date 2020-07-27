import React from 'react'

import Container from '../Container/Container'
import Button from '../Button/Button'

import styles from './ProfileHeader.module.sass'

import { ReactComponent as Location } from '../../assets/gps.svg'

function ProfileDetails({
	name,
	tagline,
	location,
	avatar,
	isOwnProfile,
	isFollowed,
	isVerified,
	onClick
}) {
	return (
		<div className={styles.details}>
			<div className={styles.avatar} data-verified={isVerified}>
				<img src={avatar} alt={`${name}'s Avatar`} />
			</div>
			<h1>{name}</h1>
			<span>{tagline}</span>
			<span>
				<Location />
				{location}
			</span>
			{!isOwnProfile ? (
				isFollowed ? (
					<Button variant='info' onClick={onClick}>
						Unfollow
					</Button>
				) : (
					<Button variant='info' onClick={onClick}>
						Follow
					</Button>
				)
			) : null}
		</div>
	)
}

function ProfileHeader({ onClick, profile }) {
	return (
		<Container className={styles.header}>
			<img src={profile.header} alt='Profile header' />
			<ProfileDetails {...profile} onClick={onClick} />
		</Container>
	)
}

export default ProfileHeader
