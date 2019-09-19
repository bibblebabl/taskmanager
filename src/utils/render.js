export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const classListActions = {
  'REMOVE': `remove`,
  'ADD': `add`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;

    default:
      container.append(element);
      break;
  }
};

export const removeComponent = (element) => {
  if (element) {
    element.remove();
  }
};

export const toggleVisuallyHidden = (element, action) => {
  if (action === classListActions.ADD) {
    element.classList.add(`visually-hidden`);
  } else {
    element.classList.remove(`visually-hidden`);
  }
};
