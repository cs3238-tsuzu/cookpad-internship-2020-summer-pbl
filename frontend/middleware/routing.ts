import {auth} from "~/firebase";

export default async function ({ route, redirect }) {
  if(!auth.currentUser && route.path !== "/auth") {
    await auth.signInAnonymously()
  }
}
