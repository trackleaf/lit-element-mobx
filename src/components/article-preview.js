import { Component, html } from './base'
import { withRouterLinks } from 'slick-router/middlewares/router-links'

const FAVORITED_CLASS = 'btn btn-sm btn-primary'
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary'

@withRouterLinks
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
          <a href=${`#@${article.author.username}`}
            ><img src=${article.author.image} alt=""
          /></a>
          <div class="info">
            <a class="author" href=${`#@${article.author.username}`}
              >${article.author.username}</a
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
        <a href=${`#article/${article.slug}`} class="preview-link"
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
          </ul></a
        >
      </div>
    `
  }
}

customElements.define('article-preview', ArticlePreview)
