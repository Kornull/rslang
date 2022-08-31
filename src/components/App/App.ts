import './_app.scss';
import { main } from '../Templates/main-block';
// eslint-disable-next-line import/no-cycle
import { createPreSprintGamePage, createSprintGame, statisticGame } from '../View/sprint-game/sprint-game';
import createMainPage from '../View/main-page/main-page';
import User from '../Controller/authorization/user';
// eslint-disable-next-line import/no-cycle
import crateAuthorizationPage from '../View/authorization-page/authorization-page';
import { IdPages } from '../Types/types';
import { setLocalStorage } from '../Controller/sprint-game/storage/storage-set-kornull';
import { PageKey } from '../Controller/sprint-game/storage/type-storage';

export const appUser = new User();
export function App(idPage: string | null): void {
  function hashView() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App(hash);
    });
  }
  const footer = <HTMLElement>document.querySelector('.footer');
  if (idPage !== null) {
    main.innerHTML = '';
    if (idPage === IdPages.SprintID || idPage === IdPages.PreloaSprintID) {
      footer.style.display = 'none';
    } else {
      footer.style.display = 'flex';
    }
    // window.location.hash = '';
    window.location.hash = idPage;
    if (idPage === IdPages.MainID) {
      createMainPage();
    } else if (idPage === IdPages.PreloaSprintID) {
      createPreSprintGamePage();
    } else if (idPage === IdPages.SprintID) {
      createSprintGame();
    } else if (idPage === IdPages.SprintStatiD) {
      statisticGame();
    }

    // else if (idPage === '#book-page') {
    //   createPage();
    // }
    setLocalStorage(PageKey.userPage, idPage);
  } else {
    App(IdPages.MainID);
  }
  hashView();
  const authPage = <HTMLElement>document.querySelector('#login');
  authPage.addEventListener('click', () => {
    crateAuthorizationPage();
  });
}

// if (getLocalStorage('userDataBasic').userId) appUser.getUser();

// currentPage"1"
// currentGroup "4"

// const bookPage = <HTMLElement>document.querySelector('#book-page');
// bookPage.addEventListener('click', () => {
//   main.innerHTML = '';
//   createPage();
// });
