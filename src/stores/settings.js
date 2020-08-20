import create from 'zustand'

const defaultConfig = JSON.parse(localStorage.getItem('settings')) || {
	display: {
		font: {
			possible: ['1x', '2x', '3x', '4x'],
			selected: '1x'
		},
		theme: {
			possible: ['dark-blue'],
			selected: 'dark-blue'
		},
		language: {
			locales: [
				{ locale: 'ar', dir: 'rtl' },
				{ locale: 'en', dir: 'ltr' }
			],
			selected: { locale: 'ar', dir: 'rtl' }
		}
	},
	advertisements: {
		status: {
			possible: ['enabled', 'disabled'],
			selected: 'enabled'
		}
	},
	notifications: {
		from: {
			possible: ['all', 'following', 'disabled'],
			selected: 'all'
		}
	}
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
