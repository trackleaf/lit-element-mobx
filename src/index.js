import { render, html } from 'lit-html'
import 'promise-prototype-finally'
import { configure as configureMobx } from 'mobx'
import { defineCustomElements } from '@stencil/router/dist/cjs/loader.cjs'
import agent from 'agent'

import RootStore from './stores/rootStore'
import './realworld-app'

const stores = new RootStore()

// @stencil/router
defineCustomElements()

// For easier debugging
window._____APP_STATE_____ = stores

configureMobx({ enforceActions: 'observed' })
agent.configure(stores)

render(
  html`
    <stencil-router history-type="hash">
      <realworld-app .stores=${stores}></realworld-app>
    </stencil-router>
  `,
  document.getElementById('root')
)
