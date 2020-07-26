import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import StoryRouter from 'storybook-react-router'
import { setConsoleOptions } from '@storybook/addon-console'

import { Notifications } from './Notifications.jsx'

setConsoleOptions()

const dummyNotifications = [
	{
		description: 'created a new event event event event event',
		campus: 'FCAI-CU',
		courseId: '891237123',
		location: 'material',
		id: '89123912873',
		read: false
	},
	{
		description: 'created a new event',
		campus: 'FCAI-CU',
		courseId: '891237123',
		location: 'material',
		id: '89123912873',
		read: true
	},
	{
		description: 'created a new event',
		campus: 'FCAI-CU',
		courseId: '891237123',
		location: 'material',
		id: '89123912873',
		read: true
	},
	{
		description: 'created a new event',
		campus: 'FCAI-CU',
		courseId: '891237123',
		location: 'material',
		id: '89123912873',
		read: true
	}
]

export default {
	title: 'Notifications',
	decorators: [ withA11y, StoryRouter() ],
	component: Notifications,
	subcomponents: { }
}

export const FullPage = () => (
	<div style={{height: "80vh"}}>
	<Notifications notifications={dummyNotifications}/>

	</div>
)
