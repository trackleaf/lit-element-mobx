import { html } from 'lit-html'

const ArticleActions = props => {
  const article = props.article
  const handleDelete = () => props.onDelete(article.slug)

  if (props.canModify) {
    return html`
      <span
        ><a
          href=${`#editor/${article.slug}`}
          class="btn btn-outline-secondary btn-sm"
          ><i class="ion-edit"></i> Edit Article</a
        ><button class="btn btn-outline-danger btn-sm" @click=${handleDelete}>
          <i class="ion-trash-a"></i> Delete Article
        </button></span
      >
    `
  }

  return html`
    <span></span>
  `
}

export default ArticleActions
