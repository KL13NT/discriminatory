import { storage } from 'firebase/storage'

export const getAvatarUrl = avatar => {
	return storage()
		.ref(avatar)
		.getDownloadURL()
}
