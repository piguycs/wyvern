import firebase from "firebase/app"
import "firebase/auth"


const fcfg = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

const app = firebase.initializeApp(fcfg)
const provider = new firebase.auth.GoogleAuthProvider();

export { fcfg, provider }
export default app
export const auth = app.auth()