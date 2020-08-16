import React from 'react'
import Select from '../../components/Select/Select'
import { useSettings } from '../../stores/settings'

import SA from '../../assets/002-saudi-arabia.svg'
import GB from '../../assets/001-united-kingdom.svg'

export default function QuickLangSwitch() {
	const { settings, update } = useSettings()
	const { locales, selected } = settings.display.language
	const languages = [
		{ value: 'en', name: 'English', icon: GB },
		{ value: 'ar', name: 'Arabic - العربية', icon: SA }
	]

	const defaultValue = languages.findIndex(
		lang => selected.locale === lang.value
	)

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
