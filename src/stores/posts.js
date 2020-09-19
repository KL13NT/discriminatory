import create from 'zustand'

/**
 * Make sure the name is unique
 */
const [usePosts] = create(set => ({
	home: [],
	explore: [],

	setHome: posts =>
	set(() => ({
			home: posts
		})),

	setExplore: posts =>
		set(() => ({
			explore: posts
		}))
}))

export { usePosts }
