// eslint-disable-next-line import/no-cycle
import { appUser } from '../../App/App';

export function toggleButtons(element: Element): void {
  const signIn = <HTMLElement>document.querySelector('#sign-in-btn');
  const signUp = <HTMLElement>document.querySelector('#sign-up-btn');
  const nameFiled = <HTMLElement>document.querySelector('label input[name="name"]');
  const nameFiledText = <HTMLElement>document.querySelector('.label__text.name');

  if (element.id === 'sign-in-btn') {
    signIn.classList.add('active');
    signUp.classList.remove('active');
    nameFiled.setAttribute('disabled', 'disabled');
    nameFiledText.classList.add('disabled');
  } else {
    signIn.classList.remove('active');
    signUp.classList.add('active');
    nameFiled.removeAttribute('disabled');
    nameFiledText.classList.remove('disabled');
  }
}

export function closePopup(): void {
  const popup = document.querySelector('.popup__bg');
  popup?.remove();
  document.location.reload();
}

function showMessage(message: string): void {
  const messageField = <HTMLInputElement>document.querySelector('.popup-message');
  const messageText = <HTMLInputElement>document.querySelector('.popup-message__text');
  messageText.innerText = message;
  messageField.classList.remove('disabled');
  setTimeout(() => {
    messageField.classList.add('disabled');
  }, 3500);
}

export async function signInRequest() {
  const inName = <HTMLInputElement>document.querySelector('input[name="name"]');
  const inEmail = <HTMLInputElement>document.querySelector('input[name="email"]');
  const inPassword = <HTMLInputElement>document.querySelector('input[name="password"]');
  const isSignIn = document.querySelector('#sign-in-btn')?.classList.contains('active');
  // console.log(inName.value, ' - ', inEmail.value, ' - ', inPassword.value);
  if (isSignIn) {
    const response = await appUser.signIn(inEmail.value, inPassword.value);
    if (response === 200) {
      closePopup();
    } else if (response === 403) {
      showMessage('Неверный e-mail или пароль');
    } else {
      showMessage('Неизвестная ошибка входа');
    }
  } else {
    const response = await appUser.createUser(inName.value, inEmail.value, inPassword.value);
    if (response === 200) {
      closePopup();
    } else if (response === 422) {
      showMessage('Неверный e-mail или пароль');
    } else {
      showMessage('Неизвестная ошибка регистрации');
    }
  }
}
