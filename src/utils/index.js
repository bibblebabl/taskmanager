export const objectHasSomeTruthyValue = (object) => Object.values(object).some((key) => key);

export const getFiltersCount = (list, mainFilters) => {
  const currentDate = new Date();

  const filters = list.reduce((total, card) => {
    total.all += 1;
    total.overdue += +(card.dueDate < currentDate);
    total.today += +(new Date(card.dueDate).toDateString() === currentDate.toDateString());
    total.favorites += +(card.isFavorite);
    total.archive += +(card.isArchive);
    total.repeating += +(Object.values(card.repeatingDays).some((day) => day));
    total.tags += +(card.tags.size);

    return total;
  }, mainFilters);

  return filters;
};