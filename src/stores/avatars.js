import create from 'zustand'

/**
 * an avatar is an object with 2 props {key: uid, src: actual source, either generated or a real one}
 */
const [useAvatars] = create((set, get) => ({
	avatars: [],

	updateAvatars: newState =>
		set(state => ({
			...state,
			...newState
		})),

	getAvatar: key => {
		return get().avatars.find(avatar => key === avatar.key)
	}
}))

export { useAvatars }
