import { createHeader } from './components/createHeader.js';
import { fetchCards, fetchCategory } from './service/api.service.js';
import { createCategory } from './components/createCategory.js';
import { createElement } from './helper/createElement.js';
import { createEditCategory } from './components/createEditCategory.js';
import { createPairs } from './components/createPairs.js';


const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const app = document.querySelector('#app');

    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(app);
    const editCategoryObj = createEditCategory(app);
    const pairsObj = createPairs(app);

    const allSectionUnmount = () => {
        // alt method for unmount()
        // categoryObj.unmount();
        // editCategoryObj.unmount();
        [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());
    };

    const renderIndex = async (event) => {
        event?.preventDefault();

        allSectionUnmount();
        headerObj.updateHeaderTitle('Категории');

        const categories = await fetchCategory();

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
        allSectionUnmount();
        headerObj.updateHeaderTitle('Новая категория');
        editCategoryObj.mount();
    });

    categoryObj.categoryList.addEventListener('click', async ({ target }) => {
        const categoryItem = target.closest('.category__item');

        if (target.closest('.category__edit')) {
            const dataCards = await fetchCards(categoryItem.dataset.id);

            allSectionUnmount();
            headerObj.updateHeaderTitle('Редактирование');
            editCategoryObj.mount(dataCards);
            return;
        }

        if (target.closest('.category__del')) {
            console.log('Удалить');
            return;
        }

        if (categoryItem) {
            const dataCards = await fetchCards(categoryItem.dataset.id);

            allSectionUnmount();
            headerObj.updateHeaderTitle(dataCards.title);
            pairsObj.mount(dataCards);
        }
    });

    pairsObj.buttonReturn.addEventListener('click', renderIndex);
};

initApp();