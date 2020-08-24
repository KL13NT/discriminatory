import create from 'zustand'

const defaultConfig = JSON.parse(localStorage.getItem('settings')) || {
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
				{ locale: 'ar', dir: 'rtl', name: 'Arabic - العربيّة' },
				{ locale: 'en', dir: 'ltr', name: 'English - الإنجليزية' }
			],
			selected: { locale: 'ar', dir: 'rtl' }
		}
	},
	advertisements: {
		status: true
	}
	// notifications: {
	// 	from: {
	// 		possible: ['all', 'following', 'disabled'],
	// 		selected: 'all'
	// 	}
	// }
}

localStorage.setItem('settings', JSON.stringify(defaultConfig))

const [useSettings] = create(set => ({
	settings: defaultConfig,

	update: newState =>
		set(state => {
			localStorage.setItem(
				'settings',
				JSON.stringify({ ...state.settings, ...newState.settings })
			)

			return {
				...state,
				...newState
			}
		})
}))

export { useSettings }
