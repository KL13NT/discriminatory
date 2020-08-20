import React from 'react'

import { ReactComponent as Upvote } from '../../assets/good.svg'
import { ReactComponent as Downvote } from '../../assets/bad.svg'

import styles from './PostRating.module.sass'

const icons = [
	<Upvote className={styles.upvoteIcon} key='upvote' />,
	<Downvote className={styles.downvoteIcon} key='downvote' />
]

function Score({ reactions }) {
	return (
		<div>
			<Upvote className={styles.upvoteIcon} />
			<span>{reactions.upvotes}</span>
			<Downvote className={styles.downvoteIcon} />
			<span>{reactions.upvotes}</span>
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

function PostRating({ reactions, onReact }) {
	return (
		<div className={styles.ratings}>
			<Score reactions={reactions} />
			{onReact ? <Rate onReact reaction={reactions.reaction} /> : null}
		</div>
	)
}

export { Score, Rate }
export default PostRating
