import './_audio-call.scss';
import { main } from '../../Templates/main-block';
import { createEl } from '../../Controller/createTagBlock';
import { createListWords, createAllListWords, getGuessSprintWords, getMainGameArray } from '../../Controller/audio-game/audio-game';
import { IdPages } from '../../Types/types';
import { fillStatisticAudio } from './audio-call-game.utils';
// eslint-disable-next-line import/no-cycle
import { App } from '../../App/App';
// eslint-disable-next-line import/no-cycle
import { clickIdLink } from '../../Controller/burger/burger.utils';

enum TextPreloadAudioGame {
  gameHeader = 'Для старта игры выберите уровень сложности',
  gameRules = '<span>Правила игры</span> очень просты: вам нужно выбрать правильный перевод прослушанного слова',
}

function createButtons(parentElement: HTMLElement, count: number): void {
  const buttonsField = createEl('div', parentElement, ['btn-field']);
  for (let i = 1; i < count + 1; i++) {
    const buttonWrapper = createEl('div', buttonsField, ['btn-wrapper']);
    const buttonNumber = createEl('div', buttonWrapper, ['btn-number']);
    buttonNumber.innerText = `${i}`;
    const btnChoice = <HTMLElement>createEl('button', buttonWrapper, ['btn-choice']);
    btnChoice.id = `word-${i}`;
    // btnChoice.innerHTML = `${i}`;
  }
}

function createChoiceGroupButtons(parentElement: HTMLElement, count: number): void {
  const buttonsField = createEl('div', parentElement, ['btn-field']);
  for (let i = 1; i < count + 1; i++) {
    const btnChoice = <HTMLLinkElement>createEl('a', buttonsField, ['btn-choice-group']);
    btnChoice.innerHTML = `${i}`;
    btnChoice.href = `#${IdPages.AudioGame}`;
  }
}

// function craateButton(parentElement: HTMLElement) {
//   createEl('button', parentElement, ['shoce-btn'], )
// }

export function createAudioGame() {
  console.log('--------------craate Audio Game--------------');
  main.innerHTML = '';
  const gameField = <HTMLElement>createEl('div', main, ['audio-game']);
  const viewField = <HTMLElement>createEl('div', gameField, ['view']);
  const imageContainer = <HTMLElement>createEl('div', viewField, ['image-container']);
  createEl('img', imageContainer);
  const audioField = <HTMLElement>createEl('div', viewField, ['audio-field']);
  const audioButton = <HTMLElement>createEl('button', audioField, ['audio-button']);
  audioButton.innerHTML = '<svg class="audio-svg-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';
  const engWord = <HTMLElement>createEl('p', audioField, ['english-word']);
  engWord.innerText = 'computer';
  createButtons(gameField, 5);
  const nextSkipBtn = createEl('button', gameField, ['next-skip-btn']);
  nextSkipBtn.innerText = 'Следующий';
  nextSkipBtn.addEventListener('click', getMainGameArray);
  console.log(getMainGameArray());
}

export function createAudioGamePreload() {
  main.innerHTML = '';
  const preloadAudioPage = <HTMLElement>createEl('div', main, ['audio-preload']);
  const preloadMessage = <HTMLElement>createEl('p', preloadAudioPage, ['preload-message']);
  preloadMessage.innerText = TextPreloadAudioGame.gameHeader;
  createChoiceGroupButtons(preloadAudioPage, 6);
  const gameRules = <HTMLElement>createEl('p', preloadAudioPage, ['game-rules']);
  gameRules.innerHTML = TextPreloadAudioGame.gameRules;
  preloadAudioPage.addEventListener('click', (event) => {
    const group = Number((event.target as HTMLElement).innerText) - 1;
    createAllListWords(group);
    App(IdPages.AudioGame);
  });
  // createAllListWords(2, 1);
  // console.log(localStorage.getItem('allListWords'));
  // console.log(getGuessSprintWords(true, 2));
}

export function createStatisticAudioGame(): void {
  main.innerHTML = '';
  const audioPageStat = <HTMLElement>createEl('div', main, ['audio__statistic'], { id: 'audio-statistic' });
  const title = <HTMLElement>createEl('h1', audioPageStat, ['audio__statistic-title']);
  title.innerHTML = 'Statistic - Sprint game';
  <HTMLElement>createEl('div', audioPageStat, ['audio__statistic-correct']);
  <HTMLElement>createEl('div', audioPageStat, ['audio__statistic-wrong']);
  <HTMLElement>createEl('div', audioPageStat, ['audio__statistic-words']);
  <HTMLElement>createEl('div', audioPageStat, ['audio__statistic-percent']);
  <HTMLElement>createEl('div', audioPageStat, ['audio__statistic-percent--words']);
  const buttonsStat = <HTMLElement>createEl('div', audioPageStat, ['audio__statistic-buttons']);

  const statisticBtnPreGame = <HTMLLinkElement>createEl('a', buttonsStat, ['audio__btn-close--stat-preload']);
  const statisticBtnMainPage = <HTMLLinkElement>createEl('a', buttonsStat, ['audio__btn-close--stat-main']);
  statisticBtnPreGame.href = `#${IdPages.AudioGamePreload}`;
  statisticBtnMainPage.href = `#${IdPages.MainID}`;
  statisticBtnPreGame.innerHTML = 'Закрыть';
  statisticBtnMainPage.innerHTML = 'Главная страница';
  statisticBtnPreGame.addEventListener('click', () => {
    App(IdPages.PreloaSprintID);
  });
  statisticBtnMainPage.addEventListener('click', () => {
    App(IdPages.MainID);
  });
  fillStatisticAudio(audioPageStat);
}

// first - 95847075
/// last - 95848677

// <svg class="CircularProgressbar " viewBox="0 0 100 100" data-test-id="CircularProgressbar"><path class="CircularProgressbar-trail" d="
//       M 50,50
//       m 0,-46
//       a 46,46 0 1 1 0,92
//       a 46,46 0 1 1 0,-92
//     " stroke-width="8" fill-opacity="0" style="stroke: rgb(255, 255, 255); stroke-dasharray: 289.027px, 289.027px; stroke-dashoffset: 0px;"></path><path class="CircularProgressbar-path" d="
//       M 50,50
//       m 0,-46
//       a 46,46 0 1 1 0,92
//       a 46,46 0 1 1 0,-92
//     " stroke-width="8" fill-opacity="0" style="stroke: rgb(242, 105, 92); stroke-dasharray: 289.027px, 289.027px; stroke-dashoffset: 130.062px;"></path><text class="CircularProgressbar-text" x="50" y="50" style="fill: rgb(242, 105, 92);">11/20</text></svg>
