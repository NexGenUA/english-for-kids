import { Component } from "../../lib";
import { cards } from '../../lib/data/cards';

class HomePageComponent extends Component {
  constructor(config) {
    super(config)
  }

   onLoad() {
    const categories = document.getElementById('categories-list');
    const addCategories = (category) => categories.insertAdjacentHTML('beforeend', `
    <a class="category-card play" href="${category.url}">
      <div class="category-card__image-wrap">
        <img class="category-card__image" src="${category.src}" alt="${category.name}">
      </div>
      <span class="category-card__title">${category.name}</span>
     </a>
    `);
    cards().then(obj => obj.categories.forEach(addCategories));
  }
}

export const homePageComponent = new HomePageComponent({
  selector: '#app-home-page',
  template: require('./html/home.html'),
  title: () => 'English for kids'
});
