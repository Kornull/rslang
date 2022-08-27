import { createPage } from '../View/textbook/textbook';
import './_app.scss';
import { main } from '../Templates/main-block';
import createMainPage from '../View/main-page/main-page';
import User from '../Controller/authorization/user';
import crateAuthorizationPage from '../View/authorization-page/authorization-page';

export const appUser = new User();

export function App(): HTMLElement {
  const bookPage = <HTMLElement>document.querySelector('#book-page');
  bookPage.addEventListener('click', () => {
    main.innerHTML = '';
    createPage();
  });
  main.appendChild(createMainPage());
  const authPage = <HTMLElement>document.querySelector('#login');
  authPage.addEventListener('click', () => crateAuthorizationPage());
  return main;
}
