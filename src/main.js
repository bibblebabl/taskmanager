import {getTaskMocks, getMainFiltersList} from './data';
import {TASKS_COUNT, TASKS_CARDS_PER_PAGE, BOARD_FILTERS} from './data/constants';

import Menu from './components/menu';
import Search from './components/search';
import MainFilters from './components/main-filters';

import {render} from './utils/render';
import BoardController from './controllers/board';

const mockTasks = getTaskMocks(TASKS_COUNT);
const mainFiltersList = getMainFiltersList(mockTasks);

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
  tasks: mockTasks,
  boardFilters: BOARD_FILTERS,
  tasksCardsPerPage: TASKS_CARDS_PER_PAGE,
  mainFilters: mainFiltersList
});

boardController.init();
