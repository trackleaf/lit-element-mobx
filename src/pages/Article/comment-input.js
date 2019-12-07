import { Component, html } from 'components/base'

class CommentInput extends Component {
  static observedContexts = ['stores']

  static properties = {
    body: { type: String },
    currentUser: {}
  }
  constructor() {
    super()
    this.body = ''

    this.handleBodyChange = ev => {
      this.body = ev.target.value
    }

    this.createComment = ev => {
      ev.preventDefault()
      this.context.stores.commentsStore
        .createComment({ body: this.body })
        .then(() => (this.body = ''))
    }
  }

  render() {
    const { isCreatingComment } = this.context.stores.commentsStore
    return html`
      <form class="card comment-form" @nsubmit=${this.createComment}>
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            .value=${this.body}
            ?disabled=${isCreatingComment}
            @change=${this.handleBodyChange}
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img
            src=${this.currentUser.image}
            class="comment-author-img"
            alt=""
          /><button class="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    `
  }
}

customElements.define('comment-input', CommentInput)
