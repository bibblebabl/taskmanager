import {getTaskCardComponent} from './task-card';

const getTasksComponents = (cardsCount) => {
  const cardsArray = new Array(cardsCount).fill(cardsCount);
  let cardsComponents = ``;

  cardsArray.forEach((card) => {
    cardsComponents = cardsComponents + getTaskCardComponent(card);
  });

  return cardsComponents;
};

export {
  getTasksComponents
};
