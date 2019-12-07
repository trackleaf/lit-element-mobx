import { Component, html } from '../../components/base'
import Banner from './Banner'
import Tags from './Tags'
import './home-main-view'

class HomePage extends Component {
  static observedContexts = ['stores']

  firstUpdated() {
    this.context.stores.commonStore.loadTags()
  }

  render() {
    const { tags, token, appName } = this.context.stores.commonStore
    return html`
      <div class="home-page">
        ${Banner({ token: token, appName: appName })}
        <div class="container page">
          <div class="row">
            <home-main-view class="col-md-9"></home-main-view>
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
