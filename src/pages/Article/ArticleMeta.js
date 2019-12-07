import ArticleActions from './ArticleActions'
import { html } from 'lit-html'

const ArticleMeta = ({ article, canModify, onDelete }) => {
  return html`
    <div class="article-meta">
      <stencil-route-link to=${`/@${article.author.username}`}
        ><img src=${article.author.image} alt=""
      /></stencil-route-link>
      <div class="info">
        <stencil-route-link to=${`/@${article.author.username}`} class="author"
          >${article.author.username}</stencil-route-link
        ><span class="date">${new Date(article.createdAt).toDateString()}</span>
      </div>
      ${ArticleActions({
        article,
        canModify,
        onDelete
      })}
    </div>
  `
}

export default ArticleMeta
