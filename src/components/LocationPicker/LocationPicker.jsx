import React, { useState, useEffect } from 'react'
import Overlay from '../Overlay/Overlay'

import styles from './LocationPicker.module.sass'

import { ReactComponent as GPS } from '../../assets/gps.svg'
import cls from '../../utils/cls'

//TODO: hook to google maps API
function LocationPicker({ onPick, ...props }) {
	const [isLocationPickerOpen, setLocationPickerState] = useState(false)
	const [location, setLocation] = useState(null)

	let timeout = 0

	const toggle = () => {
		setLocationPickerState(!isLocationPickerOpen)
	}

	useEffect(() => {
		onPick(location)
	}, [location]) // eslint-disable-line react-hooks/exhaustive-deps

	const onSubmit = e => {
		e.preventDefault()

		const { currentTarget } = e
		const data = new FormData(currentTarget)
		setLocation(data.get('location').trim())
		toggle()
		// TODO: should load send requests on change here
	}

	const onChange = () => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			//TODO: fetch from /locations in Mongo
		}, 2000)
	}

	return (
		<>
			<button
				type='button'
				onClick={toggle}
				className={cls(styles.toggle, 'u-text-limit')}
			>
				<div>
					<GPS />
				</div>
				<span className='u-text-limit'>{location || 'Pick a location'}</span>
			</button>
			{isLocationPickerOpen ? (
				<Overlay
					title='Location'
					subtitle='Where are you?'
					onClose={toggle}
					className={styles.location}
					{...props}
				>
					<form onSubmit={onSubmit}>
						<input
							required
							maxLength={50}
							minLength={5}
							name='location'
							type='text'
							value={location}
							onChange={onChange}
							placeholder='Type your location'
						/>
					</form>
				</Overlay>
			) : null}
		</>
	)
}

export default LocationPicker
