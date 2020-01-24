import { Component, html } from './components/base'
import {
  AnimatedOutlet,
  GenericCSS,
  registerAnimation
} from 'slick-router/components/animated-outlet'

import './components/app-header'

class RevealAnimation extends GenericCSS {
  leave(outlet, el, done) {
    super.leave(outlet, el, done)
    // run animation once
    outlet.removeAttribute('animation')
  }
}

registerAnimation('reveal', RevealAnimation)

customElements.define('app-root', AnimatedOutlet)

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
    const token = this.stores.commonStore.token
    return html`
      <div>
        <app-header></app-header>
        <app-root animation="reveal">
          <div class="splash-screen">
            Welcome${token ? ' back' : ''}!<br />Wait a second...
          </div>
        </app-root>
      </div>
    `
  }
}

customElements.define('realworld-app', App)
