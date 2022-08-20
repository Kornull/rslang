import { Count, IdBlocks } from './type';

enum TextMainPage {
  Title = 'Hello my dear friend!',
  Subtitle = 'Немного о самом приложении',
  DescriptionText = 'Рады видеть Вас в нашем приложении для изучения Английского языка. Вас ждет лучший учебник который можно себе представить - в котором вы можете изучить новые слова и фразы.</br>И это всё БЕСПЛАТНО!',
  Games = 'Вас ждут две увлекательные игры со словами - на время, и на восприятие речи на слух.',
  TextBook = 'Здесь вы можете послушать как произносятся слова на языке носителя, отметить трудные для себя слова и выражения, и конечно же выучить их',
  Statistics = 'Вы увидете свою статистику по изученным словам, прогресс изученых слов за выбранный промежуток времени.',
  Time = 'Для занятий требуется всего каких-то 14 минут 46 секунд в день',
}

export function TextForTheBlock(titleBlock: HTMLElement, id: string | number): void {
  if (titleBlock) {
    let newId = '';
    switch (id) {
      case IdBlocks.TitleMain:
        newId = IdBlocks.TitleMain;
        titleBlock.innerHTML = `${TextMainPage.Title}`;
        break;
      case IdBlocks.SubTitle:
        newId = IdBlocks.SubTitle;
        titleBlock.innerHTML = `${TextMainPage.Subtitle}`;
        break;
      case IdBlocks.Description:
        newId = IdBlocks.Description;
        titleBlock.innerHTML = `${TextMainPage.DescriptionText}`;
        break;
      case Count.Zero:
        newId = IdBlocks.Games;
        titleBlock.innerHTML = `${TextMainPage.Games}`;
        break;
      case Count.One:
        newId = IdBlocks.TextBook;
        titleBlock.innerHTML = `${TextMainPage.TextBook}`;
        break;
      case Count.Two:
        newId = IdBlocks.Statistic;
        titleBlock.innerHTML = `${TextMainPage.Statistics}`;
        break;
      case Count.Three:
        newId = IdBlocks.Time;
        titleBlock.innerHTML = `${TextMainPage.Time}`;
        break;
      default:
        break;
    }
    titleBlock.id = `main-${newId}`;
  }
}
