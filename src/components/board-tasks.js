import AbstractComponent from './abstract-component';


export default class BoardTasks extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return `
      <div class="board__tasks"></div>
    `.trim();
  }
}
