import {auth} from "~/firebase";
import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({route, redirect}) => {
  if(!auth.currentUser && route.path !== "/auth") {
    return redirect("/auth")
  }
}

export default myMiddleware;
