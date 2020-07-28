import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Overlay from './Overlay.jsx'

setConsoleOptions()

//TODO: refactor this to multiple subcomponents in multiple files in same directory

export default {
	title: 'Overlay',
	decorators: [withA11y],
	// component: Overlay,
	subcomponents: [Overlay],
	description: 'Used to create Overlay details'
}

import create from 'zustand'
import Button from '../Button/Button.jsx'

const [useOverlay] = create(set => ({
	isOpen: null,
	toggle: () =>
		set(({ isOpen }) => ({
			isOpen: !isOpen
		}))
}))

export const General = () => {
	const { isOpen, toggle } = useOverlay()

	return (
		<div>
			<Button onClick={toggle}>Open overlay</Button>
			{isOpen ? (
				<Overlay onClose={toggle}>
					<h1>Hello</h1>
				</Overlay>
			) : null}
		</div>
	)
}
