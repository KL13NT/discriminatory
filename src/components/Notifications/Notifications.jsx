import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Upvote } from '../../assets/good.svg'
import { ReactComponent as Downvote } from '../../assets/bad.svg'
import { ReactComponent as Comment } from '../../assets/comment 2.svg'

import styles from './Notifications.module.sass'

const getNotificationString = type => {
	if (type === 'comment') return 'commented on your post'
	if (type === 'upvote') return 'upvoted your post'
	if (type === 'downvote') return 'downvoted your post'
}

const Notification = ({ details, notification }) => {
	const path = `/${details.id}/${notification.postId}`
	const event = getNotificationString(notification.type)

	return (
		<Link
			className={styles.notification}
			data-read={notification.read}
			data-type={notification.type}
			to={path}
		>
			<div>
				<img src={details.avatar} alt='Profile Avatar' />
				<span>
					<span>{details.name}</span>&nbsp;
					{event}
				</span>
			</div>
			{notification.type === 'comment' ? (
				<Comment />
			) : notification.type === 'upvote' ? (
				<Upvote />
			) : notification.type === 'downvote' ? (
				<Downvote />
			) : null}
		</Link>
	)
}

const defaultProps = {}
const propTypes = {}

Notification.propTypes = propTypes
Notification.defaultProps = defaultProps

export default Notification
