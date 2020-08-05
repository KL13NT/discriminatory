import React from 'react'
import { Link } from 'react-router-dom'

import styles from './PostDetails.module.sass'

function PostDetails({ name, location, date, verified, avatar, id }) {
	const avatarClasses = [styles.avatar, verified ? styles.verified : null].join(
		' '
	)

	return (
		<div className={styles.detailsContainer}>
			<div className={avatarClasses}>
				<Link to={`/${id}`}>
					<img alt={`${name}'s Profile Avatar`} src={avatar} />
				</Link>
			</div>
			<div className={styles.details}>
				<Link to={`/${id}`}>
					<h1 className={styles.name}>
						{name}
						<span className={styles.date}>{date}</span>
					</h1>
				</Link>
				<h4 className={styles.location}>{location}</h4>
			</div>
		</div>
	)
}

export default PostDetails
