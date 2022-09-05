import User from '../../Controller/authorization/user';
import { createEl } from '../../Controller/createTagBlock';
import { getStatisticLernWords, getStatisticWords } from '../../Controller/statistic/statistic';
import { getLocalStorage } from '../../Controller/storage';
import { main } from '../../Templates/main-block';
import { StatisticsUserWords } from '../../Types/types';
import './_statistic.scss';

const titleStatistic = ['Аудиовызов', 'Спринт', 'Статистика по словам'];
const rowStatistic = ['Количество угаданных слов за день', 'Процент правильных ответов', 'Лучшая серия'];
const rowStatisticWords = ['Количество угаданных слов за день', 'Количество изученных слов за день', 'Процент правильных ответов за день'];

function createStatisticItem(title: string, rowTitle: Array<string>, rowValue: Array<number>): HTMLElement {
  const blockStat: HTMLElement = createEl('div', undefined, ['blockStat']);
  const titleBlock: HTMLElement = createEl('h5', blockStat, ['blockStatTitle']);
  titleBlock.innerHTML = title;
  const tableStat: HTMLElement = createEl('table', blockStat, ['statisticTable']);
  rowTitle.forEach((itemRow, index) => {
    const row: HTMLElement = createEl('tr', tableStat, ['statisticTableRow']);
    const colTitle: HTMLElement = createEl('td', row, ['statisticRowTitle']);
    colTitle.innerHTML = itemRow;
    const colValue: HTMLElement = createEl('td', row, ['statisticValue']);
    colValue.innerHTML = String(rowValue[index]);
  });
  return blockStat;
}

function addMessage(message: string): HTMLSpanElement {
  const spanMessage: HTMLSpanElement = createEl('span', undefined, ['statisticMessage']);
  spanMessage.innerHTML = message;
  return spanMessage;
}

export async function createStatisticPage() {
  main.innerHTML = '';
  const title: HTMLElement = createEl('h2', main, ['h2']);
  title.innerText = 'Статистика';
  const statistic: HTMLElement = createEl('div', main, ['statistics']);
  const user: User = getLocalStorage('userDataBasic');
  if (user.userId) {
    let stat: StatisticsUserWords;
    try {
      stat = await getStatisticWords(user);
    } catch {
      stat = {
        learnedWords: 0,
        optional: {
          sprintDayGuess: 0,
          sprintAllDayWords: 0,
          sprintMaxGuessed: 0,
          audiotDayGuess: 0,
          audioAllDayWords: 0,
          audioMaxGuessed: 0,
        },
      };
    }
    let countLernWords: number;
    try {
      countLernWords = await getStatisticLernWords(user);
    } catch {
      countLernWords = 0;
    }
    const audioResult: number[] = [
      stat.optional.audiotDayGuess ? stat.optional.audiotDayGuess : 0,
      stat.optional.audioAllDayWords && stat.optional.audiotDayGuess
        ? Math.round((stat.optional.audiotDayGuess / stat.optional.audioAllDayWords) * 100)
        : 0,
      stat.optional.audioMaxGuessed ? stat.optional.audioMaxGuessed : 0,
      stat.optional.audioAllDayWords ? stat.optional.audioAllDayWords : 0,
    ];
    const sprintResult: number[] = [
      stat.optional.sprintDayGuess ? stat.optional.sprintDayGuess : 0,
      stat.optional.sprintDayGuess && stat.optional.sprintAllDayWords
        ? Math.round((stat.optional.sprintDayGuess / stat.optional.sprintAllDayWords) * 100)
        : 0,
      stat.optional.sprintMaxGuessed ? stat.optional.sprintMaxGuessed : 0,
      stat.optional.sprintAllDayWords ? stat.optional.sprintAllDayWords : 0,
    ];
    const audioStat: HTMLElement = createStatisticItem(titleStatistic[0], rowStatistic, audioResult);
    statistic.append(audioStat);
    const sprintStat: HTMLElement = createStatisticItem(titleStatistic[1], rowStatistic, sprintResult);
    statistic.append(sprintStat);
    const percentTrue: number = Math.round(((audioResult[0] + sprintResult[0]) / (audioResult[3] + sprintResult[3])) * 100);
    const wordsStat: HTMLElement = createStatisticItem(titleStatistic[2], rowStatisticWords, [
      audioResult[0] + sprintResult[0],
      countLernWords,
      percentTrue,
    ]);
    statistic.append(wordsStat);
  } else statistic.append(addMessage('Статистика доступна только авторизованному пользователю'));
}
