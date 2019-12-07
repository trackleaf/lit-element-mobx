import { LitElement, html } from 'lit-element'
import { styleMap } from 'lit-html/directives/style-map'
import { repeat } from 'lit-html/directives/repeat'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import { MobxReactionUpdate } from '@adobe/lit-mobx'
import { withContext } from 'wc-context/lit-element'

class Component extends withContext(MobxReactionUpdate(LitElement)) {
  createRenderRoot() {
    return this
  }
}

export { Component, html, styleMap, repeat, unsafeHTML }
