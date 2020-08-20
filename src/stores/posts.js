import create from 'zustand'

/**
 * Locales that webpack copy to dist directory for us to dynamically fetch so that we don't load unused locales
 */
const [usePosts] = create(set => ({
	posts: [],
	updatePosts: post =>
		set(state => ({
			posts: [...state.posts, post]
		}))
}))

export { usePosts }
