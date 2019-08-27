import AbstractComponent from './abstract-component';


export default class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="board container">
      </section>
    `.trim();
  }
}
