import React, { useState } from 'react'

import Container from '../Container/Container'
import Avatar from '../Avatar/Avatar'
import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'
import LocationPicker from './LocationPicker'

import { ReactComponent as GPS } from '../../assets/gps.svg'

import styles from './Composer.module.sass'

function Composer({ avatar, verified, onSubmit, ...props }) {
	const [isLocationPickerOpen, setLocationPickerState] = useState(false)
	const [canSubmit, setCanSubmitState] = useState(false)
	const [postData, setPostData] = useState({ location: null, content: null })

	const togglePicker = e => {
		if (e) e.preventDefault()
		setLocationPickerState(!isLocationPickerOpen)
	}

	const checkCanSubmit = newData => {
		if ((newData.content && !newData.content.trim()) || !newData.location)
			setCanSubmitState(false)
		else setCanSubmitState(true)
	}

	const onLocationPick = e => {
		e.preventDefault()

		const form = new FormData(e.target)
		const location = form.get('location')

		const newData = { ...postData, location }
		setPostData(newData)
		checkCanSubmit(newData)
		togglePicker()
	}

	const onInput = e => {
		const content = e.target.value

		const newData = { ...postData, content }
		setPostData(newData)
		checkCanSubmit(newData)
	}

	const onLocationChange = e => {
		const location = e.target.value

		const newData = { ...postData, location }
		setPostData(newData)
		checkCanSubmit(newData)
	}

	const onPostSubmit = e => {
		e.persist()
		e.preventDefault()

		onSubmit({ ...postData, content: postData.content.trim() })
	}

	return (
		<>
			{isLocationPickerOpen ? (
				<LocationPicker
					toggle={togglePicker}
					onPick={onLocationPick}
					onChange={onLocationChange}
					value={postData.location}
				/>
			) : null}

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
					<button onClick={togglePicker} className='u-text-limit'>
						<div>
							<GPS />
						</div>
						<span className='u-text-limit'>
							{postData.location || 'Pick a location'}
						</span>
					</button>
					<Button disabled={!canSubmit} type='submit'>
						Post
					</Button>
				</form>
			</Container>
		</>
	)
}

export default Composer
