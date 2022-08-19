// eslint-disable-next-line import/no-cycle
import { getListWords } from '../Controller/textbook_controller';
import { urlLink } from '../Templates/serve';
import { Word } from '../Types/word';
import { createEl } from './create_element';

const COUNT_GROUP = 6;
const COUNT_WORD_PAGE = 20;

function renderLinkGroup(): HTMLDivElement {
  const linkGroup = <HTMLDivElement>createEl('div', undefined, ['group']);
  for (let i = 1; i <= COUNT_GROUP; i++) {
    const currentLinkGroup = <HTMLDivElement>createEl('div', linkGroup, ['group__link', `group-${i}`], { id: `group-${i}` });
    currentLinkGroup.innerText = String(i);
  }
  return linkGroup;
}

function renderCardWord(wordValue: Word): HTMLDivElement {
  const cardWord = <HTMLDivElement>createEl('div', undefined, ['cardWord', `group-${wordValue.group + 1}`], { id: `cardWord-${wordValue.id}` });
  const multimedia = <HTMLDivElement>createEl('div', cardWord);
  const imgBlock = <HTMLDivElement>createEl('div', multimedia, ['imgBlock']);
  createEl('img', imgBlock, ['imgWord'], { id: `imgWord-${wordValue.id}`, src: `${urlLink}${wordValue.image}` });
  const audio = <HTMLDivElement>createEl('div', multimedia);
  audio.innerHTML = `<svg class="imgAudio">
    <use xlink:href="./assets/img/audio2.svg#audio"></use>
  </svg>`;
  audio.addEventListener('click', () => {
    const audioObj = new Audio(); // Создаём новый элемент Audio
    audioObj.src = `${urlLink}${wordValue.audio}`; // Указываем путь к звуку "клика"
    audioObj.autoplay = true; // Автоматически запускаем
  });
  const text = <HTMLDivElement>createEl('div', cardWord, ['text']);
  const wordLang = createEl('h3', text, ['h3']);
  wordLang.innerHTML = `${wordValue.word}`;
  const wordTranscript = createEl('h4', text, ['h4']);
  wordTranscript.innerHTML = `${wordValue.transcription}`;
  const wordTranslate = createEl('h3', text, ['h3']);
  wordTranslate.innerHTML = `${wordValue.wordTranslate}`;
  const textMeaning = createEl('p', text, ['p']);
  textMeaning.innerHTML = `${wordValue.textMeaning}`;
  const textMeaningTranslate = createEl('p', text, ['p']);
  textMeaningTranslate.innerHTML = `${wordValue.textMeaningTranslate}`;
  const textExample = createEl('p', text, ['p']);
  textExample.innerHTML = `${wordValue.textExample}`;
  const textExampleTranslate = createEl('p', text, ['p']);
  textExampleTranslate.innerHTML = `${wordValue.textExampleTranslate}`;
  return cardWord;
}

export async function renderPageTextbook() {
  const listWords: Word[] = await getListWords(0, 0);
  const wrapperPageTextbook = <HTMLDivElement>createEl('div', undefined, ['wrapper-page-textbook'], { id: 'wrapper-page-textbook' });
  for (let i = 0; i < COUNT_WORD_PAGE; i++) {
    const cardWord = renderCardWord(listWords[i]);
    wrapperPageTextbook.append(cardWord);
  }
  return wrapperPageTextbook;
}

export function renderNavigationPage() {
  const navigationTextbook = <HTMLDivElement>createEl('div', undefined, ['nav-textbook'], { id: 'nav-textbook' });
  const prevAll = <HTMLDivElement>createEl('div', navigationTextbook, ['nav-button'], { id: 'prevAll' });
  prevAll.innerHTML = '<<';
  const prev = <HTMLDivElement>createEl('div', navigationTextbook, ['nav-button'], { id: 'prev' });
  prev.innerHTML = '<';
  const currentPage = <HTMLDivElement>createEl('div', navigationTextbook, ['nav-button'], { id: 'pageNumber' });
  currentPage.innerHTML = '1';
  const next = <HTMLDivElement>createEl('div', navigationTextbook, ['nav-button'], { id: 'next' });
  next.innerHTML = '>';
  const nextAll = <HTMLDivElement>createEl('div', navigationTextbook, ['nav-button'], { id: 'nextAll' });
  nextAll.innerHTML = '>>';
  return navigationTextbook;
}

function createMainTextbook() {
  const mainTextbook = <HTMLDivElement>createEl('div', undefined, ['main-textbook'], { id: 'main-textbook' });
  const navigationTextbook = renderNavigationPage();
  mainTextbook.append(navigationTextbook);
  createEl('div', mainTextbook, ['page-textbook'], { id: 'page-textbook' });
  return mainTextbook;
}

export function renderPage() {
  const page = <HTMLDivElement>createEl('div', undefined, ['textbook'], { id: 'textbook' });
  const linkGroup: HTMLDivElement = renderLinkGroup();
  const mainTextbook = createMainTextbook();
  page.append(linkGroup);
  page.append(mainTextbook);
  return page;
}
