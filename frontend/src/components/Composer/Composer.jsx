import React, { useState } from 'react'

import Container from '../Container/Container'

import styles from './Composer.module.sass'

function LocationPicker({ onPick }) {}

function Composer({ avatar, onSubmit, ...props }) {
	const [isLocationPickerOpen, toggleLocationPicker] = useState(false)

	const togglePicker = () => {
		toggleLocationPicker(!isLocationPickerOpen)
	}

	return (
		<Container>
			<div>
				<img src={avatar} alt='Your avatar' />
				<h1>Compose</h1>
			</div>
		</Container>
	)
}

export default Composer
