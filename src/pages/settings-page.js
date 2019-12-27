import 'components/list-errors'
import { Component, html } from 'components/base'

class SettingsForm extends Component {
  static observedContexts = ['stores']

  static properties = {
    state: { type: Object }
  }

  constructor() {
    super()

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    }

    this.updateState = field => ev => {
      const state = this.state
      const newState = Object.assign({}, state, { [field]: ev.target.value })
      this.state = newState
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const user = Object.assign({}, this.state)
      if (!user.password) {
        delete user.password
      }

      this.onSubmitForm(user)
    }
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.context.stores.userStore.currentUser) {
      Object.assign(this.state, {
        image: this.context.stores.userStore.currentUser.image || '',
        username: this.context.stores.userStore.currentUser.username,
        bio: this.context.stores.userStore.currentUser.bio || '',
        email: this.context.stores.userStore.currentUser.email
      })
    }
  }

  render() {
    return html`
      <form @submit=${this.submitForm}>
        <fieldset>
          <fieldset class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="URL of profile picture"
              .value=${this.state.image}
              @change=${this.updateState('image')}
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Username"
              .value=${this.state.username}
              @change=${this.updateState('username')}
            />
          </fieldset>
          <fieldset class="form-group">
            <textarea
              class="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              .value=${this.state.bio}
              @change=${this.updateState('bio')}
            /></textarea>
          </fieldset>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="email"
              placeholder="Email"
              .value=${this.state.email}
              @change=${this.updateState('email')}
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              .value=${this.state.password}
              @change=${this.updateState('password')}
            />
          </fieldset>
          <button
            class="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            ?disabled=${this.context.stores.userStore.updatingUser}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    `
  }
}

class SettingsPage extends Component {
  static observedContexts = ['stores']

  handleClickLogout = () =>
    this.context.stores.authStore
      .logout()
      .then(() => this.$router.replaceWith('home'))

  render() {
    return html`
      <div class="settings-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Your Settings</h1>
              <list-errors
                .errors=${this.context.stores.userStore.updatingUserErrors}
              ></list-errors>
              <settings-form
                .currentUser=${this.context.stores.userStore.currentUser}
                .onSubmitForm=${user =>
                  this.context.stores.userStore.updateUser(user)}
              ></settings-form>
              <hr />
              <button
                class="btn btn-outline-danger"
                @click=${this.handleClickLogout}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('settings-form', SettingsForm)
customElements.define('settings-page', SettingsPage)
