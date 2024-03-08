export const shuffleArray = (array) => {
    const copyArray = [...array];

    for (let i = copyArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
    }

    return copyArray;
};