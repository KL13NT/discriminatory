import React from 'react'

import {
	withKnobs,
	text,
	boolean,
	number,
	select
} from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import ProfileHeader from './ProfileHeader.jsx'

import avatar from '../../assets/73.jpg'
import header from '../../assets/header.png'

setConsoleOptions()

export default {
	title: 'ProfileHeader',
	decorators: [withKnobs, withA11y],
	component: ProfileHeader,
	description: 'Used to create titles'
}

export const OthersNotVerified = () => (
	<div>
		<ProfileHeader
			profile={{
				name: 'Selma Rayan',
				tagline: 'Artist | Writer | She/Her',
				location: 'Giza, Egypt',
				avatar,
				header,
				isOwnProfile: false,
				isFollowed: true,
				isVerified: false
			}}
		/>
	</div>
)

export const OthersVerified = () => (
	<div>
		<ProfileHeader
			profile={{
				name: 'Selma Rayan',
				tagline: 'Artist | Writer | She/Her',
				location: 'Giza, Egypt',
				avatar,
				header,
				isOwnProfile: false,
				isFollowed: true,
				isVerified: true
			}}
		/>
	</div>
)

export const OthersNotFollowing = () => (
	<div>
		<ProfileHeader
			profile={{
				name: 'Selma Rayan',
				tagline: 'Artist | Writer | She/Her',
				location: 'Giza, Egypt',
				avatar,
				header,
				isOwnProfile: false,
				isFollowed: false,
				isVerified: true
			}}
		/>
	</div>
)
