import { html } from './base'

const ListPagination = props => {
  if (props.totalPagesCount < 2) {
    return null
  }

  const range = []
  for (let i = 0; i < props.totalPagesCount; ++i) {
    range.push(i)
  }

  return html`
    <nav>
      <ul class="pagination">
        ${range.map(v => {
          const isCurrent = v === props.currentPage

          const onClick = ev => {
            ev.preventDefault()
            props.onSetPage(v)
          }

          return html`
            <li
              class=${isCurrent ? 'page-item active' : 'page-item'}
              @click=${onClick}
              key=${v.toString()}
            >
              <a class="page-link" href="">${v + 1}</a>
            </li>
          `
        })}
      </ul>
    </nav>
  `
}

export default ListPagination
