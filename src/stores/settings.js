import create from 'zustand'

const defaultConfig = {
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
			navbar: [
				{ locale: 'ar', dir: 'rtl' },
				{ locale: 'en', dir: 'ltr' }
			],
			selected: { locale: 'en', dir: 'ltr' }
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

const [useSettings] = create(set => ({
	settings: localStorage.getItem('settings') || defaultConfig,

	update: newState =>
		set(state => {
			localStorage.setItem('settings', { ...state, ...newState })

			return {
				...state,
				...newState
			}
		})
}))

export { useSettings }
