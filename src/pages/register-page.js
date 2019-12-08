import 'components/list-errors'
import { Component, html } from 'components/base'

class RegisterPage extends Component {
  static observedContexts = ['stores']

  disconnectedCallback() {
    super.disconnectedCallback()
    this.context.stores.authStore.reset()
  }

  handleUsernameChange = e =>
    this.context.stores.authStore.setUsername(e.target.value)
  handleEmailChange = e =>
    this.context.stores.authStore.setEmail(e.target.value)
  handlePasswordChange = e =>
    this.context.stores.authStore.setPassword(e.target.value)
  handleSubmitForm = e => {
    e.preventDefault()
    this.context.stores.authStore
      .register()
      .then(() => this.props.history.replace('/'))
  }

  render() {
    const { values, errors, inProgress } = this.context.stores.authStore

    return html`
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign Up</h1>
              <p class="text-xs-center">
                <stencil-route-link url="login"
                  >Have an account?</stencil-route-link
                >
              </p>
              <list-errors .errors=${errors}></list-errors>
              <form @submit=${this.handleSubmitForm}>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      .value=${values.username}
                      @change=${this.handleUsernameChange}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      .value=${values.email}
                      @change=${this.handleEmailChange}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      .value=${values.password}
                      @change=${this.handlePasswordChange}
                    />
                  </fieldset>
                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    ?disabled=${inProgress}
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('register-page', RegisterPage)
