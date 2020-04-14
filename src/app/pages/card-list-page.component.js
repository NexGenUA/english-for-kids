import { Component, router, util } from "../../lib";
import { cards } from '../../lib/data/cards';

class CardListPageComponent extends Component{
  constructor(config) {
    super(config);
  }

  events() {
    return {
      'click #card-list': 'playSound',
      'click .card-list': 'rotateCard',
    }
  }

  playSound(e) {
    const target = e.target;
    if (target.classList.contains('cards-collect__rotate-arrows')) return;
    const card = target.closest('.cards-collect');
    if (!card) return;
    const audio = document.querySelector('audio');
    audio.src = card.dataset.audio;
    audio.play();
  }

  rotateCard(e) {
    const target = e.target;
    if (!target || !target.classList.contains('rotate-card')) return;
    const card = target.closest('.cards-collect__rotate');
    if (!card) return;
    card.classList.add('reverse');
  }

  onLoad() {
    const collectionName = router.getUrl();
    const cardList = document.getElementById('card-list');
    const audio = document.createElement('audio');
    cardList.append(audio);
    const addCardList = (list) => cardList.insertAdjacentHTML('beforeend', `
    <div class="cards-collect play" data-audio="${list.audioSrc}">
      <div class="cards-collect__rotate">
        <div class="cards-collect__back-side">  
          <div class="cards-collect__image-wrap">
            <img class="cards-collect__image" src="${list.image}" alt="${list.word}">
          </div>
          <span class="cards-collect__translate">${list.translation}</span>
        </div>
        <div class="cards-collect__front-side">  
          <div class="cards-collect__image-wrap">
            <img class="cards-collect__image" src="${list.image}" alt="${list.word}">
          </div>
          <span class="cards-collect__word">${list.word}</span>
          <span class="cards-collect__rotate-arrows rotate-card"></span>
          <span class="cards-collect__static-arrows"></span>
        </div>
      </div>
    </div>
    `);
    cards().then(obj => obj[collectionName].forEach(addCardList));
  }

  static getTitle () {
    const title = {
      'action-a': 'Action (set A)',
      'action-b': 'Action (set B)',
      'action-c': 'Action (set C)',
      'adjective': 'Adjective',
      'animal-a': 'Animal (set A)',
      'animal-b': 'Animal (set B)',
      'clothes': 'Clothes',
      'emotion': 'Emotion',
    };
    return title[router.getUrl()]
  }

}

export const cardListPageComponent = new CardListPageComponent({
  selector: '#app-card-list-page',
  template: require('./html/card-list.html'),
  title: CardListPageComponent.getTitle
});
