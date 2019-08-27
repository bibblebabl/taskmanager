import AbstractComponent from './abstract-component';


export default class Board extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
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
      </section>
    `.trim();
  }
}
