import React from 'react'
import { Link } from 'react-router-dom'

import styles from './PostDetails.module.sass'
import { FormattedDate, FormattedTime } from 'react-intl'
import Avatar from '../Avatar/Avatar'

function PostDetails({
	location,
	created,
	author: { _id, displayName, verified, avatar }
}) {
	const avatarClasses = [styles.avatar, verified ? styles.verified : null].join(
		' '
	)

	return (
		<div className={styles.detailsContainer}>
			<div className={avatarClasses}>
				<Link to={`/${_id}`}>
					<Avatar
						avatar={avatar}
						verified={verified}
						className={avatarClasses}
					/>
				</Link>
			</div>
			<div className={styles.details}>
				<Link to={`/${_id}`}>
					<h1 className={styles.name}>
						{displayName}
						<span className={styles.date}>
							<FormattedTime value={new Date(Number(created))} /> .{' '}
							<FormattedDate
								value={new Date(Number(created))}
								year='numeric'
								month='short'
								day='2-digit'
							/>{' '}
						</span>
					</h1>
				</Link>
				<h4 className={styles.location}>{location}</h4>
			</div>
		</div>
	)
}

export default PostDetails
