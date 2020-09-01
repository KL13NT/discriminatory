import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import Container from '../Container/Container'
import Button from '../Button/Button'
import Avatar from '../Avatar/Avatar'

import { useAuth } from '../../stores/auth'

import { ReactComponent as Location } from '../../assets/gps.svg'

import Cover from '../../assets/cover.jpg'

import styles from './ProfileHeader.module.sass'

export function ProfileHeader({ onFollow, onUnfollow, profile }) {
	const { user } = useAuth()
	const { displayName, tagline, location, avatar, verified, _id } = profile.user

	return (
		<Container className={styles.header}>
			<img src={Cover} alt='Profile header' />
			<div className={styles.details}>
				<Avatar
					variant='big'
					avatar={avatar}
					displayName={displayName}
					verified={verified}
				/>
				<h1 dir='auto'>{displayName}</h1>
				<span dir='auto'>{tagline}</span>
				<span dir='auto'>
					<Location />
					{location}
				</span>
				{_id !== user.uid ? (
					profile.following ? (
						<Button variant='info' onClick={onUnfollow}>
							<FormattedMessage id='actions.unfollowprofile' />
						</Button>
					) : (
						<Button variant='info' onClick={onFollow}>
							<FormattedMessage id='actions.followprofile' />
						</Button>
					)
				) : null}
				{user && user.uid === _id ? (
					<Link to='/settings/profile'>
						<FormattedMessage id='actions.editprofile' />
					</Link>
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
