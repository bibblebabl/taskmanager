export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);

export const getFiltersCount = (list) => {
  const currentDate = new Date();

  const filterCount = {
    all: 0,
    overdue: 0,
    today: 0,
    favorites: 0,
    repeating: 0,
    tags: 0,
    archive: 0
  };

  let allTagsSet = new Set([]);

  list.forEach((card) => {
    filterCount.all += 1;

    if (card.dueDate < currentDate) {
      filterCount.overdue += 1;
    }

    if (new Date(card.dueDate).toDateString() === currentDate.toDateString()) {
      filterCount.today += 1;
    }

    if (card.isFavorite) {
      filterCount.favorites += 1;
    }

    if (card.isArchive) {
      filterCount.archive += 1;
    }

    const isRepeating = Object.keys(card.repeatingDays).some((day) => card.repeatingDays[day]);

    if (isRepeating) {
      filterCount.repeating += 1;
    }

    if (card.tags.size) {
      allTagsSet = new Set([...allTagsSet, ...card.tags]);
    }
  });

  filterCount.tags = allTagsSet.size;

  return filterCount;
};
