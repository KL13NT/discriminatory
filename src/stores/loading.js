import create from 'zustand'
import { normal } from 'random'

const [useFullscreenLoader] = create(set => ({
	active: [],
	load: name =>
		set(state => ({
			active: [
				...state.active,
				{
					name,
					id: normal(5)
				}
			]
		})),
	finish: name =>
		set(state => ({
			active: state.active.filter(loader => loader.name !== name)
		}))
}))

export { useFullscreenLoader }
