import { urlLink } from '../../Templates/serve';
import { StatisticsUserWords } from '../../Types/types';
import User from '../authorization/user';

export async function getStatisticWords(user: User): Promise<StatisticsUserWords> {
  const response: Response = await fetch(`${urlLink}users/${user.userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  if (response.status === 404) {
    return {
      learnedWords: 0,
      optional: {
        sprintDayGuess: 0,
        sprintAllDayWords: 0,
        sprintMaxGuessed: 0,
        audiotDayGuess: 0,
        audioAllDayWords: 0,
        audioMaxGuessed: 0,
      },
    };
  }
  const res: StatisticsUserWords = await response.json();
  return res;
}

export async function getStatisticLernWords(user: User): Promise<number> {
  const dataLearn = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  const response: Response = await fetch(
    `${urlLink}users/${user.userId}/aggregatedWords?filter={"$and":[{"userWord.difficulty":"easy", "userWord.optional.statusLearn": "true", "userWord.optional.dataLearn": "${dataLearn}"}]}&wordsPerPage=3600`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
      },
    },
  );
  if (response.status === 404) {
    return 0;
  }
  const result = (await response.json())[0].totalCount[0].count;
  return result;
}
