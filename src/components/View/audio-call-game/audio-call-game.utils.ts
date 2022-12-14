import { getLocalStorage, setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';
import { IdPages, PageKey, WordSettings } from '../../Types/types';
// eslint-disable-next-line import/no-cycle
import { createAllListWords } from '../../Controller/audio-game/audio-game';
import { MainGameElement, NumberOf, KeysWords } from '../../Controller/audio-game/types';
// eslint-disable-next-line import/no-cycle
import { App } from '../../App/App';
import { urlLink } from '../../Templates/serve';

const answerSound = new Audio();
export const audioWord = new Audio();
// let guessWordLengthGame = 0;

function soundCorrectAnswer(): void {
  answerSound.src = './assets/audio/correct.mp3';
  setTimeout(() => {
    answerSound.play();
  });
}

function soundWrongAnswer(): void {
  answerSound.src = './assets/audio/wrong3.mp3';
  setTimeout(() => {
    answerSound.play();
  });
}

export function fillStatisticAudio(block: HTMLElement): void {
  const correctNum = Number(getLocalStorage(KeysWords.CorrectWord));
  const wrongNum = Number(getLocalStorage(KeysWords.WrongWord));
  const guessedNum = Number(getLocalStorage(KeysWords.GuessedWord));
  const allCountWords = correctNum + wrongNum;
  const correct = <HTMLElement>block.querySelector('.audio__statistic-correct');
  const wrong = <HTMLElement>block.querySelector('.audio__statistic-wrong');
  const words = <HTMLElement>block.querySelector('.audio__statistic-words');
  // const percent = <HTMLElement>block.querySelector('.audio__statistic-percent');
  const percentWord = <HTMLElement>block.querySelector('.audio__statistic-percent--words');
  correct.innerHTML = `Правильных ответов - ${correctNum}`;
  wrong.innerHTML = `Неправильных ответов - ${wrongNum}`;
  words.innerHTML = `Всего ответов - ${guessedNum}`;
  // percent.innerHTML = `Количество ответов без ошибок - ${guessWordLengthGame}`;
  percentWord.innerHTML = `Процент отгаданных слов - ${Math.trunc((correctNum / allCountWords) * 100)}%`;
}

function getRandomNumber(limit: number): number {
  return Math.floor(Math.random() * limit);
}

export function getMainGameArray(allListWords: WordSettings[]): MainGameElement[] {
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
    answersArray.sort(() => Math.random() - 0.5);
    result.push({ word: currentWord, falseWords: answersArray });
  }
  return result;
}

export const ClickAudio = (id: number, num?: number): void => {
  let arrayWords: WordSettings[] = [];
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

function sendStatistic() {
  // -------------------------------------------statistic--------------------------------
}

export function showEnglishWord(show: boolean) {
  // const buttonFiled = <HTMLElement>document.querySelector('.btn-field');
  const imageContainer = <HTMLElement>document.querySelector('.image-container');
  const audioButton = <HTMLElement>document.querySelector('.audio-button');
  const englishWord = <HTMLElement>document.querySelector('.english-word');
  if (show) {
    imageContainer.classList.add('active');
    audioButton.classList.add('move');
    englishWord.classList.add('active');
  } else {
    imageContainer.classList.remove('active');
    audioButton.classList.remove('move');
    englishWord.classList.remove('active');
  }
}

export function fillNewStepGame() {
  const currentStep = Number(getLocalStorage(KeysWords.CurrentStep));
  const mainGameArray = getLocalStorage(KeysWords.MainGameArray);
  const buttonFiled = <HTMLElement>document.querySelector('.btn-field');
  buttonFiled.classList.remove('disabled');
  showEnglishWord(false);
  if (currentStep >= mainGameArray.length) {
    sendStatistic();
    App(IdPages.AudioGameStatistic);
  }
  const image = <HTMLImageElement>document.querySelector('.image-container img');
  const enWord = <HTMLElement>document.querySelector('.english-word');
  const ruWords = <NodeListOf<HTMLElement>>document.querySelectorAll('.btn-choice');

  image.src = `${urlLink}${mainGameArray[currentStep].word.image}`;
  enWord.innerText = `${mainGameArray[currentStep].word.word}`;
  mainGameArray[currentStep].falseWords.forEach((word: string, count: number) => {
    ruWords[count].innerText = word;
  });
  audioWord.src = `${urlLink}${mainGameArray[currentStep].word.audio}`;
  audioWord.autoplay = true;
}

export function buttonsEvenHandler(event: Event) {
  let currentStep = Number(getLocalStorage(KeysWords.CurrentStep));
  const mainGameArray = getLocalStorage(KeysWords.MainGameArray);
  let correctNum = Number(getLocalStorage(KeysWords.CorrectWord));
  let wrongNum = Number(getLocalStorage(KeysWords.WrongWord));
  let guessedNum = Number(getLocalStorage(KeysWords.GuessedWord));
  const buttonFiled = <HTMLElement>document.querySelector('.btn-field');

  if ((event.target as HTMLElement).classList.contains('btn-choice')) {
    showEnglishWord(true);
    if (mainGameArray[currentStep].word.wordTranslate === (event.target as HTMLElement).innerText) {
      soundCorrectAnswer();
      correctNum += 1;
      guessedNum += 1;
    } else {
      soundWrongAnswer();
      wrongNum += 1;
      guessedNum += 1;
    }
    currentStep += 1;
    buttonFiled.classList.add('disabled');
    // fillNewStepGame();
  } else if ((event.target as HTMLElement).classList.contains('next-skip-btn')) {
    wrongNum += 1;
    guessedNum += 1;
    currentStep += 1;
    setLocalStorage(KeysWords.CurrentStep, `${currentStep}`);
    setLocalStorage(KeysWords.CorrectWord, `${correctNum}`);
    setLocalStorage(KeysWords.WrongWord, `${wrongNum}`);
    setLocalStorage(KeysWords.GuessedWord, `${guessedNum}`);
    fillNewStepGame();
  }
  setLocalStorage(KeysWords.CurrentStep, `${currentStep}`);
  setLocalStorage(KeysWords.CorrectWord, `${correctNum}`);
  setLocalStorage(KeysWords.WrongWord, `${wrongNum}`);
  setLocalStorage(KeysWords.GuessedWord, `${guessedNum}`);
}
