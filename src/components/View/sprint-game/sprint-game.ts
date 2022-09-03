import './_sprint.scss';
import { body, main } from '../../Templates/main-block';
import { createEl } from '../../Controller/createTagBlock';
// eslint-disable-next-line object-curly-newline, import/no-cycle
import { ClickSprint, createAudioButton, createStaticticSprint, examEvent, mixWords } from './sprint-game.utils';
import { createAllListWords } from '../../Controller/sprint-game/get-words-to-sprint';
// eslint-disable-next-line import/no-cycle
import { App } from '../../App/App';
import { IdPages } from '../../Types/types';

const listBurger = <HTMLElement>document.querySelector('#header-menu');
const header = document.querySelector('.header') as HTMLElement;
enum TitleSprint {
  SprintPerulation = '<span>Правила игры</span> очень просты: вам нужно дать ответ -  совпадает или нет предложенный перевод слова',
  PreButton = 'Для старта игры выберите уровень сложности',
}

let arrayDotted: HTMLDivElement[] = [];
export enum CountButtons {
  Two = 2,
  Six = 6,
}

function createButtons(el: HTMLElement, count: number): void {
  for (let i = 1; i < count + 1; i++) {
    if (count > CountButtons.Two) {
      const btnSection = <HTMLLinkElement>createEl('a', el, ['sprint__btn-group']);
      btnSection.id = `words-${i}`;
      btnSection.href = '#sprint-page';
      btnSection.innerHTML = `${i}`;
    } else {
      const btnsChoice = <HTMLElement>createEl('button', el, [`game__btns-choise--${i % count === 0}`]);
      btnsChoice.id = `word-${i % count === 0}`;
      if (i % count === 0) {
        btnsChoice.innerHTML = 'Yes';
      } else {
        btnsChoice.innerHTML = 'No';
      }
    }
  }
}

function createDotteds(block: HTMLDivElement) {
  arrayDotted = [];
  for (let i = 1; i < 4; i++) {
    const a = <HTMLDivElement>createEl('div', block, [`game__dotted-${i}`, 'dotted'], { id: `game-dot-${i}` });
    arrayDotted.push(a);
  }
}

export const createSprintGame = () => {
  main.innerHTML = '';
  const sprintPage = <HTMLDivElement>createEl('div', main, ['sprint', 'sprint__page']);
  sprintPage.id = 'sprint-page';
  const blockGame = <HTMLElement>createEl('div', sprintPage, ['sprint__game', 'game']);
  const timer = <HTMLElement>createEl('div', blockGame, ['game__timer']);
  timer.innerHTML = '0:30';
  const audioButton = <HTMLElement>createEl('div', blockGame, ['game__audio', 'sound-on']);
  audioButton.style.backgroundImage = 'url(./assets/img/sound-on.png)';
  audioButton.style.backgroundImage = 'url(./assets/img/sound-on.png)';
  const wordsimg = <HTMLElement>createEl('div', blockGame, ['game__img-block']);
  <HTMLImageElement>createEl('img', wordsimg, ['game__img'], { id: 'game-img' });
  const sprintDotted = <HTMLDivElement>createEl('div', blockGame, ['game__dotted']);
  const wordsSprint = <HTMLElement>createEl('div', blockGame, ['game__words']);
  const sprintWordEn = <HTMLElement>createEl('div', wordsSprint, ['game__word-en']);
  const sprintWordRu = <HTMLElement>createEl('div', wordsSprint, ['game__word-ru']);
  const choiceButtons = <HTMLElement>createEl('div', blockGame, ['game__btns-choise']);
  sprintWordEn.id = 'word-en';
  sprintWordRu.id = 'word-ru';
  createDotteds(sprintDotted);
  createButtons(choiceButtons, CountButtons.Two);
  let time = 29;
  createAudioButton(audioButton);
  const runTimer = setInterval(() => {
    const hash = window.location.hash.slice(1);
    if (time >= 10) timer.innerHTML = `0:${time}`;
    if (time < 10) timer.innerHTML = `0:0${time}`;
    if (time === 0) {
      clearInterval(runTimer);
      App(IdPages.SprintStatiD);
    }
    if (hash !== IdPages.SprintID) clearInterval(runTimer);
    time -= 1;
  }, 1000);
  listBurger.addEventListener('click', () => {
    clearInterval(runTimer);
  });
  header.addEventListener('click', (ev) => {
    const message = ev.target as HTMLElement;
    if (message.id === 'logo') {
      clearInterval(runTimer);
    }
  });
  header.removeEventListener('click', createSprintGame);
  listBurger.removeEventListener('click', createSprintGame);
  mixWords(blockGame, arrayDotted);
};

