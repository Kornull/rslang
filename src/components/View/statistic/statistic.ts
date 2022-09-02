import { createEl } from '../../Controller/createTagBlock';
import { main } from '../../Templates/main-block';

export function createStatisticPage() {
  main.innerHTML = '';
  const title: HTMLElement = createEl('h1', main, ['h1']);
  title.innerText = 'Статистика';
}
