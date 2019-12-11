import { Component, html } from '../../components/base'
import Banner from './Banner'
import Tags from './Tags'
import './home-main-view'

class HomePage extends Component {
  static observedContexts = ['stores']

  static properties = {
    search: { type: String }
  }

  set match(value) {
    // listen to match because location is set even when element is being removed by the router
    this.search = this.history.location.search
  }

  connectedCallback() {
    super.connectedCallback()
    this.context.stores.commonStore.loadTags()
  }

  render() {
    const { tags, token, appName } = this.context.stores.commonStore
    return html`
      <div class="home-page">
        ${Banner({ token: token, appName: appName })}
        <div class="container page">
          <div class="row">
            <home-main-view
              class="col-md-9"
              search=${this.search}
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
