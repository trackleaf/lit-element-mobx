import ArticleList from '../../components/ArticleList'
import { Component, html } from '../../components/base'
import { withRouterLinks } from 'slick-router/middlewares/router-links'

const YourFeedTab = ({ currentUser, tab }) => {
  if (currentUser) {
    return html`
      <li class="nav-item">
        <a
          route="home"
          query-tab="feed"
          class=${`nav-link ${tab === 'feed' ? 'active' : ''}`}
          >Your Feed</a
        >
      </li>
    `
  }
  return null
}

const GlobalFeedTab = ({ tab }) => {
  return html`
    <li class="nav-item">
      <a
        route="home"
        query-tab="all"
        active-class=""
        class=${`nav-link ${tab === 'all' ? 'active' : ''}`}
        >Global Feed</a
      >
    </li>
  `
}

const TagFilterTab = props => {
  if (!props.tag) {
    return null
  }

  return html`
    <li class="nav-item">
      <a route="home" query-tag=${props.tag} class="nav-link active"
        ><i class="ion-pound"></i> ${props.tag}</a
      >
    </li>
  `
}

@withRouterLinks
class MainView extends Component {
  static observedContexts = ['stores']

  static properties = {
    tab: { type: String },
    tag: { type: String }
  }

  connectedCallback() {
    super.connectedCallback()
    this.context.stores.articlesStore.setPredicate(this.getPredicate())
    this.context.stores.articlesStore.loadArticles()
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('tab') || changedProperties.has('tag')) {
      this.context.stores.articlesStore.setPredicate(this.getPredicate())
      this.context.stores.articlesStore.loadArticles()
    }
    return true
  }

  getTag() {
    return this.tag || ''
  }

  getTab() {
    return this.tab || 'all'
  }

  getPredicate() {
    switch (this.getTab()) {
      case 'feed':
        return { myFeed: true }
      case 'tag':
        return { tag: this.tag }
      default:
        return {}
    }
  }

  handleTabChange = tab => {
    if (this.tab === tab) return
    this.dispatchEvent(new CustomEvent('tab-changed', { detail: tab }))
  }

  handleSetPage = page => {
    this.context.stores.articlesStore.setPage(page)
    this.context.stores.articlesStore.loadArticles()
  }

  render() {
    const { currentUser } = this.context.stores.userStore
    const {
      articles,
      isLoading,
      page,
      totalPagesCount
    } = this.context.stores.articlesStore

    const tab = this.getTab()

    return html`
      <div>
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active" routerlinks>
            ${YourFeedTab({ currentUser, tab })} ${GlobalFeedTab({ tab })}
            ${TagFilterTab({ tag: this.tag })}
          </ul>
        </div>
        ${ArticleList({
          articles,
          totalPagesCount,
          loading: isLoading,
          currentPage: page,
          onSetPage: this.handleSetPage
        })}
      </div>
    `
  }
}

customElements.define('home-main-view', MainView)
