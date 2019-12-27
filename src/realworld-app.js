import { Component, html } from './components/base'

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

  firstUpdated() {
    if (this.stores.commonStore.token) {
      this.stores.userStore
        .pullUser()
        .finally(() => this.stores.commonStore.setAppLoaded())
    } else {
      this.stores.commonStore.setAppLoaded()
    }
  }

  render() {
    return html`
      <div>
        <app-header></app-header>
        <app-root><loading-spinner></loading-spinner></app-root>
      </div>
    `
  }
}

customElements.define('realworld-app', App)
