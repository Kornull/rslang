import { urlLink } from '../../Templates/serve';
import { LocalKeys, UserStat } from '../../Types/types';
import { getLocalStorage, setLocalStorage } from './storage/storage-set-kornull';
import { Key, Word } from './type';

type ExtraWordOption = {
  difficulty: string;
  optional: {
    gameGuessed: number;
    gameMistake: number;
    statusLearn: string;
    data?: string;
  };
};

const extraOptionUserWord: ExtraWordOption = {
  difficulty: 'easy',
  optional: {
    gameGuessed: 1,
    gameMistake: 0,
    statusLearn: 'false',
  },
};
//
let arr: Word[][] = [];
const date = new Date();

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

async function userWords(wordId: string, params: object): Promise<void> {
  const user: UserStat = getLocalStorage(LocalKeys.UserData);

  await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

const setUserWords = async (wordId: string, wordOption: object) => {
  const user: UserStat = getLocalStorage(LocalKeys.UserData);

  await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordOption),
  });
};

const statusTrue = async (wordOption: ExtraWordOption, wordId: string) => {
  wordOption.optional.gameGuessed += 1;
  wordOption.optional.data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  if (wordOption.difficulty === 'easy' && wordOption.optional.gameGuessed >= 3) wordOption.optional.statusLearn = 'true';
  if (wordOption.difficulty === 'hard' && wordOption.optional.gameGuessed >= 5) wordOption.optional.statusLearn = 'true';
  setUserWords(wordId, { optional: wordOption.optional });
};

const statusFalse = async (wordOption: ExtraWordOption, wordId: string) => {
  wordOption.optional.gameMistake += 1;
  wordOption.optional.data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  if (wordOption.optional.statusLearn === 'true') {
    wordOption.optional.statusLearn = 'false';
    wordOption.optional.gameGuessed = 0;
  }
  setUserWords(wordId, { optional: wordOption.optional });
};

export const getUserWord = async (wordId: string, status: boolean) => {
  const user: UserStat = getLocalStorage(LocalKeys.UserData);
  const responce = await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  const wordOption: ExtraWordOption = await responce.json();
  if (responce.status === 404) {
    if (status) {
      extraOptionUserWord.optional.gameGuessed = 1;
      extraOptionUserWord.optional.gameMistake = 0;
      extraOptionUserWord.optional.data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    } else {
      extraOptionUserWord.optional.gameGuessed = 0;
      extraOptionUserWord.optional.gameMistake = 1;
      extraOptionUserWord.optional.data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    userWords(wordId, extraOptionUserWord);
  } else if (status) {
    statusTrue(wordOption, wordId);
  } else {
    statusFalse(wordOption, wordId);
  }
};
