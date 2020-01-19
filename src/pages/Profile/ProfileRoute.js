import { Route, property } from 'nextbone-routing'
import './profile-page'
import { on } from 'nextbone'

export default class ProfileRoute extends Route {
  static component = 'profile-page'

  @property({ from: 'params.username' })
  username

  @property({ from: 'pathname' })
  pathname

  @on('change:pathname')
  pathnameChange() {
    this.context.stores.articlesStore.setPredicate(this.getPredicate())
    this.context.stores.articlesStore.loadArticles()
  }

  @on('change:username')
  usernameChange() {
    this.context.stores.profileStore.loadProfile(this.username)
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
