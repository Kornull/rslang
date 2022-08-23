import { Page } from './type-storage';

export function setLocalStorage(id: string) {
  localStorage.setItem(Page.userPage, JSON.stringify(id));
}
