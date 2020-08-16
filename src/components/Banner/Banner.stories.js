import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Banner from './Banner.jsx'

setConsoleOptions()

export default {
	title: 'Banner',
	decorators: [withA11y],
	oomponent: Banner,
	description:
		'Used to display important info that does not belong to a single page.'
}

export const general = () => (
	<Banner title='Join to enjoy a lot more' big position='bottom'>
		Don't miss what's happening! Join now for free.
	</Banner>
)

export const dismissable = () => (
	<Banner
		title='Join to enjoy a lot more'
		big
		position='bottom'
		onDismiss={console.log}
	>
		Don't miss what's happening! Join now for free.
	</Banner>
)
