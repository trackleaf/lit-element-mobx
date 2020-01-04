import { Route } from 'nextbone-routing'
import './editor-page'

export default class EditorRoute extends Route {
  static component = 'editor-page'

  load(transition) {
    if (this.slug !== transition.params.slug) {
      this.slug = transition.params.slug
      this.context.stores.editorStore.setArticleSlug(this.slug)
      this.context.stores.editorStore.loadInitialData()
    }
  }
}
