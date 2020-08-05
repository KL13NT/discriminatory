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

import PageTitle from './PageTitle.jsx'

setConsoleOptions()

export default {
	title: 'PageTitle',
	decorators: [withKnobs, withA11y],
	component: PageTitle,
	description: 'Used to create titles'
}

export const Minimal = () => (
	<div>
		<PageTitle>Home</PageTitle>
	</div>
)

export const Subtitle = () => (
	<PageTitle subtitle='The Lagoons Hotel'>Search Results</PageTitle>
)

export const Tick = () => <PageTitle tick='22 Posts'>Selma Rayan</PageTitle>

export const TickWithSubtitle = () => (
	<PageTitle tick='22 Posts' subtitle='The Lagoons Hotel'>
		Selma Rayan
	</PageTitle>
)
