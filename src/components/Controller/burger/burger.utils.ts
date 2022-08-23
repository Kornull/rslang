import { App } from '../../App/App';
import { setLocalStorage } from '../sprint-game/storage/storage-set-kornull';

export function clickIdLink(id: string): void {
  App(id);
  setLocalStorage(id);
}
