import create from 'zustand'

const [useComposer] = create(set => ({
	active: false,
	toggle: () => set(state => ({ active: !state.active }))
}))

export { useComposer }
