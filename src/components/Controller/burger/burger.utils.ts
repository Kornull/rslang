import { App } from '../../App/App';
import { setLocalStorage } from '../sprint-game/storage/storage-set-kornull';
import { Page } from '../sprint-game/storage/type-storage';

export function clickIdLink(id: string): void {
  App(id);
  setLocalStorage(Page.userPage, id);
}
