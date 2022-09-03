/* eslint-disable no-case-declarations */
import User from '../../Controller/authorization/user';
import { getLocalStorage, getStorage } from '../../Controller/storage';
import { createWordUser, updateWordUser } from '../../Controller/textbook/textbook';
import { urlLink } from '../../Templates/serve';
// eslint-disable-next-line object-curly-newline
import { ExtraWordOption, LocalKeys, PageKey, UserStat } from '../../Types/types';
import { Word } from '../../Types/word';
import { COUNT_GROUP } from './util';

const userLog: UserStat = getLocalStorage(LocalKeys.UserData);

const getuserWord = async (group: number, page: number, word: string) => {
  let idword = '';
  const res = await fetch(`${urlLink}words/?group=${group}&&page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userLog.token}`,
      Accept: 'application/json',
    },
  });
  const a = await res.json();
  a.forEach((element: Word) => {
    if (element.word === word) {
      idword = element.id;
    }
  });
  return idword;
};

const userCheckWord = async (id: string) => {
  const res = await fetch(`${urlLink}users/${userLog.userId}/aggregatedWords/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userLog.token}`,
      Accept: 'application/json',
    },
  });
  const a = await res.json();
  return a;
};

async function createParamUserWord(cardWord: HTMLElement) {
  let idWord = '';
  const wordPage = Number(getLocalStorage(PageKey.numPage));
  const wordGroup = Number(getLocalStorage(PageKey.numGroup));
  const word = cardWord.querySelector('h3')?.innerHTML.split(' ');
  if (word !== undefined) {
    idWord = await getuserWord(wordGroup, wordPage, word[0]);
  }
  const arrObj = await userCheckWord(idWord);
  const wordObj = arrObj[0];
  const isLearnedWord = cardWord.getAttribute('data-WordLearned');
  if (isLearnedWord === 'true') {
    cardWord.classList.remove('cardLearned');
    cardWord.setAttribute('data-WordLearned', 'false');
    return {
      difficulty: 'easy',
      optional: {
        gameGuessed: wordObj.userWord.optional.gameGuessed,
        gameMistake: wordObj.userWord.optional.gameMistake,
        gameAllGuessWord: wordObj.userWord.optional.gameAllGuessWord,
        statusLearn: 'false',
      },
    };
  }
  cardWord.classList.add('cardLearned');
  cardWord.setAttribute('data-WordLearned', 'true');
  const isHardWord = cardWord.getAttribute('data-WordHard');
  if (isHardWord === 'false') {
    cardWord.classList.remove('cardHard');
    cardWord.setAttribute('data-WordHard', 'false');
  }
  if (wordObj.userWord === undefined) {
    return {
      difficulty: 'easy',
      optional: {
        gameGuessed: 0,
        gameMistake: 0,
        gameAllGuessWord: 0,
        statusLearn: 'true',
      },
    };
  }
  return {
    difficulty: 'easy',
    optional: {
      gameGuessed: wordObj.userWord.optional.gameGuessed,
      gameMistake: wordObj.userWord.optional.gameMistake,
      gameAllGuessWord: wordObj.userWord.optional.gameAllGuessWord,
      statusLearn: 'true',
    },
  };
}

export async function updateLearnWord(wordValue: Word, cardWord: HTMLElement, user: User) {
  const currentGroup: string = getStorage('currentGroup', '0');
  const d = await userCheckWord(wordValue.id);
  const wordObj = d[0];
  const isWordUser = cardWord.getAttribute('data-wordUser');
  if (isWordUser === 'true') {
    const wordVal = await createParamUserWord(cardWord);
    updateWordUser(user, wordValue.id, wordVal);
  } else {
    switch (typeof wordObj.userWord) {
      case 'undefined':
        const wordVal1: ExtraWordOption = {
          difficulty: 'easy',
          optional: {
            gameGuessed: 0,
            gameMistake: 0,
            gameAllGuessWord: 0,
            statusLearn: 'false',
          },
        };
        createWordUser(user, wordValue.id, wordVal1);
        cardWord.setAttribute('data-wordUser', 'true');
        cardWord.setAttribute('data-WordLearned', 'true');
        cardWord.setAttribute('data-WordHard', 'false');
        cardWord.classList.add('cardLearned');
        break;
      case 'object':
        const wordVal2: ExtraWordOption = {
          difficulty: 'easy',
          optional: {
            gameGuessed: wordObj.userWord.optional.gameGuessed,
            gameMistake: wordObj.userWord.optional.gameMistake,
            gameAllGuessWord: wordObj.userWord.optional.gameAllGuessWord,
            statusLearn: 'false',
          },
        };
        createWordUser(user, wordValue.id, wordVal2);
        cardWord.setAttribute('data-wordUser', 'true');
        cardWord.setAttribute('data-WordLearned', 'true');
        break;
      default:
        break;
    }
  }
  cardWord.classList.remove('cardHard');
  cardWord.setAttribute('data-WordHard', 'false');
  if (Number(currentGroup) === COUNT_GROUP) {
    cardWord.classList.add('display-none');
  }
}

