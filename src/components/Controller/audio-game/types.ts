import { WordSettings } from '../../Types/types';

export type MainGameElement = {
  word: WordSettings;
  falseWords: string[];
};

export const enum NumberOf {
  pagesInGroup = 30,
  wordsInPage = 20,
  answersOnPage = 5,
  wordsInResponse = 100,
}
