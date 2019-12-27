import '../../components/loading-spinner'
import { html } from 'lit-html'

const Tags = props => {
  const tags = props.tags
  if (tags) {
    return html`
      <div class="tag-list" routerlinks>
        ${tags.map(tag => {
          return html`
            <a
              route="home"
              query-tab="tag"
              query-tag=${tag}
              class="tag-default tag-pill"
              >${tag}</a
            >
          `
        })}
      </div>
    `
  } else {
    return html`
      <loading-spinner></loading-spinner>
    `
  }
}

export default Tags
