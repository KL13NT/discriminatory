import React, { useState } from 'react'

import Container from '../Container/Container'

import styles from './Composer.module.sass'
import Avatar from '../Avatar/Avatar'
import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'
import Overlay from '../Overlay/Overlay'

import { ReactComponent as GPS } from '../../assets/gps.svg'

//TODO: hook to google maps API
function LocationPicker({ onPick, toggle, value, onChange, ...props }) {
	return (
		<Overlay
			title='Location'
			subtitle='Where are you?'
			onClose={toggle}
			className={styles.location}
			{...props}
		>
			<form onSubmit={onPick}>
				<input
					maxLength={50}
					name='location'
					type='text'
					placeholder='Type your location'
					value={value}
					onChange={onChange}
				/>
			</form>
		</Overlay>
	)
}

function Composer({ avatar, verified, onSubmit, ...props }) {
	const [isLocationPickerOpen, setPickerOpen] = useState(false)
	const [canSubmit, setCanSubmit] = useState(false)
	const [state, setState] = useState({ location: null, content: null })

	const togglePicker = () => setPickerOpen(!isLocationPickerOpen)

	const checkCanSubmit = newState => {
		if (!newState.content.trim() || !newState.location) setCanSubmit(false)
		else setCanSubmit(true)
	}

	const onLocationPick = e => {
		e.preventDefault()

		const form = new FormData(e.target)
		const location = String(form.get('location'))

		const newState = { ...state, location }
		setState(newState)
		checkCanSubmit(newState)
		togglePicker()
	}

	const onInput = e => {
		const content = String(e.target.value)

		const newState = { ...state, content }
		setState(newState)
		checkCanSubmit(newState)
	}

	const onLocationChange = e => {
		const location = e.target.value

		const newState = { ...state, location }
		setState(newState)
		checkCanSubmit(newState)
	}

	const onPostSubmit = e => {
		e.persist()
		e.preventDefault()

		onSubmit({ ...state, content: state.content.trim() })
	}

	return (
		<>
			{isLocationPickerOpen ? (
				<LocationPicker
					toggle={togglePicker}
					onPick={onLocationPick}
					onChange={onLocationChange}
					value={state.location}
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
						value={state.content}
						onInput={onInput}
					/>
					<button onClick={togglePicker} className='u-text-limit'>
						<div>
							<GPS />
						</div>
						<span className='u-text-limit'>
							{state.location || 'Pick a location'}
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
