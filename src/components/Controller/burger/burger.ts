import './_burger.scss';

const burger = <HTMLElement>document.querySelector('#burger');
const shadowElement = <HTMLElement>document.querySelector('#shadow');
const linkNavigation = document.querySelectorAll('.header__nav-link');
const span = <HTMLElement>burger.lastChild;
const headerMenuList = <HTMLElement>document.querySelector('#header-list');
const headerNav = <HTMLElement>document.querySelector('#header-nav');

const closeBurgerMenu = () => {
  span.classList.remove('active');
  headerMenuList.style.right = '-100%';
  headerNav.style.right = '-100%';
  shadowElement.style.left = '-100%';
  linkNavigation.forEach((link: Element) => {
    link.setAttribute('tabindex', '-1');
  });
  document.body.classList.remove('active');
};

const openBurgerMenu = (): void => {
  if (span.classList.contains('active')) {
    closeBurgerMenu();
  } else {
    span.classList.add('active');
    headerMenuList.style.right = '0%';
    headerNav.style.right = '0%';
    shadowElement.style.left = '0%';
    document.body.classList.add('active');
    burger.blur();
    linkNavigation.forEach((link: Element) => {
      link.setAttribute('tabindex', '0');
    });
  }
};

(() => {
  burger.addEventListener('click', openBurgerMenu);
  burger.addEventListener('keydown', (ev: KeyboardEvent): void => {
    const burgerElement = ev.target as HTMLElement;
    if (burgerElement.classList.contains('header__burger')) {
      const message = ev.key;
      if (message === 'Enter') {
        openBurgerMenu();
      }
    }
  });
  shadowElement.addEventListener('click', openBurgerMenu);
  linkNavigation.forEach((link: Element) => {
    link.addEventListener('click', (ev: Event) => {
      if (ev !== null) {
        if (ev.type === 'click') openBurgerMenu();
      }
    });
  });
})();

window.addEventListener('resize', closeBurgerMenu);
