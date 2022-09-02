import User from '../../Controller/authorization/user';
import { getLocalStorage, getStorage } from '../../Controller/storage';
import { createWordUser, updateWordUser } from '../../Controller/textbook/textbook';
import { urlLink } from '../../Templates/serve';
import { ExtraWordOption, LocalKeys, UserStat } from '../../Types/types';
import { Word } from '../../Types/word';
import { COUNT_GROUP } from './util';

const userLog: UserStat = getLocalStorage(LocalKeys.UserData);

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

function createParamUserWord(cardWord: HTMLElement): ExtraWordOption {
  const isLearnedWord = cardWord.getAttribute('data-WordLearned');
  if (isLearnedWord === 'true') {
    cardWord.classList.remove('cardLearned');
    cardWord.setAttribute('data-WordLearned', 'false');
    return {
      difficulty: 'easy',
      optional: {
        gameGuessed: 0,
        gameMistake: 0,
        sprintGameAllGuessWord: 0,
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
  return {
    difficulty: 'easy',
    optional: {
      gameGuessed: 0,
      gameMistake: 0,
      sprintGameAllGuessWord: 0,
      statusLearn: 'true',
    },
  };
}

export async function updateLearnWord(wordValue: Word, cardWord: HTMLElement, user: User) {
  const d = await userCheckWord(wordValue.id);
  const wordObj = d[0];
  const isWordUser = cardWord.getAttribute('data-wordUser');
  if (isWordUser === 'true') {
    const wordVal = createParamUserWord(cardWord);
    updateWordUser(user, wordValue.id, wordVal);
  } else {
    const wordVal: ExtraWordOption = {
      difficulty: 'easy',
      optional: {
        gameGuessed: wordObj.wordId.gameGuessed,
        gameMistake: wordObj.wordId.gameMistake,
        sprintGameAllGuessWord: wordObj.wordId.sprintGameAllGuessWord,
        statusLearn: 'true',
      },
    };
    createWordUser(user, wordValue.id, wordVal);
    cardWord.setAttribute('data-wordUser', 'true');
    cardWord.setAttribute('data-WordLearned', 'true');
    cardWord.classList.add('cardLearned');
  }
  cardWord.classList.remove('cardHard');
  cardWord.setAttribute('data-WordHard', 'false');
  const currentGroup: string = getStorage('currentGroup', '0');
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
    if (cardWord.getAttribute('data-WordHard') !== 'true') {
      const wordVal: ExtraWordOption = {
        difficulty: 'hard',
        optional: {
          gameGuessed: wordObj.wordId.gameGuessed,
          gameMistake: wordObj.wordId.gameMistake,
          sprintGameAllGuessWord: wordObj.wordId.sprintGameAllGuessWord,
          statusLearn: 'false',
        },
      };
      updateWordUser(user, wordValue.id, wordVal);
    } else if (Number(currentGroup) === COUNT_GROUP) {
      const wordVal: ExtraWordOption = {
        difficulty: 'easy',
        optional: {
          gameGuessed: wordObj.wordId.gameGuessed,
          gameMistake: wordObj.wordId.gameMistake,
          sprintGameAllGuessWord: wordObj.wordId.sprintGameAllGuessWord,
          statusLearn: 'false',
        },
      };
      updateWordUser(user, wordValue.id, wordVal);
    }
  } else {
    const wordVal: ExtraWordOption = {
      difficulty: 'hard',
      optional: {
        gameGuessed: wordObj.wordId.gameGuessed,
        gameMistake: wordObj.wordId.gameMistake,
        sprintGameAllGuessWord: wordObj.wordId.sprintGameAllGuessWord,
        statusLearn: 'false',
      },
    };
    createWordUser(user, wordValue.id, wordVal);
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
}
