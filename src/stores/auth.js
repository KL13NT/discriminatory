import create from 'zustand'

const [useAuth] = create(set => ({
	user: null,
	setUser: user =>
		set(() => {
			return { user }
		}),
	clear: () =>
		set(() => ({
			user: null
		}))
}))

export { useAuth }
