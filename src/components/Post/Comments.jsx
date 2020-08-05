import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Comments.module.sass'

function CommentComposer({ onCompose, ...details }) {
	const [isHoldingShift, dispatchShift] = useState(false)

	const onKeyDown = ({ currentTarget, key }) => {
		if (key === 'Shift') dispatchShift(true)
		if (key === 'Enter' && !isHoldingShift) onCompose(currentTarget.parentNode)
	}

	const onKeyUp = ({ key }) => {
		if (key === 'Shift') dispatchShift(false)
	}

	const resize = currentTarget => {
		const offset = currentTarget.offsetHeight - currentTarget.clientHeight

		event.target.style.height = 'auto'
		event.target.style.height = event.target.scrollHeight + offset + 'px'
	}

	const onInput = ({ currentTarget }) => {
		resize(currentTarget)
	}

	return (
		<form onSubmit={onCompose} className={styles.composer}>
			<img alt={`${details.name}'s Profile Avatar`} src={details.avatar} />
			<textarea
				name='content'
				aria-label='Comment content input'
				placeholder='Write a comment...'
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
				onInput={onInput}
			/>
		</form>
	)
}

function Comments({ comments }) {
	return comments.map(({ content, details }) => (
		<div className={styles.comment} key={`${content}${details.id}`}>
			<img alt={`${details.name}'s Profile Avatar`} src={details.avatar} />
			<span className={styles.content}>
				<Link to={details.id}>
					<h1>{details.name}</h1>
				</Link>
				<p>{content}</p>
			</span>
		</div>
	))
}

export { CommentComposer, Comments }
