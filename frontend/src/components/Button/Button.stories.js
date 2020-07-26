import React from 'react'

import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import { Button } from './Button.jsx'

setConsoleOptions()

export default {
	title: 'Button',
	decorators: [ withKnobs, withA11y ],
	component: Button
}


export const AllButton = () => (
	<p>
		<Button
			disabled={ false }
			id= 'submit'
			label= 'Long info'
			size= 'big'
			type= 'submit'
			variant='info'/>
		<Button
			disabled={ false }
			id= 'submit'
			label= 'Long error'
			size= 'big'
			type= 'submit'
			variant='error'/>
		<Button
			disabled={ true }
			id= 'submit'
			label= 'Long error disabled'
			size= 'big'
			type= 'submit'
			variant='error'/>

		<Button
			disabled={ false }
			id= 'submit'
			label= 'Submit'
			size= 'small'
			type= 'submit'
			variant='info'/>
		<Button
			disabled={ false }
			id= 'submit'
			label= 'Submit'
			size= 'small'
			type= 'submit'
			variant='error'/>
		<Button
			disabled={ true }
			id= 'submit'
			label= 'Submit'
			size= 'small'
			type= 'submit'
			variant='error'/>
	</p>
)


export const ButtonBase = () =>
	<Button
		disabled={ boolean('Disabled', false) }
		id= { text('ID', 'submit') }
		label= 'Long info'
		size= { select('Size', [ 'small', 'big' ]) }
		type= 'submit'
		variant={ select('Variant', [ 'info', 'error' ]) }/>

export const ButtonLongInfo = () =>
	<Button
		disabled={ false }
		id= 'submit'
		label= 'Long info'
		size= 'big'
		type= 'submit'
		variant='info'/>

export const ButtonLongError = () =>
	<Button
		disabled={ false }
		id= 'submit'
		label= 'Long error'
		size= 'big'
		type= 'submit'
		variant='error'/>

export const ButtonLongDisabled = () =>
	<Button
		disabled={ true }
		id= 'submit'
		label= 'Long error disabled'
		size= 'big'
		type= 'submit'
		variant='error'/>

export const ButtonError = () => (
	<Button
		disabled={ boolean('disabled', false) }
		id='Submit'
		label={ text('label', 'Submit') }
		size='small'
		type={ text('type', 'Submit') }
		variant='error'/>
)


export const ButtonInfo = () => (
	<Button
		disabled={ boolean('disabled', false) }
		id='Submit'
		label={ text('label', 'Submit') }
		size='small'
		type={ text('type', 'Submit') }
		variant='info'/>
)

export const ButtonDisabled = () => (
	<Button
		disabled={ true }
		id='Submit'
		label={ text('label', 'Submit') }
		size='small'
		type={ text('type', 'Submit') }
		variant='error'/>
)