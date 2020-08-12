import create from 'zustand'

const [useProfile] = create(set => ({
	profile: localStorage.getItem('user')
		? localStorage.getItem('profile')
		: null,
	update: profile =>
		set(state => {
			localStorage.setItem('profile', JSON.stringify(profile))
			return { ...state, profile }
		}),
	clear: () =>
		set(() => {
			null
		})
}))

export { useProfile }
