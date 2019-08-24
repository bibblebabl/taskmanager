import {createElement} from '../utils/render';

export default class MainFilters {
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

  getMainFilterElement({title, count}, index) {
    return `
      <input
        type="radio"
        id="filter__${title}"
        class="filter__input visually-hidden"
        name="filter"
        ${index === 0 ? `checked` : ``}
        ${count === 0 ? `disabled` : ``}
      />
      <label for="filter__${title}" class="filter__label">
        ${title} <span class="filter__${title}-count">${count}</span></label
      >
    `.trim();
  }

  getTemplate() {
    return `
    <section class="main__filter filter container">
      ${this._filters.map((filter, index) => this.getMainFilterElement(filter, index)).join(``)}
    </section>
    `.trim();
  }
}


