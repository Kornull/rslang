import './_sprint.scss';
import { main } from '../../Templates/main-block';
import { createEl } from '../../Controller/createTagBlock';
import { Click } from './sprint-game.utils';

export enum CountButtons {
  Two = 2,
  Six = 6,
}

function createButtons(el: HTMLElement, count: number) {
  for (let i = 1; i < count + 1; i++) {
    const btnSection = <HTMLElement>createEl('button', el, ['sprint__btn-group']);
    btnSection.id = `words-${i}`;
    btnSection.innerHTML = `${i}`;
  }
}

export function createPreSprintGamePage() {
  const sprintPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__game-preload']);
  sprintPage.id = 'preload-sprint';
  sprintPage.addEventListener('click', (ev: Event) => {
    const message = ev.target as HTMLElement;
    const { id } = message;
    const { className } = message;
    Click(id, className);
  });
  const sprintButtonsBlock = <HTMLElement>createEl('div', sprintPage, ['sprint__btns']);
  const sprintWordEn = <HTMLElement>createEl('h1', sprintPage, ['sprint__word-en']);
  const sprintWordRu = <HTMLElement>createEl('h2', sprintPage, ['sprint__word-ru']);
  // const sprintButtonChoice = <HTMLElement>createEl('div', sprintPage, ['sprint__btns-choise']);
  sprintWordEn.id = 'word-en';
  sprintWordRu.id = 'word-ru';
  createButtons(sprintButtonsBlock, CountButtons.Six);
  return sprintPage;
}
