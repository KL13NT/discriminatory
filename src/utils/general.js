export const isMethodAllowed = (user, resourceCreatorId, returned) =>
	user && resourceCreatorId === user.uid ? returned : null

export const isMethodNotAllowed = (userId, resourceCreatorId, returned) =>
	resourceCreatorId === userId ? null : returned

export const findParentByRef = (target, ref, iterations = 0) => {
	if (target === document || target.parentNode === document) return false
	if ((target === ref || target === ref.current) && iterations > 0) return true
	if (target.parentNode && target.parentNode !== document)
		return findParentByRef(target.parentNode, ref, iterations + 1)
}

export const findParentByClass = (target, selector) => {
	if (target === document || target.parentNode === document) return false
	if (Array.from(target.classList).includes(selector)) return true
	if (target.parentNode && target.parentNode !== document)
		return findParentByClass(target.parentNode, selector)
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
