import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { useSettings } from '../../stores/settings'

// Load theme files here and reference the names down there
import '../../style/dark.theme.tokens.sass'

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
				<link href={`/${theme.selected}.theme.tokens.css`} rel='stylesheet' />
			</Helmet>
			{children}
		</>
	)
}

export default StyleController
