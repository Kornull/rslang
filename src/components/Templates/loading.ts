// eslint-disable-next-line import/no-cycle
import { App } from '../App/App';
import { IdPages } from '../Types/types';
import { createEl } from '../View/create_element';
import { main } from './main-block';

const header = <HTMLElement>document.querySelector('.header');
export function loading(): void {
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
