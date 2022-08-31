import { App } from '../../../App/App';
import { PageKey } from './type-storage';

export function getLocalStorageApp(): void {
  const page = localStorage.getItem(PageKey.userPage);
  if (localStorage.getItem(PageKey.userPage)) {
    if (page !== null && page !== undefined) {
      const id = page.slice(1, -1);
      App(id);
    }
  } else {
    App(null);
  }
}
