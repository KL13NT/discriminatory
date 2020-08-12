import create from 'zustand'

const [useAuth] = create(set => ({
	user: null,
	setUser: user =>
		set(() => {
			return { user }
		}),
	clear: () =>
		set(() => {
			null
		})
}))

export { useAuth }
