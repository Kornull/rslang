// eslint-disable-next-line import/no-cycle
import { App } from '../../App/App';
import { createAllListWords, getGuessSprintWords, getUserWord } from '../../Controller/sprint-game/get-words-to-sprint';
import { getLocalStorage, setLocalStorage } from '../../Controller/sprint-game/storage/storage-set-kornull';
import { body } from '../../Templates/main-block';
import { urlLink } from '../../Templates/serve';
// eslint-disable-next-line object-curly-newline
import { IdPages, Key, LocalKeys, WordSettings } from '../../Types/types';

const audio = new Audio();
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
let numberDotted = 0;

function userGameGuessed(wordId: string, status: boolean, guessLength: number): void {
  if (getLocalStorage(LocalKeys.UserData).userId) {
    getUserWord(wordId, status);
    getGuessSprintWords(status, guessLength);
  }
}

export function createAudioButton(audioButton: HTMLElement): void {
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
  setTimeout(() => {
    audio.play();
  });
  let num = Number(getLocalStorage(KeysWords.CorrectWord));
  setLocalStorage(KeysWords.CorrectWord, (num += 1).toString());
}

function wrongAnswer(): void {
  audio.src = './assets/audio/wrong3.mp3';
  setTimeout(() => {
    audio.play();
  });
  let num = Number(getLocalStorage(KeysWords.WrongWord));
  setLocalStorage(KeysWords.WrongWord, (num += 1).toString());
}

function guessedWord(): void {
  let num = Number(getLocalStorage(KeysWords.GuessedWord));
  setLocalStorage(KeysWords.GuessedWord, (num += 1).toString());
}

function removeCountAnswers(): void {
  setLocalStorage(KeysWords.CorrectWord, KeysWords.Count);
  setLocalStorage(KeysWords.WrongWord, KeysWords.Count);
  setLocalStorage(KeysWords.GuessedWord, KeysWords.Count);
}

function colorDotted(blockDotted: HTMLDivElement[], numberDot: number) {
  if (numberDot === 0) {
    blockDotted.forEach((elDot: HTMLDivElement) => {
      elDot.classList.remove('active');
    });
  } else if (numberDot === 1) {
    blockDotted.forEach((elDot: HTMLDivElement) => {
      elDot.classList.remove('active');
    });
    blockDotted.forEach((elDot: HTMLDivElement) => {
      if (Number(elDot.id.slice(-1)) === numberDot) {
        elDot.classList.add('active');
      }
    });
  } else {
    blockDotted.forEach((elDot: HTMLDivElement) => {
      if (Number(elDot.id.slice(-1)) === numberDot) {
        elDot.classList.add('active');
      }
    });
  }
}

