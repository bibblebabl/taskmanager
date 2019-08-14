import {
  getRandomBoolean,
  getRandomNumber,
  getRandomArrayElement,
  getRandomArrayElements,
  getFiltersCount
} from './utils';

const allColors = [`black`, `yellow`, `blue`, `green`, `pink`];

const getRandomTask = () => ({
  description: getRandomArrayElement([
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ]),
  dueDate: Date.now() + 1 + getRandomNumber(7) * 24 * 60 * 60 * 1000, // в рамках неделю на неделю вперед
  repeatingDays: {
    Mo: false,
    Tu: false,
    We: getRandomBoolean(),
    Th: false,
    Fr: false,
    Sa: false,
    Su: false
  },
  tags: new Set(getRandomArrayElements([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ], 3)),
  color: getRandomArrayElement(allColors),
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean(),
});

const getCardsList = (cardsCount) => [...Array(cardsCount)].map(() => getRandomTask());

const mainFilters = {
  all: 0,
  overdue: 0,
  today: 0,
  favorites: 0,
  repeating: 0,
  tags: 0,
  archive: 0
};

const getMainFiltersList = (cardsList) => {
  const filterCount = getFiltersCount(cardsList, mainFilters);

  return Object.keys(mainFilters).map((filter) => {
    return {
      title: filter,
      count: filterCount[filter]
    };
  });

};

export {
  getCardsList,
  getMainFiltersList,
  allColors
};
