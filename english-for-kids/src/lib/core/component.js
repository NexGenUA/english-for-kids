export class Component {
  constructor(config) {
    this.template = config.template;
    this.selector = config.selector;
    this.title = config.title;
    this.el = null;
  }

  render() {
    this.el = document.querySelector(this.selector);
    if (!this.el) throw new Error(`Component with selector ${this.selector} not fount`);
    this.el.innerHTML = this.template;
    this._initEvents();
  }

  _initEvents() {
    if (!this.events) return;

    const events = this.events();

    for (const event in events) {
      const selectorEvent = event.split(' ');
      const el = this.el.querySelector(selectorEvent[1]);
      el.addEventListener(selectorEvent[0], this[events[event]].bind(this))
    }
  }

  toggleTheme() {
    const gameMode = localStorage.getItem('gameMode');
    const toggle = gameMode === 'true' ? 'add' : 'remove';
    const homePage = document.getElementById('categories-list');
    const menu = document.getElementById('menu__list');
    const cardList = document.getElementById('card-list');

    if (homePage) {
      homePage.classList[toggle]('game-on');
    }

    if (cardList) {
      cardList.classList[toggle]('game-on');
    }

    menu.classList[toggle]('game-on');
  }
}
