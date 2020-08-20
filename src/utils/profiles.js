import firebase from 'firebase'

export const getAvatarUrl = avatar => {
	return firebase
		.storage()
		.ref(avatar)
		.getDownloadURL()
}