function loading(): void {
  main.innerHTML = '';
  const sprintPreloadPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__game-preload']);
  <HTMLElement>createEl('div', sprintPreloadPage, ['spinner']);
  const timeSleep = setTimeout(() => {
    App(IdPages.SprintID);
  }, 7000);
  header.addEventListener('click', (ev) => {
    const message = ev.target as HTMLElement;
    if (message.id === 'logo' || message.classList[0] === 'header__nav-link') {
      clearTimeout(timeSleep);
    }
  });
}

export function createPreSprintGamePage(): HTMLElement {
  main.innerHTML = '';
  const sprintPreloadPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__game-preload']);
  sprintPreloadPage.id = 'preload-sprint';
  const titleSprint = <HTMLElement>createEl('h1', sprintPreloadPage, ['sprint__title']);
  titleSprint.innerHTML = TitleSprint.PreButton;
  sprintPreloadPage.addEventListener('click', (ev: Event) => {
    const message = ev.target as HTMLElement;
    const { id } = message;
    const classBlock = message.classList;
    if (classBlock[0] === 'sprint__btn-group') {
      ev.preventDefault();
      createAllListWords(Number(id.split('').slice(-1)) - 1);
      loading();
      ClickSprint(Number(id.split('').slice(-1)) - 1);
    }
  });
  body.onkeydown = (ev: KeyboardEvent) => {
    if (body.classList.contains('active') || ev.repeat === true) {
      ev.stopPropagation();
    } else {
      const group = examEvent(ev);
      if (group !== undefined) {
        createAllListWords(group);
        loading();
        ClickSprint(group);
      }
    }
  };

  const sprintButtonsBlock = <HTMLElement>createEl('div', sprintPreloadPage, ['sprint__btns']);
  const sprintRegulation = <HTMLElement>createEl('div', sprintPreloadPage, ['sprint__regulation'], { id: 'regulation-sprint' });
  sprintRegulation.innerHTML = `${TitleSprint.SprintPerulation}`;
  createButtons(sprintButtonsBlock, CountButtons.Six);
  return sprintPreloadPage;
}

export function statisticGame(): void {
  main.innerHTML = '';
  const sprintPageStat = <HTMLElement>createEl('div', main, ['sprint__statistic'], { id: 'srpint-statistic' });
  const title = <HTMLElement>createEl('h1', sprintPageStat, ['sprint__statistic-title']);
  title.innerHTML = 'Statistic - Sprint game';
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-correct']);
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-wrong']);
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-words']);
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-percent']);
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-percent--words']);
  const buttonsStat = <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-buttons']);

  const statisticBtnPreGame = <HTMLLinkElement>createEl('a', buttonsStat, ['sprint__btn-close--stat-preload']);
  const statisticBtnMainPage = <HTMLLinkElement>createEl('a', buttonsStat, ['sprint__btn-close--stat-main']);
  statisticBtnPreGame.href = `#${IdPages.PreloaSprintID}`;
  statisticBtnMainPage.href = `#${IdPages.MainID}`;
  statisticBtnPreGame.innerHTML = 'Close page';
  statisticBtnMainPage.innerHTML = 'Main page';
  statisticBtnPreGame.addEventListener('click', () => {
    App(IdPages.PreloaSprintID);
  });
  statisticBtnMainPage.addEventListener('click', () => {
    App(IdPages.MainID);
  });
  createStaticticSprint(sprintPageStat);
}
