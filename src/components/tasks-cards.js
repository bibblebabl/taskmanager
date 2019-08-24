import {TaskCard} from './task-card';
import {TaskCardEdit} from './task-card-edit';
import {render} from '../utils';

const renderCardTasksComponents = (tasks, boardTasksElement) => {
  tasks.forEach((taskCard) => renderTaskCard(taskCard, boardTasksElement));
};

const renderTaskCard = (taskMock, boardTasksContainer) => {
  const task = new TaskCard(taskMock);
  const taskEdit = new TaskCardEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      boardTasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement().querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      boardTasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      boardTasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(boardTasksContainer, task.getElement());
};

export {
  renderCardTasksComponents
};
