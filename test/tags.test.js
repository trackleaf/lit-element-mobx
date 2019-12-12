import { expect, fixture } from '@open-wc/testing'
import Tags from 'pages/Home/Tags'

describe('Tags', () => {
  it('with tags undefined', async () => {
    const el = await fixture(Tags({}))
    expect(el).dom.to.equal('<loading-spinner></loading-spinner>', {
      ignoreChildren: ['loading-spinner']
    })
  })

  it('with tags as array of string', async () => {
    const el = await fixture(Tags({ tags: ['sugar', 'clear', 'test'] }))
    expect(el).dom.to.equalSnapshot()
  })
})
