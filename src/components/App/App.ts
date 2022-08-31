import './_app.scss';
import { main } from '../Templates/main-block';
import { createPreSprintGamePage, createSprintGame } from '../View/sprint-game/sprint-game';
import createMainPage from '../View/main-page/main-page';
import User from '../Controller/authorization/user';
// eslint-disable-next-line import/no-cycle
import createPopup from '../View/authorization-page/authorization-page';

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
  authPage.addEventListener('click', createPopup);
}

// if (getLocalStorage('userDataBasic').userId) appUser.getUser();
