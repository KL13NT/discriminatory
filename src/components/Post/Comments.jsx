import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useIntl, FormattedMessage } from 'react-intl'

import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'

import styles from './Comments.module.sass'
import Textarea from '../Textarea/Textarea'

function CommentComposer({ onComment, ...profile }) {
	const { formatMessage: f } = useIntl()
	const [enabled, toggle] = useState(false)
	const [canSubmit, setCanSubmit] = useState(false)
	const [isHoldingShift, dispatchShift] = useState(false)

	const onClose = () => {
		toggle(!enabled)
	}

	const onSubmit = e => {
		if (!canSubmit) return

		onClose()
		onComment(e)
	}

	const onInput = ({ target }) => {
		if (target.value.trim().length > 0) setCanSubmit(true)
		else setCanSubmit(false)
	}

	const onKeyDown = e => {
		const { key } = e

		if (key === 'Shift') dispatchShift(true)
		if (key === 'Enter' && !isHoldingShift) onSubmit(e)
	}

	const onKeyUp = ({ key }) => {
		if (key === 'Shift') dispatchShift(false)
	}

	return (
		<>
			<div className={styles.composer}>
				<Avatar {...profile} variant='tiny' />
				<span className={styles.content}>
					<Textarea
						onInput={onInput}
						onKeyDown={onKeyDown}
						onKeyUp={onKeyUp}
						resize
						name='content'
						role='textbox'
						aria-label='Comment content'
						aria-multiline='true'
						tabIndex={0}
						contentEditable={true}
						placeholder={f({ id: 'placeholders.comment' })}
					/>
				</span>
			</div>
			<span className='u-disclaimer'>
				<FormattedMessage id='tutorial.comment' />
			</span>
		</>
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
			{onLoadComments && comments.length === 5 ? (
				<Button variant='link' onClick={onLoadComments}>
					<FormattedMessage id='actions.showmorecomments' />
				</Button>
			) : null}
		</>
	)
}

export { CommentComposer, Comments, CommentsSection }
