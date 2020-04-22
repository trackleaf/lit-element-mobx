# `app-header`

#### `with logged user`

```html
<app-header>
  <nav class="navbar navbar-light">
    <div
      class="container"
      routerlinks=""
    >
      <a
        class="navbar-brand"
        route="home"
      >
        conduit
      </a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a
            class="nav-link"
            route="home"
          >
            Home
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            route="editor"
          >
            <i class="ion-compose">
            </i>
            New Post
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            route="settings"
          >
            <i class="ion-gear-a">
            </i>
            Settings
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            param-username="blikblum"
            route="profile"
          >
            <img
              alt=""
              class="user-pic"
            >
            blikblum
          </a>
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
    <div
      class="container"
      routerlinks=""
    >
      <a
        class="navbar-brand"
        route="home"
      >
        conduit
      </a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a
            class="nav-link"
            route="home"
          >
            Home
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            route="login"
          >
            Sign in
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            route="register"
          >
            Sign up
          </a>
        </li>
      </ul>
    </div>
  </nav>
</app-header>

```

