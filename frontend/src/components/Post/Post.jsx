import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { ReactComponent as Arrow } from '../../assets/arrow.svg'

import styles from './Post.module.sass'

import { ReactComponent as Report } from '../../assets/police-badge.svg'
import { ReactComponent as Delete } from '../../assets/delete.svg'
import { ReactComponent as Pin } from '../../assets/security-pin.svg'
import { ReactComponent as Upvote } from '../../assets/good.svg'
import { ReactComponent as Downvote } from '../../assets/bad.svg'

//TODO: remove this to save memory. Duplicating this component for each post is
//a memory waste. This probably doesn't need to happen because we'll be
//windowing posts

function PostOptionsMenu({
	onAction,
	onReport,
	onDelete,
	onPin,
	toggle,
	isMenuOpened
}) {
	return (
		<div>
			<button onClick={toggle} className={styles.menuToggle}>
				<Arrow alt='Post list icon' />
			</button>

			{isMenuOpened ? (
				<div className={styles.menu}>
					{onPin ? (
						<button onClick={e => onAction('pin', e)} className={styles.pin}>
							<Pin />
							<span>Pin this post to your profile</span>
						</button>
					) : null}
					{onDelete ? (
						<button
							onClick={e => onAction('delete', e)}
							className={styles.delete}
						>
							<Delete />
							<span>Delete post permanently</span>
						</button>
					) : null}
					{onReport ? (
						<button
							onClick={e => onAction('report', e)}
							className={styles.report}
						>
							<Report />
							<span>Report this post to support</span>
						</button>
					) : null}
				</div>
			) : null}
		</div>
	)
}

function PostDetails({ name, location, date, verified, pfp, id }) {
	const pfpClasses = [styles.pfp, verified ? styles.verified : null].join(' ')

	return (
		<div className={styles.detailsContainer}>
			<div className={pfpClasses}>
				<Link to={`/${id}`}>
					<img alt={`${name}'s Profile Avatar`} src={pfp} />
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

function PostRating({ ratings, onUpvote, onDownvote, reaction }) {
	const icons = [
		<Upvote className={styles.upvoteIcon} key='upvote' />,
		<Downvote className={styles.downvoteIcon} key='downvote' />
	]

	const upvoteClasses = [
		styles.upvote,
		reaction === 'upvote' ? styles.active : null
	].join(' ')
	const downvoteClasses = [
		styles.downvote,
		reaction === 'downvote' ? styles.active : null
	].join(' ')

	return (
		<div className={styles.ratings}>
			<div>
				{ratings.majority === 'upvotes' ? icons : icons.reverse()}
				<span>{ratings.total}</span>
			</div>
			{onUpvote && onDownvote ? (
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
			) : null}
		</div>
	)
}

//REFACTORME: move these into subcomponents
function CommentComposer({ onCompose, ...details }) {
	return (
		<form onSubmit={onCompose} className={styles.composer}>
			<img alt={`${details.name}'s Profile Avatar`} src={details.pfp} />
			<input type='text' placeholder='Write a comment...' />
		</form>
	)
}

function Comments({ comments }) {
	return comments.map(({ content, details }) => (
		<div className={styles.comment} key={`${content}${details.id}`}>
			<img alt={`${details.name}'s Profile Avatar`} src={details.pfp} />
			<span className={styles.content}>
				<Link to={details.id}>
					<h1>{details.name}</h1>
				</Link>
				<p>{content}</p>
			</span>
		</div>
	))
}

function Post({
	content,
	ratings,
	comments,
	reaction,
	onReport,
	onDelete,
	onPin,
	onUpvote,
	onDownvote,
	onCommentCreate,
	...details
}) {
	const [isMenuOpened, dispatchToggleMenu] = useState(false)

	const toggleMenu = () => {
		dispatchToggleMenu(!isMenuOpened)
	}

	const onAction = (action, e) => {
		console.log(action)
		if (action === 'report') onReport(details.id, e)
		else if (action === 'delete') onDelete(details.id, e)
		else if (action === 'pin') onPin(details.id, e)

		toggleMenu()
	}

	return (
		<div className={styles.post}>
			<PostOptionsMenu
				toggle={toggleMenu}
				isMenuOpened={isMenuOpened}
				onAction={onAction}
				onDelete={onDelete}
				onPin={onPin}
				onReport={onReport}
			/>
			<PostDetails {...details} />
			<p className={styles.content}>{content}</p>
			<PostRating
				ratings={ratings}
				reaction={reaction}
				onUpvote={onUpvote}
				onDownvote={onDownvote}
			/>
			<CommentComposer onCompose={onCommentCreate} {...details} />
			<Comments comments={comments} />
		</div>
	)
}

export { PostDetails, PostRating, Post, CommentComposer, Comments }
