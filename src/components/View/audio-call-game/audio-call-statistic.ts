import { urlLink } from '../../Templates/serve';
import { getLocalStorage } from '../../Controller/storage';
import { LocalKeys, StatisticsUserWords, ExtraWordOption } from '../../Types/types';

const statisticsUserWords: StatisticsUserWords = {
  learnedWords: 1,
  optional: {
    sprintDayGuess: 1,
    sprintAllDayWords: 1,
    sprintMaxGuessed: 1,
    audioDayGuess: 1,
    audioAllDayWords: 1,
    audioMaxGuessed: 1,
    'data-0': {},
    'data-1': {},
    'data-2': {},
    'data-3': {},
    'data-4': {},
    'data-5': {},
    'data-6': {},
  },
};

const setLearnedUserWords = async (statisticsUser: StatisticsUserWords) => {
  await fetch(`${urlLink}users/${getLocalStorage(LocalKeys.UserData).userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getLocalStorage(LocalKeys.UserData).token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statisticsUser),
  });
};

export const getGuessSprintWords = async (boolean: boolean, lengthGuess: number) => {
  const responce = await fetch(`${urlLink}users/${getLocalStorage(LocalKeys.UserData).userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getLocalStorage(LocalKeys.UserData).token}`,
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
