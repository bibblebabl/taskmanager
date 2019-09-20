import {getDateTimeString} from "./format";

export const getFiltersCount = (tasks, mainFilters) => {
  const currentDate = new Date();

  const filters = tasks.reduce((total, card) => {
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

export const filterArrayFalseValues = (arr) => arr.filter((el) => el.dueDate);

export const getMappedDueDateStatistic = (arr) => {
  const dueDateDataMapped = filterArrayFalseValues(arr).map((element) => Object.assign({}, element, {dueDate: getDateTimeString(element.dueDate)}));
  return getStatisticValues(dueDateDataMapped, `dueDate`);
};

export const getFilterCount = (filters, title) => {
  return filters.find((filter) => filter.title === title).count;
};

export const checkFiltersEmptyOrArchived = (filters) => {
  return getFilterCount(filters, `all`) === getFilterCount(filters, `archive`);
};

export const filterTasksByDateRange = (arr, fromDate, toDate) => {
  return arr.filter((task) => task.dueDate >= fromDate && task.dueDate <= toDate);
};
