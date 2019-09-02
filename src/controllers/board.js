import Board from '../components/board';
import BoardTasks from '../components/board-tasks';
import Sort from '../components/board-filter-list';
import TaskCard from '../components/task-card';
import TaskCardEdit from '../components/task-card-edit';
import LoadMoreButton from '../components/load-more-button';
import BoardNoTasks from '../components/board-no-tasks';

import {REPEATING_DAYS} from '../data';

import {isEscButton, checkFiltersEmptyOrArchived} from '../utils';
import {render, removeComponent} from '../utils/render';
import {getSortedTasks} from '../utils/sort';

export default class BoardController {
  constructor({container, tasks, sortingList, tasksCardsPerPage, mainFilters}) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._sorting = new Sort(sortingList);
    this._mainFilters = mainFilters;
    this._boardTasks = new BoardTasks();
    this._boardNoTasks = new BoardNoTasks();
    this._loadMoreButton = new LoadMoreButton();

    this._lastCard = null;
    this._lastEditingCard = null;

    this._cardsShown = 0;
    this._tasksCardsPerPage = tasksCardsPerPage;
  }

  init() {
    render(this._container, this._board.getElement());
    render(this._board.getElement(), this._sorting.getElement());

    if (this._tasks.length === 0 || checkFiltersEmptyOrArchived(this._mainFilters)) {
      render(this._board.getElement(), this._boardNoTasks.getElement());
    } else {
      render(this._board.getElement(), this._boardTasks.getElement());

      this._cardsShown += this._tasksCardsPerPage;
      this._renderTaskCards();
      this._renderLoadMoreButton();

      this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
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

  _renderTaskCards() {
    this._getTasksToShow().forEach((taskMock) => this._renderTaskCard(taskMock));
  }

  _renderTaskCard(taskMock) {
    const taskComponent = new TaskCard(taskMock);
    const taskEditComponent = new TaskCardEdit(taskMock);

    const onEscKeyDown = (evt) => {
      if (isEscButton(evt.key)) {
        if (this._boardTasks.getElement().contains(taskEditComponent.getElement())) {
          this._replaceTaskCard(taskComponent.getElement(), taskEditComponent.getElement());
        }
        this._resetLastEditingCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._boardTasks.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        if (this._lastEditingCard) {
          this._replaceTaskCard(this._lastCard, this._lastEditingCard);
        }
        this._lastEditingCard = taskEditComponent.getElement();
        this._lastCard = taskComponent.getElement();

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

        const formData = new FormData(taskEditComponent.getElement().querySelector(`.card__form`));

        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate: new Date(formData.get(`date`)),
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, REPEATING_DAYS)
        };

        // this._tasks[this._tasks.findIndex((it) => it === task)] = entry;

        // this._renderBoard(this._tasks);

        this._replaceTaskCard(taskComponent.getElement(), taskEditComponent.getElement());
        this._resetLastEditingCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        this._replaceTaskCard(taskComponent.getElement(), taskEditComponent.getElement());
        this._resetLastEditingCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._boardTasks.getElement(), taskComponent.getElement());
  }

  _getFormData(component) {
    const formData = new FormData(component.getElement().querySelector(`.card__form`));
    return formData;
  }

  _replaceTaskCard(newCard, oldCard) {
    this._boardTasks.getElement().replaceChild(newCard, oldCard);
  }

  _resetLastEditingCard() {
    this._lastEditingCard = null;
    this._lastCard = null;
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

  _onLoadMoreButtonClick() {
    this._cardsShown += this._tasksCardsPerPage;
    this._renderTaskCards();
    this._renderLoadMoreButton();
  }
}
