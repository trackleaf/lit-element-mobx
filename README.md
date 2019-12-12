# ![LitElement + Mobx Example App](project-logo.png)

> ### [LitElement](lit-element.polymer-project.org/) + [Mobx](https://mobx.js.org) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

### [Demo](https://blikblum.github.io/lit-element-mobx-realworld-example-app/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged frontend application built with LitElement for rendering and Mobx for state management. It includes CRUD operations, authentication, routing, pagination, and more.

It was built using the [React + Mobx](https://github.com/gothinkster/react-mobx-realworld-example-app) version as base (the state management is basically the same).

For more information on how this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## How it works

It uses a global state defined as Mobx decorated stores. LitElement provides the primitives for UI rendering and the component model (web component). [lit-mobx](https://github.com/adobe/lit-mobx) integrates the Mobx state with the components, making them reactive.

The stores are exposed to components using a context mechanism through [wc-context](https://github.com/blikblum/wc-context) and the routing is provided by [@stencil/router](https://github.com/ionic-team/stencil-router)

More info about development can be found in this [post](https://dev.to/blikblum/from-react-to-web-components-using-mobx-5abm)

## Getting started

You can view a live demo over at https://blikblum.github.io/lit-element-mobx-realworld-example-app/

To get the frontend running locally:

- Clone this repo
- `yarn` to install dependencies
- `yarn dev` to start the local server
- `yarn prod` to create a production build

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
  - Use JWT (store the token in localStorage)
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/@username, /#/@username/favorites )
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles

<br />

Built by Luiz Américo Pereira Câmara (2019)

[![Brought to you by Thinkster](https://raw.githubusercontent.com/gothinkster/realworld/master/media/end.png)](https://thinkster.io)
