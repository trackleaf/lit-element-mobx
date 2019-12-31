import { Component, html } from './components/base'

import './components/app-header'

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
