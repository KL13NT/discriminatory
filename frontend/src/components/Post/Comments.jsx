import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Comments.module.sass'

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

export { CommentComposer, Comments }
