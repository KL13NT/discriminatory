import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Ads from './Ads.jsx'
import StoryRouter from 'storybook-react-router'
import {
	withKnobs,
	text,
	boolean,
	number,
	select
} from '@storybook/addon-knobs'

setConsoleOptions()

export default {
	title: 'Ads',
	decorators: [withA11y, withKnobs, StoryRouter()],
	component: Ads
}

export const General = () => (
	<>
		<Ads isEnabled={boolean('isEnabled', true)} />
	</>
)
