import AbstractComponent from './abstract-component';

export default class Search extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="main__search search container">
        <input
          type="text"
          id="search__input"
          class="search__input"
          placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
        />
        <label class="visually-hidden" for="search__input">Search</label>
      </section>
    `.trim();
  }
}
