import create from 'zustand'

/**
 * Locales that webpack copy to dist directory for us to dynamically fetch so that we don't load unused locales
 */
import enLocale from '../lang/en.json'
import arLocale from '../lang/ar.json'

const [useLocale] = create(set => ({
	locales: {
		ar: arLocale,
		en: enLocale
	},
	messages: null,
	updateMessages: messages =>
		set(() => ({
			messages
		}))
}))

export { useLocale }
