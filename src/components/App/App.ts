import './_app.scss';
import { main } from '../Templates/main-block';
import { createPreSprintGamePage, createSprintGame } from '../View/sprint-game/sprint-game';
import createMainPage from '../View/main-page/main-page';
import User from '../Controller/authorization/user';
// eslint-disable-next-line import/no-cycle
import crateAuthorizationPage from '../View/authorization-page/authorization-page';
// import { getLocalStorage } from '../Controller/sprint-game/storage/storage-set-kornull';

export const appUser = new User();
export function App(idPage: string | null): void {
  if (idPage !== null) {
    main.innerHTML = '';
    if (idPage === 'main-page') {
      main.append(createMainPage());
    } else if (idPage === 'preload-sprint') {
      main.append(createPreSprintGamePage());
    } else if (idPage === 'sprint-page') {
      main.append(createSprintGame());
    }
  } else {
    main.innerHTML = '';
    main.append(createMainPage());
  }
  const authPage = <HTMLElement>document.querySelector('#login');
  authPage.addEventListener('click', () => crateAuthorizationPage());
}

// if (getLocalStorage('userDataBasic').userId) appUser.getUser();
