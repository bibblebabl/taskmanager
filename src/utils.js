// Получение случайных значений
export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getRandomNumber = (maxNumber) => Math.round(Math.random() * maxNumber);

export const getRandomPositiveNegativeNumber = (maxNumber) => {
  const number = getRandomNumber(maxNumber);
  const randomPositiveNegative = Math.random() < 0.5 ? -number : number;
  return randomPositiveNegative;
};

export const getRandomArrayElement = (array) => array[getRandomNumber(array.length - 1)];

export const getRandomArrayElements = (array, length) => {
  return array.slice(0, getRandomNumber(length || array.length - 1));
};

// Рендер
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderComponent = (container, component) => {
  container.insertAdjacentHTML(`beforeend`, component);
};

export const render = (container, element) => {
  container.append(element);
};

export const reRenderComponent = (target, component) => {
  target.innerHTML = component;
};

export const unRender = (element) => {
  if (element) {
    element.remove();
  }
};

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
