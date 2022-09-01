import './_audio-call.scss';
import { main } from '../../Templates/main-block';
import { createEl } from '../../Controller/createTagBlock';

function createButtons(parentElement: HTMLElement, count: number): void {
  const buttonsField = createEl('div', parentElement, ['btn-field']);
  for (let i = 1; i < count + 1; i++) {
    const btnChoice = <HTMLElement>createEl('button', buttonsField, ['btn-choice']);
    btnChoice.id = `word-${i}`;
    btnChoice.innerHTML = `${i}`;
  }
}

// function craateButton(parentElement: HTMLElement) {
//   createEl('button', parentElement, ['shoce-btn'], )
// }

export function createAudioGame() {
  main.innerHTML = '';
  createButtons(main, 5);
}
