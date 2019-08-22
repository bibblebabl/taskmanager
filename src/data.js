import {
  getRandomBoolean,
  getRandomPositiveNegativeNumber,
  getRandomArrayElement,
  getRandomArrayElements,
  getFiltersCount
} from './utils';

const ALL_COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const MAIN_FILTERS = {
  all: 0,
  overdue: 0,
  today: 0,
  favorites: 0,
  repeating: 0,
  tags: 0,
  archive: 0
};

const getRandomTask = () => {
  const isRepeating = getRandomBoolean();

  return {
    description: getRandomArrayElement([
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ]),
    dueDate: isRepeating ? null : Date.now() + 1 + getRandomPositiveNegativeNumber(7) * 24 * 60 * 60 * 1000, // в рамках неделю на неделю вперед
    repeatingDays: {
      Mo: false,
      Tu: false,
      We: isRepeating,
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
    color: getRandomArrayElement(ALL_COLORS),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean(),
  };
};

const getTaskMocks = (cardsCount) => [...Array(cardsCount)].map(() => getRandomTask());

const getMainFiltersList = (cardsList) => {
  const filterCount = getFiltersCount(cardsList, MAIN_FILTERS);

  return Object.keys(MAIN_FILTERS).map((filter) => {
    return {
      title: filter,
      count: filterCount[filter]
    };
  });
};

export {
  getTaskMocks,
  getMainFiltersList,
  ALL_COLORS
};
