import create from 'zustand'

/**
 * an avatar is an object with 2 props {key: uid, src: actual source, either generated or a real one}
 */
const [useAvatars] = create(set => ({
	avatars: [],
	updateAvatars: ({ avatar, _id }) =>
		set(state => ({
			avatars: [...state.avatars, { avatar, _id }]
		}))
}))

export { useAvatars }

//TODO: add caching logic to useAvatars
//TODO: implement useAvatars in all avatars
