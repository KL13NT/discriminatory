import React, { useState } from 'react'

import PostRating from './PostRating'
import PostDetails from './PostDetails'
import PostOptionsMenu from './PostOptionsMenu'
import { CommentComposer } from './Comments'
import { Comments } from './Comments'

import styles from './Post.module.sass'
import Container from '../Container/Container'

import { ReactComponent as Location } from '../../assets/gps.svg'
import { useProfile } from '../../stores/profile'

//TODO: remove this to save memory. Duplicating this component for each post is
//a memory waste. This probably doesn't need to happen because we'll be
//windowing posts

function Post(props) {
	const {
		onComment,
		onDelete,
		onReport,
		onPin,
		onUpvote,
		onDownvote,
		content,
		comments,
		reactions,
		location,
		_id
	} = props
	const [isMenuOpened, dispatchToggleMenu] = useState(false)
	const { profile } = useProfile()

	const toggleMenu = () => dispatchToggleMenu(!isMenuOpened)

	return (
		<Container data-id={_id}>
			<PostOptionsMenu
				toggle={toggleMenu}
				isMenuOpened={isMenuOpened}
				onDelete={onDelete}
				onReport={onReport}
				onPin={onPin}
			/>
			<PostDetails {...props} />
			<p className={styles.content} dir='auto'>
				{content}
			</p>
			<span className={styles.location}>
				<Location />
				{location}
			</span>
			<PostRating
				reactions={reactions}
				onUpvote={onUpvote}
				onDownvote={onDownvote}
			/>
			<CommentComposer onComment={onComment} {...profile} />
			<Comments comments={comments} />
		</Container>
	)
}

export default Post
