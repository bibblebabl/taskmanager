import AbstractComponent from '../abstract-component';

export default class BoardFilterList extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getFilter(filter) {
    return `
      <a href="#" data-sort-type=${filter.type} class="board__filter">${filter.title}</a>
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
