import moment from 'moment';

export const objectHasSomeTruthyValue = (object) => Object.values(object).some((key) => key);

export const isEscButton = (key) => key === `Escape` || key === `Esc`;

export const isEnterButton = (key) => key === `Enter`;

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

export const getStatisticValues = (arr, key) => {
  return arr.reduce((accumulator, el) => {
    const foundedDate = accumulator.find((element) => element[key] === el[key]);
    if (!foundedDate) {
      accumulator.push({
        [key]: el[key],
        count: 1
      });
    } else {
      foundedDate.count++;
    }
    return accumulator;
  }, []);
};

export const getFilterCount = (filters, title) => {
  return filters.find((filter) => filter.title === title).count;
};

export const checkFiltersEmptyOrArchived = (filters) => {
  return getFilterCount(filters, `all`) === getFilterCount(filters, `archive`);
};

export const getDateMonthFormated = (timestamp) => moment(timestamp).format(`DD MMMM YYYY`);
