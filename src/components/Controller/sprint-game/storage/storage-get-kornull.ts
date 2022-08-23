import { App } from '../../../App/App';
import { Page } from './type-storage';

export function getLocalStorageApp(): void {
  const page = localStorage.getItem(Page.userPage);
  if (localStorage.getItem(Page.userPage)) {
    if (page !== null && page !== undefined) {
      const id = page.slice(1, -1);
      App(id);
    }
  } else {
    App(null);
  }
}
