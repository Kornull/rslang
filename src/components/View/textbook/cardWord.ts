import User from '../../Controller/authorization/user';
import { getLocalStorage, getStorage, setStorage } from '../../Controller/storage';
import { getAggregateWordsUser, getListHardWord, getListWords } from '../../Controller/textbook/textbook';
import { main } from '../../Templates/main-block';
import { urlLink } from '../../Templates/serve';
import { PageKey } from '../../Types/types';
import { Word, WordAggregated } from '../../Types/word';
import { createEl } from '../create_element';
// eslint-disable-next-line import/no-cycle
import { updateButtonPagination } from './textbook';
import { COUNT_GROUP } from './util';
// eslint-disable-next-line import/no-cycle
import { updateHardWord, updateLearnWord } from './word';

function createButtonAudio(wordValue: Word): SVGSVGElement {
  const audioImg = <SVGSVGElement>document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  audioImg.classList.add('imgAudio');
  audioImg.innerHTML = '<use xlink:href="./assets/img/audio.svg#audio"></use>';
  audioImg.addEventListener('click', () => {
    const audioObj = new Audio();
    audioObj.src = `${urlLink}${wordValue.audio}`;
    audioObj.autoplay = true;
    audioObj.addEventListener('ended', () => {
      const audioMeaning = new Audio();
      audioMeaning.src = `${urlLink}${wordValue.audioMeaning}`;
      audioMeaning.autoplay = true;
      audioMeaning.addEventListener('ended', () => {
        const audioExample = new Audio();
        audioExample.src = `${urlLink}${wordValue.audioExample}`;
        audioExample.autoplay = true;
      });
    });
  });
  return audioImg;
}

export async function renderCardWord(wordValue: Word, type: string, gameAllGuessWord: number, gameMistake: number): Promise<HTMLDivElement> {
  const cardWord = <HTMLDivElement>createEl('div', undefined, ['cardWord', `group-${wordValue.group + 1}`], { id: `cardWord-${wordValue.id}` });
  const multimedia = <HTMLDivElement>createEl('div', cardWord, ['multimediaBlock']);
  const imgBlock = <HTMLDivElement>createEl('div', multimedia, ['imgBlock']);
  createEl('img', imgBlock, ['imgWord'], { id: `imgWord-${wordValue.id}`, src: `${urlLink}${wordValue.image}` });
  const buttonAdd = <HTMLDivElement>createEl('div', multimedia, ['buttonAdd']);
  const audioImg: SVGSVGElement = createButtonAudio(wordValue);
  buttonAdd.append(audioImg);
  const user: User = getLocalStorage('userDataBasic');
  if (user.userId) {
    const imgLearn = <SVGSVGElement>document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    imgLearn.classList.add('imgLearn');
    imgLearn.innerHTML = '<use xlink:href="./assets/img/checkmark.svg#check"></use>';
    buttonAdd.append(imgLearn);
    imgLearn.addEventListener('click', async () => {
      await updateLearnWord(wordValue, cardWord, user);
      const currentPage = Number(getStorage('currentPage', '0'));
      await updateButtonPagination(currentPage);
    });
    const imgHard = <SVGSVGElement>document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    imgHard.classList.add('imgHard');
    imgHard.innerHTML = '<use xlink:href="./assets/img/kettlebell.svg#kettlebell"></use>';
    imgHard.addEventListener('click', async () => {
      await updateHardWord(wordValue, cardWord, user);
      const currentPage = Number(getStorage('currentPage', '0'));
      await updateButtonPagination(currentPage);
    });
    buttonAdd.append(imgHard);
    if (type === 'learned') {
      cardWord.classList.add('cardLearned');
    }
    if (type === 'hard') {
      cardWord.classList.add('cardHard');
    }
  }
  const word = <HTMLDivElement>createEl('div', cardWord, ['word']);
  const wordBlock = <HTMLDivElement>createEl('div', word, ['wordBlock']);
  const wordLang = createEl('h3', wordBlock, ['h3']);
  if (user.userId && (gameAllGuessWord || gameMistake)) {
    const wordGame = <HTMLDivElement>createEl('div', wordBlock, ['wordGameImg']);
    const imgGuessed = <HTMLDivElement>createEl('div', wordGame, ['wordGameImgGuessed']);
    const wordGameGuessed = <SVGSVGElement>document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wordGameGuessed.classList.add('imgWordGame');
    wordGameGuessed.innerHTML = '<use xlink:href="./assets/img/guessed.svg#guessed"></use>';
    imgGuessed.append(wordGameGuessed);
    const countGuessed = <HTMLSpanElement>createEl('span', imgGuessed, ['wordBlockCount']);
    countGuessed.innerHTML = String(gameAllGuessWord);
    const imgMistake = <HTMLDivElement>createEl('div', wordGame, ['wordGameImgGuessed']);
    const wordGameMistake = <SVGSVGElement>document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wordGameMistake.classList.add('imgWordGame');
    wordGameMistake.innerHTML = '<use xlink:href="./assets/img/mistake.svg#mistake"></use>';
    imgMistake.append(wordGameMistake);
    const countMistake = <HTMLSpanElement>createEl('span', imgMistake, ['wordGameImgGuessed']);
    countMistake.innerHTML = String(gameMistake);
  }
  wordLang.innerHTML = `${wordValue.word} (${wordValue.wordTranslate})`;
  const wordTranscript = createEl('h4', word, ['h4']);
  wordTranscript.innerHTML = `${wordValue.transcription}`;
  const textMeaning = createEl('p', word, ['p']);
  textMeaning.innerHTML = `${wordValue.textMeaning}`;
  const textMeaningTranslate = createEl('p', word, ['p']);
  textMeaningTranslate.innerHTML = `${wordValue.textMeaningTranslate}`;
  const textExample = createEl('p', word, ['p']);
  textExample.innerHTML = `${wordValue.textExample}`;
  const textExampleTranslate = createEl('p', word, ['p']);
  textExampleTranslate.innerHTML = `${wordValue.textExampleTranslate}`;
  return cardWord;
}

