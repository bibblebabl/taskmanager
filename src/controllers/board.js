import BoardContainer from '../components/board/board-container';
import BoardTasks from '../components/board/board-tasks';
import Sort from '../components/board/filter-list';

import LoadMoreButton from '../components/load-more-button';
import BoardNoTasks from '../components/board/no-tasks';

import TaskController from '../controllers/task';

import {checkFiltersEmptyOrArchived} from '../utils';
import {render, removeComponent} from '../utils/render';
import {getSortedTasks} from '../utils/sort';

export default class BoardController {
  constructor({container, tasks, sortingList, tasksCardsPerPage, mainFilters}) {
    this._container = container;
    this._tasks = tasks;
    this._board = new BoardContainer();
    this._sorting = new Sort(sortingList);
    this._mainFilters = mainFilters;
    this._boardTasks = new BoardTasks();
    this._boardNoTasks = new BoardNoTasks();
    this._loadMoreButton = new LoadMoreButton();

    this._subscriptions = [];

    this._cardsShown = 0;
    this._tasksCardsPerPage = tasksCardsPerPage;

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._board.getElement());
    render(this._board.getElement(), this._sorting.getElement());

    if (this._tasks.length === 0 || checkFiltersEmptyOrArchived(this._mainFilters)) {
      render(this._board.getElement(), this._boardNoTasks.getElement());
    } else {
      render(this._board.getElement(), this._boardTasks.getElement());
      this._cardsShown += this._tasksCardsPerPage;
      this._getTasksToShow().forEach((taskMock) => this._renderTaskCard(taskMock));
      this._renderLoadMoreButton();
      this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._board.getElement().classList.remove(`visually-hidden`);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderTaskCards();
  }

  _renderTaskCards() {
    removeComponent(this._boardTasks.getElement());
    this._boardTasks.removeElement();

    render(this._board.getElement(), this._boardTasks.getElement());
    this._getTasksToShow().forEach((taskMock) => this._renderTaskCard(taskMock));
  }

  _renderTaskCard(taskMock) {
    const taskController = new TaskController(this._boardTasks, taskMock, this._onChangeView, this._onDataChange);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _getTasksToShow() {
    return this._tasks.slice(0, this._cardsShown);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._boardTasks.getElement().innerHTML = ``;
    const sortedTasks = getSortedTasks(this._getTasksToShow(), evt.target.dataset.sortType);
    sortedTasks.forEach((taskMock) => this._renderTaskCard(taskMock));
    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    removeComponent(this._loadMoreButton.getElement());
    this._loadMoreButton.removeElement();

    if (this._cardsShown <= this._tasks.length) {
      render(this._boardTasks.getElement(), this._loadMoreButton.getElement());
      this._loadMoreButton.getElement()
        .addEventListener(`click`, (evt) => this._onLoadMoreButtonClick(evt));
    }
  }

  _onLoadMoreButtonClick() {
    this._cardsShown += this._tasksCardsPerPage;
    this._renderTaskCards();
    this._renderLoadMoreButton();
  }
}
