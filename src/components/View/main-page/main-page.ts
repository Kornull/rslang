import './_main-page.scss';
import { Count, IdBlocks } from './type';
import { createEl } from '../../Controller/createTagBlock';
import { main } from '../../Templates/main-block';
import { TextForTheBlock, TextForTheBlockTeam } from './main-page.utils';

function createMainPageList(): HTMLElement {
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

function createTeamList() {
  const aboutApp = <HTMLElement>createEl('div', main, ['main__page-team']);

  const mainList = <HTMLElement>createEl('ul', aboutApp, ['main__list--team']);
  for (let i = Count.Zero; i < Count.Max - 1; i++) {
    const li = <HTMLElement>createEl('li', mainList, ['main__list-team']);
    const liText = <HTMLElement>createEl('div', li, ['list__text-team']);
    TextForTheBlockTeam(liText, i);
    const listImage = <HTMLElement>createEl('div', li, ['list__image-team']);
    const listImgBlock = <HTMLImageElement>createEl('img', listImage, ['list__images-team']);
    listImgBlock.src = `./assets/img/team-${i}.jpg`;
  }
  return aboutApp;
}

function createMainPage(): HTMLElement {
  const mainPage = <HTMLElement>createEl('div', main, ['main__page'], { id: 'main-page' });
  const mainPageAbout = <HTMLElement>createEl('div', mainPage, ['main__page-greetings']);
  const mainPageTitle = <HTMLElement>createEl('h1', mainPageAbout, ['main__page-title']);

  const mainPageDescription = <HTMLElement>createEl('div', mainPageAbout, ['main__page-description']);
  const mainPageSubtitle = <HTMLElement>createEl('h2', mainPageAbout, ['main__page-subtitle']);
  TextForTheBlock(mainPageTitle, IdBlocks.TitleMain);
  TextForTheBlock(mainPageSubtitle, IdBlocks.SubTitle);
  TextForTheBlock(mainPageDescription, IdBlocks.Description);
  mainPage.appendChild(createMainPageList());
  const titleTeam = <HTMLElement>createEl('h2', mainPage, ['main__list-title-team'], { id: 'title-team' });
  titleTeam.innerHTML = 'О команде';
  mainPage.appendChild(createTeamList());
  return mainPage;
}

export default createMainPage;
