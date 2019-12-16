import { expect, html } from '@open-wc/testing'
import { fixture } from 'wc-testing'
import { registerProvidedContext } from 'wc-context/core'
import 'components/app-header'
import RootStore from 'stores/rootStore'

const loggedUserSample = {
  id: 1234,
  email: 'xxxxx@yahoo.com.br',
  createdAt: '2017-05-08T16:00:33.262Z',
  updatedAt: '2017-05-08T16:00:33.268Z',
  username: 'blikblum',
  bio: null,
  image: null,
  token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
}

describe('app-header', () => {
  let stores
  let contextEl
  beforeEach(() => {
    stores = new RootStore()
    contextEl = document.createElement('div')
    registerProvidedContext(contextEl, 'stores', { stores })
  })
  it('with logged user', async () => {
    stores.userStore.currentUser = loggedUserSample
    const el = await fixture(
      html`
        <app-header></app-header>
      `,
      { parent: contextEl }
    )
    expect(el).dom.to.equalSnapshot()
  })

  it('without logged user', async () => {
    const el = await fixture(
      html`
        <app-header></app-header>
      `,
      { parent: contextEl }
    )
    expect(el).dom.to.equalSnapshot()
  })
})
