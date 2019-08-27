import Board from '../components/board';
import BoardTasks from '../components/board-tasks';
import BoardFilterList from '../components/board-filter-list';
import TaskCard from '../components/task-card';
import TaskCardEdit from '../components/task-card-edit';

import {isEscButton} from '../utils';
import {render} from '../utils/render';


export default class BoardController {
  constructor(container, tasks, boardFilters) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._boardFilterList = new BoardFilterList(boardFilters);
    this._boardTasks = new BoardTasks();
  }

  init() {
    render(this._container, this._board.getElement());
    render(this._board.getElement(), this._boardFilterList.getElement());
    render(this._board.getElement(), this._boardTasks.getElement());

    this._renderTaskCards();

    this._boardFilterList.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._boardTasks.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTaskCard(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTaskCard(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTaskCard(taskMock));
        break;
    }
  }

  _renderTaskCards() {
    this._tasks.forEach((taskMock) => this._renderTaskCard(taskMock));
  }

  _renderTaskCard(taskMock) {
    const taskComponent = new TaskCard(taskMock);
    const taskEditComponent = new TaskCardEdit(taskMock);

    const onEscKeyDown = (evt) => {
      if (isEscButton(evt.key)) {
        this._boardTasks.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._boardTasks.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._boardTasks.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, () => {
        this._boardTasks.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._boardTasks.getElement(), taskComponent.getElement());
  }
}
