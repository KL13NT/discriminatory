import React from 'react'
import Overlay from '../Overlay/Overlay'

import styles from './LocationPicker.module.sass'

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
					required
					maxLength={50}
					minLength={5}
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

export default LocationPicker
