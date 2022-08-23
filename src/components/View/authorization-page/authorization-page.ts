import './_authorization.scss';
import { createEl } from '../../Controller/createTagBlock';
import { main } from '../../Templates/main-block';
import User from '../../Controller/authorization/user';
import { toggleButtons } from '../../Controller/authorization/authorization';

const newUser = new User();
async function userComp() {
  // await newUser.createUser('M3', 'm3@m.com', '123456789');
  await newUser.signIn('m@m.com', '123456789');
  await newUser.getUser();
  await newUser.getNewTokens();
}

userComp();

function createLabel(inputType: string, inputName: string, classNames: string[], text: string, parent: HTMLElement): HTMLElement {
  const label = document.createElement('label');
  createEl('input', label, undefined, { type: inputType, name: inputName });
  const textEl = <HTMLElement>createEl('div', label, classNames);
  textEl.innerText = text;
  if (parent) parent.append(label);
  return label;
}

function crateAuthorizationPage() {
  // main.innerHTML = '';
  const authPageBg = <HTMLElement>createEl('div', main, ['popup__bg', 'active']);
  const authPage = <HTMLElement>createEl('form', authPageBg, ['popup', 'active']);
  createLabel('text', 'name', ['label__text', 'name'], 'Введите имя', authPage);
  createLabel('email', 'email', ['label__text'], 'Введите адрес электронной почты', authPage);
  createLabel('password', 'password', ['label__text'], 'Введите пароль', authPage);
  const signInUpBtns = <HTMLElement>createEl('div', authPage, ['sign']);
  const signInButton = createEl('button', signInUpBtns, ['btn', 'active'], { type: 'button', id: 'sign-in-btn' });
  signInButton.innerText = 'Войти';
  signInButton.addEventListener('click', (e) => toggleButtons(e.target as HTMLElement));
  const signUpButton = createEl('button', signInUpBtns, ['btn'], { type: 'button', id: 'sign-up-btn' });
  signUpButton.innerText = 'Регистрация';
  signUpButton.addEventListener('click', (e) => toggleButtons(e.target as HTMLElement));
  const signButton = createEl('button', authPage, ['btn'], { type: 'submit', id: 'submit' });
  signButton.innerText = 'Отправить';
  signButton.addEventListener('click', (e) => toggleButtons(e.target as HTMLElement));
  return authPage;
}

// function createPopUp () {

// }
export default crateAuthorizationPage;
