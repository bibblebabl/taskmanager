const getMainFilterElement = ({
  id,
  label,
  count,
  checked,
  disabled
}) => {
  return `
    <input
      type="radio"
      id="filter__${id}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked ? `checked` : ``}
      ${disabled ? `disabled` : ``}
    />
    <label for="filter__${id}" class="filter__label">
      ${label} <span class="filter__${id}-count">${count}</span></label
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


