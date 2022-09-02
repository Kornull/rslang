import { words, urlLink } from '../../Templates/serve';
import { ExtraWordOption } from '../../Types/types';
import * as types from '../../Types/word';
import User from '../authorization/user';

export async function getWords(group: number, page: number) {
  return (await fetch(`${words}?group=${group}&page=${page}`)).json();
}

export async function getWordsUser(user: User, wordId: string): Promise<types.WordUser> {
  const rawResponse = await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const data = rawResponse.json();
  return data;
}

export async function updateWordUser(user: User, wordId: string, word: ExtraWordOption): Promise<void> {
  await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
}

export async function createWordUser(user: User, wordId: string, word: ExtraWordOption): Promise<void> {
  await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
}

export async function getAggregateWordsUser(user: User, group: number, page: number): Promise<types.WordAggregated[]> {
  const rawResponse = await fetch(
    `${urlLink}users/${user.userId}/aggregatedWords?filter={"$and":[{"group":${group}, "page":${page}}]}&wordsPerPage=20`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  const data = (await rawResponse.json())[0].paginatedResults;
  return data;
}

export async function getListWords(group: number, page: number): Promise<types.Word[]> {
  const listWords: types.Word[] = await getWords(group, page);
  return listWords;
}

export async function addWordUser(user: User, wordId: string, word: ExtraWordOption) {
  return (
    await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(word),
    })
  ).json();
}

export async function createLearnWord(user: User, wordId: string, params: ExtraWordOption) {
  await fetch(`${urlLink}users/${user.userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function getListHardWord(user: User) {
  const rawResponse = await fetch(`${urlLink}users/${user.userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}&wordsPerPage=4000`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = (await rawResponse.json())[0].paginatedResults;
  return data;
}
