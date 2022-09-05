/* eslint-disable object-curly-newline */
import { urlLink } from '../../Templates/serve';
import { ExtraWordOption, LocalKeys, PageKey, StatisticsUserWords, UserStat } from '../../Types/types';
import { userWordsCheckTrueOrFalse } from '../check-words-user';
import { getLocalStorage, setLocalStorage } from './storage/storage-set-kornull';
import { Key, Word } from './type';

const extraOptionUserWord: ExtraWordOption = {
  difficulty: 'easy',
  optional: {
    gameGuessed: 0,
    gameMistake: 0,
    gameAllGuessWord: 0,
    statusLearn: 'false',
  },
};

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

let wordsArr: Word[][] = [];
const user: UserStat = getLocalStorage(LocalKeys.UserData);

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
  wordsArr.push(a);
  const wordsArrCopy: Word[] = wordsArr.flat();
  if (getLocalStorage(LocalKeys.UserData).userId && getLocalStorage(PageKey.numGamePage).length > 0) {
    const wordsSortCopy: Word[] = await userWordsCheckTrueOrFalse(wordsArrCopy);
    setLocalStorage('allListWords', wordsSortCopy);
  } else {
    setLocalStorage('allListWords', wordsArrCopy);
  }
};

export async function createAllListWords(numberGroup: number, numberUserPage?: number) {
  setLocalStorage('allListWords', []);
  wordsArr = [];
  let numberPage = Math.floor(Math.random() * CountPages.pages);
  if (typeof numberUserPage === 'number') numberPage = numberUserPage;
  if (numberPage >= 5) {
    for (let i = numberPage - 5; i <= numberPage; i++) {
      createListWords(numberGroup, i);
    }
  } else if (numberPage < 5 && numberPage > 0) {
    for (let i = numberPage - numberPage; i <= numberPage; i++) {
      createListWords(numberGroup, i);
    }
  } else {
    createListWords(numberGroup, numberPage);
  }
}

async function userWords(wordId: string, params: object): Promise<void> {
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

export const getAllUserlearnWords = async () => {
  const resLearnWords = await fetch(
    `${urlLink}users/${user.userId}/aggregatedWords?filter={
      "$and": [{"$and": [{"$or": [{"userWord.difficulty": "hard"},{"userWord.difficulty": "easy"}]}]},{"userWord.optional.statusLearn":"true"}]}&wordsPerPage=3600`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
      },
    },
  );

  const resStatistic = await fetch(`${urlLink}users/${user.userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  if (resStatistic.status === 404) {
    const statisticRun: StatisticsUserWords = {
      learnedWords: 1,
      optional: {
        sprintDayGuess: 0,
        sprintAllDayWords: 0,
        sprintMaxGuessed: 0,
      },
    };
    setLearnedUserWords(statisticRun);
  } else {
    const res: StatisticsUserWords = await resStatistic.json();
    if (resLearnWords.status === 404) {
      res.optional = {
        sprintDayGuess: res.optional.sprintDayGuess,
        sprintAllDayWords: res.optional.sprintAllDayWords,
        sprintMaxGuessed: res.optional.sprintMaxGuessed,
      };
      setLearnedUserWords({ learnedWords: 1, optional: res.optional });
    } else {
      const words = await resLearnWords.json();
      setLearnedUserWords({ learnedWords: words[0].paginatedResults.length, optional: res.optional });
    }
  }
};

const statusTrue = async (wordOption: ExtraWordOption, wordId: string) => {
  wordOption.optional.gameGuessed += 1;
  wordOption.optional.gameAllGuessWord += 1;
  wordOption.optional.data = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  if (wordOption.difficulty === 'easy' && wordOption.optional.gameGuessed >= 3) {
    wordOption.optional.statusLearn = 'true';
    wordOption.optional.dataLearn = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    setUserWords(wordId, { optional: wordOption.optional });
  }
  if (wordOption.difficulty === 'hard' && wordOption.optional.gameGuessed >= 5) {
    wordOption.optional.statusLearn = 'true';
    wordOption.difficulty = 'easy';
    wordOption.optional.dataLearn = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  }
  setUserWords(wordId, { optional: wordOption.optional });
  getAllUserlearnWords();
};

const statusFalse = async (wordOption: ExtraWordOption, wordId: string) => {
  wordOption.optional.gameMistake += 1;
  wordOption.optional.data = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  if (wordOption.optional.statusLearn === 'true') {
    wordOption.optional.statusLearn = 'false';
    wordOption.optional.gameGuessed = 0;
  }
  setUserWords(wordId, { optional: wordOption.optional });
};

export const getUserWord = async (wordId: string, status: boolean) => {
  const responce = await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  if (responce.status === 404) {
    if (status) {
      extraOptionUserWord.optional.gameGuessed = 1;
      extraOptionUserWord.optional.gameMistake = 0;
      extraOptionUserWord.optional.gameAllGuessWord = 1;
      extraOptionUserWord.optional.data = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    } else {
      extraOptionUserWord.optional.gameGuessed = 0;
      extraOptionUserWord.optional.gameMistake = 1;
      extraOptionUserWord.optional.gameAllGuessWord = 0;
      extraOptionUserWord.optional.data = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
    }
    userWords(wordId, extraOptionUserWord);
  } else if (status) {
    const wordOption: ExtraWordOption = await responce.json();

    statusTrue(wordOption, wordId);
  } else {
    const wordOption: ExtraWordOption = await responce.json();

    statusFalse(wordOption, wordId);
  }
};

(async () => {
  if (getLocalStorage('timeDateReset') !== `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`) {
    const responce = await fetch(`${urlLink}users/${user.userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
      },
    });
    const res: StatisticsUserWords = await responce.json();
    res.optional = {
      sprintDayGuess: 1,
      sprintAllDayWords: 1,
      sprintMaxGuessed: 1,
    };
    setLearnedUserWords({ learnedWords: res.learnedWords, optional: res.optional });
  }
})();
