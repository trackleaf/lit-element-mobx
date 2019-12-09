import marked from 'marked'

import 'components/red-error'
import ArticleMeta from './ArticleMeta'
import CommentContainer from './CommentContainer'
import { Component, unsafeHTML, html } from 'components/base'
import { injectHistory } from '@stencil/router/dist/cjs/index.cjs'

class ArticlePage extends Component {
  static observedContexts = ['stores']

  static properties = {
    match: {}
  }

  connectedCallback() {
    super.connectedCallback()
    const slug = this.match.params.id
    this.context.stores.articlesStore.loadArticle(slug, { acceptCached: true })
    this.context.stores.commentsStore.setArticleSlug(slug)
    this.context.stores.commentsStore.loadComments()
  }

  handleDeleteArticle = slug => {
    this.context.stores.articlesStore
      .deleteArticle(slug)
      .then(() => this.history.replace('/'))
  }

  handleDeleteComment = id => {
    this.context.stores.commentsStore.deleteComment(id)
  }

  render() {
    const slug = this.match.params.id
    const { currentUser } = this.context.stores.userStore
    const { comments, commentErrors } = this.context.stores.commentsStore
    const article = this.context.stores.articlesStore.getArticle(slug)

    if (!article)
      return html`
        <red-error message="Can't load article"></red-error>
      `

    const markup = marked(article.body, { sanitize: true })
    const canModify =
      currentUser && currentUser.username === article.author.username
    return html`
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1>${article.title}</h1>
            ${ArticleMeta({
              article,
              canModify,
              onDelete: this.handleDeleteArticle
            })}
          </div>
        </div>
        <div class="container page">
          <div class="row article-content">
            <div class="col-xs-12">
              ${unsafeHTML(markup)}

              <ul class="tag-list">
                ${article.tagList.map(tag => {
                  return html`
                    <li class="tag-default tag-pill tag-outline">
                      ${tag}
                    </li>
                  `
                })}
              </ul>
            </div>
          </div>
          <hr />
          <div class="article-actions"></div>
          <div class="row">
            ${CommentContainer({
              comments,
              errors: commentErrors,
              slug,
              currentUser,
              onDelete: this.handleDeleteComment
            })}
          </div>
        </div>
      </div>
    `
  }
}

injectHistory(ArticlePage)

customElements.define('article-page', ArticlePage)
