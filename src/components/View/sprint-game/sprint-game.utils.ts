import { createListWords } from '../../Controller/sprint-game/get-words-to-sprint';
import { getLocalStorage, setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';
import { Key, WordSettings } from '../../Types/types';

enum KeysWords {
  EnglishWords = 'wordsObjectEn',
  RussianWords = 'wordsObjectRu',
  CorrectWord = 'correctWords',
  WrongWord = 'wrongWords',
  Count = '0',
}

enum SprintTagClass {
  GroupClass = 'sprint__btn-group',
}

function countNum(count: number, length: number): boolean {
  return count < length;
}

function correctAnswer(): void {
  let num = Number(getLocalStorage(KeysWords.CorrectWord));
  setLocalStorage(KeysWords.CorrectWord, (num += 1).toString());
}

function wrongAnswer(): void {
  let num = Number(getLocalStorage(KeysWords.WrongWord));
  setLocalStorage(KeysWords.WrongWord, (num += 1).toString());
}

function removeCountAnswers(): void {
  setLocalStorage(KeysWords.CorrectWord, KeysWords.Count);
  setLocalStorage(KeysWords.WrongWord, KeysWords.Count);
}

export function mixWords(blockGame: HTMLElement): void {
  removeCountAnswers();
  let count = 0;
  let randomCount = count;
  const enWords = getLocalStorage(KeysWords.EnglishWords);
  const ruWords = getLocalStorage(KeysWords.RussianWords);

  const en = <HTMLElement>blockGame.querySelector('#word-en');
  const ru = <HTMLElement>blockGame.querySelector('#word-ru');

  function viewWords() {
    const randomNum = Math.floor(Math.random() * ruWords.length);
    if (count % randomNum === 0) {
      randomCount = Math.floor(Math.random() * ruWords.length);
    } else {
      randomCount = count;
    }
    en.innerHTML = `${enWords[count].word}`;
    ru.innerHTML = `${ruWords[randomCount].word}`;
  }

  blockGame.addEventListener('click', (ev: Event) => {
    const message = ev.target as HTMLElement;
    switch (message.id) {
      case 'word-true':
        if (enWords[count].id === ruWords[randomCount].id) {
          correctAnswer();
        } else {
          wrongAnswer();
        }
        count++;
        if (countNum(count, enWords.length)) {
          viewWords();
        }
        break;
      case 'word-false':
        if (enWords[count].id !== ruWords[randomCount].id) {
          correctAnswer();
        } else {
          wrongAnswer();
        }
        count++;
        if (countNum(count, ruWords.length)) {
          viewWords();
        }
        break;
      default:
        break;
    }
  });
  viewWords();
}

export const Click = async (id: string, className: string): Promise<void> => {
  let arrayWords: WordSettings[] = [];
  const arrayWordsEn: object[] = [];
  const arrayWordsRu: object[] = [];
  if (className === SprintTagClass.GroupClass) {
    arrayWords = await createListWords(Number(id.split('').slice(-1)) - 1);
  }
  arrayWords.forEach((el: WordSettings) => {
    const wordsEn: Key = {};
    const wordsRu: Key = {};
    wordsEn.id = el.id;
    wordsEn.word = el.word;
    wordsRu.id = el.id;
    wordsRu.word = el.wordTranslate;
    arrayWordsEn.push(wordsEn);
    arrayWordsRu.push(wordsRu);
  });
  setLocalStorage('wordsObjectEn', arrayWordsEn);
  setLocalStorage('wordsObjectRu', arrayWordsRu);
};

// audio: "files/28_3545.mp3"
// audioExample: "files/28_3545_example.mp3"
// audioMeaning: "files/28_3545_meaning.mp3"
// group: 5
// id: "5e9f5ee45eb9e72bc21b0278"
// image: "files/28_3545.jpg"
// page: 27
// textExample: "The doctor can tell you every process that happens in one’s <b>guts</b>."
// textExampleTranslate: "Врач может рассказать вам о каждом процессе, который происходит у вас в животе"
// textMeaning: "The <i>guts</i> are all the organs inside a person or animal."
// textMeaningTranslate: "Кишки - это все органы внутри человека или животного"
// transcription: "[gʌts]"
// word: "guts"
// wordTranslate: "внутренности"
