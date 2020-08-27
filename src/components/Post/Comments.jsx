import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useIntl, FormattedMessage } from 'react-intl'

import styles from './Comments.module.sass'

import Avatar from '../Avatar/Avatar'
import { useRef } from 'react'
import Button from '../Button/Button'

// REFACTORME: move to utils
const resize = currentTarget => {
	const offset = currentTarget.offsetHeight - currentTarget.clientHeight

	event.target.style.height = 'auto'
	event.target.style.height = event.target.scrollHeight + offset + 'px'
}

function CommentComposer({ onComment, ...profile }) {
	const [isHoldingShift, dispatchShift] = useState(false)
	const { formatMessage: f } = useIntl()
	const formRef = useRef()

	const onKeyDown = ({ key }) => {
		if (key === 'Shift') dispatchShift(true)
		if (key === 'Enter' && !isHoldingShift) formRef.current.requestSubmit()
	}

	const onKeyUp = ({ key }) => {
		if (key === 'Shift') dispatchShift(false)
	}

	const onInput = ({ currentTarget }) => {
		resize(currentTarget)
	}

	if (!onComment) return null
	return (
		<form onSubmit={onComment} ref={formRef} className={styles.composer}>
			<Avatar {...profile} variant='tiny' />
			<textarea
				name='content'
				aria-label='Comment content input'
				placeholder={f({ id: 'placeholders.composer' })}
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
				onInput={onInput}
			/>
		</form>
	)
}

function Comments({ comments }) {
	return comments.map(({ content, _id, author }) => (
		<div className={styles.comment} key={_id}>
			<Avatar {...author} variant='tiny' />
			<span className={styles.content}>
				<Link to={`/${author._id}`}>
					<h1 dir='auto'>{author.displayName}</h1>
				</Link>
				<p dir='auto'>{content}</p>
			</span>
		</div>
	))
}

function CommentsSection({ comments, onComment, onLoadComments, ...profile }) {
	if (!onComment) return null
	return (
		<>
			<CommentComposer onComment={onComment} {...profile} />
			<Comments comments={comments} />
			{onLoadComments ? (
				<Button variant='link' onClick={onLoadComments}>
					<FormattedMessage id='actions.showmorecomments' />
				</Button>
			) : null}
		</>
	)
}

export { CommentComposer, Comments, CommentsSection }
