import { Route, elProperty } from 'nextbone-routing'
import './profile-page'

export default class ProfileRoute extends Route {
  static component = 'profile-page'

  load(transition) {
    if (this.username !== transition.params.username) {
      this.username = transition.params.username
      this.context.stores.profileStore.loadProfile(this.username)
    }

    if (this.pathname !== transition.pathname) {
      this.pathname = transition.pathname
      this.context.stores.articlesStore.setPredicate(this.getPredicate())
      this.context.stores.articlesStore.loadArticles()
    }
  }

  getTab() {
    if (/\/favorites/.test(this.pathname)) return 'favorites'
    return 'all'
  }

  getPredicate() {
    switch (this.getTab()) {
      case 'favorites':
        return { favoritedBy: this.username }
      default:
        return { author: this.username }
    }
  }
}
