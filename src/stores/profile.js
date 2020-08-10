import create from 'zustand'

const [useProfile] = create(set => ({
	profile: null,
	update: newState => set(state => ({ ...state, ...newState }))
}))

export { useProfile }
