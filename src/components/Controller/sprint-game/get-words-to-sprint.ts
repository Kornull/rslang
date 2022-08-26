import { urlLink } from '../../Templates/serve';
import { setLocalStorage } from './storage/storage-set-kornull';
import { Key, Word } from './type';

let arr: Word[][] = [];

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
  const res: Word[] = await words.json();
  return res;
}

export const createListWords = async (num: number, numberPage: number): Promise<void> => {
  const groupWords: Key = {
    key: 'group',
    value: num,
  };
  const pageWords: Key = {
    key: 'page',
    value: numberPage,
  };
  const queryStr: string = randomGroupWords([pageWords, groupWords]);
  const a = await getTheWords(queryStr);
  arr.push(a);
  const arr2: Word[] = arr.flat();
  setLocalStorage('allListWords', arr2);
};

export async function createAllListWords(numberGroup: number, numberUserPage?: number) {
  setLocalStorage('allListWords', []);
  arr = [];
  let numberPage = Math.floor(Math.random() * CountPages.pages);
  if (numberUserPage) numberPage = numberUserPage;
  if (numberPage >= 5) {
    for (let i = numberPage - 5; i < numberPage; i++) {
      createListWords(numberGroup, i);
    }
  }
  if (numberPage < 5) {
    for (let i = numberPage + 5; i > numberPage; i--) {
      createListWords(numberGroup, i);
    }
  }
}
