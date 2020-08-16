import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import PageError from './PageError.jsx'

setConsoleOptions()

export default {
	title: 'Error',
	decorators: [withA11y],
	oomponent: Error,
	description:
		'Used to display important info that does not belong to a single page.'
}

export const page404 = () => <PageError></PageError>
