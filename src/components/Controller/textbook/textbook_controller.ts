import { words, urlLink } from '../../Templates/serve';
import { Word, WordValue } from '../../Types/word';
import User from '../authorization/user';

export async function getWords(group: number, page: number) {
  return (await fetch(`${words}?group=${group}&page=${page}`)).json();
}

export async function getAggregatedWords(group: number, page: number, user: User) {
  const rawResponse = await fetch(`${urlLink}/users/${user.userId}/aggregatedWords?filter={$and:[{group:${group}},{page:${page}}]}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return rawResponse.json();
}

export async function getListWords(group: number, page: number) {
  const listWords: Word[] = await getWords(group, page);
  return listWords;
}

export async function addWordUser(user: User, wordId: string, word: WordValue) {
  return (
    await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(word),
    })
  ).json();
}
