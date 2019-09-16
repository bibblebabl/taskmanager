import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import TaskCard from '../components/task/card';
import TaskCardEdit from '../components/task/card-edit';

import {REPEATING_DAYS} from '../data';

import {RenderPosition, render} from '../utils/render';
import {isEscButton} from '../utils';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export default class TaskController {
  constructor({container, data, mode, onChangeView, onDataChange}) {
    this._container = container;
    this._data = data;

    this._taskCard = new TaskCard(this._data);
    this._taskEditCard = new TaskCardEdit(this._data);

    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this.create(mode);
  }

  create(mode) {
    let renderPosition = RenderPosition.BEFOREEND;
    let currentTaskView = this._taskCard;

    if (mode === Mode.ADDING) {
      renderPosition = RenderPosition.AFTERBEGIN;
      currentTaskView = this._taskEditCard;
    }

    flatpickr(this._taskEditCard.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      altFormat: `F j, Y`,
      dateFormat: `Y-m-d`,
      defaultDate: this._data.dueDate || Date.now()
    });

    const onEscKeyDown = (evt) => {
      if (isEscButton(evt.key)) {
        if (mode === Mode.DEFAULT) {
          if (this._container.contains(this._taskEditCard.getElement())) {
            this._container.replaceChild(this._taskCard.getElement(), this._taskEditCard.getElement());
          }
        } else if (mode === Mode.ADDING) {
          this._container.removeChild(currentTaskView.getElement());
        }

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
        this._container.replaceChild(this._taskEditCard.getElement(), this._taskCard.getElement());

        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEditCard
      .getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        this._container.replaceChild(this._taskCard.getElement(), this._taskEditCard.getElement());
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

        this._onDataChange(entry, mode === Mode.DEFAULT ? this._data : null);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEditCard.getElement()
      .querySelector(`.card__delete`)
      .addEventListener(`click`, () => {
        this._onDataChange(null, this._data);
      });

    render(this._container, currentTaskView.getElement(), renderPosition);
  }

  setDefaultView() {
    if (this._container.contains(this._taskEditCard.getElement())) {
      this._container.replaceChild(this._taskCard.getElement(), this._taskEditCard.getElement());
    }
  }
}
