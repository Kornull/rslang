import './_sprint.scss';
import { main } from '../../Templates/main-block';
import { createEl } from '../../Controller/createTagBlock';
import { Click, mixWords } from './sprint-game.utils';
import { setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';
import { Page } from '../../Controller/sprint-game/storage/type-storage';

enum TitleSprint {
  PreTitle = 'Для старта игры выберите уровень сложности',
}

export enum CountButtons {
  Two = 2,
  Six = 6,
}

function createButtons(el: HTMLElement, count: number) {
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

export function createSprintGame() {
  main.innerHTML = '';
  const sprintPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__page']);
  sprintPage.id = 'sprint-page';
  const blockGame = <HTMLElement>createEl('div', sprintPage, ['sprint__game', 'game']);
  <HTMLElement>createEl('div', blockGame, ['game__timer']);
  const wordsSprint = <HTMLElement>createEl('div', blockGame, ['game__words']);
  const sprintWordEn = <HTMLElement>createEl('div', wordsSprint, ['game__word-en']);
  const sprintWordRu = <HTMLElement>createEl('div', wordsSprint, ['game__word-ru']);
  const choiceButtons = <HTMLElement>createEl('div', blockGame, ['game__btns-choise']);
  sprintWordEn.id = 'word-en';
  sprintWordRu.id = 'word-ru';
  createButtons(choiceButtons, CountButtons.Two);
  mixWords(blockGame);
  return sprintPage;
}

function loading() {
  main.innerHTML = '';
  const sprintPreloadPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__game-preload']);
  <HTMLElement>createEl('div', sprintPreloadPage, ['spinner']);
  setTimeout(() => {
    createSprintGame();
  }, 7000);
}

export function createPreSprintGamePage() {
  const sprintPreloadPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__game-preload']);
  sprintPreloadPage.id = 'preload-sprint';
  const titleSprint = <HTMLElement>createEl('h1', sprintPreloadPage, ['sprint__title']);
  titleSprint.innerHTML = TitleSprint.PreTitle;
  sprintPreloadPage.addEventListener('click', (ev: Event) => {
    const message = ev.target as HTMLElement;
    const { id } = message;
    const { className } = message;
    Click(id, className);
    loading();
    setLocalStorage(Page.userPage, 'sprint-page');
  });
  const sprintButtonsBlock = <HTMLElement>createEl('div', sprintPreloadPage, ['sprint__btns']);

  createButtons(sprintButtonsBlock, CountButtons.Six);
  return sprintPreloadPage;
}
