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

export type StatisticsUserWords = {
  learnedWords: number;
  optional: {
    sprintDayGuess: number;
    sprintAllDayWords: number;
    sprintMaxGuessed: number;
    audioMaxGuessed?: number;
    'data-0'?: object;
    'data-1'?: object;
    'data-2'?: object;
    'data-3'?: object;
    'data-4'?: object;
    'data-5'?: object;
    'data-6'?: object;
  };
};

export type ExtraWordOption = {
  difficulty: string;
  optional: {
    gameGuessed: number;
    gameMistake: number;
    statusLearn: string;
    data?: string;
  };
};

export enum IdPages {
  MainID = 'main-page',
  SprintID = 'sprint-page',
  BookID = 'book-page',
  PreloaSprintID = 'preload-sprint',
  SprintStatiD = 'srpint-statistic',
  LogoIt = 'logo',
  AudioGamePreload = 'preload-audio',
  AudioGame = 'audio-game',
  AudioGameStatistic = 'statistic-audio',
}
