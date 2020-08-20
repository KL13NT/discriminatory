import React, { useState } from 'react'

import PostRating from './PostRating'
import PostDetails from './PostDetails'
import PostOptionsMenu from './PostOptionsMenu'
import { CommentComposer } from './Comments'
import { Comments } from './Comments'

import styles from './Post.module.sass'
import Container from '../Container/Container'
import { FormattedTime, FormattedDate } from 'react-intl'
import { Link } from 'react-router-dom'
//TODO: remove this to save memory. Duplicating this component for each post is
//a memory waste. This probably doesn't need to happen because we'll be
//windowing posts

function Post({ onReport, onDelete, onPin, onReact, onComment, ...props }) {
	const { content, comments, reactions, created, _id } = props
	const [isMenuOpened, dispatchToggleMenu] = useState(false)

	const toggleMenu = () => dispatchToggleMenu(!isMenuOpened)

	const onAction = (action, e) => {
		if (action === 'report') onReport(_id, e)
		else if (action === 'delete') onDelete(_id, e)
		else if (action === 'pin') onPin(_id, e)

		toggleMenu()
	}

	return (
		<Container>
			<PostOptionsMenu
				toggle={toggleMenu}
				isMenuOpened={isMenuOpened}
				onAction={onAction}
				onDelete={onDelete}
				onReport={onReport}
				onPin={onPin}
			/>
			<PostDetails {...props} />
			<p className={styles.content}>{content}</p>
			{/* <Link to={`/post/${_id}`}>
				<span className={styles.date}>
					<FormattedTime value={new Date(Number(created))} /> .{' '}
					<FormattedDate
						value={new Date(Number(created))}
						year='numeric'
						month='short'
						day='2-digit'
					/>{' '}
				</span>
			</Link> */}
			<PostRating reactions={reactions} onReact={onReact} />
			<CommentComposer onCompose={onComment} {...props} />
			<Comments comments={comments} />
		</Container>
	)
}

export default Post
