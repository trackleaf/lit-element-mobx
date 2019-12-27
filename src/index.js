import { render, html } from 'lit-html'
import 'promise-prototype-finally'
import { configure as configureMobx, observe } from 'mobx'
import agent from 'agent'

import RootStore from './stores/rootStore'
import { createRouter } from './router'
import './realworld-app'

const stores = new RootStore()

// For easier debugging
window._____APP_STATE_____ = stores

configureMobx({ enforceActions: 'observed' })
agent.configure(stores)

const router = createRouter({ stores })
router.listen()

render(
  html`
    <realworld-app .stores=${stores}></realworld-app>
  `,
  document.getElementById('root')
)
