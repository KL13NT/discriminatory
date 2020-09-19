import React from 'react'

import Select from '../../components/Select/Select'

import { useSettings } from '../../stores/settings'
import { dset } from '../../utils/general'

import SA from '../../assets/002-saudi-arabia.svg'
import GB from '../../assets/001-united-kingdom.svg'

export default function QuickLangSwitch() {
	const { settings, update: updateSettings } = useSettings()
	const { locales, selected } = settings.display.language
	const languages = [
		{ value: 'en', name: 'English', icon: GB },
		{ value: 'ar', name: 'Arabic - العربية', icon: SA }
	]

	const defaultValue =
		languages.findIndex(lang => selected.locale === lang.value) || 0

	const onLanguageChange = target => {
		updateSettings(
			dset(
				'display.language.selected',
				locales.find(locale => locale.locale === target.value),
				settings
			)
		)
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
