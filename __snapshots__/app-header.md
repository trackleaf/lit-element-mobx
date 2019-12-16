# `app-header`

#### `with logged user`

```html
<app-header>
  <nav class="navbar navbar-light">
    <div class="container">
      <stencil-route-link
        class="navbar-brand"
        url="/"
      >
        conduit
      </stencil-route-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <stencil-route-link
            anchor-class="nav-link"
            url="/"
          >
            Home
          </stencil-route-link>
        </li>
        <li class="nav-item">
          <stencil-route-link
            anchor-class="nav-link"
            url="/editor"
          >
            <i class="ion-compose">
            </i>
            New Post
          </stencil-route-link>
        </li>
        <li class="nav-item">
          <stencil-route-link
            anchor-class="nav-link"
            url="/settings"
          >
            <i class="ion-gear-a">
            </i>
            Settings
          </stencil-route-link>
        </li>
        <li class="nav-item">
          <stencil-route-link
            anchor-class="nav-link"
            url="/@blikblum"
          >
            <img
              alt=""
              class="user-pic"
            >
            blikblum
          </stencil-route-link>
        </li>
      </ul>
    </div>
  </nav>
</app-header>

```

#### `without logged user`

```html
<app-header>
  <nav class="navbar navbar-light">
    <div class="container">
      <stencil-route-link
        class="navbar-brand"
        url="/"
      >
        conduit
      </stencil-route-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <stencil-route-link
            anchor-class="nav-link"
            url="/"
          >
            Home
          </stencil-route-link>
        </li>
        <li class="nav-item">
          <stencil-route-link
            anchor-class="nav-link"
            url="/login"
          >
            Sign in
          </stencil-route-link>
        </li>
        <li class="nav-item">
          <stencil-route-link
            anchor-class="nav-link"
            url="/register"
          >
            Sign up
          </stencil-route-link>
        </li>
      </ul>
    </div>
  </nav>
</app-header>

```