export async function updateHardWord(wordValue: Word, cardWord: HTMLElement, user: User) {
  const d = await userCheckWord(wordValue.id);
  const wordObj = d[0];
  const isWordUser = cardWord.getAttribute('data-wordUser');
  const currentGroup: string = getStorage('currentGroup', '0');
  if (isWordUser === 'true') {
    if (wordObj.userWord === undefined) {
      if (cardWord.getAttribute('data-WordHard') !== 'true') {
        const wordVal: ExtraWordOption = {
          difficulty: 'hard',
          optional: {
            gameGuessed: 0,
            gameMistake: 0,
            gameAllGuessWord: 0,
            statusLearn: 'false',
          },
        };
        createWordUser(user, wordValue.id, wordVal);
      } else if (Number(currentGroup) === COUNT_GROUP) {
        const wordVal: ExtraWordOption = {
          difficulty: 'easy',
          optional: {
            gameGuessed: wordObj.userWord.optional.gameGuessed,
            gameMistake: wordObj.userWord.optional.gameMistake,
            gameAllGuessWord: wordObj.userWord.optional.gameAllGuessWord,
            statusLearn: 'false',
          },
        };
        updateWordUser(user, wordValue.id, wordVal);
      } else {
        const wordVal: ExtraWordOption = {
          difficulty: 'hard',
          optional: {
            gameGuessed: wordObj.userWord.optional.gameGuessed,
            gameMistake: wordObj.userWord.optional.gameMistake,
            gameAllGuessWord: wordObj.userWord.optional.gameAllGuessWord,
            statusLearn: 'false',
          },
        };
        updateWordUser(user, wordValue.id, wordVal);
        cardWord.setAttribute('data-wordUser', 'true');
      }
      if (Number(currentGroup) === COUNT_GROUP) {
        cardWord.classList.add('display-none');
      } else {
        cardWord.setAttribute('data-WordHard', 'true');
        cardWord.setAttribute('data-WordLearned', 'false');
        cardWord.classList.add('cardHard');
        cardWord.classList.remove('cardLearned');
      }
    } else if (wordObj.userWord !== undefined) {
      if (cardWord.getAttribute('data-WordHard') !== 'true') {
        const wordVal: ExtraWordOption = {
          difficulty: 'hard',
          optional: {
            gameGuessed: wordObj.userWord.optional.gameGuessed,
            gameMistake: wordObj.userWord.optional.gameMistake,
            gameAllGuessWord: wordObj.userWord.optional.gameAllGuessWord,
            statusLearn: 'false',
          },
        };
        updateWordUser(user, wordValue.id, wordVal);
      } else if (Number(currentGroup) === COUNT_GROUP) {
        const wordVal: ExtraWordOption = {
          difficulty: 'easy',
          optional: {
            gameGuessed: wordObj.userWord.optional.gameGuessed,
            gameMistake: wordObj.userWord.optional.gameMistake,
            gameAllGuessWord: wordObj.userWord.optional.gameAllGuessWord,
            statusLearn: 'false',
          },
        };
        updateWordUser(user, wordValue.id, wordVal);
      } else {
        const wordVal: ExtraWordOption = {
          difficulty: 'hard',
          optional: {
            gameGuessed: wordObj.userWord.optional.gameGuessed,
            gameMistake: wordObj.userWord.optional.gameMistake,
            gameAllGuessWord: wordObj.userWord.optional.gameAllGuessWord,
            statusLearn: 'false',
          },
        };
        updateWordUser(user, wordValue.id, wordVal);
        cardWord.setAttribute('data-wordUser', 'true');
      }
      if (Number(currentGroup) === COUNT_GROUP) {
        cardWord.classList.add('display-none');
        cardWord.classList.remove('cardHard');
      } else {
        cardWord.setAttribute('data-WordHard', 'true');
        cardWord.setAttribute('data-WordLearned', 'false');
        cardWord.classList.add('cardHard');
        cardWord.classList.remove('cardLearned');
      }
    }
  }
}
