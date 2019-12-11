import ArticlesStore from './articlesStore'
import CommentsStore from './commentsStore'
import AuthStore from './authStore'
import CommonStore from './commonStore'
import EditorStore from './editorStore'
import UserStore from './userStore'
import ProfileStore from './profileStore'

class RootStore {
  constructor() {
    this.articlesStore = new ArticlesStore()
    this.commentsStore = new CommentsStore()
    this.authStore = new AuthStore(this)
    this.commonStore = new CommonStore()
    this.editorStore = new EditorStore(this)
    this.userStore = new UserStore()
    this.profileStore = new ProfileStore()
  }
}

export default RootStore
