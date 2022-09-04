import { Count, IdBlocks } from './type';

enum TextMainPage {
  Title = 'Hello my dear friend!',
  Subtitle = 'Немного о самом приложении',
  DescriptionText = 'Рады видеть Вас в нашем приложении для изучения Английского языка. Вас ждет лучший учебник который можно себе представить - в котором вы можете изучить новые слова и фразы.</br>И это всё БЕСПЛАТНО!',
  Games = 'Игры - вас ждут две увлекательные игры со словами - на время, и на восприятие речи на слух.',
  TextBook = 'Учебник - здесь вы можете послушать как произносятся слова на языке носителя, отметить трудные для себя слова и выражения, и конечно же выучить их!',
  Statistics = 'Статистика - вы увидете свою статистику по изученным словам, прогресс изученых слов за текущий отрезок времени.',
  Time = 'Для занятий требуется всего каких-то 14 минут 46 секунд в день!',
}

enum TextTeam {
  Kornul = `<h3 class="team__name"><a class="team__name-link" href="https://github.com/Kornull" target="_blank">Kornull</a></h3>
  <ul class="team__description">
  <li class="team__role">Teamlead,</li>
  <li class="team__tasks">Tasks:
   <ul class="team__task">
    <li>Main-page</li>
    <li>Sprint-game</li>
   </ul>
  </li>
 </ul>`,
  Maxlablearn = `<h3 class="team__name"><a class="team__name-link" href="https://github.com/maxlablearn" target="_blank">Maxlablearn</a></h3>
  <ul class="team__description">
 <li class="team__role">Developer,</li>
 <li class="team__tasks">Tasks:
  <ul class="team__task">
   <li>Backend</li>
   <li>Audio-game</li>
   <li>Authorization</li>
  </ul>
 </li>
</ul>`,
  Svetlana85 = `<h3 class="team__name"><a class="team__name-link" href="https://github.com/svetlana-85" target="_blank">Svetlana-85</a></h3>
  <ul class="team__description">
<li class="team__role">Developer,</li>
<li class="team__tasks">Tasks:
 <ul class="team__task">
  <li>Text-book</li>
  <li>Statistic</li>
 </ul>
</li>
</ul>`,
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

export function TextForTheBlockTeam(titleBlock: HTMLElement, id: string | number): void {
  if (titleBlock) {
    let newId = '';
    switch (id) {
      case Count.Zero:
        newId = IdBlocks.Kornull;
        titleBlock.innerHTML = `${TextTeam.Kornul}`;
        break;
      case Count.One:
        newId = IdBlocks.Maxlablearn;
        titleBlock.innerHTML = `${TextTeam.Maxlablearn}`;
        break;
      case Count.Two:
        newId = IdBlocks.Svetlana85;
        titleBlock.innerHTML = `${TextTeam.Svetlana85}`;
        break;

      default:
        break;
    }
    titleBlock.id = `main-${newId}`;
  }
}
