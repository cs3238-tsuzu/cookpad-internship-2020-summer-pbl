import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"
import config from "./config.json"

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  console.log("initializing firebase");
}

export default firebase;
export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export const login = async () => {
  if(!auth.currentUser) {
    await auth.signInAnonymously();
  }
}
