import { App } from '../../../App/App';
import { Page } from './type-storage';

export function getLocalStorage(): void {
  const theme = localStorage.getItem(Page.userPage);
  if (localStorage.getItem(Page.userPage)) {
    if (theme !== null && theme !== undefined) {
      const id = theme.slice(1, -1);
      App(id);
    }
  } else {
    App(null);
  }
}
