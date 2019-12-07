import { html } from 'lit-html'

const DeleteButton = props => {
  const handleClick = () => props.onDelete(props.commentId)

  if (props.show) {
    return html`
      <span class="mod-options"
        ><i class="ion-trash-a" @click=${handleClick}></i
      ></span>
    `
  }
  return null
}

export default DeleteButton