export function mixWords(blockGame: HTMLElement, blockDotted: HTMLDivElement[]): void {
  numberDotted = 0;
  removeCountAnswers();
  let lengthGuessed = 0;
  let count = 0;
  let randomCount = count;
  const enWords = getLocalStorage(KeysWords.EnglishWords);
  const ruWords = getLocalStorage(KeysWords.RussianWords);
  const image = <HTMLImageElement>blockGame.querySelector(KeysWords.Image);
  const en = <HTMLElement>blockGame.querySelector('#word-en');
  const ru = <HTMLElement>blockGame.querySelector('#word-ru');

  function viewWords() {
    const randomNum = Math.floor(Math.random() * ruWords.length);
    if (randomNum % 3 === 0) {
      randomCount = Math.floor(Math.random() * ruWords.length);
    } else {
      randomCount = count;
    }
    image.src = `${urlLink}${enWords[count].image}`;
    en.innerHTML = `${enWords[count].word}`;
    ru.innerHTML = `${ruWords[randomCount].word}`;
  }

  function clickGameButtons(elementId?: string) {
    switch (elementId) {
      case 'word-true':
        if (enWords[count].id === ruWords[randomCount].id) {
          lengthGuessed++;
          numberDotted++;
          if (lengthGuessed >= 0) {
            guessWordLengthGame = Math.max(guessWordLengthGame, lengthGuessed);
          }
          correctAnswer();
          guessedWord();
          userGameGuessed(enWords[count].id, true, lengthGuessed);
          colorDotted(blockDotted, numberDotted);
          if (numberDotted === 3) numberDotted = 0;
        } else {
          lengthGuessed = 0;
          numberDotted = 0;
          wrongAnswer();
          userGameGuessed(enWords[count].id, false, lengthGuessed);
          colorDotted(blockDotted, numberDotted);
        }
        count++;
        if (countNum(count, enWords.length)) {
          viewWords();
        }
        break;
      case 'word-false':
        if (enWords[count].id !== ruWords[randomCount].id) {
          lengthGuessed++;
          numberDotted++;
          correctAnswer();
          userGameGuessed(enWords[count].id, true, lengthGuessed);
          colorDotted(blockDotted, numberDotted);
          if (numberDotted === 3) numberDotted = 0;
        } else {
          lengthGuessed = 0;
          numberDotted = 0;
          wrongAnswer();
          userGameGuessed(enWords[count].id, false, lengthGuessed);
          colorDotted(blockDotted, numberDotted);
        }
        count++;
        break;
      default:
        break;
    }
    if (countNum(count, ruWords.length)) {
      viewWords();
    } else {
      App(IdPages.SprintStatiD);
    }
  }
  blockGame.addEventListener('click', (ev: Event) => {
    const message = ev.target as HTMLElement;
    const idElement = message.id;
    if (idElement === 'word-true' || idElement === 'word-false') clickGameButtons(idElement);
  });
  const btnTrueSprint = <HTMLButtonElement>blockGame.querySelector('#word-true');
  const btnFalseSprint = <HTMLButtonElement>blockGame.querySelector('#word-false');

  function trueButton() {
    clickGameButtons('word-true');
    btnTrueSprint.classList.add('active');
    setTimeout(() => {
      btnTrueSprint.classList.remove('active');
    }, 200);
  }
  function falseButton() {
    clickGameButtons('word-false');
    btnFalseSprint.classList.add('active');
    setTimeout(() => {
      btnFalseSprint.classList.remove('active');
    }, 200);
  }
  body.onkeydown = (ev: KeyboardEvent) => {
    if (body.classList.contains('active') || window.location.hash.slice(1) !== IdPages.SprintID || ev.repeat === true) {
      ev.stopPropagation();
    } else {
      ev.stopPropagation();
      switch (ev.key) {
        case 'ArrowRight':
          ev.preventDefault();
          ev.stopPropagation();
          trueButton();
          break;
        case 'ArrowLeft':
          ev.preventDefault();
          ev.stopPropagation();
          falseButton();
          break;
        default:
      }
    }
  };
  viewWords();
}

export const ClickSprint = (id: number, num?: number): void => {
  let arrayWords: WordSettings[] = [];
  const arrayWordsEn: object[] = [];
  const arrayWordsRu: object[] = [];
  if (typeof num === 'number') {
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
      wordsEn.image = el.image;
      wordsRu.id = el.id;
      wordsRu.word = el.wordTranslate;
      arrayWordsEn.push(wordsEn);
      arrayWordsRu.push(wordsRu);
    });
    setLocalStorage('wordsObjectEn', arrayWordsEn);
    setLocalStorage('wordsObjectRu', arrayWordsRu);
  }, 6000);
};

export function createStaticticSprint(block: HTMLElement): void {
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

export function examEvent(event: KeyboardEvent): number | undefined {
  let numGroup = 0;
  if (Number(event.key) > 0 && Number(event.key) <= 6) {
    switch (event.key) {
      case '1':
        numGroup = 0;
        break;
      case '2':
        numGroup = 1;
        break;
      case '3':
        numGroup = 2;
        break;
      case '4':
        numGroup = 3;
        break;
      case '5':
        numGroup = 4;
        break;
      case '6':
        numGroup = 5;
        break;
      default:
        break;
    }
    return numGroup;
  }
  return undefined;
}
