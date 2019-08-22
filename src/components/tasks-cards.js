import {getTaskCardComponent, TaskCard} from './task-card';
import {TaskCardEdit} from './task-card-edit';
import {render} from '../utils';

const getTasksComponents = (tasks) => {
  return tasks.map((task) => getTaskCardComponent(task)).join(``);
};

const renderTask = (task, tasksContainer) => {
  const taskCard = new TaskCard(task);
  const taskCardEdit = new TaskCardEdit(task);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(taskCard.getElement(), taskCardEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskCard.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskCardEdit.getElement(), taskCard.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskCardEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskCardEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskCardEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskCard.getElement(), taskCardEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tasksContainer, taskCard.getElement());
};


export {
  getTasksComponents
};
