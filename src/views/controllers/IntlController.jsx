import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { IntlProvider } from 'react-intl'
import { IntlErrorBoundary } from '../../components/Errors/PageError'

import { useSettings } from '../../stores/settings'
import { useLocale } from '../../stores/locale'
import { useFullscreenLoader } from '../../stores/loading'

function IntlController({ children }) {
	const { settings, update: updateSettings } = useSettings()
	const { locales, messages, updateMessages } = useLocale()
	const { load, finish } = useFullscreenLoader()
	const { selected } = settings.display.language

	useEffect(() => {
		const userLocale = navigator.languages
			? navigator.languages[0]
			: navigator.language || navigator.userLanguage

		const found = settings.display.language.locales.find(locale =>
			userLocale.startsWith(locale.locale)
		)

		if (found && !selected) {
			updateSettings({
				settings: {
					...settings,
					display: {
						...settings.display,
						language: {
							...settings.display.language,
							selected: found
						}
					}
				}
			})
		}
	}, [])

	useEffect(() => {
		load('Downloading Locales')

		if (selected) {
			fetch(locales[selected.locale])
				.then(res => res.json())
				.then(messages => {
					updateMessages(messages)
					finish('Downloading Locales')
				})
				.catch(err => {
					finish('Downloading Locales')
					console.log('COPY THIS WHEN REPORTING A BUG', err)
				})
		}
	}, [settings.display.language.selected]) // eslint-disable-line

	const EnFonts = () => (
		<Helmet>
			<link
				href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;800&display=swap'
				rel='stylesheet'
				crossOrigin
			/>
		</Helmet>
	)

	const ArFonts = () => (
		<Helmet>
			<link
				href='https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'
				rel='stylesheet'
				crossOrigin
			/>
		</Helmet>
	)

	if (!messages) return null
	if (!selected) return null

	const { dir, locale } = selected
	return (
		<IntlProvider locale={locale} messages={messages}>
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
