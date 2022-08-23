import './_app.scss';
import { main } from '../Templates/main-block';
import { createPreSprintGamePage, createSprintGame } from '../View/sprint-game/sprint-game';
import createMainPage from '../View/main-page/main-page';

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
}
