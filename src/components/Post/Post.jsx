import React, { useState } from 'react'

import PostRating from './PostRating'
import PostDetails from './PostDetails'
import PostOptionsMenu from './PostOptionsMenu'
import Container from '../Container/Container'

import { CommentsSection } from './Comments'

import styles from './Post.module.sass'

import { ReactComponent as Location } from '../../assets/gps.svg'

import { useProfile } from '../../stores/profile'
import { useAuth } from '../../stores/auth'

import { isMethodAllowed, isMethodNotAllowed } from '../../utils/general'

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
		author: { _id: authorId },
		_id
	} = props
	const [isMenuOpened, dispatchToggleMenu] = useState(false)
	const { profile } = useProfile()
	const { user } = useAuth()

	const toggleMenu = () => dispatchToggleMenu(!isMenuOpened)

	return (
		<Container data-id={_id}>
			<PostOptionsMenu
				toggle={toggleMenu}
				isMenuOpened={isMenuOpened}
				onDelete={isMethodAllowed(user._id, authorId, onDelete)}
				onPin={isMethodAllowed(user._id, authorId, onPin)}
				onReport={isMethodNotAllowed(user._id, authorId, onReport)}
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

			<CommentsSection onComment={onComment} comments={comments} {...profile} />
		</Container>
	)
}

export default Post
