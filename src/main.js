const CARDS_COUNT = 8;

import {getCardsList, getMainFiltersList} from './data';
import {getRandomNumber} from './utils';
import {getMenuComponent} from './components/menu';
import {getSearchComponent} from './components/search';
import {getMainFiltersComponent} from './components/main-filters';
import {getBoard} from './components/board';
import {getTasksComponents} from './components/tasks-cards';


const cardsList = getCardsList(CARDS_COUNT);
const mainFiltersList = getMainFiltersList(cardsList);

const renderComponent = (container, component) => {
  container.insertAdjacentHTML(`beforeend`, component);
};

const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

renderComponent(controlContainer, getMenuComponent());
renderComponent(mainContainer, getSearchComponent());
renderComponent(mainContainer, getMainFiltersComponent(mainFiltersList));
renderComponent(mainContainer, getBoard(cardsList));

const boardTasksContainer = document.querySelector(`.board__tasks`);
const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const moreCards = getCardsList(getRandomNumber(8));
  renderComponent(boardTasksContainer, getTasksComponents(moreCards));
});
