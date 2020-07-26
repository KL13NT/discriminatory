import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import StoryRouter from 'storybook-react-router'
import { setConsoleOptions } from '@storybook/addon-console'

import Navbar from './Navbar.jsx'

setConsoleOptions()

export default {
	title: 'Navbar',
	decorators: [withA11y, StoryRouter()],
	component: Navbar
}

const Container = ({ children }) => (
	<div style={{ width: '100%', height: '100vh' }}>{children}</div>
)

export const Default = () => (
	<Container>
		<Navbar />
	</Container>
)
