const getMainFilterElement = ({
  label,
  count,
  checked,
  disabled
}) => {
  return `
    <input
      type="radio"
      id="filter__${label.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked ? `checked` : ``}
      ${disabled ? `disabled` : ``}
    />
    <label for="filter__${label.toLowerCase()}" class="filter__label">
      ${label} <span class="filter__${label.toLowerCase()}-count">${count}</span></label
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


