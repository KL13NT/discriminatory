import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Composer from './Composer.jsx'

import avatar from '../../assets/pfp.png'

setConsoleOptions()

//TODO: refactor this to multiple subcomponents in multiple files in same directory

export default {
	title: 'Composer',
	decorators: [withA11y],
	// component: Composer,
	subcomponents: [Composer],
	description: 'Used to create Composer details'
}

export const General = () => {
	return (
		<Composer onSubmit={console.log} avatar={avatar} verified>
			<h1>Hello</h1>
		</Composer>
	)
}
