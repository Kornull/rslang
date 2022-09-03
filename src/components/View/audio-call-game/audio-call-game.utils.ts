import { getLocalStorage, setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';

enum KeysWords {
  EnglishWords = 'wordsObjectEn',
  RussianWords = 'wordsObjectRu',
  CorrectWord = 'correctWords',
  GuessedWord = 'guessedWords',
  WrongWord = 'wrongWords',
  Image = '#game-img',
  Count = '0',
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
