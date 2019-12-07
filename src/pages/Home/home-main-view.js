import ArticleList from '../../components/ArticleList'
import { parse as qsParse } from 'query-string'
import { Component, html } from '../../components/base'
import { injectHistory } from '@stencil/router/dist/cjs/index.cjs'

const YourFeedTab = props => {
  if (props.currentUser) {
    return html`
      <li class="nav-item">
        <stencil-route-link
          class="nav-link"
          .isActive=${(match, location) => {
            return location.search.match('tab=feed') ? 1 : 0
          }}
          url="/?tab=feed"
          >Your Feed</stencil-route-link
        >
      </li>
    `
  }
  return null
}

const GlobalFeedTab = props => {
  return html`
    <li class="nav-item">
      <stencil-route-link
        anchor-class="nav-link"
        url-match="/"
        url="/?tab=all"
        active-class="active"
        .exact=${true}
        >Global Feed</stencil-route-link
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
      <a href="" class="nav-link active"
        ><i class="ion-pound"></i> ${props.tag}</a
      >
    </li>
  `
}

class MainView extends Component {
  static observedContexts = ['stores']

  static properties = {
    location: {}
  }

  connectedCallback() {
    super.connectedCallback()
    this.context.stores.articlesStore.setPredicate(this.getPredicate())
  }

  firstUpdated() {
    this.context.stores.articlesStore.loadArticles()
  }

  updated(changedProperties) {
    if (!changedProperties.has('location')) {
      return
    }
    if (
      this.getTab() !== this.getTab(changedProperties.get('location')) ||
      this.getTag() !== this.getTag(changedProperties.get('location'))
    ) {
      this.context.stores.articlesStore.setPredicate(this.getPredicate())
      this.context.stores.articlesStore.loadArticles()
    }
  }

  getTag(location = this.location) {
    return qsParse(location.search).tag || ''
  }

  getTab(location = this.location) {
    return qsParse(location.search).tab || 'all'
  }

  getPredicate(location = this.location) {
    switch (this.getTab(location)) {
      case 'feed':
        return { myFeed: true }
      case 'tag':
        return { tag: qsParse(location.search).tag }
      default:
        return {}
    }
  }

  handleTabChange = tab => {
    if (this.location.query.tab === tab) return
    this.history.push({ ...this.location, query: { tab } })
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

    return html`
      <div>
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            ${YourFeedTab({ currentUser, tab: this.getTab() })}
            ${GlobalFeedTab({ tab: this.getTab() })}
            ${TagFilterTab({ tag: qsParse(this.location.search).tag })}
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

injectHistory(MainView)

customElements.define('home-main-view', MainView)
