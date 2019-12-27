import ArticleActions from './ArticleActions'
import { html } from 'lit-html'

const ArticleMeta = ({ article, canModify, onDelete }) => {
  return html`
    <div class="article-meta">
      <a href=${`#@${article.author.username}`}
        ><img src=${article.author.image} alt=""
      /></a>
      <div class="info">
        <a href=${`#@${article.author.username}`} class="author"
          >${article.author.username}</a
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
