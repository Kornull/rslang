// ONLY ALL TYPES (if they will);
export type WordSettings = {
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
};

export type Key = Record<string, string>;

export enum LocalKeys {
  UserData = 'userDataBasic',
}

export type UserStat = {
  name: string;
  token: string;
  userId: string;
};
