import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { IntlProvider } from 'react-intl'
import { IntlErrorBoundary } from '../../components/Errors/PageError'

import { useSettings } from '../../stores/settings'
import { useLocale } from '../../stores/locale'
import { useFullscreenLoader } from '../../stores/loading'

function IntlController({ children }) {
	const { settings } = useSettings()
	const { dir, locale } = settings.display.language.selected
	const { locales, messages, updateMessages } = useLocale()
	const { load, finish } = useFullscreenLoader()

	useEffect(() => {
		load('Downloading Locales')
		console.log('downloading locale')

		fetch(locales[locale])
			.then(res => res.text())
			.then(text => {
				const parsed = text
					.split('\n')
					.filter(line => !line.startsWith('#') && line.length > 0)
					.map(line => ({
						[line.split(':')[0].trim()]: line.split(':')[1].trim()
					}))
				const messages = {}

				parsed.forEach(message => {
					messages[Object.keys(message)[0]] = message[Object.keys(message)[0]]
				})

				console.log(messages)
				updateMessages(messages)
				finish('Downloading Locales')
			})
			.catch(err => {
				finish('Downloading Locales')
				console.log('YOU SHOULD COPY THIS WHEN REPORTING A BUG', err)
			})
	}, [settings.display.language.selected]) // eslint-disable-line

	const EnFonts = () => (
		<Helmet>
			<link
				href='https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
				rel='stylesheet'
			/>
			<link
				href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;900&display=swap'
				rel='stylesheet'
			/>
		</Helmet>
	)

	const ArFonts = () => (
		<Helmet>
			<link
				href='https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'
				rel='stylesheet'
			/>
		</Helmet>
	)

	if (messages === null) return null
	return (
		<IntlProvider
			locale={settings.display.language.selected.locale}
			messages={messages}
		>
			<IntlErrorBoundary>
				<div dir={dir}>
					{dir === 'ltr' ? <EnFonts /> : <ArFonts />}
					{children}
				</div>
			</IntlErrorBoundary>
		</IntlProvider>
	)
}

export default IntlController
