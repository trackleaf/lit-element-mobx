(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{37:function(e,t,s){"use strict";s.r(t);var r=s(34),o=s.n(r),a=(s(15),s(2));var n=e=>{const t=e.article,s=()=>e.onDelete(t.slug);return e.canModify?a.g`
      <span
        ><a
          href=${`#editor/${t.slug}`}
          class="btn btn-outline-secondary btn-sm"
          ><i class="ion-edit"></i> Edit Article</a
        ><button class="btn btn-outline-danger btn-sm" @click=${s}>
          <i class="ion-trash-a"></i> Delete Article
        </button></span
      >
    `:a.g`
    <span></span>
  `};var i=({article:e,canModify:t,onDelete:s})=>a.g`
    <div class="article-meta">
      <a href=${`#@${e.author.username}`}
        ><img src=${e.author.image} alt=""
      /></a>
      <div class="info">
        <a href=${`#@${e.author.username}`} class="author"
          >${e.author.username}</a
        ><span class="date">${new Date(e.createdAt).toDateString()}</span>
      </div>
      ${n({article:e,canModify:t,onDelete:s})}
    </div>
  `,c=s(1);class l extends c.a{constructor(){super(),this.body="",this.handleBodyChange=e=>{this.body=e.target.value},this.createComment=e=>{e.preventDefault(),this.context.stores.commentsStore.createComment({body:this.body}).then(()=>this.body="")}}render(){const{isCreatingComment:e}=this.context.stores.commentsStore;return c.b`
      <form class="card comment-form" @submit=${this.createComment}>
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            .value=${this.body}
            ?disabled=${e}
            @change=${this.handleBodyChange}
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img
            src=${Object(c.c)(this.currentUser.image||void 0)}
            class="comment-author-img"
            alt=""
          /><button class="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    `}}l.observedContexts=["stores"],l.properties={body:{type:String},currentUser:{}},customElements.define("comment-input",l);var d=e=>{const t=()=>e.onDelete(e.commentId);return e.show?a.g`
      <span class="mod-options"
        ><i class="ion-trash-a" @click=${t}></i
      ></span>
    `:null};var m=e=>{const t=e.comment,s=e.currentUser&&e.currentUser.username===t.author.username;return a.g`
    <div class="card">
      <div class="card-block"><p class="card-text">${t.body}</p></div>
      <div class="card-footer">
        <a url=${`/@${t.author.username}`} class="comment-author"
          ><img
            src=${Object(c.c)(t.author.image||void 0)}
            class="comment-author-img"
            alt=""
        /></a>
        <a url=${`/@${t.author.username}`} class="comment-author"
          >${t.author.username}</a
        ><span class="date-posted"
          >${new Date(t.createdAt).toDateString()}</span
        >
        ${d({show:s,slug:e.slug,commentId:t.id,onDelete:e.onDelete})}
      </div>
    </div>
  `};var u=e=>{const{currentUser:t,onDelete:s,slug:r}=e;return a.g`
    <div>
      ${Object(c.d)(e.comments,e=>e.id,e=>m({comment:e,currentUser:t,onDelete:s,slug:r}))}
    </div>
  `};s(13);var h=e=>e.currentUser?a.g`
      <div class="col-xs-12 col-md-8 offset-md-2">
        <div>
          <list-errors .errors=${e.errors}></list-errors>
          <comment-input
            .currentUser=${e.currentUser}
            slug=${e.slug}
          ></comment-input>
        </div>
        ${u(e)}
      </div>
    `:a.g`
      <div class="col-xs-12 col-md-8 offset-md-2">
        <p>
          <a url="/login">Sign in</a> or <a url="/register">sign up</a> to add
          comments on this article.
        </p>
        ${u(e)}
      </div>
    `;class g extends c.a{constructor(...e){super(...e),this.handleDeleteArticle=e=>{this.deleting=!0,this.context.stores.articlesStore.deleteArticle(e).then(()=>this.$router.replaceWith("home")).finally(()=>this.deleting=!1)},this.handleDeleteComment=e=>{this.context.stores.commentsStore.deleteComment(e)}}set $route(e){this.slug=e.params.id}connectedCallback(){super.connectedCallback();const e=this.slug;this.context.stores.articlesStore.loadArticle(e,{acceptCached:!0}),this.context.stores.commentsStore.setArticleSlug(e),this.context.stores.commentsStore.loadComments()}render(){const e=this.slug,{currentUser:t}=this.context.stores.userStore,{comments:s,commentErrors:r}=this.context.stores.commentsStore,a=this.context.stores.articlesStore.getArticle(e);if(this.deleting)return c.b`
        <loading-spinner></loading-spinner>
      `;if(!a)return c.b`
        <red-error message="Can't load article"></red-error>
      `;const n=o()(a.body,{sanitize:!0}),l=t&&t.username===a.author.username;return c.b`
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1>${a.title}</h1>
            ${i({article:a,canModify:l,onDelete:this.handleDeleteArticle})}
          </div>
        </div>
        <div class="container page">
          <div class="row article-content">
            <div class="col-xs-12">
              ${Object(c.f)(n)}

              <ul class="tag-list">
                ${a.tagList.map(e=>c.b`
                    <li class="tag-default tag-pill tag-outline">
                      ${e}
                    </li>
                  `)}
              </ul>
            </div>
          </div>
          <hr />
          <div class="article-actions"></div>
          <div class="row">
            ${h({comments:s,errors:r,slug:e,currentUser:t,onDelete:this.handleDeleteComment})}
          </div>
        </div>
      </div>
    `}}g.observedContexts=["stores"],g.properties={slug:{type:String}},customElements.define("article-page",g)}}]);
//# sourceMappingURL=2.js.map