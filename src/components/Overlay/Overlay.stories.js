import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Overlay from './Overlay.jsx'

setConsoleOptions()

export default {
	title: 'Overlay',
	decorators: [withA11y],
	component: Overlay,
	description: 'Used to create Overlay details'
}

const toggle = () => null

export const General = () => (
	<Overlay title='Whats new' subtitle='July 2020' onClose={toggle}>
		Content here! 😇
	</Overlay>
)
