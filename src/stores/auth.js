import create from 'zustand'

const [useAuth] = create(set => ({
	user: null,
	setUser: user => set(() => ({ user }))
}))

export { useAuth }
