import React from 'react'
import Select from '../../components/Select/Select'
import { useSettings } from '../../stores/settings'

export default function QuickLangSwitch() {
	const { settings, update } = useSettings()
	const { locales, selected } = settings.display.language
	const languages = [
		{ value: 'en', name: 'English' },
		{ value: 'ar', name: 'Arabic - العربية' }
	]

	const defaultValue = languages.findIndex(
		lang => selected.locale === lang.value
	)
	console.log(languages[defaultValue])

	const onLanguageChange = target => {
		update({
			settings: {
				display: {
					language: {
						locales,
						selected: locales.find(locale => locale.locale === target.value)
					}
				}
			}
		})
	}
	return (
		<Select
			options={languages}
			defaultValue={defaultValue}
			canBeNull={false}
			onChange={onLanguageChange}
		/>
	)
}
