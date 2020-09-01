import React, { useEffect, useState } from 'react'

import { withA11y } from '@storybook/addon-a11y'

import Select from './Select.jsx'

export default {
	title: 'Select',
	decorators: [withA11y],
	component: Select
}

const options = [
	{
		name: 'Option 1',
		value: 'option1'
	},
	{
		name: 'Option 2',
		value: 'option2'
	},
	{
		name: 'Option 3',
		value: 'option3'
	},
	{
		name: 'Option 4',
		value: 'option4'
	},
	{
		name: 'Option 5',
		value: 'option5'
	},
	{
		name: 'Option 6',
		value: 'option6'
	}
]

export const basic = () => {
	return <Select options={options} canBeNull={false} />
}
