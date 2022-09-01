import { App } from '../../App/App';
import { setLocalStorage } from '../sprint-game/storage/storage-set-kornull';
import { PageKey } from '../sprint-game/storage/type-storage';

export function clickIdLink(id: string): void {
  App(id);
  setLocalStorage(PageKey.userPage, id);
}
