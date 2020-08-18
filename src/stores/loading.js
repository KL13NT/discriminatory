import create from 'zustand'
import random from 'random'

const normal = random.normal()

const [useFullscreenLoader] = create(set => ({
	active: [],
	load: name =>
		set(state => ({
			active: [
				...state.active,
				{
					name,
					id: normal()
				}
			]
		})),
	finish: name =>
		set(state => ({
			active: state.active.filter(loader => loader.name !== name)
		}))
}))

export { useFullscreenLoader }
