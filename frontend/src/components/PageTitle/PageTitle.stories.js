import React from 'react'

import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import { PageTitle } from './PageTitle.jsx'

setConsoleOptions()

export default {
	title: 'PageTitle',
	decorators: [ withKnobs, withA11y ],
	component: PageTitle,
	description: 'Used to create titles'
}


export const AllPageTitle = () => (
	<div>
		<PageTitle id= 'title page' variant='page'>
			Header Text
		</PageTitle>
		<PageTitle id='title sesction' variant='section'>
			Section Header
		</PageTitle>
	</div>
)

export const PageTitleHeader = () => (
	<PageTitle id= 'title' variant='page'>
		Header Text
	</PageTitle>
)

export const PageTitleHeaderCentered = () => (
	<PageTitle isCentered id= 'title' variant='page'>
		Header Text
	</PageTitle>
)

export const PageTitleSection = () => (
	<PageTitle id= 'title' variant='section'>
		Header Text
	</PageTitle>
)