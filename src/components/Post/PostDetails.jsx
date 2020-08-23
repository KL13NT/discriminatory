import React from 'react'
import { Link } from 'react-router-dom'

import styles from './PostDetails.module.sass'
import { FormattedDate, FormattedTime } from 'react-intl'
import Avatar from '../Avatar/Avatar'
import cls from '../../utils/cls'

function PostDetails({ created, _id, author }) {
	const { _id: authorId, displayName } = author

	return (
		<div className={styles.detailsContainer}>
			<Link to={`/${authorId}`}>
				<Avatar {...author} />
			</Link>
			<div className={styles.details}>
				<Link to={`/${authorId}`}>
					<h1 className={cls(styles.name, 'u-text-limit')} dir='auto'>
						{displayName}
					</h1>
				</Link>
				<Link
					to={`/${authorId}/${_id}`}
					className={cls('u-text-limit', styles.date)}
				>
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
