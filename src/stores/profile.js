import create from 'zustand'

const [useProfile] = create(set => ({
	profile: localStorage.getItem('profile'),
	update: profile =>
		set(state => {
			localStorage.setItem('profile', JSON.stringify(profile))
			return { ...state, profile }
		}),
	clear: () => set(() => null)
}))

export { useProfile }
