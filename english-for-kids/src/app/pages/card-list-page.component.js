import { Component, router, util } from "../../lib";
import { cards } from '../../lib/data/cards';
import err from '../../assets/cards-audio/error.mp3';
import correct from '../../assets/cards-audio/correct.mp3';
import repeat from '../../assets/cards-img/repeat.svg';
import star from '../../assets/cards-img/star.svg';
import starWin from '../../assets/cards-img/star-win.svg';
import surprised from '../../assets/cards-audio/surprised.mp3';
import failure from '../../assets/cards-audio/failure.mp3';

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
    this.correctAnswer = 0;
    this.errorAnswer = 0;
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
    if (!target || !target.closest('.can-rotate')) return;
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
    const cardListContainer = document.getElementById('card-list-container');
    const cardList = document.getElementById('card-list');
    const gamePoints = document.getElementById('game-points');
    const repeatButton = document.getElementById('start-game');

    if (repeatButton) {
      repeatButton.innerText = 'Start game';
      repeatButton.classList.remove('repeat');
    }
    if (gamePoints) gamePoints.innerHTML = '';

    if (!cardListContainer || !cardList) return;

    cardListContainer.insertAdjacentHTML('afterbegin', '<div class="game-points" id="game-points"></div>');

    const audio = document.createElement('audio');

    audio.setAttribute('id', 'audio-play');
    cardListContainer.append(audio);

    const addCardList = (list) => cardListContainer.insertAdjacentHTML('beforeend', `
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
        <div class="can-rotate">
          <span class="cards-collect__rotate-arrows rotate-card"></span>
          <span class="cards-collect__static-arrows"></span>
        </div>
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
    this.isSound = true;
    setTimeout(() => this.isSound = false,500);
    if (this.gameOn) {
      this.audio.play();
      return;
    }
    const repeatButton = document.getElementById('start-game');
    if (repeatButton) {
      repeatButton.innerHTML = '';
      repeatButton.classList.add('repeat');
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
    const mainPageLink = document.getElementById('main-page');
    const clickEvent = new Event('click', { bubbles:true });

    if (!src) {
      this.gameOver = true;
      this.gameOn = false;

      const showScreen = target => {
        target.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
          document.body.style.overflow = '';
          target.style.display = '';
          mainPageLink.dispatchEvent(clickEvent);
        }, 2000);
      };

      if (this.errorAnswer) {
        this.audio.src = failure;
        const errors = this.errorAnswer;
        const loseScreen = document.getElementById('lose-screen');
        const errorMessage = document.getElementById('error-message');

        errorMessage.innerHTML = `${errors} error${errors > 1 ? 's' : ''}`;

        showScreen(loseScreen);

      } else {
        this.audio.src = surprised;
        const winScreen = document.getElementById('win-screen');

        showScreen(winScreen);
      }
      this.audio.play();
      if (this.isSound) return;
      setTimeout(() => this.isSound = false,500);
      return;
    }

    if (!this.audio) return;

    this.audio.src = audioSrc || src.audioSrc;
    this.audio.play();
    if (this.isSound) return;
    setTimeout(() => this.isSound = false,500);
  }

  playGame() {
    const gameArea = document.getElementById('card-list-container');
    const gamePoints = document.getElementById('game-points');

    if (!gameArea || !gamePoints) return;

    const gameCore = e => {

      if (!this.gameOn) {
        gameArea.removeEventListener('click', gameCore);
        return;
      }

      if (this.isSound) return;

      const card = e.target.closest('.play');
      if (!card) return;
      const word = card.dataset.cardName;

      if (this.correct.includes(word)) return;
      this.isSound = true;

      if (this.playList[this.count].word === word) {
        card.classList.add('correct');
        this.correct.push(word);
        this.count++;
        this.cardSound(correct);

        gamePoints.insertAdjacentHTML('beforeend', `
          <img src="${starWin}" class="img-stars">
        `);

        this.correctAnswer++;

        setTimeout(() => {

          setTimeout(() => this.isSound = false,500);

          this.cardSound();
        }, 500);
      } else {
        this.cardSound(err);

        gamePoints.insertAdjacentHTML('beforeend', `
          <img src="${star}" class="img-stars">
        `);

        this.errorAnswer++;

        setTimeout(() => {

          setTimeout(() => this.isSound = false,500);

          this.cardSound();
        }, 500);
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
