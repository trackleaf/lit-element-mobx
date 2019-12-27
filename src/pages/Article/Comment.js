import DeleteButton from './DeleteButton'
import { html } from 'lit-html'
import { ifDefined } from 'components/base'

const Comment = props => {
  const comment = props.comment
  const show =
    props.currentUser && props.currentUser.username === comment.author.username
  return html`
    <div class="card">
      <div class="card-block"><p class="card-text">${comment.body}</p></div>
      <div class="card-footer">
        <a url=${`/@${comment.author.username}`} class="comment-author"
          ><img
            src=${ifDefined(comment.author.image || undefined)}
            class="comment-author-img"
            alt=""
        /></a>
        <a url=${`/@${comment.author.username}`} class="comment-author"
          >${comment.author.username}</a
        ><span class="date-posted"
          >${new Date(comment.createdAt).toDateString()}</span
        >
        ${DeleteButton({
          show,
          slug: props.slug,
          commentId: comment.id,
          onDelete: props.onDelete
        })}
      </div>
    </div>
  `
}

export default Comment
