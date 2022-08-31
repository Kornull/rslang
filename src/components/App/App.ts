import './_app.scss';
import { main } from '../Templates/main-block';
// eslint-disable-next-line import/no-cycle
import { createPreSprintGamePage, createSprintGame, statisticGame } from '../View/sprint-game/sprint-game';
import createMainPage from '../View/main-page/main-page';
import { IdPages } from '../Types/types';
import { setLocalStorage } from '../Controller/sprint-game/storage/storage-set-kornull';
import { PageKey } from '../Controller/sprint-game/storage/type-storage';

export function App(idPage: string | null): void {
  const footer = <HTMLElement>document.querySelector('.footer');
  if (idPage !== null) {
    main.innerHTML = '';
    if (idPage === IdPages.SprintID || idPage === IdPages.PreloaSprintID) {
      footer.style.display = 'none';
    } else {
      footer.style.display = 'flex';
    }
    switch (idPage) {
      case IdPages.MainID:
        createMainPage();
        break;
      case IdPages.PreloaSprintID:
        createPreSprintGamePage();
        break;
      case IdPages.SprintID:
        createSprintGame();
        break;
      case IdPages.SprintStatiD:
        statisticGame();
        break;
      default:
        break;
    }
    window.location.hash = idPage;
    // else if (idPage === '#book-page') {
    //   createPage();
    // }
    setLocalStorage(PageKey.userPage, idPage);
  } else {
    App(IdPages.MainID);
  }
}

// if (getLocalStorage('userDataBasic').userId) appUser.getUser();

// currentPage"1"
// currentGroup "4"

// const bookPage = <HTMLElement>document.querySelector('#book-page');
// bookPage.addEventListener('click', () => {
//   main.innerHTML = '';
//   createPage();
// });
