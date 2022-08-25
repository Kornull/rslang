import { words, urlLink } from '../Templates/serve';
import { Word, WordValue } from '../Types/word';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDYzZmE3MzNlOGNmMDAxNjk1NTI4NyIsImlhdCI6MTY2MTM2MTYwMCwiZXhwIjoxNjYxMzc2MDAwfQ.igCH2tbNTDn6hAwEfm3S8J5tgGZVUWK-5aKhRw5UesM';

export async function getWords(group: number, page: number) {
  return (await fetch(`${words}?group=${group}&page=${page}`)).json();
}

export async function getListWords(group: number, page: number) {
  const listWords: Word[] = await getWords(group, page);
  return listWords;
}

export async function addWordUser(userId: string, wordId: string, word: WordValue) {
  return (
    await fetch(`${urlLink}users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(word),
    })
  ).json();
}
