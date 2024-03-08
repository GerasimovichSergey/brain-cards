import { createElement } from '../helper/createElement.js';
import { showAlert } from './showAlert.js';
import { shuffleArray } from '../helper/shuffleArray.js';


export const createPairs = (app) => {
    const pairs = createElement('section', {
        className: 'card section-offset',
    });

    const container = createElement('div', {
        className: 'container card__container',
    });
    pairs.append(container);

    const buttonReturn = createElement('button', {
        className: 'card__return',
        ariaLabel: 'Возврат к категориям',
    });

    const buttonCard = createElement('button', {
        className: 'card__item',
    });
    container.append(buttonReturn, buttonCard);

    const front = createElement('span', {
        className: 'card__front',
    });

    const back = createElement('span', {
        className: 'card__back',
    });
    buttonCard.append(front, back);

    const cardController = (data) => {
        let index = 0;

        front.textContent = data[index][0];
        back.textContent = data[index][1];

        const flipCard = () => {
            buttonCard.classList.add('card__item_flipped');
            buttonCard.removeEventListener('click', flipCard);

            setTimeout(() => {
                buttonCard.classList.remove('card__item_flipped')

                setTimeout(() => {
                    index += 1;

                    if (index === data.length) {
                        front.textContent = 'Слова для перевода закончились';

                        showAlert('Сейчас будет возврат на главный экран');

                        setTimeout(() => {
                            buttonReturn.click();
                        }, 3000);

                        return;
                    }

                    front.textContent = data[index][0];
                    back.textContent = data[index][1];

                    setTimeout(() => {
                        buttonCard.addEventListener('click', flipCard);
                    }, 200);
                }, 100);
            }, 1000);
        };

        buttonCard.addEventListener('click', flipCard);
    };

    const mount = (data) => {
        app.append(pairs);
        const newData = shuffleArray(data.pairs);
        cardController(newData);
    };

    const unmount = () => {
        pairs.remove();
    };

    return { buttonReturn, mount, unmount };
};