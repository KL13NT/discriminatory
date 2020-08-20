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
	comments,
	reactions,
	onReport,
	onDelete,
	onPin,
	onReact,
	onComment,
	_id,
	profile,
	...details
}) {
	const [isMenuOpened, dispatchToggleMenu] = useState(false)

	const toggleMenu = () => {
		dispatchToggleMenu(!isMenuOpened)
	}

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
				onPin={onPin}
				onReport={onReport}
			/>
			<PostDetails {...details} />
			<p className={styles.content}>{content}</p>
			<PostRating reactions={reactions} onReact={onReact} />
			<CommentComposer onCompose={onComment} {...profile} />
			<Comments comments={comments} />
		</Container>
	)
}

export default Post
