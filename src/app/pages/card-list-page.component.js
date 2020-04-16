import { Component, router, util } from "../../lib";
import { cards } from '../../lib/data/cards';
import err from '../../assets/cards-audio/error.mp3';
import correct from '../../assets/cards-audio/correct.mp3';

class CardListPageComponent extends Component{
  constructor(config) {
    super(config);
    this.resetValues();
  }

  resetValues() {
    this.backside = false;
    this.playList = null;
    this.count = 0;
    this.gameOn = false;
    this.audio = null;
    this.correct = [];
    this.isSound = false;
    this.gameOver = false;
  }

  events() {
    return {
      'click #card-list': 'playSound',
      'click .card-list': 'rotateCard',
      'click #start-game': 'startGame',
    }
  }

  playSound(e) {
    if (this.backside) return;
    const target = e.target;
    if (target.classList.contains('cards-collect__rotate-arrows')) return;
    const card = target.closest('.cards-collect');
    if (!card) return;
    const audio = document.querySelector('audio');
    const isGame = localStorage.getItem('gameMode') === 'true';
    if (isGame) return;
    audio.src = card.dataset.audio;
    audio.play();
  }

  rotateCard(e) {
    const target = e.target;
    if (!target || !target.classList.contains('rotate-card')) return;
    const card = target.closest('.cards-collect__rotate');
    if (!card) return;
    card.classList.add('reverse');
    const {left, top} = card.getBoundingClientRect();
    const [width, height] = [card.offsetWidth, card.offsetHeight];
    this.backside = true;

    const isOut = e => {
      const {clientX: x, clientY: y} = e;
      if (x < left || x > left + width
        || y < top || y > top + height) {
        this.backside = false;
        card.classList.remove('reverse');
        document.removeEventListener('mousemove', isOut);
      }
    };

    document.addEventListener('mousemove', isOut);
  }

  onLoad() {
    this.watchCheck();
    this.resetValues();
    this.toggleTheme();
    const collectionName = router.getUrl();
    const cardList = document.getElementById('card-list-container');
    if (!cardList) return;
    const audio = document.createElement('audio');
    audio.setAttribute('id', 'audio-play');
    cardList.append(audio);
    const addCardList = (list) => cardList.insertAdjacentHTML('beforeend', `
    <div class="cards-collect play" data-audio="${list.audioSrc}" data-card-name="${list.word}">
      <div class="hover-correct"></div>
      <div class="cards-collect__rotate">
        <div class="cards-collect__front-side" style="background-image: url(${list.image})">  
          <div class="cards-collect__word">
            <span>${list.word}</span>
            </div>
        </div>
        <div class="cards-collect__back-side" style="background-image: url(${list.image})">  
          <div class="cards-collect__word">
            <span>${list.translation}</span>
            </div>
        </div>
        <span class="cards-collect__rotate-arrows rotate-card"></span>
        <span class="cards-collect__static-arrows"></span>
      </div>
    </div>
    `);
    this.playList = cards[collectionName].map(card => ({ word: card.word, audioSrc: card.audioSrc }));
    cards[collectionName].forEach(addCardList);
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

  startGame(e) {
    if (this.gameOn) {
      this.audio.play();
      return;
    }
    this.audio = document.getElementById('audio-play');
    this.playList.sort(() => Math.random() - 0.5);
    this.gameOn = true;
    this.cardSound();
    this.playGame();
  }

  cardSound(audioSrc) {
    if (!this.gameOn) return;
    if (this.gameOver) return;
    const src = this.playList[this.count];
    if (!src) {
      this.gameOver = true;
      this.gameOn = false;
      this.audio.src = correct;
      this.audio.play();
      console.log('game over');
      return;
    }
    if (!this.audio) return;
    this.audio.src = audioSrc || src.audioSrc;
    this.audio.play();
  }

  playGame() {
    const gameArea = document.getElementById('card-list-container');
    const gameCore = e => {
      if (!this.gameOn) {
        gameArea.removeEventListener('click', gameCore);
        return;
      }
      if (this.isSound) return;
      const card = e.target.closest('.play');
      const word = card.dataset.cardName;
      if (this.correct.includes(word)) return;
      if (this.playList[this.count].word === word) {
        card.classList.add('correct');
        this.correct.push(word);
        this.count++;
        this.isSound = true;
        this.cardSound(correct);
        setTimeout(() => {
          this.isSound = false;
          this.cardSound();
        }, 1000);
      } else {
        this.isSound = true;
        this.cardSound(err);
        setTimeout(() => {
          this.isSound = false;
          this.cardSound();
        }, 1000);
      }
    };

    gameArea.addEventListener('click', gameCore);
  }

  watchCheck() {
    const toggle = document.getElementById('switch-game-mode');
    const handleSwitch = e => {
      const container = document.getElementById('card-list-container');
      if (container) container.innerHTML = '';
      toggle.removeEventListener('change', handleSwitch);
      this.onLoad();
    };

    toggle.addEventListener('change', handleSwitch)
  }
}

export const cardListPageComponent = new CardListPageComponent({
  selector: '#app-card-list-page',
  template: require('./html/card-list.html'),
  title: CardListPageComponent.getTitle
});
