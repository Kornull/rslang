import './_app.scss';
import { main } from '../Templates/main-block';
import createMainPage from '../View/main-page/main-page';

export function App(): HTMLElement {
  main.appendChild(createMainPage());
  return main;
}
