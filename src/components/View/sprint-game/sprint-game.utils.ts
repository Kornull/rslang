import { createListWords } from '../../Controller/sprint-game/get-words-to-sprint';
import { getLocalStorage, setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';
import { Key, Word } from '../../Types/types';

enum SprintTagClass {
  GroupClass = 'sprint__btn-group',
}

function countNum(count: number, length: number) {
  return count < length;
}

export function mixWords(blockGame: HTMLElement) {
  let count = 0;
  const a = getLocalStorage('wordsObject');
  const keys = Object.keys(a);
  const values = Object.values(a);
  const en = <HTMLElement>blockGame.querySelector('#word-en');
  const ru = <HTMLElement>blockGame.querySelector('#word-ru');
  en.innerHTML = `${keys[count]}`;
  ru.innerHTML = `${values[count]}`;
  function viewWords(num: number) {
    en.innerHTML = `${keys[num]}`;
    ru.innerHTML = `${values[num]}`;
  }
  blockGame.addEventListener('click', (ev: Event) => {
    const message = ev.target as HTMLElement;
    switch (message.id) {
      case 'word-true':
        count++;
        if (countNum(count, keys.length)) {
          viewWords(count);
        }
        break;
      case 'word-false':
        count++;
        if (countNum(count, keys.length)) {
          viewWords(count);
        }
        break;
      default:
        break;
    }
  });
}

export const Click = async (id: string, className: string) => {
  let arrayWords: Word[] = [];
  const words: Key = {};
  if (className === SprintTagClass.GroupClass) {
    arrayWords = await createListWords(Number(id.split('').slice(-1)) - 1);
  }
  arrayWords.forEach((el: Word) => {
    words[el.word] = el.wordTranslate;
  });
  setLocalStorage('wordsObject', words);
};
