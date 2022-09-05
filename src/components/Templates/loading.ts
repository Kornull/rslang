// eslint-disable-next-line import/no-cycle
import { App } from '../App/App';
import { getLocalStorage } from '../Controller/storage';
import { IdPages, PageKey } from '../Types/types';
import { createEl } from '../View/create_element';
import { main } from './main-block';

const header = <HTMLElement>document.querySelector('.header');
export function loading(idPage: string): void {
  main.innerHTML = '';
  const sprintPreloadPage = <HTMLElement>createEl('div', main, ['sprint', 'sprint__game-preload']);
  <HTMLElement>createEl('div', sprintPreloadPage, ['spinner']);
  const timeSleep = setTimeout(() => {
    const arrayAllWords = getLocalStorage(PageKey.allWords);
    if (arrayAllWords.length === 0) {
      App(IdPages.NoWords);
    } else {
      App(idPage);
    }
  }, 7000);
  header.addEventListener('click', (ev) => {
    const message = ev.target as HTMLElement;
    if (message.id === 'logo' || message.classList[0] === 'header__nav-link') {
      clearTimeout(timeSleep);
    }
  });
}
