import { Component, html } from './base'

class ListErrors extends Component {
  static properties = {
    errors: {}
  }
  render() {
    const errors = this.errors
    if (errors) {
      return html`
        <ul class="error-messages">
          ${Object.keys(errors).map(key => {
            return html`
              <li>${key} ${errors[key]}</li>
            `
          })}
        </ul>
      `
    } else {
      return null
    }
  }
}

customElements.define('list-errors', ListErrors)
