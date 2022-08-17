import './_burger.scss';

const burger = <HTMLElement>document.querySelector('#burger');
const shadowElement = <HTMLElement>document.querySelector('#shadow');
const linkNavigation = document.querySelectorAll('.header__nav-link');

const clickBurger = (): void => {
  const span = <HTMLElement>burger.lastChild;
  const headerMenu = <HTMLElement>document.querySelector('#header-menu');

  if (span.classList.contains('active')) {
    span.classList.remove('active');
    headerMenu.style.right = '-100%';
    shadowElement.style.left = '-100%';
    linkNavigation.forEach((link: Element) => {
      link.setAttribute('tabindex', '-1');
    });
    document.body.classList.remove('active');
  } else {
    span.classList.add('active');
    headerMenu.style.right = '0%';
    shadowElement.style.left = '0%';
    document.body.classList.add('active');
    linkNavigation.forEach((link: Element) => {
      link.setAttribute('tabindex', '0');
    });
  }
};

(() => {
  burger.addEventListener('click', clickBurger);
  burger.addEventListener('keydown', (ev: KeyboardEvent): void => {
    const burgerElement = ev.target as HTMLElement;
    if (burgerElement.classList.contains('header__burger')) {
      const message = ev.key;
      if (message === 'Enter') {
        clickBurger();
      }
    }
  });
  shadowElement.addEventListener('click', clickBurger);
  linkNavigation.forEach((link: Element) => {
    link.addEventListener('click', (ev: Event) => {
      if (ev !== null) {
        if (ev.type === 'click') clickBurger();
      }
    });
  });
})();
