import {getTaskMocks, getMainFiltersList} from './data';
import {TASKS_COUNT, TASKS_CARDS_PER_PAGE, BOARD_SORTING} from './data/constants';

import Menu from './components/menu';
import Search from './components/search';
import Statistic from './components/statistic';
import MainFilters from './components/main-filters';

import {render} from './utils/render';
import BoardController from './controllers/board';

const mockTasks = getTaskMocks(TASKS_COUNT);
const mainFiltersList = getMainFiltersList(mockTasks);

const menuComponent = new Menu();
const searchComponent = new Search();
const mainFiltersComponent = new MainFilters(mainFiltersList);
const statisticComponent = new Statistic();
statisticComponent.getElement().classList.add(`visually-hidden`);

const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

render(controlContainer, menuComponent.getElement());
render(mainContainer, searchComponent.getElement());
render(mainContainer, mainFiltersComponent.getElement());

render(mainContainer, statisticComponent.getElement());

const boardController = new BoardController({
  container: mainContainer,
  tasks: mockTasks,
  sortingList: BOARD_SORTING,
  tasksCardsPerPage: TASKS_CARDS_PER_PAGE,
  mainFilters: mainFiltersList
});

boardController.init();

menuComponent.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  switch (evt.target.id) {
    case `control__task`:
      statisticComponent.getElement().classList.add(`visually-hidden`);
      boardController.show();
      break;
    case `control__statistic`:
      boardController.hide();
      statisticComponent.getElement().classList.remove(`visually-hidden`);
      break;
  }
});
