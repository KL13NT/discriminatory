import React, { useState } from 'react'

import PostRating from './PostRating'
import PostDetails from './PostDetails'
import PostOptionsMenu from './PostOptionsMenu'
import Container from '../Container/Container'
import Button from '../Button/Button'

import { CommentsSection } from './Comments'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as Pin } from '../../assets/security-pin.svg'
import { ReactComponent as Location } from '../../assets/gps.svg'

import { useProfile } from '../../stores/profile'
import { useAuth } from '../../stores/auth'

import styles from './Post.module.sass'

import { isMethodAllowed, isMethodNotAllowed } from '../../utils/general'

const Pinned = () => (
	<span className={styles.pinned}>
		<Pin />
		<FormattedMessage id={'general.pinned'} />
	</span>
)

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
		location: { location, reputation },
		pinned,
		author: { _id: authorId },
		_id
	} = props
	const [isMenuOpened, dispatchToggleMenu] = useState(false)
	const [commentsExpanded, setCommentsExpanded] = useState(false)
	const { profile } = useProfile()
	const { user } = useAuth()

	const toggleMenu = () => dispatchToggleMenu(!isMenuOpened)

	return (
		<Container data-id={_id}>
			{pinned ? <Pinned /> : null}

			<PostOptionsMenu
				toggle={toggleMenu}
				pinned={pinned}
				isMenuOpened={isMenuOpened}
				onDelete={isMethodAllowed(user, authorId, onDelete)}
				onPin={isMethodAllowed(user, authorId, onPin)}
				onReport={isMethodNotAllowed(user, authorId, onReport)}
			/>

			<PostDetails {...props} />

			<p className={styles.content} dir='auto'>
				{content}
			</p>

			<span className={styles.location}>
				<Location />
				{location}
			</span>

			{reactions ? (
				<PostRating
					reactions={reactions}
					onUpvote={onUpvote}
					onDownvote={onDownvote}
					user={user}
				/>
			) : null}

			{
				<Button
					variant='link'
					onClick={() => setCommentsExpanded(!commentsExpanded)}
				>
					{commentsExpanded ? 'Hide comments' : 'Show comments'}
				</Button>
			}

			{commentsExpanded && comments ? (
				<CommentsSection
					onComment={onComment}
					comments={comments}
					{...profile}
				/>
			) : null}
		</Container>
	)
}

export default Post
