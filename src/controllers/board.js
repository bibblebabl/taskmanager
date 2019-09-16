import BoardContainer from '../components/board/board-container';
import BoardTasks from '../components/board/board-tasks';
import Sort from '../components/board/filter-list';

import LoadMoreButton from '../components/load-more-button';
import BoardNoTasks from '../components/board/no-tasks';

import TaskListController from '../controllers/task-list';

import {TASKS_CARDS_PER_PAGE, BOARD_SORTING} from '../data/constants';

import {RenderPosition, render, removeComponent} from '../utils/render';
import {getSortedTasks} from '../utils/sort';

export default class BoardController {
  constructor(container, filtersEmptyOrArchived, onDataChange) {
    this._container = container;
    this._tasks = [];
    this._board = new BoardContainer();
    this._sorting = new Sort(BOARD_SORTING);
    this._filtersEmptyOrArchived = filtersEmptyOrArchived;
    this._boardTasks = new BoardTasks();
    this._boardNoTasks = new BoardNoTasks();
    this._loadMoreButton = new LoadMoreButton();

    this._subscriptions = [];

    this._onDataChangeMain = onDataChange;

    this._cardsShown = 0;

    this._taskListController = new TaskListController({
      container: this._boardTasks.getElement(),
      onDataChangeMain: this._onDataChange.bind(this)
    });

    this._onSortLinkClick = this._onSortLinkClick.bind(this);

    this._init();
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show(tasks) {
    if (tasks !== this._tasks) {
      this._setTasks(tasks);
    }

    this._board.getElement().classList.remove(`visually-hidden`);
  }

  createTask() {
    this._taskListController.createTask();
  }

  _init() {
    render(this._container, this._board.getElement());
    render(this._board.getElement(), this._sorting.getElement(), RenderPosition.AFTERBEGIN);
    render(this._board.getElement(), this._boardTasks.getElement());

    this._sorting.getElement().addEventListener(`click`, this._onSortLinkClick);
  }

  _renderBoardTasks() {
    if (!this._tasks.length || this.filtersEmptyOrArchived) {
      render(this._board.getElement(), this._boardNoTasks.getElement());
    } else {
      render(this._board.getElement(), this._boardTasks.getElement());
      this._taskListController.setTasks(this._getTasksToShow());
      this._renderLoadMoreButton();
    }
  }

  _setTasks(tasks) {
    this._tasks = tasks;
    this._cardsShown = TASKS_CARDS_PER_PAGE;

    this._renderBoardTasks();
  }

  _onDataChange(tasks) {
    this._tasks = tasks;
    this._onDataChangeMain(this._tasks);
    this._renderBoardTasks();
  }

  _getTasksToShow() {
    return [...this._tasks.slice(0, this._cardsShown)];
  }

  _onLoadMoreButtonClick() {
    const tasksToAdd = this._tasks.slice(this._cardsShown, this._cardsShown + TASKS_CARDS_PER_PAGE);
    this._taskListController.addTasks(tasksToAdd);
    this._cardsShown += TASKS_CARDS_PER_PAGE;
    this._renderLoadMoreButton();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const sortedTasks = getSortedTasks(this._getTasksToShow(), evt.target.dataset.sortType);
    this._taskListController.setTasks(sortedTasks);
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

}

