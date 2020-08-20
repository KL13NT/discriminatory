export const isMethodAllowed = (userId, resourceCreatorId, returned) =>
	resourceCreatorId === userId ? returned : null

export const isMethodNotAllowed = (userId, resourceCreatorId, returned) =>
	resourceCreatorId === userId ? null : returned
