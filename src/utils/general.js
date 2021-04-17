export const isMethodAllowed = (user, resourceCreatorId, returned) =>
	user && resourceCreatorId === user.uid ? returned : null

export const isMethodNotAllowed = (userId, resourceCreatorId, returned) =>
	resourceCreatorId === userId ? null : returned

export const findParentByRef = (target, ref, iterations = 0) => {
	if (target === document || target.parentNode === document) return false
	if ((target === ref || target === ref.current) && iterations > 0) return true
	if (target.parentNode && target.parentNode !== document)
		return findParentByRef(target.parentNode, ref, iterations + 1)
	return false
}

export const findParentByClass = (target, selector) => {
	if (target === document || target.parentNode === document) return false
	if (Array.from(target.classList).includes(selector)) return true
	if (target.parentNode && target.parentNode !== document)
		return findParentByClass(target.parentNode, selector)
	return false
}

export const getProfilesFromPosts = posts => {
	const profiles = {}

	posts.forEach(post => {
		profiles[post.author._id] = post.author

		post.comments.forEach(comment => {
			profiles[comment.author._id] = comment.author
		})
	})

	return profiles
}

/**
 *
 * @param {import('urql').CombinedError} error
 */
export const getApolloErrorCode = error => {
	console.log('COPY THIS WHEN REPORTING', error)

	return error.networkError
		? 'NETWORK_ERROR'
		: error.graphQLErrors && Array.isArray(error.graphQLErrors)
		? error.graphQLErrors[0].extensions.code
		: 'BEEP_BOOP_ERROR'
}

/**
 * Returns boolean indicating whether user is near the end of the page. Default offset is 300px.
 */
export const isNearBottom = (offset = 300) =>
	window.scrollY + window.innerHeight > document.body.clientHeight - offset

/**
 * Returns new deeply-modified object without modifying the original.
 * @param {string} path
 * @param {any} val
 * @param {object} target
 */
export const dset = (path, val, target) => {
	const steps = path.split('.')
	const lastIndex = steps.length - 1

	const copy = { ...target }
	let ref = copy

	steps.forEach((step, index) => {
		if (typeof ref[step] === undefined) ref[step] = {}

		if (index === lastIndex) ref[step] = val
		else ref = ref[step]
	})

	return copy
}
