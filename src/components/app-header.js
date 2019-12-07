import { Component, html, ifDefined } from './base'

const LoggedOutView = props => {
  if (!props.currentUser) {
    return html`
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <stencil-route-link url="/" anchor-class="nav-link"
            >Home</stencil-route-link
          >
        </li>
        <li class="nav-item">
          <stencil-route-link url="/login" anchor-class="nav-link"
            >Sign in</stencil-route-link
          >
        </li>
        <li class="nav-item">
          <stencil-route-link url="/register" anchor-class="nav-link"
            >Sign up</stencil-route-link
          >
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
          <stencil-route-link url="/" anchor-class="nav-link"
            >Home</stencil-route-link
          >
        </li>
        <li class="nav-item">
          <stencil-route-link url="/editor" anchor-class="nav-link"
            ><i class="ion-compose"></i> New Post</stencil-route-link
          >
        </li>
        <li class="nav-item">
          <stencil-route-link url="/settings" anchor-class="nav-link"
            ><i class="ion-gear-a"></i> Settings</stencil-route-link
          >
        </li>
        <li class="nav-item">
          <stencil-route-link
            url=${`/@${props.currentUser.username}`}
            anchor-class="nav-link"
            ><img
              src=${ifDefined(props.currentUser.image || undefined)}
              class="user-pic"
              alt=""
            />${props.currentUser.username}</stencil-route-link
          >
        </li>
      </ul>
    `
  }

  return null
}

class AppHeader extends Component {
  static observedContexts = ['stores']

  render() {
    const { commonStore, userStore } = this.context.stores
    return html`
      <nav class="navbar navbar-light">
        <div class="container">
          <stencil-route-link url="/" class="navbar-brand"
            >${commonStore.appName.toLowerCase()}</stencil-route-link
          >
          ${LoggedOutView({ currentUser: userStore.currentUser })}
          ${LoggedInView({ currentUser: userStore.currentUser })}
        </div>
      </nav>
    `
  }
}

customElements.define('app-header', AppHeader)
