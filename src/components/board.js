import {createElement} from '../utils/render';

export default class Board {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
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
      <section class="board container">
        <div class="board__filter-list">
          ${this._filters.map((filter) => this.getFilter(filter)).join(``)}
        </div>
        <div class="board__tasks"></div>
      </section>
    `.trim();
  }
}
