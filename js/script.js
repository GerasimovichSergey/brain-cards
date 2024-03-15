import { createHeader } from './components/createHeader.js';
import {
    fetchCards,
    fetchCategory,
    fetchCreateCategory,
    fetchDeleteCategory,
    fetchEditCategory
} from './service/api.service.js';
import { createCategory } from './components/createCategory.js';
import { createElement } from './helper/createElement.js';
import { createEditCategory } from './components/createEditCategory.js';
import { createPairs } from './components/createPairs.js';
import { showAlert } from './components/showAlert.js';


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

    const postHandler = async () => {
        const data = editCategoryObj.parseData();
        const dataCategories = await fetchCreateCategory(data);

        if (dataCategories.error) {
            showAlert(dataCategories.error.message);
            return;
        }

        showAlert(`Новая категория ${data.title} была добавлена`);
        allSectionUnmount();
        headerObj.updateHeaderTitle('Категории');
        categoryObj.mount(dataCategories);
    };

    const patchHandler = async () => {
        const data = editCategoryObj.parseData();
        const dataCategories = await fetchEditCategory(editCategoryObj.buttonSave.dataset.id, data);

        if (dataCategories.error) {
            showAlert(dataCategories.error.message);
            return;
        }

        showAlert(`Новая категория ${data.title} обновлена`);
        allSectionUnmount();
        headerObj.updateHeaderTitle('Категории');
        categoryObj.mount(dataCategories);
    };

    const cancel = () => {
        const cancelQuestion = confirm('Вы хотите выйти без сохранения?');

        if (cancelQuestion) {
            renderIndex();
        }
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
        editCategoryObj.buttonSave.addEventListener('click', postHandler);
        editCategoryObj.buttonSave.removeEventListener('click', patchHandler);
    });

    categoryObj.categoryList.addEventListener('click', async ({ target }) => {
        const categoryItem = target.closest('.category__item');

        if (target.closest('.category__edit')) {
            const dataCards = await fetchCards(categoryItem.dataset.id);

            allSectionUnmount();
            headerObj.updateHeaderTitle('Редактирование');
            editCategoryObj.mount(dataCards);
            editCategoryObj.buttonSave.addEventListener('click', patchHandler);
            editCategoryObj.buttonSave.removeEventListener('click', postHandler);
            editCategoryObj.buttonCancel.addEventListener('click', cancel);
            return;
        }

        if (target.closest('.category__del')) {
            if (confirm('Вы точно хотите удалить категорию?')) {
                const result = await fetchDeleteCategory(categoryItem.dataset.id);

                if (result.error) {
                    showAlert(result.error.message);
                    return;
                }

                showAlert('Категория удалена!');
                categoryItem.remove();
            }
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