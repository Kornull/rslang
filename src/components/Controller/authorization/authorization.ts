import User from './user';

const newUser = new User();
async function userComp() {
  // await newUser.createUser('M3', 'm3@m.com', '123456789');
  await newUser.signIn('m@m.com', '123456789');
  await newUser.getUser();
  await newUser.getNewTokens();
}

userComp();

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

export function closePopup(element: Element): void {
  const popup = document.querySelector('.popup__bg');
  const formFiled = <HTMLElement>document.querySelector('.popup');
  if (!formFiled.contains(element)) {
    popup?.remove();
  }
}

export function signInRequest(name: string, email: string, password: string, signUp: boolean) {
  if (signUp) {

  }
}



// name - M
// email - m@m.com
// userId - 6300a6cf0606dc00166b7ba7
// token заголовок - Authorization
// token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDBhNmNmMDYwNmRjMDAxNjZiN2JhNyIsImlhdCI6MTY2MDk5MzQxNywiZXhwIjoxNjYxMDA3ODE3fQ.6Zkeiqs4rs7PhLf3nsPzplx4t42cEHPxvJDLnJ5A3lY
// refreshToken - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDBhNmNmMDYwNmRjMDAxNjZiN2JhNyIsInRva2VuSWQiOiIxZTBiNDY1YS1hZWRlLTQzNDEtYmFjOC1mM2RhYTE1NzA3YjgiLCJpYXQiOjE2NjA5OTM0MTcsImV4cCI6MTY2MTAwOTYxN30.xAGVNDdW3BqFQ_6DfI1-a_LLE8f6Ra84p_Jhdvt3BzY
// let response = fetch(protectedUrl, {
//     headers: {
//       Authentication: 'token'
//     }
//   });