import React from 'react'

import Container from '../Container/Container'
import Button from '../Button/Button'

import styles from './ProfileHeader.module.sass'

import { ReactComponent as Location } from '../../assets/gps.svg'
import { Link } from 'react-router-dom'
import Cover from '../../assets/cover.jpg'

function ProfileDetails({
	displayName,
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
				<img src={avatar} alt={`${displayName}'s Avatar`} />
			</div>
			<h1>{displayName}</h1>
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
			{isOwnProfile ? <Link to='/settings/profile'>Edit</Link> : null}
		</div>
	)
}

export function ProfileHeader({ onClick, profile }) {
	return (
		<Container className={styles.header}>
			<img src={profile.header} alt='Profile header' />
			<ProfileDetails {...profile} onClick={onClick} />
		</Container>
	)
}

export function ProfilePreview({ displayName, avatar, tagline, location }) {
	const onClick = e => e.preventDefault()
	return (
		<div className={styles.preview}>
			<img src={Cover} alt='Profile header' />
			<div className={styles.details}>
				<div className={styles.avatar}>
					<img src={avatar} alt={`${displayName}'s Avatar`} />
				</div>
				<h1>{displayName}</h1>
				<span>{tagline}</span>
				<span>
					<Location />
					{location}
				</span>
				<Button variant='info' onClick={onClick}>
					Follow
				</Button>
			</div>
		</div>
	)
}
