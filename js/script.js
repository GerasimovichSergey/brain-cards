import { createHeader } from './components/createHeader.js';
import { fetchCategory } from './service/api.service.js';
import { createCategory } from './components/createCategory.js';
import { createElement } from './helper/createElement.js';

const initApp = async () => {
  const headerParent = document.querySelector('.header');
  const app = document.querySelector('#app');

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);

  const renderIndex = async (event) => {
    event?.preventDefault();

    headerObj.updateHeaderTitle('Категории');

    const categories = await fetchCategory();
    console.log(categories);
    if (categories.error) {
      app.append(createElement('p', {
        className: 'server-error',
        textContent: 'Ошибка сервера, попробуйте зайти позже',
      }));
      return;
    }

    categoryObj.mount(categories);
  };

  renderIndex();

  headerObj.headerLogoLink.addEventListener('click', renderIndex);

  headerObj.headerBtn.addEventListener('click', () => {
    categoryObj.unmount()
    headerObj.updateHeaderTitle('Новая категория');
  });
};

initApp();