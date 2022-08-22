import { createListWords } from '../../Controller/sprint-game/get-words-to-sprint';

enum SprintTagClass {
  GroupClass = 'sprint__btn-group',
}

export const Click = async (id: string, className: string) => {
  if (className === SprintTagClass.GroupClass) {
    await createListWords(Number(id.split('').slice(-1)) - 1);
  }
};
