import { Component } from '../../lib';

class AppHeader extends Component {
  events() {
    return {
      'change #switch-game-mode': 'changeGameMode',
    };
  }

  changeGameMode(e) {
    const target = e.currentTarget;
    if (!target) return;
    const checkbox = target.querySelector('.check');
    localStorage.setItem('gameMode', checkbox.checked);
    this.toggleTheme();
  }

  onLoad() {
    const menu = document.getElementById('menu__list');
    const hamburger = document.getElementById('menu__hamburger');

    document.addEventListener('click', e => {
      const { target } = e;
      const showMenu = () => {
        hamburger.classList.add('close');
        menu.removeAttribute('data-hide');
        menu.style.transform = 'translateX(0)';
      };

      const hideMenu = () => {
        hamburger.classList.remove('close');
        menu.setAttribute('data-hide', '');
        menu.style.transform = 'translateX(-290px)';
      };

      if (!target) return;

      if (target.closest('.menu__hamburger') && menu.hasAttribute('data-hide')) {
        showMenu();
        return;
      }

      if (target.tagName === 'SPAN' && !menu.hasAttribute('data-hide')) {
        hideMenu();
        return;
      }
      if (target.tagName === 'A') {
        hideMenu();
        return;
      }

      if (target.closest('.menu')) return;

      hideMenu();
    });
  }
}

export const appHeader = new AppHeader({
  selector: '#header',
  template: require('../pages/html/header.html'),
});
