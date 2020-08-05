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
	return (
		<>
			<hr />
			<div data-reaction={reaction} className={styles.rate}>
				<button className={styles.upvote} onClick={onUpvote}>
					{icons[0]} Approve
				</button>
				<button className={styles.downvote} onClick={onDownvote}>
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
