const getTaskCardComponent = ({
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
    <article class="card card--${color} ${isRepeating ? `card--repeat` : ``}">
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
                    <span class="card__date">${new Date(dueDate).toDateString()}</span>
                    <span class="card__time">${new Date(dueDate).toTimeString().slice(0, 5)}</span>
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

export {
  getTaskCardComponent
};
