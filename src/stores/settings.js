import create from 'zustand'

const defaultConfig = localStorage.getItem('settings')
	? JSON.parse(localStorage.getItem('settings'))
	: {
			display: {
				font: {
					possible: [
						{ value: 1, name: '1x' },
						{ value: 1.125, name: '2x' },
						{ value: 1.25, name: '3x' },
						{ value: 1.375, name: '4x' }
					],
					selected: { value: 1, name: '1x' },
					base: 16
				},
				theme: {
					possible: ['dark'],
					selected: 'dark'
				},
				language: {
					locales: [
						{ locale: 'en', dir: 'ltr', name: 'English - الإنجليزية' },
						{ locale: 'ar', dir: 'rtl', name: 'Arabic - العربيّة' }
					],
					selected: null
				}
			},
			advertisements: {
				status: false
			}
	  }

localStorage.setItem('settings', JSON.stringify(defaultConfig))

const [useSettings] = create(set => ({
	settings: defaultConfig,

	update: newSettings =>
		set(state => {
			localStorage.setItem(
				'settings',
				JSON.stringify({ ...state.settings, ...newSettings })
			)

			return {
				...state.settings,
				...newSettings
			}
		})
}))

export { useSettings }
