import React from 'react'

import {
	withKnobs,
	text,
	boolean,
	number,
	select
} from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Button from './Button.jsx'

setConsoleOptions()

export default {
	title: 'Button',
	decorators: [withKnobs, withA11y],
	component: Button
}

export const ButtonInfo = () => (
	<Button disabled={false} id='submit' variant='info'>
		Info
	</Button>
)
export const ButtonDanger = () => (
	<Button disabled={false} id='submit' variant='danger'>
		Danger
	</Button>
)
