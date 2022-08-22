import { urlLink } from '../../Templates/serve';
import { Key, Word } from './type';

enum CountPages {
  pages = 30,
}

const randomGroupWords = (queryS: Key[] = []): string => {
  if (queryS.length) {
    return `?${queryS.map((x: Key) => `${x.key}=${x.value}`).join('&')}`;
  }
  return '';
};

async function getTheWords(request: string) {
  const words = await fetch(`${urlLink}words/${request}`);
  const res = await words.json();
  return res;
}

export const createListWords = async (num: number): Promise<Word[]> => {
  const numberPage = Math.floor(Math.random() * CountPages.pages);
  const groupWords: Key = {
    key: 'group',
    value: num,
  };
  const pageWords: Key = {
    key: 'page',
    value: numberPage,
  };
  const queryStr: string = randomGroupWords([pageWords, groupWords]);
  return getTheWords(queryStr);
};
