import {ALL_COLORS} from '../../data/constants';
import {REPEATING_DAYS} from '../../data';
import AbstractComponent from '../abstract-component';

import {isEnterButton, objectHasSomeTruthyValue, getDateMonthFormated} from '../../utils';


export default class TaskCardEdit extends AbstractComponent {
  constructor({description, dueDate, tags, color, repeatingDays, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._tags = tags;
    this._color = color;
    this._currentColor = color;
    this._repeatingDays = repeatingDays;

    this._isFavorite = isFavorite;
    this._isArchive = isArchive;

    this._onHashtagInputKeydown = this._onHashtagInputKeydown.bind(this);
    this._onDeadlineToggleClick = this._onDeadlineToggleClick.bind(this);
    this._onRepeatToggleClick = this._onRepeatToggleClick.bind(this);
    this._onColorInputChange = this._onColorInputChange.bind(this);

    this._subscribeOnEvents();
  }

  _getRepeatingDays(days) {
    return Object.entries(days).map(([day, value]) => this._getRepeatingDaysCheckbox(day, value)).join(``);
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
    const dueDateValue = this._dueDate ? getDateMonthFormated(this._dueDate) : null;

    return `
      <article class="card card--edit card--${this._color} ${isRepeating ? `card--repeat` : ``}">
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
            <svg class="card__color-bar-wave" width="100%" height="10">
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
                  date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        value="${dueDateValue}"
                        placeholder="23 September"
                        name="date"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days" ${isRepeating ? `` : `disabled`}>
                    <div class="card__repeat-days-inner">
                    ${this._getRepeatingDays(this._repeatingDays)}
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
      .addEventListener(`keydown`, this._onHashtagInputKeydown);

    this.getElement()
      .querySelector(`.card__hashtag-list`)
      .addEventListener(`click`, this._onHashtagListClick);

    this.getElement()
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onDeadlineToggleClick);

    this.getElement()
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onRepeatToggleClick);

    const colorInputs = this.getElement()
      .querySelectorAll(`.card__color-input`);

    colorInputs.forEach((input) => input.addEventListener(`change`, this._onColorInputChange));
  }

  _onHashtagInputKeydown(evt) {
    if (isEnterButton(evt.key)) {
      evt.preventDefault();
      this.getElement()
        .querySelector(`.card__hashtag-list`)
        .insertAdjacentHTML(`beforeend`,
            this._getCardHashtag(evt.target.value));
      evt.target.value = ``;
    }
  }

  _onHashtagListClick(evt) {
    evt.preventDefault();
    if (evt.target.className === `card__hashtag-delete`) {
      evt.target.parentNode.remove();
    }
  }

  _onDeadlineToggleClick(evt) {
    evt.preventDefault();

    const dateDeadlineElement = this.getElement().querySelector(`.card__date-deadline`);
    const dateStatusElement = this.getElement().querySelector(`.card__date-status`);
    const dateInputElement = this.getElement().querySelector(`.card__date`);

    if (dateDeadlineElement.hasAttribute(`disabled`)) {
      dateDeadlineElement.removeAttribute(`disabled`);
      dateStatusElement.innerHTML = `yes`;
      const dueDateValue = this._dueDate || Date.now();
      dateInputElement.value = new Date(dueDateValue).toDateString();
    } else {
      dateDeadlineElement.setAttribute(`disabled`, `disabled`);
      dateStatusElement.innerHTML = `no`;
      dateInputElement.value = null;
    }
  }

  _onRepeatToggleClick(evt) {
    evt.preventDefault();
    const cardEdit = this.getElement();
    const repeatingDaysElement = this.getElement().querySelector(`.card__repeat-days`);
    const repeatStatusElement = this.getElement().querySelector(`.card__repeat-status`);
    const repeatDaysInner = this.getElement().querySelector(`.card__repeat-days-inner`);

    if (repeatingDaysElement.hasAttribute(`disabled`)) {
      repeatingDaysElement.removeAttribute(`disabled`);
      repeatStatusElement.innerHTML = `yes`;
      repeatDaysInner.innerHTML = ``;
      repeatDaysInner.insertAdjacentHTML(`beforeend`, this._getRepeatingDays(this._repeatingDays));
      cardEdit.classList.add(`card--repeat`);
    } else {
      repeatingDaysElement.setAttribute(`disabled`, `disabled`);
      repeatStatusElement.innerHTML = `no`;
      repeatDaysInner.innerHTML = ``;
      repeatDaysInner.insertAdjacentHTML(`beforeend`, this._getCardHashtag(REPEATING_DAYS));
      cardEdit.classList.remove(`card--repeat`);
    }
  }

  _onColorInputChange(evt) {
    evt.preventDefault();
    const cardEditElement = this.getElement();

    cardEditElement.classList = ``;
    cardEditElement.classList.add(`card`, `card--edit`, `card--${evt.target.value}`);

    this._newColor = evt.target.value;
  }
}
