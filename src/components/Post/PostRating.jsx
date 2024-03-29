import React from 'react'

import { ReactComponent as Upvote } from '../../assets/good.svg'
import { ReactComponent as Downvote } from '../../assets/bad.svg'

import styles from './PostRating.module.sass'
import { useIntl } from 'react-intl'

const icons = [
	<Upvote className={styles.upvoteIcon} key='upvote' />,
	<Downvote className={styles.downvoteIcon} key='downvote' />
]

function Score({ reactions: { upvotes, downvotes } }) {
	const { formatNumber: fn, formatMessage: f } = useIntl()

	if (upvotes + downvotes === 0) return <div></div>
	return (
		<div className={styles.score}>
			<span>{upvotes === 0 ? f({ id: 'numbers.zero' }) : fn(upvotes)}</span>
			<Upvote className={styles.upvoteIcon} />
			<span>{downvotes === 0 ? f({ id: 'numbers.zero' }) : fn(downvotes)}</span>
			<Downvote className={styles.downvoteIcon} />
		</div>
	)
}

function Rate({ reaction, onUpvote, onDownvote }) {
	const { formatMessage: f } = useIntl()
	return (
		<>
			<hr />
			<div data-reaction={reaction} className={styles.rate}>
				<button className={styles.upvote} onClick={onUpvote}>
					{icons[0]} {f({ id: 'actions.upvote' })}
				</button>
				<button className={styles.downvote} onClick={onDownvote}>
					{icons[1]} {f({ id: 'actions.downvote' })}
				</button>
			</div>
		</>
	)
}

function PostRating({ reactions, onUpvote, onDownvote, user }) {
	return (
		<div className={styles.ratings}>
			<Score reactions={reactions} />
			{onUpvote && onDownvote && user && user.emailVerified ? (
				<Rate
					onUpvote={onUpvote}
					onDownvote={onDownvote}
					reaction={reactions.reaction}
				/>
			) : null}
		</div>
	)
}

export { Score, Rate }
export default PostRating
