import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import StoryRouter from 'storybook-react-router'
import { setConsoleOptions } from '@storybook/addon-console'

import { Post } from './Placeholders.jsx'

setConsoleOptions()

export default {
	title: 'Placeholders',
	decorators: [withA11y, StoryRouter()],
	subcomponents: { Post }
}

export const PostPlaceholder = () => (
	<div
		style={{
			width: '400px',
			padding: '20px'
		}}
	>
		<Post />
	</div>
)
