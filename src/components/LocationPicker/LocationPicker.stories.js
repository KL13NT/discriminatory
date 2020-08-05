import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import LocationPicker from './LocationPicker.jsx'

setConsoleOptions()

export default {
	title: 'LocationPicker',
	decorators: [withA11y],
	component: LocationPicker
}

export const General = () => <LocationPicker onPick={console.log} />
