import React from 'react'

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import { Select } from './Select.jsx'

setConsoleOptions()

export default {
	title: 'Select',
	decorators: [ withKnobs ],
	component: Select
}

const options = [
	'value1',
	'value2',
	'value3',
	'value4',
	'value5',
	'value6',
	'value7',
	'value8',
	'value9'
]

export const AllStates = () => (
	<>
		<div style={ { display: 'flex', alignItems: 'end' } }>
			<Select
				disabled={ boolean('disabled', false) }
				id='email'
				isMulti={ boolean('isMulti', false) }
				label='Email'
				options={ options }/>
		</div>
	</>
)