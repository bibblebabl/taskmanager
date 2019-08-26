export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element) => {
  container.append(element);
};

export const removeComponent = (element) => {
  if (element) {
    element.remove();
  }
};
