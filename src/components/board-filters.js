import {createElement} from '../utils/render';

const BOARD_FILTERS = [
  `SORT BY DEFAULT`,
  `SORT BY DATE up`,
  `SORT BY DATE down`
];

export default class BoardFilters {
  constructor() {
    this._element = null;

    this._filters = BOARD_FILTERS;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getFilter(filter) {
    return `
      <a href="#" class="board__filter">${filter}</a>
    `.trim();
  }

  getTemplate() {
    return `
      <div class="board__filter-list">
        ${this._filters.map((filter) => this.getFilter(filter)).join(``)}
      </div>
    `.trim();
  }
}
