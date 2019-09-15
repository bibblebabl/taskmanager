import {getTaskMocks, getMainFiltersList} from './data';
import {TASKS_COUNT, TASKS_CARDS_PER_PAGE, BOARD_SORTING} from './data/constants';

import Menu from './components/menu';
import Search from './components/search';
import Statistic from './components/statistic';
import MainFilters from './components/main-filters';

import {render} from './utils/render';
import {checkFiltersEmptyOrArchived} from './utils';
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
  sortingList: BOARD_SORTING,
  tasksCardsPerPage: TASKS_CARDS_PER_PAGE,
  filtersEmptyOrArchived: checkFiltersEmptyOrArchived(mainFiltersList)
});

boardController.show(mockTasks);

menuComponent.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  const tasksId = `control__task`;
  const statisticId = `control__statistic`;
  const newTaskId = `control__new-task`;

  switch (evt.target.id) {
    case tasksId:
      statisticComponent.getElement().classList.add(`visually-hidden`);
      boardController.show();
      break;
    case statisticId:
      boardController.hide();
      statisticComponent.getElement().classList.remove(`visually-hidden`);
      break;
    case newTaskId:
      boardController.createTask();
      menuComponent.getElement().querySelector(`#${tasksId}`).checked = true;
      break;
  }
});
