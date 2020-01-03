import { observe } from 'mobx'
import {
  Router,
  Route,
  withRouterLinks,
  bindRouterLinks
} from 'nextbone-routing'
import { Region } from 'nextbone/dom-utils'

import 'pages/login-page'
import 'pages/Home/home-page'
import 'pages/register-page'
import 'pages/editor-page'
import 'pages/profile-page'
import 'pages/settings-page'

async function ArticleRoute() {
  await import('pages/Article/article-page')
  return class ArticleRoute extends Route {
    static component = 'article-page'
  }
}

export function createRouter({ stores }) {
  const appLoaded = new Promise(resolve => {
    const disposer = observe(
      stores.commonStore,
      'appLoaded',
      ({ newValue }) => {
        if (newValue) {
          resolve()
          disposer()
        }
      }
    )
  })

  class AppRoute extends Route {
    activate() {
      return appLoaded
    }
  }

  const routes = [
    {
      name: 'app',
      path: '/',
      class: AppRoute,
      children: [
        {
          name: 'home',
          component: 'home-page',
          path: ''
        },
        {
          name: 'login',
          component: 'login-page'
        },
        { name: 'register', component: 'register-page' },
        { name: 'editor', component: 'editor-page', path: 'editor/:slug?' },
        { name: 'article', class: ArticleRoute, path: 'article/:id' },
        {
          name: 'settings',
          component: 'settings-page',
          private: true
        },
        {
          name: 'profile',
          component: 'profile-page',
          path: '@:username',
          children: [{ name: 'profile.favorites' }]
        }
      ]
    }
  ]

  const outlet = () => {
    // ensure loading spinner is removed
    const rootEl = document.querySelector('app-root')
    const result = new Region(rootEl)
    result.currentEl = rootEl.children[0]
    return result
  }

  const router = new Router({ routes, outlet, log: true })

  // handle private routes
  router.on('before:activate', (transition, route) => {
    if (route.$options.private && stores.userStore.currentUser == null) {
      transition.redirectTo('home')
    }
  })

  return router
}

export { withRouterLinks, bindRouterLinks }
