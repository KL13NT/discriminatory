import create from 'zustand'

const [useComposer] = create(set => ({
	isActive: false,
	toggle: () => set(state => ({ isActive: !state.isActive }))
}))

export { useComposer }
