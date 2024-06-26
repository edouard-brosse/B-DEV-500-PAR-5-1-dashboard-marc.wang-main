import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database'
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT,
  databaseURL: process.env.REACT_APP_DATABASE_URL
}
const app = firebase.initializeApp(config)
export const auth = app.auth()
export const googleAuth = new firebase.auth.GoogleAuthProvider()
export const facebookAuth = new firebase.auth.FacebookAuthProvider()
export const db = firebase.database(app)
export default app