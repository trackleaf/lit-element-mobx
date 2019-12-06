import { LitElement, html } from 'lit-element'
import { MobxReactionUpdate } from '@adobe/lit-mobx'
import { withContext } from 'wc-context/lit-element'

class Component extends withContext(MobxReactionUpdate(LitElement)) {
  createRenderRoot() {
    return this
  }
}

export { Component, html }
