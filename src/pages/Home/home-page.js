import { Component, html } from '../../components/base'
import Banner from './Banner'
import Tags from './Tags'
import './home-main-view'
import { withRouterLinks } from 'router'

@withRouterLinks
class HomePage extends Component {
  static observedContexts = ['stores']

  static properties = {
    $route: {}
  }

  connectedCallback() {
    super.connectedCallback()
    this.context.stores.commonStore.loadTags()
  }

  tabChanged(e) {
    this.$router.transitionTo('home', {}, { tab: e.detail })
  }

  render() {
    const { tags, token, appName } = this.context.stores.commonStore
    const query = this.$route ? this.$route.query : {}
    return html`
      <div class="home-page">
        ${Banner({ token: token, appName: appName })}
        <div class="container page">
          <div class="row">
            <home-main-view
              class="col-md-9"
              .tag=${query.tag}
              .tab=${query.tab}
              @tab-changed=${this.tabChanged}
            ></home-main-view>
            <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>
                ${Tags({ tags })}
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('home-page', HomePage)
