import React from 'react'
import { Link } from 'react-router-dom'

import styles from './PostDetails.module.sass'
import { FormattedDate, FormattedTime } from 'react-intl'
import Avatar from '../Avatar/Avatar'
import cls from '../../utils/cls'

function PostDetails({
	location,
	created,
	_id,
	author: { _id: authorId, displayName, verified, avatar }
}) {
	const avatarClasses = [styles.avatar, verified ? styles.verified : null].join(
		' '
	)

	return (
		<div className={styles.detailsContainer}>
			<div className={avatarClasses}>
				<Link to={`/${authorId}`}>
					<Avatar
						avatar={avatar}
						verified={verified}
						className={avatarClasses}
					/>
				</Link>
			</div>
			<div className={styles.details}>
				<Link to={`/${authorId}`}>
					<h1 className={cls(styles.name, 'u-text-limit')} dir='auto'>
						{displayName}
					</h1>
				</Link>
				<Link to={`/post/${_id}`} className={cls('u-text-limit', styles.date)}>
					<FormattedTime value={new Date(Number(created))} /> .{' '}
					<FormattedDate
						value={new Date(Number(created))}
						year='numeric'
						month='short'
						day='2-digit'
					/>{' '}
				</Link>
			</div>
		</div>
	)
}

export default PostDetails
