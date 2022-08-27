import { createAllListWords, getUserWord } from '../../Controller/sprint-game/get-words-to-sprint';
import { getLocalStorage, setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';
import { Key, LocalKeys, WordSettings } from '../../Types/types';

const audio = new Audio();
enum KeysWords {
  EnglishWords = 'wordsObjectEn',
  RussianWords = 'wordsObjectRu',
  CorrectWord = 'correctWords',
  GuessedWord = 'guessedWords',
  WrongWord = 'wrongWords',
  Count = '0',
}

function userGameGuessed(wordId: string, status: boolean) {
  if (getLocalStorage(LocalKeys.UserData)) {
    // userWords(wordId);
    getUserWord(wordId, status);
  }
}

export function createAudioButton(audioButton: HTMLElement) {
  audioButton.addEventListener('click', () => {
    audioButton.classList.toggle('sound-on');
    if (audioButton.classList.contains('sound-on')) {
      audio.volume = 1;
      audioButton.style.backgroundImage = 'url(./assets/img/sound-on.png)';
    } else {
      audio.volume = 0;
      audioButton.style.backgroundImage = 'url(./assets/img/sound-off.png)';
    }
  });
}

function countNum(count: number, length: number): boolean {
  return count < length;
}

function correctAnswer(): void {
  audio.src = './assets/audio/correct.mp3';
  audio.play();
  let num = Number(getLocalStorage(KeysWords.CorrectWord));
  setLocalStorage(KeysWords.CorrectWord, (num += 1).toString());
}

function wrongAnswer(): void {
  audio.src = './assets/audio/wrong3.mp3';
  audio.play();
  let num = Number(getLocalStorage(KeysWords.WrongWord));
  setLocalStorage(KeysWords.WrongWord, (num += 1).toString());
}

function guessedWord() {
  let num = Number(getLocalStorage(KeysWords.GuessedWord));
  setLocalStorage(KeysWords.GuessedWord, (num += 1).toString());
}

function removeCountAnswers(): void {
  setLocalStorage(KeysWords.CorrectWord, KeysWords.Count);
  setLocalStorage(KeysWords.WrongWord, KeysWords.Count);
  setLocalStorage(KeysWords.GuessedWord, KeysWords.Count);
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
          guessedWord();
          userGameGuessed(enWords[count].id, true);
        } else {
          wrongAnswer();
          userGameGuessed(enWords[count].id, false);
        }
        count++;
        if (countNum(count, enWords.length)) {
          viewWords();
        }
        break;
      case 'word-false':
        if (enWords[count].id !== ruWords[randomCount].id) {
          correctAnswer();
          userGameGuessed(enWords[count].id, true);
        } else {
          wrongAnswer();
          userGameGuessed(enWords[count].id, false);
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

export const Click = (id: number, num?: number): void => {
  let arrayWords: WordSettings[] = [];
  const arrayWordsEn: object[] = [];
  const arrayWordsRu: object[] = [];
  if (num) {
    createAllListWords(id, num);
  } else {
    createAllListWords(id);
  }
  setTimeout(() => {
    arrayWords = getLocalStorage('allListWords');
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
  }, 5000);
};

export function createStaticticSprint(block: HTMLElement) {
  const correctNum = Number(getLocalStorage(KeysWords.CorrectWord));
  const wrongNum = Number(getLocalStorage(KeysWords.WrongWord));
  const guessedNum = Number(getLocalStorage(KeysWords.GuessedWord));
  const allCountWords = correctNum + wrongNum;
  const correct = <HTMLElement>block.querySelector('.sprint__statistic-correct');
  const wrong = <HTMLElement>block.querySelector('.sprint__statistic-wrong');
  const words = <HTMLElement>block.querySelector('.sprint__statistic-words');
  const percent = <HTMLElement>block.querySelector('.sprint__statistic-percent');
  const percentWord = <HTMLElement>block.querySelector('.sprint__statistic-percent--words');
  correct.innerHTML = `Правильных ответов - ${correctNum}`;
  wrong.innerHTML = `Неправильных ответов - ${wrongNum}`;
  words.innerHTML = `Угадано слов - ${guessedNum}`;
  percent.innerHTML = `Общий процент правильных ответов - ${Math.trunc((correctNum / allCountWords) * 100)}%`;
  percentWord.innerHTML = `Процент отгаданных слов - ${Math.trunc((guessedNum / allCountWords) * 100)}%`;
}
