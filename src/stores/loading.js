import create from 'zustand'

/**
 * Make sure the name is unique
 */
const [useFullscreenLoader] = create(set => ({
	active: [
		{
			name: 'Authenticating',
			id: 'Authenticating'
		}
	],
	load: name => {
		return set(state => ({
			active: [
				...state.active,
				{
					name,
					id: name
				}
			]
		}))
	},
	finish: name =>
		set(state => ({
			active: state.active.filter(loader => loader.name !== name)
		}))
}))

export { useFullscreenLoader }
