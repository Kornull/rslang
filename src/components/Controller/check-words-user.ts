import { urlLink } from '../Templates/serve';
import { ExtraWordOption, LocalKeys, UserStat } from '../Types/types';
import { Word } from '../Types/word';
import { getLocalStorage } from './sprint-game/storage/storage-set-kornull';

const user: UserStat = getLocalStorage(LocalKeys.UserData);

export const userWordsCheckTrueOrFalse = async (words: Word[]) => {
  const arrSortWords: Word[] = [];
  const idWordssUser: ExtraWordOption[] = [];
  const responce = await fetch(`${urlLink}users/${user.userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  const userSetWords: ExtraWordOption[] = await responce.json();
  userSetWords.forEach((elUserWord: ExtraWordOption) => {
    if (elUserWord.optional.statusLearn === 'true') {
      idWordssUser.push(elUserWord);
    }
  });
  if (idWordssUser.length !== 0) {
    words.forEach((elWord: Word) => {
      let countFalse = 0;
      idWordssUser.forEach((userWord: ExtraWordOption) => {
        if (elWord.id !== userWord.wordId) countFalse++;
        if (countFalse === idWordssUser.length) arrSortWords.push(elWord);
      });
    });
    return arrSortWords;
  }
  return words;
};
