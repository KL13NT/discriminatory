import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import StoryRouter from 'storybook-react-router'
import { setConsoleOptions } from '@storybook/addon-console'

import Notification from './Notifications.jsx'

setConsoleOptions()

import PFP from '../../assets/73.jpg'

const notifications = [
	{
		details: {
			avatar: PFP,
			name: 'Leila Selim',
			id: '89129739817298'
		},
		notification: {
			postId: '129083918273',
			type: 'comment',
			read: false
		}
	},
	{
		details: {
			avatar: PFP,
			name: 'Leila Selim',
			id: '89129739817298'
		},
		notification: {
			postId: '129083918273',
			type: 'upvote',
			read: false
		}
	},
	{
		details: {
			avatar: PFP,
			name: 'Leila Selim',
			id: '89129739817298'
		},
		notification: {
			postId: '129083918273',
			type: 'downvote',
			read: false
		}
	}
]

export default {
	title: 'Notifications',
	decorators: [withA11y, StoryRouter()],
	component: Notification,
	subcomponents: {}
}

export const FullPage = () => (
	<div style={{ height: '80vh' }}>
		{notifications.map(notification => (
			<Notification {...notification} />
		))}
	</div>
)
