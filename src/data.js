import {getRandomBoolean, getRandomNumber, getRandomArrayElement, getRandomArrayElements, getFiltersCount} from './utils';

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

const getMainFiltersList = (cardsList) => {
  const filterCount = getFiltersCount(cardsList);

  return [
    {
      label: `All`,
      count: filterCount.all,
      checked: true,
      disabled: false
    },
    {
      label: `Overdue`,
      count: filterCount.overdue,
      checked: false,
      disabled: true
    },
    {
      label: `Today`,
      count: filterCount.today,
      checked: false,
      disabled: true
    },
    {
      label: `Favorites`,
      count: filterCount.favorites,
      checked: false,
      disabled: false
    },
    {
      label: `Repeating`,
      count: filterCount.repeating,
      checked: false,
      disabled: false
    },
    {
      label: `Tags`,
      count: filterCount.tags,
      checked: false,
      disabled: false
    },
    {
      label: `Archive`,
      count: filterCount.archive,
      checked: false,
      disabled: false
    }
  ];
};


export {
  getCardsList,
  getMainFiltersList,
  allColors
};
