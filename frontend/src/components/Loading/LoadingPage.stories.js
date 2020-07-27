import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import StoryRouter from 'storybook-react-router'
import { setConsoleOptions } from '@storybook/addon-console'

import { LoadingPage, Spinner } from './LoadingPage.jsx'

setConsoleOptions()

export default {
	title: 'LoadingPage',
	decorators: [withA11y, StoryRouter()],
	component: LoadingPage,
	subcomponents: { Spinner }
}

export const FullPage = () => (
	<div
		style={{
			width: '400px',
			padding: '20px'
		}}
	>
		<LoadingPage>We&apos;re bringing you your profile!</LoadingPage>
	</div>
)

export const SpinnerDefault = () => <Spinner />
