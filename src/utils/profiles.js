import { storage } from 'firebase'

export const getAvatarUrl = avatar => {
	return storage().ref(avatar).getDownloadURL()
}
