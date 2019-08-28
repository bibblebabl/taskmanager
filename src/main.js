import {getTaskMocks, getMainFiltersList} from './data';
import {CARDS_COUNT, BOARD_FILTERS} from './data/constants';

import Menu from './components/menu';
import Search from './components/search';
import MainFilters from './components/main-filters';

import {render} from './utils/render';
import BoardController from './controllers/board';

const mockCards = getTaskMocks(CARDS_COUNT);
const mainFiltersList = getMainFiltersList(mockCards);

const menuComponent = new Menu();
const searchComponent = new Search();
const mainFiltersComponent = new MainFilters(mainFiltersList);

const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

render(controlContainer, menuComponent.getElement());
render(mainContainer, searchComponent.getElement());
render(mainContainer, mainFiltersComponent.getElement());

const boardController = new BoardController({
  container: mainContainer,
  tasks: mockCards,
  boardFilters: BOARD_FILTERS,
  mainFilters: mainFiltersList
});

boardController.init();
