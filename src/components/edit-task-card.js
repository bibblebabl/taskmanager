import {allColors} from '../data';

const getEditCardComponent = ({
  description,
  dueDate,
  repeatingDays,
  tags,
  color,
  isFavorite,
  isArchive
}) => {
  const isRepeating = Object.keys(repeatingDays).some((day) => repeatingDays[day]);
  return `
    <article class="card card--edit card--${color}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
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
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      value="${new Date(dueDate).toDateString()}"
                      placeholder="23 September"
                      name="date"
                      disabled=${isRepeating}
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                  ${Object.keys(repeatingDays).map((day) => getRepeatingDaysCheckbox(day, repeatingDays[day])).join(``)}
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">

                ${Array.from(tags).map((el) => `#${el}`).join(` `)}
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
              ${allColors.map((colorElement) => getColorRadioInput(colorElement, colorElement === color)).join(``)}
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
    `;
};

const getRepeatingDaysCheckbox = (day, checked, order = 1) => {
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
  `;
};

const getColorRadioInput = (color, checked, order = 1) => {
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
  `;
};


export {
  getEditCardComponent
};
