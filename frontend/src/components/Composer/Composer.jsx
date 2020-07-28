import React, { useState } from 'react'

import ComposerRating from './ComposerRating'
import ComposerDetails from './ComposerDetails'
import ComposerOptionsMenu from './ComposerOptionsMenu'
import { CommentComposer } from './Comments'
import { Comments } from './Comments'

import styles from './Composer.module.sass'
import Container from '../Container/Container'
//TODO: remove this to save memory. Duplicating this component for each Composer is
//a memory waste. This probably doesn't need to happen because we'll be
//windowing Composers

function Composer({
	details,
	onSubmit,
	...props
}) {
	const [isLocationPickerOpen, toggleLocationPicker] = useState(false)

	const toggleMenu = () => {
		toggleLocationPicker(!isMenuOpened)
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
			<ComposerOptionsMenu
				toggle={toggleMenu}
				isMenuOpened={isMenuOpened}
				onAction={onAction}
				onDelete={onDelete}
				onPin={onPin}
				onReport={onReport}
			/>
			<ComposerDetails {...details} />
			<p className={styles.content}>{content}</p>
			<ComposerRating
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

export default Composer
