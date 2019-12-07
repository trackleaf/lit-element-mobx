import { render, html } from 'lit-html'
import promiseFinally from 'promise.prototype.finally'
import { useStrict } from 'mobx'
import { defineCustomElements } from '@stencil/router/dist/cjs/loader.cjs'

import './realworld-app'

import articlesStore from './stores/articlesStore'
import commentsStore from './stores/commentsStore'
import authStore from './stores/authStore'
import commonStore from './stores/commonStore'
import editorStore from './stores/editorStore'
import userStore from './stores/userStore'
import profileStore from './stores/profileStore'

const stores = {
  articlesStore,
  commentsStore,
  authStore,
  commonStore,
  editorStore,
  userStore,
  profileStore
}

// @stencil/router
defineCustomElements()

// For easier debugging
window._____APP_STATE_____ = stores

promiseFinally.shim()
useStrict(true)

render(
  html`
    <stencil-router>
      <realworld-app .stores=${stores}></realworld-app>
    </stencil-router>
  `,
  document.getElementById('root')
)
