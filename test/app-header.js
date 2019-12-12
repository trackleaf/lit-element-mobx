import { expect, html } from '@open-wc/testing'
import 'components/app-header'
import { contextFixture } from './utils'
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
  beforeEach(() => {
    stores = new RootStore()
  })
  it('with logged user', async () => {
    const el = await contextFixture(
      html`
        <app-header></app-header>
      `,
      { stores }
    )
    expect(el).dom.to.equalSnapshot()
  })

  it('without logged user', async () => {
    stores.userStore.currentUser = loggedUserSample
    const el = await contextFixture(
      html`
        <app-header></app-header>
      `,
      { stores }
    )
    expect(el).dom.to.equalSnapshot()
  })
})
