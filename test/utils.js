import { fixture } from '@open-wc/testing'
// import { registerProvidedContext } from 'wc-context/core'

export async function contextFixture(template, contexts) {
  const el = await fixture(template)
  const elContext = el.context
  // todo: use registerProvidedContext in el.parent (needs wrapper before attaching el)
  if (elContext) {
    Object.assign(elContext, contexts)
  }
  return el
}
