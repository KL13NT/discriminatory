import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import StoryRouter from 'storybook-react-router'
import { setConsoleOptions } from '@storybook/addon-console'

import { UtilityBar } from './UtilityBar.jsx'



const dummyUser = {
  "name": "Scarlett Bronston",
  "large": "73.jpg",
  "thumbnail": "73_thumb.jpg"
}


setConsoleOptions()

export default {
	title: 'UtilityBar',
	decorators: [ withA11y, StoryRouter() ],
	component: UtilityBar
}

const Container = ({ children }) =>
	<div style={ { width: '100%', height: '100vh' } }>
		{ children }
	</div>

export const  Default = () => (
	<Container>
		<UtilityBar name={dummyUser.name}/>
	</Container>
)
