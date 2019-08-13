import {getTaskCardComponent} from './task-card';

const getTasksComponents = (cardsCount, getRandomTask) => {
  const cardsArray = new Array(cardsCount).fill(cardsCount).map(() => getRandomTask());
  const cardsComponents = cardsArray.map((card) => getTaskCardComponent(card)).join(``);

  return cardsComponents;
};

export {
  getTasksComponents
};
