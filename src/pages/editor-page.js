import 'components/list-errors'
import { Component, html } from 'components/base'
import { injectHistory } from '@stencil/router/dist/cjs/index.cjs'

class EditorPage extends Component {
  static observedContexts = ['stores']

  static properties = {
    tagInput: { type: String },
    slug: { type: String }
  }

  tagInput = ''

  set match(value) {
    this.slug = value.params.slug
  }

  connectedCallback() {
    super.connectedCallback()
    this.context.stores.editorStore.setArticleSlug(this.slug)
    this.context.stores.editorStore.loadInitialData()
    this.dataLoaded = true
  }

  shouldUpdate(changedProperties) {
    if (this.dataLoaded) {
      this.dataLoaded = false
      return true
    }

    if (changedProperties.has('slug')) {
      this.context.stores.editorStore.setArticleSlug(this.slug)
      this.context.stores.editorStore.loadInitialData()
    }
    return true
  }

  changeTitle = e => this.context.stores.editorStore.setTitle(e.target.value)
  changeDescription = e =>
    this.context.stores.editorStore.setDescription(e.target.value)
  changeBody = e => this.context.stores.editorStore.setBody(e.target.value)
  changeTagInput = e => (this.tagInput = e.target.value)

  handleTagInputKeyDown = ev => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault()
        this.handleAddTag()
        break
      default:
        break
    }
  }

  handleAddTag = () => {
    if (this.tagInput) {
      this.context.stores.editorStore.addTag(this.tagInput.trim())
      this.tagInput = ''
    }
  }

  handleRemoveTag = tag => {
    if (this.context.stores.editorStore.inProgress) return
    this.context.stores.editorStore.removeTag(tag)
  }

  submitForm = ev => {
    ev.preventDefault()
    const { editorStore } = this.context.stores
    editorStore.submit().then(article => {
      editorStore.reset()
      this.history.replace(`/article/${article.slug}`)
    })
  }

  render() {
    const {
      inProgress,
      errors,
      title,
      description,
      body,
      tagList
    } = this.context.stores.editorStore

    return html`
      <div class="editor-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
              <list-errors .errors=${errors}></list-errors>
              <form>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      .value=${title}
                      @change=${this.changeTitle}
                      ?disabled=${inProgress}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      .value=${description}
                      @change=${this.changeDescription}
                      ?disabled=${inProgress}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea
                      class="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      .value=${body}
                      @change=${this.changeBody}
                      ?disabled=${inProgress}
                    ></textarea>
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Enter tags"
                      .value=${this.tagInput}
                      @change=${this.changeTagInput}
                      @blur=${this.handleAddTag}
                      @keydown=${this.handleTagInputKeyDown}
                      ?disabled=${inProgress}
                    />
                    <div class="tag-list">
                      ${tagList.map(tag => {
                        return html`
                          <span class="tag-default tag-pill"
                            ><i
                              class="ion-close-round"
                              @click=${() => this.handleRemoveTag(tag)}
                            ></i
                            >${tag}</span
                          >
                        `
                      })}
                    </div>
                  </fieldset>
                  <button
                    class="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    ?disabled=${inProgress}
                    @click=${this.submitForm}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

injectHistory(EditorPage)

customElements.define('editor-page', EditorPage)
