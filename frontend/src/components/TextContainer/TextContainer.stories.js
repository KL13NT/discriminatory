import React from 'react'

import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import { TextContainer, TextContainerField } from './TextContainer.jsx'

setConsoleOptions()

export default {
	title: 'TextContainer',
	decorators: [ withKnobs, withA11y ],
	component: TextContainer,
	subcomponents: { TextContainerField },
	description: 'Used to create titles'
}


export const SingleNoTitle = () => (
	<TextContainer>
		<TextContainerField>Hello</TextContainerField>
	</TextContainer>
)

export const SingleShortTitle = () => (
	<TextContainer>
		<TextContainerField title='name'>Hello</TextContainerField>
	</TextContainer>
)

export const SingleLongTitle = () => (
	<TextContainer>
		<TextContainerField title='name'>
			{ 'lorem ispsum'.repeat(10) }
		</TextContainerField>
	</TextContainer>
)

export const MultipleLongTitle= () => (
	<TextContainer>
		<TextContainerField title='name'>Hello</TextContainerField>
		<TextContainerField title='name'>
			{ 'lorem ispsum'.repeat(10) }
		</TextContainerField>
		<TextContainerField title='name'>Hello</TextContainerField>
		<TextContainerField title='name'>Hello</TextContainerField>
	</TextContainer>
)
