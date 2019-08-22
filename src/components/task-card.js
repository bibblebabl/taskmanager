import {createElement} from '../utils';

const getTaskCardComponent = ({
  description,
  dueDate,
  repeatingDays,
  tags,
  color,
  isFavorite,
  isArchive
}) => {
  const isRepeating = Object.values(repeatingDays).some((day) => day);
  const dueDateString = dueDate ? new Date(dueDate) : ``;
  const isAfterDeadline = dueDate && dueDate < Date.now();

  return `
    <article class="card
     card--${color}
     ${isAfterDeadline ? `card--deadline` : ``}
     ${isRepeating ? `card--repeat` : ``}
    ">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${isArchive ? `card__btn--disabled` : ``}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${isFavorite ? `card__btn--disabled` : ``}"
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
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${dueDateString ? dueDateString.toDateString() : ``}</span>
                    <span class="card__time">${dueDateString ? dueDateString.toTimeString().slice(0, 5) : ``}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${Array.from(tags).map((tag) => getCardHashtag(tag)).join(``)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    `.trim();
};

const getCardHashtag = (tag) => {
  return `
  <span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${tag}
    </span>
  </span>
  `.trim();
};

class TaskCard {
  constructor({description, dueDate, tags, color, repeatingDays, isFavorite, isArchive}) {
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;

    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    const isRepeating = Object.values(this.repeatingDays).some((day) => day);
    const dueDateString = this.dueDate ? new Date(this.dueDate) : ``;
    const isAfterDeadline = this.dueDate && this.dueDate < Date.now();

    return `
      <article class="card card--${this.color} ${isAfterDeadline ? `card--deadline` : ``} ${isRepeating ? `card--repeat` : ``}">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive ${this.isArchive ? `card__btn--disabled` : ``}">
                archive
              </button>
              <button type="button" class="card__btn card__btn--favorites ${this.isFavorite ? `card__btn--disabled` : ``}">
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <p class="card__text">${this.description}</p>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date">${dueDateString ? dueDateString.toDateString() : ``}</span>
                      <span class="card__time">${dueDateString ? dueDateString.toTimeString().slice(0, 5) : ``}</span>
                    </p>
                  </div>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                  ${Array.from(this.tags).map((tag) => getCardHashtag(tag)).join(``)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>`;
  }
}

export {
  getTaskCardComponent,
  TaskCard
};
