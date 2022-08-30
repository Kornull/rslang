import './_authorization.scss';
import { createEl } from '../../Controller/createTagBlock';
import { main } from '../../Templates/main-block';
// eslint-disable-next-line import/no-cycle
import { toggleButtons, signInRequest, closePopup } from '../../Controller/authorization/authorization';

function createLabel(inputType: string, inputName: string, classNames: string[], text: string, parent: HTMLElement, disabled: boolean): HTMLElement {
  const label = document.createElement('label');
  if (disabled) {
    createEl('input', label, undefined, { type: inputType, name: inputName, disabled: 'disabled' });
  } else {
    createEl('input', label, undefined, { type: inputType, name: inputName });
  }
  const textEl = <HTMLElement>createEl('div', label, classNames);
  textEl.innerText = text;
  if (parent) parent.append(label);
  return label;
}

function crateAuthorizationPage() {
  // main.innerHTML = '';
  const authPageBg = <HTMLElement>createEl('div', main, ['popup__bg', 'active']);
  const authPage = <HTMLElement>createEl('form', authPageBg, ['popup', 'active']);
  createLabel('text', 'name', ['label__text', 'name', 'disabled'], 'Введите имя', authPage, true);
  createLabel('email', 'email', ['label__text'], 'Введите адрес электронной почты', authPage, false);
  createLabel('password', 'password', ['label__text'], 'Введите пароль', authPage, false);
  const signInUpBtns = <HTMLElement>createEl('div', authPage, ['sign']);
  const signInButton = createEl('button', signInUpBtns, ['btn', 'active'], { type: 'button', id: 'sign-in-btn' });
  signInButton.innerText = 'Войти';
  signInButton.addEventListener('click', (e) => toggleButtons(e.target as HTMLElement));
  const signUpButton = createEl('button', signInUpBtns, ['btn'], { type: 'button', id: 'sign-up-btn' });
  signUpButton.innerText = 'Регистрация';
  signUpButton.addEventListener('click', (e) => toggleButtons(e.target as HTMLElement));
  const signButton = createEl('button', authPage, ['btn'], { type: 'button', id: 'submit' });
  signButton.innerText = 'Отправить';

  const popupMessageField = createEl('div', authPage, ['popup-message', 'disabled']);
  const popupMessage = createEl('span', popupMessageField, ['popup-message__text']);
  popupMessage.innerText = 'Что-то пошло не так...';

  signButton.addEventListener('click', () => signInRequest());

  authPageBg.addEventListener('click', (e) => {
    if (!authPage.contains(e.target as HTMLElement)) {
      closePopup();
    }
  });

  // if ( === 200) {
  //   closePopup();
  // } else {
  //   console.log('error handling');
  // }

  return authPage;
}

export default crateAuthorizationPage;
