import {auth} from "~/firebase";
import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = async ({route, redirect}) => {
  if(!auth.currentUser && route.path !== "/auth") {
    await auth.signInAnonymously()
  }
}

export default myMiddleware
