import { urlLink } from '../../Templates/serve';
// eslint-disable-next-line object-curly-newline
import { ExtraWordOption, LocalKeys, StatisticsUserWords, UserStat } from '../../Types/types';
import { getLocalStorage, setLocalStorage } from '../sprint-game/storage/storage-set-kornull';
import { Key, Word } from '../sprint-game/type';
import { appUser } from '../../App/App';
import { NumberOf } from './types';

let wordsArr: Word[][] = [];
const user: UserStat = getLocalStorage(LocalKeys.UserData);

const statisticsUserWords: StatisticsUserWords = {
  learnedWords: 1,
  optional: {
    sprintDayGuess: 1,
    sprintAllDayWords: 1,
    sprintMaxGuessed: 1,
    'data-0': {},
    'data-1': {},
    'data-2': {},
    'data-3': {},
    'data-4': {},
    'data-5': {},
    'data-6': {},
  },
};

async function getTheWords(request: string) {
  const words = await fetch(`${urlLink}words/${request}`);
  console.log('response status - ', words.status);
  if (words.status === 401) {
    await appUser.getNewTokens();
    getTheWords(request);
  }
  const res: Word[] = await words.json();
  return res;
}

const randomGroupWords = (queryS: Key[] = []): string => {
  if (queryS.length) {
    return `?${queryS.map((x: Key) => `${x.key}=${x.value}`).join('&')}`;
  }
  return '';
};

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
  wordsArr.push(a);
  const wordsArrCopy: Word[] = wordsArr.flat();
  setLocalStorage('allListWords', wordsArrCopy);
};

export async function createAllListWords(numberGroup: number, numberUserPage?: number) {
  setLocalStorage('allListWords', []);
  wordsArr = [];
  let numberPage = Math.floor(Math.random() * NumberOf.pagesInGroup);
  if (numberUserPage) numberPage = numberUserPage;
  if (numberPage >= 5) {
    for (let i = numberPage - 5; i < numberPage; i++) {
      createListWords(numberGroup, i);
    }
  } else if (numberPage < 5 && numberPage > 0) {
    for (let i = numberPage - numberPage; i < numberPage; i++) {
      createListWords(numberGroup, i);
    }
  } else {
    createListWords(numberGroup, numberPage);
  }
}

//--------------------------------------------------------------------------------------------------

const setLearnedUserWords = async (statisticsUser: StatisticsUserWords) => {
  await fetch(`${urlLink}users/${user.userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statisticsUser),
  });
};

export const getGuessSprintWords = async (boolean: boolean, lengthGuess: number) => {
  const responce = await fetch(`${urlLink}users/${user.userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  if (responce.status === 404) {
    statisticsUserWords.optional.sprintDayGuess = 1;
    setLearnedUserWords(statisticsUserWords);
  } else {
    const res: StatisticsUserWords = await responce.json();
    res.learnedWords = 1;
    if (!res.optional.sprintDayGuess && !res.optional.sprintAllDayWords && !res.optional.sprintMaxGuessed) {
      res.optional.sprintDayGuess = 1;
      res.optional.sprintAllDayWords = 1;
      res.optional.sprintMaxGuessed = 1;
    }
    let numberStatAll = Number(res.optional.sprintAllDayWords);
    let numberStatDay = Number(res.optional.sprintDayGuess);
    let maxLengthGuess = 0;
    if (typeof res.optional.sprintMaxGuessed === 'number') {
      maxLengthGuess = Math.max(lengthGuess, res.optional.sprintMaxGuessed);
    }
    if (boolean) {
      res.optional = {
        sprintDayGuess: (numberStatDay += 1),
        sprintAllDayWords: (numberStatAll += 1),
        sprintMaxGuessed: maxLengthGuess,
      };
    } else {
      res.optional = {
        sprintDayGuess: numberStatDay,
        sprintAllDayWords: (numberStatAll += 1),
        sprintMaxGuessed: maxLengthGuess,
      };
    }
    setLearnedUserWords({ learnedWords: res.learnedWords, optional: res.optional });
  }
};
