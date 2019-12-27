import { Component, html, ifDefined } from './base'
import { withRouterLinks } from 'slick-router/middlewares/router-links'

const LoggedOutView = props => {
  if (!props.currentUser) {
    return html`
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a route="home" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a route="login" class="nav-link">Sign in</a>
        </li>
        <li class="nav-item">
          <a route="register" class="nav-link">Sign up</a>
        </li>
      </ul>
    `
  }
  return null
}

const LoggedInView = props => {
  if (props.currentUser) {
    return html`
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a route="home" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a route="editor" class="nav-link"
            ><i class="ion-compose"></i> New Post</a
          >
        </li>
        <li class="nav-item">
          <a route="settings" class="nav-link"
            ><i class="ion-gear-a"></i> Settings</a
          >
        </li>
        <li class="nav-item">
          <a
            route="profile"
            param-username=${props.currentUser.username}
            class="nav-link"
            ><img
              src=${ifDefined(props.currentUser.image || undefined)}
              class="user-pic"
              alt=""
            />${props.currentUser.username}</a
          >
        </li>
      </ul>
    `
  }

  return null
}

@withRouterLinks
class AppHeader extends Component {
  static observedContexts = ['stores']

  render() {
    const { commonStore, userStore } = this.context.stores
    return html`
      <nav class="navbar navbar-light">
        <div class="container" routerlinks>
          <a route="home" class="navbar-brand"
            >${commonStore.appName.toLowerCase()}</a
          >
          ${LoggedOutView({ currentUser: userStore.currentUser })}
          ${LoggedInView({ currentUser: userStore.currentUser })}
        </div>
      </nav>
    `
  }
}

customElements.define('app-header', AppHeader)
