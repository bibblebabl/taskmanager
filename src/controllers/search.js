import {render, removeComponent, RenderPosition} from '../utils/render';

import SearchResult from '../components/search/result';
import SearchResultInfo from '../components/search/result-info';
import SearchResultGroup from '../components/search/result-group';

import TaskListController from './task-list';

export default class SearchController {
  constructor({container, searchComponent, onBackButtonClick, onDataChange}) {
    this._container = container;
    this._searchComponent = searchComponent;
    this._onBackButtonClick = onBackButtonClick;
    this._onDataChangeMain = onDataChange;

    this._tasks = [];

    this._searchResult = new SearchResult();
    this._searchResultInfo = new SearchResultInfo({});
    this._searchResultGroup = new SearchResultGroup({});
    this._taskListController = new TaskListController({
      container: this._searchResultGroup.getElement().querySelector(`.result__cards`),
      onDataChangeMain: this._onDataChange.bind(this)
    });

    this._init();
  }

  _init() {
    this.hide();

    render(this._container, this._searchResult.getElement());
    render(this._searchResult.getElement(), this._searchResultGroup.getElement());
    render(this._searchResultGroup.getElement(), this._searchResultInfo.getElement(), RenderPosition.AFTERBEGIN);

    this._searchResult.getElement().querySelector(`.result__back`)
      .addEventListener(`click`, () => {
        this._searchComponent.getElement().querySelector(`input`).value = ``;
        this._onBackButtonClick();
      });
    this._searchComponent.getElement().querySelector(`input`)
      .addEventListener(`keyup`, (evt) => {
        const {value} = evt.currentTarget;
        const tasks = this._tasks.filter((task) => task.description.includes(value));

        this._showSearchResult(value, tasks);
      });
  }

  hide() {
    this._searchResult.getElement().classList.add(`visually-hidden`);
  }

  show(tasks) {
    this._tasks = tasks;

    if (this._searchResult.getElement().classList.contains(`visually-hidden`)) {
      this._showSearchResult(``, this._tasks);
      this._searchResult.getElement().classList.remove(`visually-hidden`);
    }
  }

  _showSearchResult(text, tasks) {
    if (this._searchResultInfo) {
      removeComponent(this._searchResultInfo.getElement());
      this._searchResultInfo.removeElement();
    }

    this._searchResultInfo = new SearchResultInfo({title: text, count: tasks.length});

    render(this._searchResultGroup.getElement(), this._searchResultInfo.getElement(), RenderPosition.AFTERBEGIN);

    this._taskListController.setTasks(tasks);
  }

  _onDataChange(tasks) {
    this._tasks = tasks;
    this._onDataChangeMain(this._tasks);
  }
}
