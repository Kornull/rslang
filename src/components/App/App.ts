import { createPage } from '../Controller/textbook_controller';
import './_app.scss';

export function App(): HTMLElement {
  const main = <HTMLElement>document.querySelector('#main');
  const bookPage = <HTMLElement>document.querySelector('#book-page');
  bookPage.addEventListener('click', () => createPage());
  return main;
}
