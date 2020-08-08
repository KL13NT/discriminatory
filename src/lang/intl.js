import { createIntl, createIntlCache } from 'react-intl'

// Translated messages in French with matching IDs to what you declared
const messagesInFrench = {
	myMessage: "Aujourd'hui, c'est le {ts, date, ::yyyyMMdd}"
}

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()

// Create the `intl` object
const intl = createIntl(
	{
		// Locale of the application
		locale: 'fr',
		// Locale of the fallback defaultMessage
		defaultLocale: 'en',
		messages: messagesInFrench
	},
	cache
)

// Aujourd'hui, c'est le 23/07/2020
console.log(
	intl.formatMessage(
		{
			// Matching ID as above
			id: 'myMessage',
			// Default Message in English
			defaultMessage: 'Today is {ts, date, ::yyyyMMdd}'
		},
		{ ts: Date.now() }
	)
)

// 19,00 €
console.log(intl.formatNumber(19, { style: 'currency', currency: 'EUR' }))
