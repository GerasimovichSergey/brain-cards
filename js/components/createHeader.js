import { createElement } from '../helper/createElement.js';


export const createHeader = (parent) => {
    const container = createElement('div', {
        className: 'container header__container',
    });

    parent.append(container);

    const headerLogoLink = createElement('a', {
        href: '#',
        className: 'header__logo-link',
    });

    container.append(headerLogoLink);

    const logo = createElement('img', {
        src: 'img/logo.svg',
        className: 'header__logo',
        alt: 'Логотип сервиса Brain Cards',
    });

    headerLogoLink.append(logo);

    const headerTitle = createElement('h2', {
        className: 'header__subtitle',
        textContent: 'Категории',
    });

    container.append(headerTitle);

    const headerBtn = createElement('button', {
        className: 'header__btn',
        textContent: 'Добавить категорию',
    });

    container.append(headerBtn);

    const updateHeaderTitle = (title) => {
        headerTitle.textContent = title;
    };

    return { headerLogoLink, headerBtn, updateHeaderTitle };
};