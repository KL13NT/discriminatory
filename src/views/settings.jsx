import React from 'react'
import firebase from 'firebase'
import { FormattedMessage, useIntl } from 'react-intl'

import Container from '../components/Container/Container'
import PageTitle from '../components/PageTitle/PageTitle'
import { Tabs, Tab, Panel, TabList } from '../components/Tabs/Tabs'
// import TextInput from '../components/TextInput/TextInput'
// import Button from '../components/Button/Button'

import { useToasts } from '../components/Toast/Toast'
import { useSettings } from '../stores/settings'
import Label from '../components/Label/Label'
import Select from '../components/Select/Select'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import Button from '../components/Button/Button'
import ProfileEditor from './components/ProfileEditor'
import { useAuth } from '../stores/auth'

export const Profile = () => {
	return <ProfileEditor />
}

export const Ads = () => {
	const { settings, update } = useSettings()
	const { advertisements } = settings
	const { formatMessage: f } = useIntl()
	const { add } = useToasts()

	const onAdsChnage = ({ value }) => {
		update({
			settings: {
				...settings,
				advertisements: {
					status: Boolean(value)
				}
			}
		})

		add({ type: 'success', text: f({ id: 'actions.changeads.success' }) })
	}

	const options = [
		{ name: f({ id: 'general.enabled' }), value: true },
		{ name: f({ id: 'general.disabled' }), value: false }
	]

	return (
		<Container
			title={f({ id: 'titles.ads' })}
			subtitle={f({ id: 'titles.ads.description' })}
		>
			<Label>
				<FormattedMessage id='general.status' />
			</Label>
			<Select
				minimalist
				canBeNull={false}
				onChange={onAdsChnage}
				defaultValue={options.findIndex(
					option => option.value === advertisements.status
				)}
				options={options}
			/>
			<p className='u-disclaimer'>
				<FormattedMessage id='disclaimers.settings.ads' />
			</p>
		</Container>
	)
}

export const Display = () => {
	const { settings, update } = useSettings()
	const { selected, possible } = settings.display.font
	const { formatMessage: f } = useIntl()
	const { add } = useToasts()

	const onFontChange = option => {
		update({
			settings: {
				...settings,
				display: {
					...settings.display,
					font: {
						...settings.display.font,
						selected: possible.find(size => size.value === option.value)
					}
				}
			}
		})

		add({ type: 'success', text: f({ id: 'actions.changefontsize.success' }) })
	}

	return (
		<Container
			title={f({ id: 'titles.display' })}
			subtitle={f({ id: 'titles.display.description' })}
		>
			<Label>
				<FormattedMessage id='general.fontsize' />
			</Label>
			<Select
				minimalist
				canBeNull={false}
				onChange={onFontChange}
				defaultValue={possible.findIndex(f => f.value === selected.value)}
				options={possible.map(font => ({
					...font,
					name: f({ id: `general.${font.name}` })
				}))}
			/>
		</Container>
	)
}

export const Basics = () => {
	const { formatMessage: f } = useIntl()
	const { add } = useToasts()
	const { user } = useAuth()
	const { settings, update } = useSettings()
	const { locales, selected } = settings.display.language

	const onLanguageChange = option => {
		update({
			settings: {
				...settings,
				display: {
					...settings.display,
					language: {
						locales,
						selected: locales.find(locale => locale.locale === option.value)
					}
				}
			}
		})

		add({ type: 'success', text: f({ id: 'actions.changelanguage.success' }) })
	}
	const logout = () => {
		add({
			text: f({ id: 'actions.logout.progress' }),
			type: 'info'
		})

		firebase
			.auth()
			.signOut()
			.then(() => {
				add({
					text: f({ id: 'actions.logout.success' }),
					type: 'success'
				})
			})
			.catch(() => {
				add({
					text: f({ id: 'actions.logout.error' }),
					type: 'error'
				})
			})
	}
	return (
		<Container
			title={f({ id: 'titles.basics' })}
			subtitle={f({ id: 'titles.basics.description' })}
		>
			<Label>
				<FormattedMessage id='general.language' />
			</Label>
			<Select
				minimalist
				canBeNull={false}
				onChange={onLanguageChange}
				defaultValue={locales.findIndex(
					locale => selected.locale === locale.locale
				)}
				options={locales.map(({ name, locale }) => ({
					value: locale,
					name
				}))}
			/>
			{user ? (
				<>
					<Label>
						<FormattedMessage id='general.logout' />
					</Label>
					<Button variant='danger' onClick={logout}>
						<FormattedMessage id='actions.logout' />
					</Button>
				</>
			) : null}
		</Container>
	)
}

export function Settings() {
	const { user } = useAuth()

	return (
		<>
			<PageTitle>
				<FormattedMessage id='titles.settings' />
			</PageTitle>
			<TabList>
				<NavLink to='/settings/basics'>
					<FormattedMessage id='titles.basics' />
				</NavLink>
				{user ? (
					<NavLink to='/settings/profile'>
						<FormattedMessage id='titles.profile' />
					</NavLink>
				) : null}
				<NavLink to='/settings/display'>
					<FormattedMessage id='titles.display' />
				</NavLink>
				<NavLink to='/settings/ads'>
					<FormattedMessage id='titles.ads' />
				</NavLink>
				{/* <NavLink to='/settings/security'>
					<FormattedMessage id='titles.security' />
				</NavLink> */}
				{/* <NavLink to='/settings/danger'>
					<FormattedMessage id='titles.danger' />
				</NavLink>
				<NavLink to='/settings/accessibility'>
					<FormattedMessage id='titles.a11y' />
				</NavLink> */}
			</TabList>
		</>
	)
}
