import 'components/red-error'
import 'components/loading-spinner'
import ArticleList from 'components/ArticleList'
import { Component, html } from 'components/base'
import { injectHistory } from '@stencil/router/dist/cjs/index.cjs'

const EditProfileSettings = props => {
  if (props.isUser) {
    return html`
      <stencil-route-link
        url="/settings"
        class="btn btn-sm btn-outline-secondary action-btn"
        ><i class="ion-gear-a"></i> Edit Profile Settings</stencil-route-link
      >
    `
  }
  return null
}

const FollowUserButton = props => {
  if (props.isUser) {
    return null
  }

  let classes = 'btn btn-sm action-btn'
  if (props.following) {
    classes += ' btn-secondary'
  } else {
    classes += ' btn-outline-secondary'
  }

  const handleClick = ev => {
    ev.preventDefault()
    if (props.following) {
      props.unfollow(props.username)
    } else {
      props.follow(props.username)
    }
  }

  return html`
    <button class=${classes} @click=${handleClick}>
      <i class="ion-plus-round"></i> ${props.following ? 'Unfollow' : 'Follow'}
      ${props.username}
    </button>
  `
}

class ProfilePage extends Component {
  static observedContexts = ['stores']

  static properties = {
    location: {},
    match: {}
  }

  connectedCallback() {
    super.connectedCallback()
    this.context.stores.articlesStore.setPredicate(this.getPredicate())
  }

  firstUpdated() {
    this.context.stores.profileStore.loadProfile(this.match.params.username)
    this.context.stores.articlesStore.loadArticles()
  }

  updated(changedProperties) {
    if (!changedProperties.has('location')) return

    this.context.stores.profileStore.loadProfile(this.match.params.username)
    this.context.stores.articlesStore.setPredicate(this.getPredicate())
    this.context.stores.articlesStore.loadArticles()
  }

  getTab() {
    if (/\/favorites/.test(this.location.pathname)) return 'favorites'
    return 'all'
  }

  getPredicate() {
    switch (this.getTab()) {
      case 'favorites':
        return { favoritedBy: this.match.params.username }
      default:
        return { author: this.match.params.username }
    }
  }

  handleFollow = () => this.context.stores.profileStore.follow()
  handleUnfollow = () => this.context.stores.profileStore.unfollow()

  handleSetPage = page => {
    this.context.stores.articlesStore.setPage(page)
    this.context.stores.articlesStore.loadArticles()
  }

  renderTabs() {
    const { profile } = this.context.stores.profileStore
    const isFavorites = this.location.pathname.match('/favorites')
    return html`
      <ul class="nav nav-pills outline-active">
        <li class="nav-item">
          <stencil-route-link
            anchor-class=${`nav-link ${!isFavorites ? 'active' : ''}`}
            url=${`/@${profile.username}`}
            >My Articles</stencil-route-link
          >
        </li>
        <li class="nav-item">
          <stencil-route-link
            anchor-class="nav-link"
            url=${`/@${profile.username}/favorites`}
            active-class="active"
            >Favorited Articles</stencil-route-link
          >
        </li>
      </ul>
    `
  }

  render() {
    const { profileStore, articlesStore, userStore } = this.context.stores
    const { profile, isLoadingProfile } = profileStore
    const { currentUser } = userStore

    if (isLoadingProfile && !profile)
      return html`
        <loading-spinner></loading-spinner>
      `
    if (!profile)
      return html`
        <red-error message="Can't load profile"></red-error>
      `

    const isUser = currentUser && profile.username === currentUser.username

    return html`
      <div class="profile-page">
        <div class="user-info">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <img src=${profile.image} class="user-img" alt="" />
                <h4>${profile.username}</h4>
                <p>${profile.bio}</p>
                ${EditProfileSettings({ isUser })}
                ${FollowUserButton({
                  isUser,
                  username: profile.username,
                  following: profile.following,
                  unfollow: this.handleUnfollow
                })}
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <div class="articles-toggle">${this.renderTabs()}</div>
              ${ArticleList({
                articles: articlesStore.articles,
                totalPagesCount: articlesStore.totalPagesCount,
                onSetPage: this.handleSetPage,
                loading: articlesStore.isLoading
              })}
            </div>
          </div>
        </div>
      </div>
    `
  }
}

injectHistory(ProfilePage)

customElements.define('profile-page', ProfilePage)
