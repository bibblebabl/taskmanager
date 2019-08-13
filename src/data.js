import {getRandomBoolean, getRandomNumber, getFiltersCount} from './utils';

const getRandomTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][getRandomNumber(3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000, // в рамках неделю на неделю вперед
  repeatingDays: {
    Mo: false,
    Tu: false,
    We: getRandomBoolean(),
    Th: false,
    Fr: false,
    Sa: false,
    Su: false
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ][getRandomNumber(5)],
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean(),
});

const getCardsList = (cardsCount) => [...Array(cardsCount)].map(() => getRandomTask());

const getMainFiltersList = (cardsList) => {
  const filterCount = getFiltersCount(cardsList);

  return [
    {
      id: `all`,
      label: `All`,
      count: filterCount.all,
      checked: true,
      disabled: false
    },
    {
      id: `overdue`,
      label: `Overdue`,
      count: filterCount.overdue,
      checked: false,
      disabled: true
    },
    {
      id: `today`,
      label: `Today`,
      count: filterCount.today,
      checked: false,
      disabled: true
    },
    {
      id: `favorites`,
      label: `Favorites`,
      count: filterCount.favorites,
      checked: false,
      disabled: false
    },
    {
      id: `repeating`,
      label: `Repeating`,
      count: filterCount.repeating,
      checked: false,
      disabled: false
    },
    {
      id: `tags`,
      label: `Tags`,
      count: filterCount.tags,
      checked: false,
      disabled: false
    },
    {
      id: `archive`,
      label: `Archive`,
      count: filterCount.archive,
      checked: false,
      disabled: false
    }
  ];
};


export {
  getCardsList,
  getMainFiltersList
};
