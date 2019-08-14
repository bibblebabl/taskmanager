const getMainFilterElement = ({
  title,
  count,
  checked,
  disabled
}) => {
  return `
    <input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked ? `checked` : ``}
      ${disabled ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >
  `;
};

const getMainFiltersComponent = (filterList) => {
  return `
    <section class="main__filter filter container">
      ${filterList.map((filter) => getMainFilterElement(filter)).join(``)}
    </section>
    `.trim();
};

export {
  getMainFiltersComponent
};


