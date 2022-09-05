import { getLocalStorage, setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';
import { IdPages, Key, LocalKeys, PageKey, WordSettings } from '../../Types/types';
import { createAllListWords } from '../../Controller/audio-game/audio-game';
import { MainGameElement, NumberOf } from '../../Controller/audio-game/types';

enum KeysWords {
  EnglishWords = 'wordsObjectEn',
  RussianWords = 'wordsObjectRu',
  CorrectWord = 'correctWords',
  GuessedWord = 'guessedWords',
  WrongWord = 'wrongWords',
  Image = '#game-img',
  Count = '0',
  MainGameArray = 'mainGameArray',
}

let guessWordLengthGame = 0;

export function fillStatisticAudio(block: HTMLElement): void {
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
  percent.innerHTML = `Количество ответов без ошибок - ${guessWordLengthGame}`;
  percentWord.innerHTML = `Процент отгаданных слов - ${Math.trunc((guessedNum / allCountWords) * 100)}%`;
}

function getRandomNumber(limit: number): number {
  return Math.floor(Math.random() * limit);
}

export function getMainGameArray(allListWords: WordSettings[]): MainGameElement[] {
  // const allListWords = getLocalStorage('allListWords');
  console.log('allListWords', allListWords);
  const result: MainGameElement[] = [];
  let currentWord: WordSettings;
  for (let i = 0; i < NumberOf.wordsInPage; i++) {
    if (result.length === 0) {
      currentWord = allListWords[getRandomNumber(NumberOf.wordsInPage)];
    } else {
      do {
        currentWord = allListWords[getRandomNumber(NumberOf.wordsInPage)];
        // eslint-disable-next-line @typescript-eslint/no-loop-func
      } while (result.findIndex((el) => el.word.id === currentWord.id) !== -1);
    }
    const answersArray: string[] = [currentWord.wordTranslate];
    let currentAnswer = '';
    do {
      currentAnswer = allListWords[getRandomNumber(NumberOf.wordsInPage)].wordTranslate;
      if (!answersArray.includes(currentAnswer)) {
        answersArray.push(currentAnswer);
      }
    } while (answersArray.length < NumberOf.answersOnPage);
    result.push({ word: currentWord, falseWords: answersArray });
  }
  console.log('mainGameArray =', result);
  return result;
}

export const ClickAudio = (id: number, num?: number): void => {
  let arrayWords: WordSettings[] = [];
  // console.log(num);
  if (typeof num === 'number') {
    setLocalStorage(PageKey.numGamePage, [`${num}`]);
    createAllListWords(id, num);
  } else {
    setLocalStorage(PageKey.numGamePage, []);
    createAllListWords(id);
  }
  setTimeout(() => {
    arrayWords = getLocalStorage(PageKey.allWords);
    // getMainGameArray(arrayWords)
    setLocalStorage(KeysWords.MainGameArray, getMainGameArray(arrayWords));
  }, 6000);
};

// function fillNewStepGame() {

// }
