import React from 'react'

import { ReactComponent as Upvote } from '../../assets/good.svg'
import { ReactComponent as Downvote } from '../../assets/bad.svg'

import styles from './PostRating.module.sass'

const icons = [
	<Upvote className={styles.upvoteIcon} key='upvote' />,
	<Downvote className={styles.downvoteIcon} key='downvote' />
]

function Score({ ratings }) {
	return (
		<div>
			{ratings.majority === 'upvotes' ? icons : icons.reverse()}
			<span>{ratings.total}</span>
		</div>
	)
}

function Rate({ reaction, onUpvote, onDownvote }) {
	const upvoteClasses = [
		styles.upvote,
		reaction === 'upvote' ? styles.active : null
	].join(' ')
	const downvoteClasses = [
		styles.downvote,
		reaction === 'downvote' ? styles.active : null
	].join(' ')

	return (
		<>
			<hr />
			<div>
				<button className={upvoteClasses} onClick={onUpvote}>
					{icons[0]} Approve
				</button>
				<button className={downvoteClasses} onClick={onDownvote}>
					{icons[1]} False
				</button>
			</div>
		</>
	)
}

function PostRating({ ratings, onUpvote, onDownvote, reaction }) {
	return (
		<div className={styles.ratings}>
			<Score ratings={ratings} />
			{onUpvote && onDownvote ? (
				<Rate onUpvote={onUpvote} onDownvote={onDownvote} reaction={reaction} />
			) : null}
		</div>
	)
}

export { Score, Rate }
export default PostRating
