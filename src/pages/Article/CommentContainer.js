import './comment-input'
import CommentList from './CommentList'
import 'components/list-errors'
import { html } from 'lit-html'

const CommentContainer = props => {
  if (props.currentUser) {
    return html`
      <div class="col-xs-12 col-md-8 offset-md-2">
        <div>
          <list-errors errors=${props.errors}></list-errors>
          <comment-input
            .currentUser=${props.currentUser}
            slug=${props.slug}
          ></comment-input>
        </div>
        ${CommentList(props)}
      </div>
    `
  } else {
    return html`
      <div class="col-xs-12 col-md-8 offset-md-2">
        <p>
          <stencil-route-link url="/login">Sign in</stencil-route-link> or
          <stencil-route-link url="/register">sign up</stencil-route-link> to
          add comments on this article.
        </p>
        ${CommentList(props)}
      </div>
    `
  }
}

export default CommentContainer
