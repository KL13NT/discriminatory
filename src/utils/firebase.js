import { initializeApp as initFirebase } from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

import firebaseConfig from '../../client.firebase.json'

const firebase = initFirebase(firebaseConfig)

export const auth = firebase.auth()
export const storage = firebase.storage()
export default firebase
