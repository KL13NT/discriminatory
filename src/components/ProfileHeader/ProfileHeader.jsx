import React from 'react'

import Container from '../Container/Container'
import Button from '../Button/Button'

import styles from './ProfileHeader.module.sass'

import { ReactComponent as Location } from '../../assets/gps.svg'
import { Link } from 'react-router-dom'
import Cover from '../../assets/cover.jpg'
import { useAuth } from '../../stores/auth'
import Avatar from '../Avatar/Avatar'

export function ProfileHeader({ onClick, profile }) {
	const { user } = useAuth()
	const { displayName, tagline, location, avatar, verified, _id } = profile.user

	return (
		<Container className={styles.header}>
			<img src={Cover} alt='Profile header' />
			<div className={styles.details}>
				<Avatar avatar={avatar} displayName={displayName} variant='big' />
				<h1>{displayName}</h1>
				<span>{tagline}</span>
				<span>
					<Location />
					{location}
				</span>
				{_id !== user.uid ? (
					profile.following ? (
						<Button variant='info' onClick={onClick}>
							Unfollow
						</Button>
					) : (
						<Button variant='info' onClick={onClick}>
							Follow
						</Button>
					)
				) : null}
				{user && user.uid === _id ? (
					<Link to='/settings/profile'>Edit</Link>
				) : null}
			</div>
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
