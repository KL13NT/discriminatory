import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { useSettings } from '../../stores/settings'

import '../../style/dark.theme.sass' // dark theme

function StyleController({ children }) {
	const { settings } = useSettings()
	const { font, theme, base } = settings.display

	useEffect(() => {
		document.documentElement.style.fontSize = `${
			font.base * font.selected.value
		}px`
	}, [base, font])

	return (
		<>
			<Helmet>
				<body data-theme={theme.selected} />
			</Helmet>
			{children}
		</>
	)
}

export default StyleController
