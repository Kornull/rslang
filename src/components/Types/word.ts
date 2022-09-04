import { ExtraWordOption } from './types';

export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface WordAggregated {
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: ExtraWordOption;
}

// interface Optional {
//   statuslearn: string;
//   attempts?: number;
//   sucseessAttempts?: number;
//   newDate?: Date;
// }

// export interface WordValue {
//   difficulty: string;
//   optional?: Optional;
// }

export interface WordUser {
  id: string;
  difficulty: string;
  optional: ExtraWordOption;
  wordId: string;
}
