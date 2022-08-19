import { words } from '../Templates/serve';
import { Word } from '../Types/word';
// eslint-disable-next-line import/no-cycle
import { renderPageTextbook, renderPage } from '../View/textbook';

export async function getWords(group: number, page: number) {
  return (await fetch(`${words}?group=${group}&page=${page}`)).json();
}

export async function getListWords(group: number, page: number) {
  const listWords: Word[] = await getWords(group, page);
  return listWords;
}

export async function createPage(): Promise<void> {
  const main = <HTMLElement>document.querySelector('#main');
  const page: HTMLElement = renderPage();
  main.append(page);
  const pageTextbook = <HTMLElement>document.querySelector('#page-textbook');
  const wrapperPageTextbook = await renderPageTextbook();
  pageTextbook.append(wrapperPageTextbook);
}
