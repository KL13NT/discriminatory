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

import { Tab, Tabs, TabList, TabPanel } from './Tabs'

import PageTitle from '../PageTitle/PageTitle'
import Container from '../Container/Container'

setConsoleOptions()

export default {
	title: 'Tabs',
	decorators: [withKnobs, withA11y],
	component: Tabs,
	subcomponents: [Tab, TabList, TabPanel],
	description: 'Used to create tabs'
}

export const General = () => (
	<div>
		<PageTitle>Explore</PageTitle>
		<Tabs>
			<TabList>
				<Tab>Basics</Tab>
				<Tab>Security</Tab>
				<Tab>Notifications</Tab>
				<Tab>Display</Tab>
				<Tab>Danger Zone</Tab>
				<Tab>Advertisement</Tab>
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

export const Centered = () => (
	<div>
		<PageTitle>Explore</PageTitle>
		<Tabs>
			<TabList data-centered='true'>
				<Tab>Top</Tab>
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
