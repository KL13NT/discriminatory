import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Avatar from './Avatar.jsx'

import avatar from '../../assets/pfp.png'

setConsoleOptions()

export default {
	title: 'Avatar',
	decorators: [withA11y],
	// component: Avatar,
	oomponent: Avatar,
	description: 'Used to create Avatar details'
}

export const NotVerified = () => <Avatar avatar={avatar} />

export const Verified = () => <Avatar verified avatar={avatar} />
