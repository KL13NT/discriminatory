import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import TextInput from './TextInput.jsx'

import { ReactComponent as Search } from '../../assets/search.svg'

setConsoleOptions()

export default {
	title: 'TextInput',
	decorators: [withA11y],
	component: TextInput
}

export const FullWithIcon = () => (
	<TextInput
		id='name'
		label='name'
		name='name'
		placeholder='exam@exam.co'
		type='text'
		defaultValue='Selma Rayan'
		onChange={console.log}
		icon={Search}
	/>
)

export const FullEmpty = () => (
	<TextInput
		id='name'
		label='name'
		name='name'
		placeholder='exam@exam.co'
		type='text'
		defaultValue='Selma Rayan'
		onChange={console.log}
	/>
)

export const Minimalist = () => (
	<TextInput
		id='name'
		label='name'
		name='name'
		placeholder='exam@exam.co'
		type='text'
		minimalist
		defaultValue='Selma Rayan'
		onChange={console.log}
	/>
)
