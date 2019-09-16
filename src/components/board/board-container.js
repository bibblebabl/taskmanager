import AbstractComponent from '../abstract-component';

export default class BoardContainer extends AbstractComponent {
  getTemplate() {
    return `
      <section class="board container"></section>
    `.trim();
  }
}
