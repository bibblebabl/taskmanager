import AbstractComponent from './abstract-component';


export default class Board extends AbstractComponent {
  getTemplate() {
    return `
      <section class="board container"></section>
    `.trim();
  }
}
