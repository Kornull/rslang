import './_app.scss';
import { main } from '../Templates/main-block';
// import createMainPage from '../View/main-page/main-page';
import { createPreSprintGamePage } from '../View/sprint-game/sprint-game';
import createMainPage from '../View/main-page/main-page';

export function App(idPage: string | null): HTMLElement {
  if (idPage !== null) {
    main.innerHTML = '';
    if (idPage === 'main-page') {
      main.appendChild(createMainPage());
    } else if (idPage === 'preload-sprint') {
      main.appendChild(createPreSprintGamePage());
    }
  } else {
    main.innerHTML = '';
    main.appendChild(createMainPage());
  }
  return main;
}
