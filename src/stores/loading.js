import create from 'zustand'

/**
 * Make sure the name is unique
 */
const [useFullscreenLoader] = create(set => ({
	active: [],
	load: name =>
		set(state => ({
			active: [
				...state.active,
				{
					name,
					id: name
				}
			]
		})),
	finish: name =>
		set(state => ({
			active: state.active.filter(loader => loader.name !== name)
		}))
}))

export { useFullscreenLoader }
