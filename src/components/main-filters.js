const getMainFilterElement = ({
  title,
  count,
}, index) => {
  return `
    <input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${index === 0 ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >
  `;
};

const getMainFiltersComponent = (filterList) => {
  return `
    <section class="main__filter filter container">
      ${filterList.map((filter, index) => getMainFilterElement(filter, index)).join(``)}
    </section>
    `.trim();
};

export {
  getMainFiltersComponent
};


