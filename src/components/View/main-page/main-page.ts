import './_main-page.scss';
import { Count, IdBlocks } from './type';
import { createEl } from '../../Controller/createTagBlock';
import { main } from '../../Templates/main-block';
import { TextForTheBlock } from './main-page.utils';

function createMainPageList() {
  const aboutApp = <HTMLElement>createEl('div', main, ['main__page-about']);
  const mainList = <HTMLElement>createEl('ul', aboutApp, ['main__list']);
  for (let i = Count.Zero; i < Count.Max; i++) {
    const li = <HTMLElement>createEl('li', mainList, ['main__list-description']);
    const liText = <HTMLElement>createEl('div', li, ['list__text']);
    TextForTheBlock(liText, i);
    const listImgBlock = <HTMLImageElement>createEl('img', li, ['list__image']);
    listImgBlock.src = `./assets/img/${i}.png`;
  }
  return aboutApp;
}

function createMainPage() {
  const mainPage = <HTMLElement>createEl('div', main, ['main__page']);
  const mainPageAbout = <HTMLElement>createEl('div', mainPage, ['main__page-greetings']);
  const mainPageTitle = <HTMLElement>createEl('h1', mainPageAbout, ['main__page-title']);

  const mainPageDescription = <HTMLElement>createEl('div', mainPageAbout, ['main__page-description']);
  const mainPageSubtitle = <HTMLElement>createEl('h2', mainPageAbout, ['main__page-subtitle']);
  TextForTheBlock(mainPageTitle, IdBlocks.TitleMain);
  TextForTheBlock(mainPageSubtitle, IdBlocks.SubTitle);
  TextForTheBlock(mainPageDescription, IdBlocks.Description);
  mainPage.appendChild(createMainPageList());
  return mainPage;
}

export default createMainPage;