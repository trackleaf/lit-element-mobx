import { Component, html } from './base'

const FAVORITED_CLASS = 'btn btn-sm btn-primary'
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary'

class ArticlePreview extends Component {
  static observedContexts = ['stores']

  static properties = {
    article: { type: Object }
  }

  handleClickFavorite = ev => {
    ev.preventDefault()
    const { article } = this
    const { articlesStore } = this.context.stores
    if (article.favorited) {
      articlesStore.unmakeFavorite(article.slug)
    } else {
      articlesStore.makeFavorite(article.slug)
    }
  }

  render() {
    const { article } = this
    const favoriteButtonClass = article.favorited
      ? FAVORITED_CLASS
      : NOT_FAVORITED_CLASS

    return html`
      <div class="article-preview">
        <div class="article-meta">
          <stencil-route-link url=${`/@${article.author.username}`}
            ><img src=${article.author.image} alt=""
          /></stencil-route-link>
          <div class="info">
            <stencil-route-link
              anchor-class="author"
              url=${`/@${article.author.username}`}
              >${article.author.username}</stencil-route-link
            ><span class="date"
              >${new Date(article.createdAt).toDateString()}</span
            >
          </div>
          <div class="pull-xs-right">
            <button
              class=${favoriteButtonClass}
              @click=${this.handleClickFavorite}
            >
              <i class="ion-heart"></i> ${article.favoritesCount}
            </button>
          </div>
        </div>
        <stencil-route-link
          url=${`/article/${article.slug}`}
          anchor-class="preview-link"
          ><h1>${article.title}</h1>
          <p>${article.description}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            ${article.tagList.map(tag => {
              return html`
                <li class="tag-default tag-pill tag-outline" key=${tag}>
                  ${tag}
                </li>
              `
            })}
          </ul></stencil-route-link
        >
      </div>
    `
  }
}

customElements.define('article-preview', ArticlePreview)
