import React from 'react'

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import { TextInput } from './TextInput.jsx'

setConsoleOptions()

export default {
	title: 'Input',
	decorators: [ withKnobs, withA11y ],
	component: TextInput
}

export const AllStates = () => (
	<>
		<div style={ { display: 'flex', alignItems: 'end' } }>
			<TextInput
				id='email'
				inset={ false }
				label='Email'
				name='email'
				placeholder='exam@exam.co'
				type='email'/>
			<TextInput
				id='email'
				inset={ false }
				label='Email'
				name='email'
				placeholder='exam@exam.co'
				type='email'
				value='NotValid'/>
			<TextInput
				id='email'
				inset={ false }
				label='Email'
				name='email'
				placeholder='exam@exam.co'
				type='email'
				value='valid@valid'/>
		</div>
		<div style={ { display: 'flex', alignItems: 'end' } }>
			<TextInput
				id='email'
				inset={ true }
				label='Email'
				name='email'
				placeholder='exam@exam.co'
				type='email'/>
			<TextInput
				id='email'
				inset={ true }
				label='Email'
				name='email'
				placeholder='exam@exam.co'
				type='email'
				value='NotValid'/>
			<TextInput
				id='email'
				inset={ true }
				label='Email'
				name='email'
				placeholder='exam@exam.co'
				type='email'
				value='valid@valid'/>
		</div>
	</>
)

export const TextInputNormal = () => (
	<TextInput
		disabled={ boolean('disabled', false) }
		id='email'
		inset={ boolean('inset', true) }
		label={ text('label', 'Email') }
		name='email'
		placeholder={ text('placeholder', 'exam@exam.co') }
		type={ text('type', 'email') }/>
)