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
import StoryRouter from 'storybook-react-router'

import { Tab, Tabs, TabList, TabPanel } from './Tabs'

import avatar from '../../assets/pfp.png'
import header from '../../assets/header.png'
import PageTitle from '../PageTitle/PageTitle'
import Container from '../Container/Container'

setConsoleOptions()

export default {
	title: 'Tabs',
	decorators: [withKnobs, withA11y, StoryRouter()],
	description: 'Used to create tabs'
}

export const General = () => (
	<div>
		<PageTitle>Explore</PageTitle>
		<Tabs>
			<TabList>
				<Tab>Top</Tab>
				<Tab>Latest</Tab>
				<Tab>Latest</Tab>
				<Tab>Latest</Tab>
				<Tab>Latest</Tab>
				<Tab>Latest</Tab>
				<Tab>Latest</Tab>
			</TabList>

			<TabPanel>
				<Container>
					<h2>Any content 1</h2>
					<p>This should contain a lot of stuff</p>
				</Container>
			</TabPanel>
			<TabPanel>
				<h2>Any content 2</h2>
			</TabPanel>
		</Tabs>
	</div>
)
