import { html } from './base'
import { render } from 'lit-html'

function makeTemplate(content) {
  const templateContent = `return html\`${content}\`;`
  // You may want to accept more arguments here for your data model,
  // or call with Function#call to set `this`:
  return new Function('html', templateContent).bind(undefined, html)
}

const PrivateRoute = ({ currentUser, component, url }) => {
  return html`
    <stencil-route
      url=${url}
      .routeRender=${function({ match }) {
        if (currentUser) {
          const template = makeTemplate(`<${component}></${component}>`)
          render(template(), this.el)
        } else {
          render(
            match.handled
              ? html``
              : html`
                  <stencil-router-redirect url="/"></stencil-router-redirect>
                `,
            this.el
          )
          // add a flag to remove the redirect element the second time is called
          // (when is redirected the route component is not removed)
          match.handled = true
        }
      }}
    ></stencil-route>
  `
  return
}

export default PrivateRoute
