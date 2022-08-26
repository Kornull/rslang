/* eslint-disable @typescript-eslint/no-use-before-define */
import './_sprint.scss';
import { main } from '../../Templates/main-block';
import { createEl } from '../../Controller/createTagBlock';
// eslint-disable-next-line object-curly-newline
import { Click, createAudioButton, createStaticticSprint, mixWords } from './sprint-game.utils';
import { setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';
import { Page } from '../../Controller/sprint-game/storage/type-storage';
import { createAllListWords } from '../../Controller/sprint-game/get-words-to-sprint';

enum TitleSprint {
  PreTitle = 'Для старта игры выберите уровень сложности',
}

export enum CountButtons {
  Two = 2,
  Six = 6,
}

function createButtons(el: HTMLElement, count: number): void {
  for (let i = 1; i < count + 1; i++) {
    if (count > CountButtons.Two) {
      const btnSection = <HTMLElement>createEl('button', el, ['sprint__btn-group']);
      btnSection.id = `words-${i}`;
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

export function createSprintGame(): HTMLElement {
  main.innerHTML = '';
  const sprintPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__page']);
  sprintPage.id = 'sprint-page';
  const blockGame = <HTMLElement>createEl('div', sprintPage, ['sprint__game', 'game']);
  const timer = <HTMLElement>createEl('div', blockGame, ['game__timer']);
  timer.innerHTML = '0:30';
  const audioButton = <HTMLElement>createEl('div', blockGame, ['game__audio', 'sound-on']);
  audioButton.style.backgroundImage = 'url(./assets/img/sound-on.png)';
  audioButton.style.backgroundImage = 'url(./assets/img/sound-on.png)';
  const wordsSprint = <HTMLElement>createEl('div', blockGame, ['game__words']);
  const sprintWordEn = <HTMLElement>createEl('div', wordsSprint, ['game__word-en']);
  const sprintWordRu = <HTMLElement>createEl('div', wordsSprint, ['game__word-ru']);
  const choiceButtons = <HTMLElement>createEl('div', blockGame, ['game__btns-choise']);
  sprintWordEn.id = 'word-en';
  sprintWordRu.id = 'word-ru';
  createButtons(choiceButtons, CountButtons.Two);
  let time = 29;
  mixWords(blockGame);
  createAudioButton(audioButton);
  const runTimer = setInterval(() => {
    if (time >= 10) timer.innerHTML = `0:${time}`;
    if (time < 10) timer.innerHTML = `0:0${time}`;
    if (time === 0) {
      clearInterval(runTimer);
      statisticGame();
    }
    time -= 1;
  }, 1000);
  return sprintPage;
}

function loading(): void {
  main.innerHTML = '';
  const sprintPreloadPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__game-preload']);
  <HTMLElement>createEl('div', sprintPreloadPage, ['spinner']);
  setTimeout(() => {
    createSprintGame();
  }, 7000);
}

export function createPreSprintGamePage(): HTMLElement {
  main.innerHTML = '';
  const sprintPreloadPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__game-preload']);
  sprintPreloadPage.id = 'preload-sprint';
  const titleSprint = <HTMLElement>createEl('h1', sprintPreloadPage, ['sprint__title']);
  titleSprint.innerHTML = TitleSprint.PreTitle;
  sprintPreloadPage.addEventListener('click', (ev: Event) => {
    const message = ev.target as HTMLElement;
    const { id } = message;
    createAllListWords(Number(id.split('').slice(-1)) - 1);
    loading();
    Click(Number(id.split('').slice(-1)) - 1);
    setLocalStorage(Page.userPage, 'sprint-page');
  });
  const sprintButtonsBlock = <HTMLElement>createEl('div', sprintPreloadPage, ['sprint__btns']);

  createButtons(sprintButtonsBlock, CountButtons.Six);
  return sprintPreloadPage;
}

export function statisticGame(): HTMLElement {
  main.innerHTML = '';
  const sprintPageStat = <HTMLElement>createEl('div', main, ['sprint__statistic']);
  const title = <HTMLElement>createEl('h1', sprintPageStat, ['sprint__statistic-title']);
  title.innerHTML = 'Statistic - Sprint game';
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-correct']);
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-wrong']);
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-words']);
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-percent']);
  <HTMLElement>createEl('div', sprintPageStat, ['sprint__statistic-percent--words']);
  const statisticBtn = <HTMLElement>createEl('button', sprintPageStat, ['sprint__btn-close--stat']);
  statisticBtn.innerHTML = 'Close page';
  statisticBtn.addEventListener('click', createPreSprintGamePage);
  createStaticticSprint(sprintPageStat);
  return sprintPageStat;
}
