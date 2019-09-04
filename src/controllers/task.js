import TaskCard from '../components/task-card';
import TaskCardEdit from '../components/task-card-edit';

import {REPEATING_DAYS} from '../data';

import {render} from '../utils/render';
import {isEscButton} from '../utils';

export default class TaskController {
  constructor(container, data, onChangeView, onDataChange) {
    this._container = container;
    this._data = data;

    this._taskCard = new TaskCard(data);
    this._taskEditCard = new TaskCardEdit(data);

    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this.create();
  }

  create() {
    const onEscKeyDown = (evt) => {
      if (isEscButton(evt.key)) {
        this._container.getElement().replaceChild(this._taskCard.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._taskEditCard.getElement()
      .querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEditCard.getElement()
      .querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });


    this._taskCard.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onChangeView();
        this._container.getElement().replaceChild(this._taskEditCard.getElement(), this._taskCard.getElement());

        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEditCard
      .getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        this._container.getElement().replaceChild(this._taskCard.getElement(), this._taskEditCard.getElement());
      });

    this._taskEditCard.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const formData = new FormData(this._taskEditCard.getElement().querySelector(`.card__form`));

        const dueDate = formData.get(`date`) ? new Date(formData.get(`date`)).getTime() : null;

        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate,
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, REPEATING_DAYS)
        };

        this._onDataChange(entry, this._data);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container.getElement(), this._taskCard.getElement());
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEditCard.getElement())) {
      this._container.getElement().replaceChild(this._taskCard.getElement(), this._taskEditCard.getElement());
    }
  }
}
