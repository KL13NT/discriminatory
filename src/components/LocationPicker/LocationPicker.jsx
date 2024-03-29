import React, { useState, useEffect } from 'react'
import Overlay from '../Overlay/Overlay'

import styles from './LocationPicker.module.sass'

import { ReactComponent as GPS } from '../../assets/gps2.svg'
import cls from '../../utils/cls'
import { useIntl } from 'react-intl'

//TODO: hook to google maps API
function LocationPicker({ defaultValue, disabled, onPick, ...props }) {
	const { formatMessage: f } = useIntl()
	const [isLocationPickerOpen, setLocationPickerState] = useState(false)
	const [location, setLocation] = useState(defaultValue || '')

	let timeout = 0

	const toggle = () => {
		setLocationPickerState(!isLocationPickerOpen)
	}

	useEffect(() => {
		onPick(location)
	}, [location]) // eslint-disable-line react-hooks/exhaustive-deps

	const onSubmit = e => {
		e.preventDefault()
		e.stopPropagation()

		const { currentTarget } = e
		const data = new FormData(currentTarget)
		setLocation(data.get('location').trim())
		toggle()
		// TODO: should load send requests on change here
	}

	const onChange = ({ currentTarget }) => {
		clearTimeout(timeout)
		setLocation(currentTarget.value.trim())
		timeout = setTimeout(() => {
			//TODO: fetch from /locations in Mongo
		}, 2000)
	}

	return (
		<>
			<button
				type='button'
				onClick={toggle}
				disabled={disabled}
				className={cls(styles.toggle, 'u-text-limit')}
			>
				<GPS />
				<span className='u-text-limit'>
					{location || f({ id: 'general.picklocation' })}
				</span>
			</button>
			{isLocationPickerOpen ? (
				<Overlay
					title={f({ id: 'general.location' })}
					subtitle={f({ id: 'questions.location' })}
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
							placeholder={f({ id: 'placeholders.location' })}
						/>
					</form>
				</Overlay>
			) : null}
		</>
	)
}

export default LocationPicker
