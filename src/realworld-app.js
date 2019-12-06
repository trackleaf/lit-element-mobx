import './components/app-header'

// import PrivateRoute from 'components/PrivateRoute'

// import Login from 'pages/Login'
// import Home from 'pages/Home'
// import Register from 'pages/Register'
// import Article from 'pages/Article'
// import Editor from 'pages/Editor'
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

  componentWillMount() {
    if (!this.stores.commonStore.token) {
      this.stores.commonStore.setAppLoaded()
    }
  }

  componentDidMount() {
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
            ><stencil-route path="/login" component="login-view"></stencil-route
            ><stencil-route
              path="/register"
              component="register-view"
            ></stencil-route>
            ><stencil-route
              path="/editor/:slug?"
              component="editor-view"
            ></stencil-route>
            ><stencil-route
              path="/article/:id"
              component="article-view"
            ></stencil-route>
            ><private-route
              path="/settings"
              component="settings-view"
            ></private-route>
            ><stencil-route
              path="/@:username"
              component="profile-view"
            ></stencil-route>
            ><stencil-route
              path="/@:username/favorites"
              component="profile-view"
            ></stencil-route>
            <stencil-route
              path="/"
              component="home-view"
              .exact=${true}
            ></stencil-route>
            ></stencil-route-switch
          >
        </div>
      `
    }
    return html`
      <app-header></app-header>
    `
  }
}

customElements.define('realworld-app', App)
