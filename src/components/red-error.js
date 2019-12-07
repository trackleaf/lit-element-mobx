import { styleMap, html, Component } from './base'

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const errorStyle = {
  display: 'inline-block',
  margin: '20px auto',
  borderRadius: '4px',
  padding: '8px 15px',
  color: 'rgb(240, 45, 45)',
  fontWeight: 'bold',
  backgroundColor: 'rgba(240, 45, 45, 0.1)'
}

export default class RedError extends Component {
  static properties = {
    message: { type: String }
  }

  render() {
    return html`
      <div style=${styleMap(wrapperStyle)}>
        <div style="${styleMap(errorStyle)}">${this.message}</div>
      </div>
    `
  }
}

customElements.define('red-error', RedError)
