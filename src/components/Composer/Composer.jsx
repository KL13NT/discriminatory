import React, { useState, useEffect } from 'react'

import Container from '../Container/Container'
import Avatar from '../Avatar/Avatar'
import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'
import LocationPicker from '../LocationPicker/LocationPicker'

import styles from './Composer.module.sass'

// REFACTORME: use useCallback & useEffect
function Composer({ avatar, verified, onSubmit, ...props }) {
	const [canSubmit, setCanSubmitState] = useState(false)
	const [postData, setPostData] = useState({ location: null, content: '' })

	useEffect(() => {
		console.log(
			postData,
			postData.content.trim().length > 0 && postData.location
		)
		if (postData.content.trim().length > 0 && postData.location)
			setCanSubmitState(true)
	}, [postData.content, postData.location, postData])

	const onInput = ({ currentTarget }) =>
		setPostData({ ...postData, content: currentTarget.value })

	const onLocationPick = location => setPostData({ ...postData, location })

	const onPostSubmit = e => {
		e.persist()
		e.preventDefault()

		if (canSubmit) onSubmit({ ...postData, content: postData.content.trim() })
	}

	return (
		<>
			<Container className={styles.composer} {...props}>
				<form onSubmit={onPostSubmit}>
					<div>
						<Avatar
							avatar={avatar}
							verified={verified}
							className={styles.avatar}
						/>
						<h1>Compose</h1>
					</div>
					<Textarea
						resize
						required
						placeholder="What's on your mind?"
						value={postData.content}
						onInput={onInput}
					/>
					<LocationPicker onPick={onLocationPick} />
					<Button disabled={!canSubmit} type='submit'>
						Post
					</Button>
				</form>
			</Container>
		</>
	)
}

export default Composer
