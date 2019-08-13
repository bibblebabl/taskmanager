const CARDS_COUNT = 3;

import {getCardsList, getMainFiltersList} from './data';
import {getMenuComponent} from './components/menu';
import {getSearchComponent} from './components/search';
import {getMainFiltersComponent} from './components/main-filters';
import {getBoard} from './components/board';

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
