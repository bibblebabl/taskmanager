export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getRandomNumber = (maxNumber) => Math.round(Math.random() * maxNumber);

export const getRandomArrayElement = (array) => array[getRandomNumber(array.length - 1)];

export const getRandomArrayElements = (array, length) => {
  return array.slice(0, getRandomNumber(length || array.length - 1));
};

export const getFiltersCount = (list) => {
  const currentDate = new Date();

  const filters = list.reduce((total, card) => {
    total.all += 1;

    if (card.dueDate < currentDate) {
      total.overdue += 1;
    }

    if (new Date(card.dueDate).toDateString() === currentDate.toDateString()) {
      total.today += 1;
    }

    if (card.isFavorite) {
      total.favorites += 1;
    }

    if (card.isArchive) {
      total.archive += 1;
    }

    const isRepeating = Object.values(card.repeatingDays).some((day) => day);

    if (isRepeating) {
      total.repeating += 1;
    }

    if (card.tags.size) {
      total.tags += 1;
    }

    return total;
  }, {
    all: 0,
    overdue: 0,
    today: 0,
    favorites: 0,
    repeating: 0,
    tags: 0,
    archive: 0
  });

  return filters;
};
