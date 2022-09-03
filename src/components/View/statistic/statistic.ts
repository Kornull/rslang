import User from '../../Controller/authorization/user';
import { createEl } from '../../Controller/createTagBlock';
import { getStatisticWords } from '../../Controller/statistic/statistic';
import { getLocalStorage } from '../../Controller/storage';
import { main } from '../../Templates/main-block';
import { StatisticsUserWords } from '../../Types/types';
import './_statistic.scss';

const titleStatistic = ['Аудиовызов', 'Спринт', 'Статистика по словам'];
const rowStatistic = ['Количество новых слов за день', 'Процент правильных ответов', 'Лучшая серия'];
const rowStatisticWords = ['Количество новых слов за день', 'Количество изученных слов за день', 'Процент правильных ответов за день'];

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

export async function createStatisticPage() {
  main.innerHTML = '';
  const title: HTMLElement = createEl('h2', main, ['h2']);
  title.innerText = 'Статистика';
  const statistic: HTMLElement = createEl('div', main, ['statistics']);
  const user: User = getLocalStorage('userDataBasic');
  try {
    const stat: StatisticsUserWords = await getStatisticWords(user);
    const audioResult = [
      stat.optional.audioDayGuess ? stat.optional.audioDayGuess : 0,
      stat.optional.audioAllDayWords && stat.optional.audioDayGuess
        ? Math.round((stat.optional.audioDayGuess / stat.optional.audioAllDayWords) * 100)
        : 0,
      stat.optional.audioMaxGuessed ? stat.optional.audioMaxGuessed : 0,
      stat.optional.audioAllDayWords ? stat.optional.audioAllDayWords : 0,
    ];
    const sprintResult = [
      stat.optional.sprintDayGuess ? stat.optional.sprintDayGuess : 0,
      Math.round((stat.optional.sprintDayGuess / stat.optional.sprintAllDayWords) * 100),
      stat.optional.sprintMaxGuessed ? stat.optional.sprintMaxGuessed : 0,
      stat.optional.sprintAllDayWords ? stat.optional.sprintAllDayWords : 0,
    ];
    const audioStat: HTMLElement = createStatisticItem(titleStatistic[0], rowStatistic, audioResult);
    statistic.append(audioStat);
    const sprintStat: HTMLElement = createStatisticItem(titleStatistic[1], rowStatistic, sprintResult);
    statistic.append(sprintStat);
    const percentTrue = Math.round(((audioResult[0] + sprintResult[0]) / (audioResult[3] + sprintResult[3])) * 100);
    const wordsStat: HTMLElement = createStatisticItem(titleStatistic[2], rowStatisticWords, [
      audioResult[0] + sprintResult[0],
      stat.learnedWords ? stat.learnedWords : 0,
      percentTrue,
    ]);
    statistic.append(wordsStat);
  } catch {
    statistic.innerHTML = 'Статистика доступна только авторизованному пользователю';
  }
}
