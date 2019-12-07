import './components/app-header'

// import PrivateRoute from 'components/PrivateRoute'

import 'pages/login-page'
import 'pages/Home/home-page'
// import Register from 'pages/Register'
import 'pages/Article/article-page'
import 'pages/editor-page'
// import Profile from 'pages/Profile'
// import Settings from 'pages/Settings'
import { Component, html } from './components/base'

class App extends Component {
  static properties = {
    stores: { type: Object, attribute: false }
  }

  static providedContexts = {
    stores: { property: 'stores' }
  }

  connectedCallback() {
    super.connectedCallback()
    if (!this.stores.commonStore.token) {
      this.stores.commonStore.setAppLoaded()
    }
  }

  updated() {
    if (this.stores.commonStore.token) {
      this.stores.userStore
        .pullUser()
        .finally(() => this.stores.commonStore.setAppLoaded())
    }
  }

  render() {
    if (this.stores.commonStore.appLoaded) {
      return html`
        <div>
          <app-header></app-header>
          <stencil-route-switch
            ><stencil-route url="/login" component="login-page"></stencil-route
            ><stencil-route
              url="/register"
              component="register-view"
            ></stencil-route>
            <stencil-route
              url="/editor/:slug?"
              component="editor-page"
            ></stencil-route>
            <stencil-route
              url="/article/:id"
              component="article-page"
            ></stencil-route>
            <private-route
              url="/settings"
              component="settings-view"
            ></private-route>
            <stencil-route
              url="/@:username"
              component="profile-view"
            ></stencil-route>
            <stencil-route
              url="/@:username/favorites"
              component="profile-view"
            ></stencil-route>
            <stencil-route
              url="/"
              component="home-page"
              .exact=${true}
            ></stencil-route>
          </stencil-route-switch>
        </div>
      `
    }
    return html`
      <app-header></app-header>
    `
  }
}

customElements.define('realworld-app', App)
