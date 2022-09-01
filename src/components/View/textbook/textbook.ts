import { createEl } from '../create_element';
import { getLocalStorage, getStorage, setStorage } from '../../Controller/storage';
import './_textbook.scss';
import User from '../../Controller/authorization/user';
// eslint-disable-next-line import/no-cycle
import { renderCardsAutorizedUser } from './cardWord';

export const COUNT_GROUP = 6;
const COUNT_PAGE_GROUP = 30;
export const USER: User = getLocalStorage('userDataBasic');

export function isAutorized() {
  if (!USER.userId) return false;
  return true;
}

export async function renderPageTextbook() {
  const currentGroup: string = getStorage('currentGroup', '0');
  const currentPage: string = getStorage('currentPage', '0');
  const user: User = getLocalStorage('userDataBasic');
  const wrapperPageTextbook = <HTMLDivElement>createEl('div', undefined, ['wrapper-page-textbook'], { id: 'wrapper-page-textbook' });
  if (user.userId) {
    renderCardsAutorizedUser(currentGroup, currentPage, wrapperPageTextbook);
  } else {
    renderCardsAutorizedUser(currentGroup, currentPage, wrapperPageTextbook);
  }
  return wrapperPageTextbook;
}

export async function drawPageTextbook() {
  const pageTextbook = <HTMLElement>document.querySelector('#page-textbook');
  const wrapperPageTextbook = await renderPageTextbook();
  pageTextbook.innerHTML = '';
  pageTextbook.append(wrapperPageTextbook);
  const currentGroup: string = getStorage('currentGroup', '0');
  const pagination = <HTMLElement>document.querySelector('#nav-textbook');
  if (Number(currentGroup) === COUNT_GROUP) {
    pagination.classList.add('display-none');
  } else pagination.classList.remove('display-none');
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

function updateButtonPagination(currentPage: number) {
  const first = <HTMLButtonElement>document.querySelector('#first');
  const prev = <HTMLButtonElement>document.querySelector('#prev');
  const next = <HTMLButtonElement>document.querySelector('#next');
  const last = <HTMLButtonElement>document.querySelector('#last');
  enabledButton(next);
  enabledButton(last);
  enabledButton(first);
  enabledButton(prev);
  if (currentPage <= 0) {
    disabledButton(first);
    disabledButton(prev);
  }
  if (currentPage + 1 >= COUNT_PAGE_GROUP) {
    disabledButton(next);
    disabledButton(last);
  }
  const pageNumber = <HTMLButtonElement>document.querySelector('#pageNumber');
  pageNumber.innerText = String(currentPage + 1);
}

function createPrevPage(e: Event) {
  const currentButton: string = (e.currentTarget as HTMLButtonElement).id;
  const currentPage: number = currentButton === 'prev' ? +getStorage('currentPage', '0') - 1 : 0;
  setStorage('currentPage', String(currentPage));
  drawPageTextbook();
  updateButtonPagination(currentPage);
}

function createNextPage(e: Event) {
  const currentButton: string = (e.currentTarget as HTMLButtonElement).id;
  const currentPage: number = currentButton === 'next' ? +getStorage('currentPage', '0') + 1 : COUNT_PAGE_GROUP - 1;
  setStorage('currentPage', String(currentPage));
  drawPageTextbook();
  updateButtonPagination(currentPage);
}

export function renderPaginationButton() {
  const pageNumber: number = +getStorage('currentPage', '0') + 1;
  const paginationTextbook = <HTMLDivElement>createEl('div', undefined, ['nav-textbook'], { id: 'nav-textbook' });
  const prevAll = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button'], { id: 'first', disabled: 'true' });
  prevAll.innerText = '<<';
  const prev = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button'], { id: 'prev', disabled: 'true' });
  prev.innerText = '<';
  const currentPage = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button'], { id: 'pageNumber' });
  currentPage.innerText = String(pageNumber);
  const next = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button', 'nav-button_enabled'], { id: 'next' });
  next.innerText = '>';
  const nextAll = <HTMLButtonElement>createEl('button', paginationTextbook, ['nav-button', 'nav-button_enabled'], { id: 'last' });
  nextAll.innerText = '>>';
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
  const groupLinkBlock = <HTMLDivElement>createEl('div', linkGroup, ['group__buttons']);
  const countGroup = USER.userId ? COUNT_GROUP + 1 : COUNT_GROUP;
  for (let i = 1; i <= countGroup; i++) {
    const currentLinkGroup = <HTMLButtonElement>createEl('button', groupLinkBlock, ['group__link', `group-${i}`], { id: `group-${i}` });
    currentLinkGroup.innerText = String(i);
    currentLinkGroup.addEventListener('click', () => {
      const currentPage = 0;
      setStorage('currentGroup', String(i - 1));
      setStorage('currentPage', String(currentPage));
      updateButtonPagination(currentPage);
      drawPageTextbook();
    });
  }
  if (USER.userId) {
    const gameLink = <HTMLDivElement>createEl('div', linkGroup, ['game__links']);
    const sprint = <HTMLDivElement>createEl('div', gameLink, ['game__links-sprint', 'game__link'], { id: 'sprint-page' });
    const audioGame = <HTMLDivElement>createEl('div', gameLink, ['game__links-audio', 'game__link'], { id: 'audiogame-page' });
    sprint.innerHTML = 'Sprint';
    audioGame.innerHTML = 'Audio-game';
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
  const pageNumber: number = +getStorage('currentPage', '0');
  updateButtonPagination(pageNumber);
  drawPageTextbook();
}
