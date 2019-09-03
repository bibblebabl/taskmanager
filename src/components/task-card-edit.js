import {ALL_COLORS} from '../data/constants';
import AbstractComponent from './abstract-component';

import {isEnterButton, objectHasSomeTruthyValue} from '../utils';

export default class TaskCardEdit extends AbstractComponent {
  constructor({description, dueDate, tags, color, repeatingDays, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;

    this._isFavorite = isFavorite;
    this._isArchive = isArchive;

    this._subscribeOnEvents();
  }

  _getRepeatingDays() {
    return Object.entries(this._repeatingDays).map(([day, value]) => this._getRepeatingDaysCheckbox(day, value)).join(``);
  }

  _getRepeatingDaysCheckbox(day, checked, order = 1) {
    const dayLowerCased = day.toLowerCase();
    return `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${dayLowerCased}-${order}"
        name="repeat"
        value="${dayLowerCased}"
        ${checked ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${dayLowerCased}-${order}"
        >${dayLowerCased}</label
      >
    `.trim();
  }

  _getColorRadioInput(color, checked, order = 1) {
    return `
      <input
        type="radio"
        id="color-${color}-${order}"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${checked ? `checked` : ``}
      />
      <label
        for="color-${color}-${order}"
        class="card__color card__color--${color}"
        >${color}</label
      >
    `.trim();
  }

  _getCardHashtag(tag) {
    return `
      <span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="${tag}"
          class="card__hashtag-hidden-input"
        />
        <p class="card__hashtag-name">
        #${tag}
        </p>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>`
      .trim();
  }

  getTemplate() {
    const isRepeating = objectHasSomeTruthyValue(this._repeatingDays);
    const dueDateFormated = this._dueDate ? this._dueDate.toDateString() : null;

    return `
      <article class="card card--edit card--${this._color}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._dueDate !== null ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        value="${dueDateFormated}"
                        placeholder="23 September"
                        name="date"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                    ${this._getRepeatingDays()}
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">

                  ${Array.from(this._tags).map((el) => this._getCardHashtag(el)).join(``)}
                  </div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                ${ALL_COLORS.map((colorElement) => this._getColorRadioInput(colorElement, colorElement === this._color)).join(``)}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `.trim();
  }

  _subscribeOnEvents() {
    this.getElement()
      .querySelector(`.card__hashtag-input`)
      .addEventListener(`keydown`, (evt) => {
        if (isEnterButton(evt.key)) {
          evt.preventDefault();
          this.getElement()
            .querySelector(`.card__hashtag-list`)
            .insertAdjacentHTML(`beforeend`,
                this._getCardHashtag(evt.target.value));
          evt.target.value = ``;
        }
      });
  }
}
