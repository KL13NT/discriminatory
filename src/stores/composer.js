import create from 'zustand'

const [useComposer] = create(set => ({
	active: false,
	data: { location: '', content: '' },
	toggle: () => set(state => ({ active: !state.active })),
	updateData: newData => set(state => ({ data: { ...state.data, ...newData } }))
}))

export { useComposer }
