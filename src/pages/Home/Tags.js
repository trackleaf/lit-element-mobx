import '../../components/loading-spinner'
import { html } from 'lit-html'

const Tags = props => {
  const tags = props.tags
  if (tags) {
    return html`
      <div class="tag-list">
        ${tags.map(tag => {
          return html`
            <stencil-route-link
              url="/?tab=tag&tag=${tag}"
              anchor-class="tag-default tag-pill"
              >${tag}</stencil-route-link
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
