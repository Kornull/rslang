import { getAggregatedWords, getListWords } from '../../Controller/textbook/textbook_controller';
import { urlLink } from '../../Templates/serve';
import { Word } from '../../Types/word';
import { createEl } from '../create_element';
import { getStorage, setStorage } from '../../Controller/storage';
import './_textbook.scss';
import User from '../../Controller/authorization/user';

const COUNT_GROUP = 6;
const COUNT_PAGE_GROUP = 30;

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

// function addWordLearned(userId: string, wordId: string) {
//   addWordUser(userId, wordId, { difficulty: 'hard' });
// }

function renderCardWord(wordValue: Word, autorized: boolean): HTMLDivElement {
  const cardWord = <HTMLDivElement>createEl('div', undefined, ['cardWord', `group-${wordValue.group + 1}`], { id: `cardWord-${wordValue.id}` });
  const multimedia = <HTMLDivElement>createEl('div', cardWord, ['multimediaBlock']);
  const imgBlock = <HTMLDivElement>createEl('div', multimedia, ['imgBlock']);
  createEl('img', imgBlock, ['imgWord'], { id: `imgWord-${wordValue.id}`, src: `${urlLink}${wordValue.image}` });
  const buttonAdd = <HTMLDivElement>createEl('div', multimedia, ['buttonAdd']);
  const audioImg: SVGSVGElement = createButtonAudio(wordValue);
  buttonAdd.append(audioImg);
  if (autorized) {
    const imgLearn = <SVGSVGElement>document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    imgLearn.classList.add('imgLearn');
    imgLearn.innerHTML = '<use xlink:href="./assets/img/checkmark.svg#check"></use>';
    buttonAdd.append(imgLearn);
    imgLearn.addEventListener('click', () => {
      // const wordVal: WordValue = {
      //   difficulty: 'easy',
      //   optional: {
      //     statuslearn: 'true',
      //   },
      // };
      // const user: User = JSON.parse(getStorage('userDataBasic', ''));
      // addWordUser(user, wordValue.id, wordVal);
    });
    const imgHard = <SVGSVGElement>document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    imgHard.classList.add('imgHard');
    imgHard.innerHTML = '<use xlink:href="./assets/img/kettlebell.svg#kettlebell"></use>';
    buttonAdd.append(imgHard);
  }
  const word = <HTMLDivElement>createEl('div', cardWord, ['word']);
  const wordLang = createEl('h3', word, ['h3']);
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

export async function renderPageTextbook() {
  const currentGroup: string = getStorage('currentGroup', '0');
  const currentPage: string = getStorage('currentPage', '0');
  // console.log(getStorage('userDataBasic ', ''));
  let listWords: Word[];
  let autorized: boolean;
  try {
    const user: User = JSON.parse(getStorage('userDataBasic', ''));
    listWords = await getAggregatedWords(+currentGroup, +currentPage, user);
    autorized = true;
  } catch {
    listWords = await getListWords(+currentGroup, +currentPage);
    autorized = false;
  }
  const wrapperPageTextbook = <HTMLDivElement>createEl('div', undefined, ['wrapper-page-textbook'], { id: 'wrapper-page-textbook' });
  listWords.forEach((item) => {
    const cardWord = renderCardWord(item, autorized);
    wrapperPageTextbook.append(cardWord);
  });
  return wrapperPageTextbook;
}

export async function drawPageTextbook() {
  const pageTextbook = <HTMLElement>document.querySelector('#page-textbook');
  const wrapperPageTextbook = await renderPageTextbook();
  pageTextbook.innerHTML = '';
  pageTextbook.append(wrapperPageTextbook);
}

function disabledButton(currentButton: HTMLButtonElement) {
  const button = currentButton;
  button.disabled = true;
  button.classList.add('nav-button_disabled');
  button.classList.remove('nav-button_enabled');
}

function enabledButton(currentButton: HTMLButtonElement) {
  const button = currentButton;
  button.disabled = false;
  button.classList.remove('nav-button_disabled');
  button.classList.add('nav-button_enabled');
}

function createPrevPage(e: Event) {
  const currentButton: string = (e.currentTarget as HTMLButtonElement).id;
  const currentPage: number = currentButton === 'prev' ? +getStorage('currentPage', '0') - 1 : 0;
  setStorage('currentPage', String(currentPage));
  drawPageTextbook();
  if (currentPage <= 0) {
    const first = <HTMLButtonElement>document.querySelector('#first');
    const prev = <HTMLButtonElement>document.querySelector('#prev');
    disabledButton(first);
    disabledButton(prev);
  }
  const next = <HTMLButtonElement>document.querySelector('#next');
  const last = <HTMLButtonElement>document.querySelector('#last');
  enabledButton(next);
  enabledButton(last);
  const pageNumber = <HTMLButtonElement>document.querySelector('#pageNumber');
  pageNumber.innerText = String(currentPage + 1);
}

function createNextPage(e: Event) {
  const currentButton: string = (e.currentTarget as HTMLButtonElement).id;
  const currentPage: number = currentButton === 'next' ? +getStorage('currentPage', '0') + 1 : COUNT_PAGE_GROUP - 1;
  setStorage('currentPage', String(currentPage));
  drawPageTextbook();
  if (currentPage + 1 >= COUNT_PAGE_GROUP) {
    const next = <HTMLButtonElement>document.querySelector('#next');
    const last = <HTMLButtonElement>document.querySelector('#last');
    disabledButton(next);
    disabledButton(last);
  }
  const first = <HTMLButtonElement>document.querySelector('#first');
  const prev = <HTMLButtonElement>document.querySelector('#prev');
  enabledButton(first);
  enabledButton(prev);
  const pageNumber = <HTMLButtonElement>document.querySelector('#pageNumber');
  pageNumber.innerText = String(currentPage + 1);
}

export function renderPaginationButton() {
  const pageNumber: number = +getStorage('currentPage', '0') + 1;
  const paginationTextbook = <HTMLDivElement>createEl('div', undefined, ['nav-textbook'], { id: 'nav-textbook' });
  const prevAll = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button'], { id: 'first', disabled: 'true' });
  prevAll.innerText = '<<';
  const prev = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button'], { id: 'prev', disabled: 'true' });
  prev.innerText = '<';
  if (pageNumber <= 1) {
    disabledButton(prevAll);
    disabledButton(prev);
  } else {
    enabledButton(prev);
    enabledButton(prevAll);
    prev.classList.add('nav-button_enabled');
  }
  const currentPage = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button'], { id: 'pageNumber' });
  currentPage.innerText = String(pageNumber);
  const next = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button', 'nav-button_enabled'], { id: 'next' });
  next.innerText = '>';
  const nextAll = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button', 'nav-button_enabled'], { id: 'last' });
  nextAll.innerText = '>>';
  if (pageNumber >= COUNT_PAGE_GROUP) {
    disabledButton(next);
    disabledButton(nextAll);
  } else {
    enabledButton(next);
    enabledButton(nextAll);
  }
  prevAll.addEventListener('click', createPrevPage);
  prev.addEventListener('click', createPrevPage);
  next.addEventListener('click', createNextPage);
  nextAll.addEventListener('click', createNextPage);
  return paginationTextbook;
}

function createMainTextbook() {
  const mainTextbook = <HTMLDivElement>createEl('div', undefined, ['main-textbook'], { id: 'main-textbook' });
  const paginationTextbook = renderPaginationButton();
  mainTextbook.append(paginationTextbook);
  createEl('div', mainTextbook, ['page-textbook'], { id: 'page-textbook' });
  return mainTextbook;
}

function renderLinkGroup(): HTMLDivElement {
  const linkGroup = <HTMLDivElement>createEl('div', undefined, ['group']);
  for (let i = 1; i <= COUNT_GROUP; i++) {
    const currentLinkGroup = <HTMLButtonElement>createEl('button', linkGroup, ['group__link', `group-${i}`], { id: `group-${i}` });
    currentLinkGroup.innerText = String(i);
    currentLinkGroup.addEventListener('click', () => {
      setStorage('currentGroup', String(i - 1));
      drawPageTextbook();
    });
  }
  return linkGroup;
}

export function renderPage() {
  const page = <HTMLDivElement>createEl('div', undefined, ['textbook'], { id: 'textbook' });
  const linkGroup: HTMLDivElement = renderLinkGroup();
  const mainTextbook = createMainTextbook();
  page.append(linkGroup);
  page.append(mainTextbook);
  return page;
}

export function createPage(): void {
  const main = <HTMLElement>document.querySelector('#main');
  const page: HTMLElement = renderPage();
  main.append(page);
  drawPageTextbook();
}
