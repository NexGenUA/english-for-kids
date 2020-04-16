import { router } from '../tools/router';

export class MainModule {
  constructor(config) {
    this.components = config.components;
    this.mainComponent = config.main;
    this.routes = config.routes;
  }

  start() {
    window.addEventListener('DOMContentLoaded', (event) => {
      const switchGame = document.getElementById('switch-game');
      const gameMode = localStorage.getItem('gameMode');
      switchGame.checked = gameMode === 'true';
    });
    this.init();
    if (this.routes) this.initRoutes();
  }

  init() {
    this.mainComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
    this.renderRoute();
  }

  initRoutes() {
    const linkClick = e => {
      e.preventDefault();
      let state;
      const link = e.target.closest('a');
      if (!link) return;
      if (link.tagName !== 'A') return;
      state = {
        page: link.getAttribute('href')
      };
      history.pushState(state, '', state.page);
      this.renderRoute();
    };

    document.getElementById('menu__list').addEventListener('click', linkClick);

    const categories = document.getElementById('router-outlet');
    if (categories) categories.addEventListener('click', linkClick);

    window.addEventListener('popstate', () => {
      this.renderRoute();
    })
  }

  renderRoute() {
    const url = router.getUrl();
    let route = this.routes.find(r => r.path.includes(url));
    if (!route) route = this.routes[0];
    document.querySelector('#router-outlet').innerHTML = `<div id="${route.component.selector.slice(1)}"></div>`;
    document.title = route.component.title();
    this.renderComponent(route.component);
    setActiveLink();
  }

  renderComponent(c) {
    c.render();
    if (c.onLoad) c.onLoad();
  }

}

function setActiveLink() {
  for (const link of document.querySelectorAll('.menu a')) {
    if (link.pathname === location.pathname) {
      link.classList.add('active-menu-link');
    } else {
      link.classList.remove('active-menu-link');
    }
  }
}

