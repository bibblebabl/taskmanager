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

export const getStatisticCount = (tasks, key) => {
  const statisticByKeyValuesArray = tasks.reduce((acc, task) => {
    if (task[key] instanceof Set) {
      const tasksTags = Array.from(task[key]);
      if (tasksTags.length) {
        acc = [...acc, ...tasksTags];
      }
    } else {
      acc = [...acc, task[key]];
    }
    return acc;
  }, []);

  return countDuplicateArrayValues(statisticByKeyValuesArray);
};

export const countDuplicateArrayValues = (array) => {
  return array.reduce((acc, key) => {
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};

export const getMappedDueDateStatistic = (arr) => {
  const dueDateDataMapped = filterArrayFalseValues(arr).map((element) => Object.assign({}, element, {dueDate: getDateTimeString(element.dueDate)}));
  return getStatisticCount(dueDateDataMapped, `dueDate`);
};

export const filterArrayFalseValues = (arr) => arr.filter((el) => el.dueDate);

export const getFilterCount = (filters, title) => {
  return filters.find((filter) => filter.title === title).count;
};

export const checkFiltersEmptyOrArchived = (filters) => {
  return getFilterCount(filters, `all`) === getFilterCount(filters, `archive`);
};

export const filterTasksByDateRange = (arr, fromDate, toDate) => {
  return arr.filter((task) => task.dueDate >= fromDate && task.dueDate <= toDate);
};
