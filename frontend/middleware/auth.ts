import {auth} from "~/firebase";

export default function ({ route, redirect }) {
  if(!auth.currentUser && route.path !== "/auth") {
    return redirect("/auth")
  }
}
