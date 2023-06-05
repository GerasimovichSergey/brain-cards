import { createElement } from '../helper/createElement.js';

export const createCategory = (app) => {
  const category = createElement('section', {
    className: 'category section-offset',
  });

  const container = createElement('div', {
    className: 'container',
  });
  category.append(container);

  const categoryList = createElement('ul', {
    className: 'category__list',
  });
  container.append(categoryList);

  const createCategoryCard = (data) => {
    const card = createElement('li', {
      className: 'category__item',
    });
    card.dataset.id = data.id;

    const buttonCard = createElement('button', {
      className: 'category__card',
    });
    card.append(buttonCard);

    const buttonSpanTitle = createElement('span', {
      className: 'category__title',
      textContent: data.title,
    });
    buttonCard.append(buttonSpanTitle);

    const buttonSpanPairs = createElement('span', {
      className: 'category__pairs',
      textContent: `${data.length} пар`,
    });
    buttonCard.append(buttonSpanPairs);

    const buttonCardEdit = createElement('button', {
      className: 'category__btn category__edit',
      ariaLabel: 'редактировать',
    });
    card.append(buttonCardEdit);

    const buttonCardDel = createElement('button', {
      className: 'category__btn category__del',
      ariaLabel: 'удалить',
    });
    card.append(buttonCardDel);

    return card;
  };

  const mount = (data) => {
    categoryList.textContent = '';
    app.append(category);

    const cards = data.map(createCategoryCard);

    categoryList.append(...cards);
  };

  const unmount = () => {
    category.remove();
  };

  return { mount, unmount, categoryList };
};