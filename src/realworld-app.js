import { Component, html } from './components/base'
import PrivateRoute from 'components/PrivateRoute'

import './components/app-header'

import 'pages/login-page'
import 'pages/Home/home-page'
import 'pages/register-page'
import 'pages/Article/article-page'
import 'pages/editor-page'
import 'pages/profile-page'
import 'pages/settings-page'

class App extends Component {
  static properties = {
    stores: { type: Object, attribute: false }
  }

  static providedContexts = {
    stores: { property: 'stores' }
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.stores.commonStore.token) {
      this.stores.userStore
        .pullUser()
        .finally(() => this.stores.commonStore.setAppLoaded())
    } else {
      this.stores.commonStore.setAppLoaded()
    }
  }

  render() {
    if (this.stores.commonStore.appLoaded) {
      const { currentUser } = this.stores.userStore
      return html`
        <div>
          <app-header></app-header>
          <stencil-route-switch>
            <stencil-route url="/login" component="login-page"></stencil-route>
            <stencil-route url="/register" component="register-page">
            </stencil-route>
            <stencil-route url="/editor/:slug?" component="editor-page">
            </stencil-route>
            <stencil-route url="/article/:id" component="article-page">
            </stencil-route>
            ${PrivateRoute({
              component: 'settings-page',
              url: '/settings',
              currentUser
            })}
            </private-route>
            <stencil-route url="/@:username" component="profile-page">
            </stencil-route>
            <stencil-route url="/@:username/favorites" component="profile-page">
            </stencil-route>
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
