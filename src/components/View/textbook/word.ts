import User from '../../Controller/authorization/user';
import { createWordUser, updateWordUser } from '../../Controller/textbook/textbook';
import { Word, WordValue } from '../../Types/word';

function createParamUserWord(cardWord: HTMLElement): WordValue {
  const isLearnedWord = cardWord.getAttribute('data-WordLearned');
  if (isLearnedWord === 'true') {
    cardWord.classList.remove('cardLearned');
    cardWord.setAttribute('data-WordLearned', 'false');
    return {
      difficulty: 'easy',
      optional: {
        statuslearn: 'false',
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
      statuslearn: 'true',
    },
  };
}

export function updateLearnWord(wordValue: Word, cardWord: HTMLElement, user: User) {
  const isWordUser = cardWord.getAttribute('data-wordUser');
  if (isWordUser === 'true') {
    const wordVal = createParamUserWord(cardWord);
    updateWordUser(user, wordValue.id, wordVal);
  } else {
    const wordVal: WordValue = {
      difficulty: 'easy',
      optional: {
        statuslearn: 'true',
      },
    };
    createWordUser(user, wordValue.id, wordVal);
    cardWord.setAttribute('data-wordUser', 'true');
    cardWord.setAttribute('data-WordLearned', 'true');
    cardWord.classList.add('cardLearned');
  }
  cardWord.classList.remove('cardHard');
  cardWord.setAttribute('data-WordHard', 'false');
}

export function updateHardWord(wordValue: Word, cardWord: HTMLElement, user: User) {
  const isWordUser = cardWord.getAttribute('data-wordUser');
  if (isWordUser === 'true') {
    if (cardWord.getAttribute('data-WordHard') !== 'true') {
      const wordVal: WordValue = {
        difficulty: 'hard',
        optional: {
          statuslearn: 'false',
        },
      };
      updateWordUser(user, wordValue.id, wordVal);
    }
  } else {
    const wordVal: WordValue = {
      difficulty: 'hard',
      optional: {
        statuslearn: 'false',
      },
    };
    createWordUser(user, wordValue.id, wordVal);
    cardWord.setAttribute('data-wordUser', 'true');
  }
  cardWord.setAttribute('data-WordHard', 'true');
  cardWord.setAttribute('data-WordLearned', 'false');
  cardWord.classList.add('cardHard');
  cardWord.classList.remove('cardLearned');
}
