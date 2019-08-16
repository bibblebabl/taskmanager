import {getTaskCardComponent} from './task-card';

const getTasksComponents = (cardsList) => {
  return cardsList.map((card) => getTaskCardComponent(card)).join(``);
};

export {
  getTasksComponents
};
