import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Footer from './Footer.jsx'

setConsoleOptions()

export default {
	title: 'Footer',
	decorators: [withA11y],
	component: Footer
}

export const General = () => <Footer />
