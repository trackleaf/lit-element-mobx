import ArticleList from '../../components/ArticleList'
import { parse as qsParse } from 'query-string'
import { Component, html } from '../../components/base'
import { injectHistory } from '@stencil/router/dist/cjs/index.cjs'

const YourFeedTab = ({ currentUser, tab }) => {
  if (currentUser) {
    return html`
      <li class="nav-item">
        <stencil-route-link
          anchor-class=${`nav-link ${tab === 'feed' ? 'active' : ''}`}
          url-match="/xxxxx"
          url="/?tab=feed"
          >Your Feed</stencil-route-link
        >
      </li>
    `
  }
  return null
}

const GlobalFeedTab = ({ tab }) => {
  return html`
    <li class="nav-item">
      <stencil-route-link
        anchor-class=${`nav-link ${tab === 'all' ? 'active' : ''}`}
        url-match="/xxxxx"
        url="/?tab=all"
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
    search: { type: String }
  }

  connectedCallback() {
    super.connectedCallback()
    this.context.stores.articlesStore.setPredicate(this.getPredicate())
    this.context.stores.articlesStore.loadArticles()
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('search')) {
      if (
        this.getTab() !== this.getTab(changedProperties.get('search')) ||
        this.getTag() !== this.getTag(changedProperties.get('search'))
      ) {
        this.context.stores.articlesStore.setPredicate(this.getPredicate())
        this.context.stores.articlesStore.loadArticles()
      }
    }
    return true
  }

  getTag(search = this.search) {
    return qsParse(search).tag || ''
  }

  getTab(search = this.search) {
    return qsParse(search).tab || 'all'
  }

  getPredicate(search = this.search) {
    switch (this.getTab(search)) {
      case 'feed':
        return { myFeed: true }
      case 'tag':
        return { tag: qsParse(search).tag }
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

    const tab = this.getTab()

    return html`
      <div>
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            ${YourFeedTab({ currentUser, tab })} ${GlobalFeedTab({ tab })}
            ${TagFilterTab({ tag: qsParse(this.search).tag })}
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
