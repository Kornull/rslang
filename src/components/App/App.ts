/* eslint-disable import/no-cycle */
import { createPage } from '../View/textbook/textbook';
import './_app.scss';
import { main } from '../Templates/main-block';
// eslint-disable-next-line import/no-cycle
import { createPreSprintGamePage, createSprintGame, statisticGame } from '../View/sprint-game/sprint-game';
import createMainPage from '../View/main-page/main-page';
import { IdPages, LocalKeys, PageKey } from '../Types/types';
import { getLocalStorage, setLocalStorage } from '../Controller/sprint-game/storage/storage-set-kornull';

import createPopup from '../View/authorization-page/authorization-page';
import User from '../Controller/authorization/user';
import { createStatisticPage } from '../View/statistic/statistic';
import { notWords } from '../View/sprint-game/sprint-game.utils';

export const appUser = new User();
export function App(idPage: string | null): void {
  const footer = <HTMLElement>document.querySelector('.footer');
  if (idPage !== null) {
    main.innerHTML = '';

    if (idPage === IdPages.SprintID || idPage === IdPages.PreloaSprintID) {
      footer.style.display = 'none';
    } else {
      footer.style.display = 'flex';
    }
    if (idPage !== 'title-team') {
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
        case IdPages.BookID:
          createPage();
          break;
        case IdPages.StatisticId:
          createStatisticPage();
          break;
        case IdPages.NoWords:
          notWords();
          break;
        default:
          break;
      }
      window.location.hash = idPage;

      setLocalStorage(PageKey.userPage, idPage);
    }
  } else {
    App(IdPages.MainID);
  }

  (() => {
    const logoUserInput = <HTMLElement>document.querySelector('.header__login-icon');
    const logoUser = <HTMLElement>document.querySelector('.header__logo-user');
    if (getLocalStorage(LocalKeys.UserData).userId) {
      logoUserInput.style.display = 'none';
      logoUser.style.display = 'block';
    } else {
      logoUserInput.style.display = 'block';
      logoUser.style.display = 'none';
    }
  })();

  const authPage = <HTMLElement>document.querySelector('#login');
  authPage.addEventListener('click', createPopup);
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
  if (hash === 'title-team' || hash === 'main-subtitle') {
    return;
  }
  App(hash);
});