export async function renderCardsNoAutorizedUser(currentGroup: string, currentPage: string, wrapperPageTextbook: HTMLDivElement): Promise<void> {
  let cardWord: HTMLDivElement;
  const listWords: Word[] = await getListWords(+currentGroup, +currentPage);
  listWords.forEach(async (item) => {
    cardWord = await renderCardWord(item, '', 0, 0);
    wrapperPageTextbook.append(cardWord);
  });
}

export async function renderCardsAutorizedUser(currentGroup: string, currentPage: string, wrapperPageTextbook: HTMLDivElement): Promise<void> {
  let cardWord: HTMLDivElement;
  let listWord: Array<WordAggregated>;
  const user: User = getLocalStorage('userDataBasic');
  try {
    if (Number(currentGroup) < COUNT_GROUP) listWord = await getAggregateWordsUser(user, +currentGroup, +currentPage);
    else listWord = await getListHardWord(user);
  } catch {
    setStorage('userDataBasic', '{}');
    const buttonGroup = <HTMLElement>document.querySelector('#group-7');

    buttonGroup.classList.add('display-none');
    const gameLinks = <HTMLElement>document.querySelector('.game__links');
    gameLinks.classList.add('display-none');
    renderCardsNoAutorizedUser(currentGroup, currentPage, wrapperPageTextbook);
    return;
  }
  listWord.forEach(async (item) => {
    const word: Word = {
      // eslint-disable-next-line no-underscore-dangle
      id: item._id,
      group: item.group,
      page: item.page,
      word: item.word,
      image: item.image,
      audio: item.audio,
      audioMeaning: item.audioMeaning,
      audioExample: item.audioExample,
      textMeaning: item.textMeaning,
      textExample: item.textExample,
      transcription: item.transcription,
      wordTranslate: item.wordTranslate,
      textMeaningTranslate: item.textMeaningTranslate,
      textExampleTranslate: item.textExampleTranslate,
    };
    let type = '';
    if (item.userWord) {
      if (item.userWord.difficulty === 'hard') type = 'hard';
      else if (item.userWord.difficulty === 'easy' && item.userWord.optional.statusLearn === 'true') {
        type = 'learned';
      }
    }
    const gameAllGuessWord: number = item.userWord?.optional.gameAllGuessWord ? item.userWord?.optional.gameAllGuessWord : 0;
    const gameMistake: number = item.userWord?.optional.gameMistake ? item.userWord?.optional.gameMistake : 0;
    cardWord = await renderCardWord(word, type, gameAllGuessWord, gameMistake);
    if (item.userWord) {
      cardWord.setAttribute('data-wordUser', 'true');
      if (item.userWord.difficulty === 'hard') {
        cardWord.setAttribute('data-WordHard', 'true');
      } else if (item.userWord.difficulty === 'easy' && item.userWord.optional.statusLearn === 'true') {
        cardWord.setAttribute('data-WordLearned', 'true');
      }
    }
    wrapperPageTextbook.append(cardWord);
  });
  const numberGroup = getLocalStorage(PageKey.numGroup);
  if (numberGroup === '6') {
    const mainWrap = <HTMLElement>main.querySelector('#wrapper-page-textbook');
    const textGroupHard = <HTMLElement>createEl('h1', mainWrap, ['title__group']);
    textGroupHard.innerHTML = 'Сложные слова / Hard words';
  }
}
