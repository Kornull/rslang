import { urlLink } from '../../Templates/serve';
import { getLocalStorage,setLocalStorage } from './storage/storage-set-kornull';
import { Key,Word } from './type';

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
  let words: Word[] = getLocalStorage('allListWords');
  console.log('words', words);
  const groupWords: Key = {
    key: 'group',
    value: num,
  };
  const pageWords: Key = {
    key: 'page',
    value: numberPage,
  };
  const queryStr: string = randomGroupWords([pageWords, groupWords]);
  words = words.concat(await getTheWords(queryStr))
  console.log('Words', words);
  setLocalStorage('allListWords', words);
};

export function createAllListWords(numberGroup: number, numberUserPage?: number) {
  setLocalStorage('allListWords', []);
  let numberPage = Math.floor(Math.random() * CountPages.pages);
  if (numberUserPage) numberPage = numberUserPage;
  if (numberPage >= 5) {
    for (let i = numberPage - 5; i < numberPage; i++) {
      createListWords(numberGroup,i);
      console.log(i);
    }
  }
  if (numberPage < 5) {
    for (let i = numberPage + 5; i > numberPage; i--) {
      createListWords(numberGroup,i);
      console.log(i);
    }
  }
}
