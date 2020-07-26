import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import StoryRouter from 'storybook-react-router'
import { setConsoleOptions } from '@storybook/addon-console'

import { LoadingPage, Spinner } from './LoadingPage.jsx'

setConsoleOptions()

export default {
	title: 'LoadingPage',
	decorators: [ withA11y, StoryRouter() ],
	component: LoadingPage,
	subcomponents: { Spinner }
}

export const FullPage = () => (
	<LoadingPage/>
)


export const FullPageCustomText = () => (
	<LoadingPage>
		We&apos;re bringing you your profile!
	</LoadingPage>
)


export const SpinnerDefault = () => (
	<Spinner/>
)
