import React, { useState } from 'react'

import PostRating from './PostRating'
import PostDetails from './PostDetails'
import PostOptionsMenu from './PostOptionsMenu'
import { CommentComposer } from './Comments'
import { Comments } from './Comments'

import styles from './Post.module.sass'
import Container from '../Container/Container'
//TODO: remove this to save memory. Duplicating this component for each post is
//a memory waste. This probably doesn't need to happen because we'll be
//windowing posts

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
		<Container>
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
		</Container>
	)
}

export { Post }
