import {getTaskMocks, getMainFiltersList} from './data';
import {TASKS_COUNT, TASKS_CARDS_PER_PAGE, BOARD_SORTING} from './data/constants';

import Menu from './components/menu';
import Search from './components/search';
import Statistic from './components/statistic';
import MainFilters from './components/main-filters';

import {render} from './utils/render';
import {checkFiltersEmptyOrArchived} from './utils';
import BoardController from './controllers/board';
import SearchController from './controllers/search';

const mockTasks = getTaskMocks(TASKS_COUNT);
const mainFiltersList = getMainFiltersList(mockTasks);

const menuComponent = new Menu();
const searchComponent = new Search();
const mainFiltersComponent = new MainFilters(mainFiltersList);
const statisticComponent = new Statistic();

const onDataChange = (tasks) => {
  mockTasks = tasks;
};

statisticComponent.getElement().classList.add(`visually-hidden`);

const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

render(controlContainer, menuComponent.getElement());
render(mainContainer, searchComponent.getElement());
render(mainContainer, mainFiltersComponent.getElement());

render(mainContainer, statisticComponent.getElement());

const boardController = new BoardController({
  container: mainContainer,
  filtersEmptyOrArchived: checkFiltersEmptyOrArchived(mainFiltersList),
  onDataChangeMain: onDataChange
});

const onSearchBackButtonClick = () => {
  statisticComponent.getElement().classList.add(`visually-hidden`);
  searchController.hide();
  boardController.show(mockTasks);
};

const searchController = new SearchController({
  container: mainContainer,
  searchComponent,
  onBackButtonClick: onSearchBackButtonClick,
  onDataChange
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

searchComponent.getElement().addEventListener(`click`, () => {
  statisticComponent.getElement().classList.add(`visually-hidden`);
  boardController.hide();
  searchController.show(mockTasks);
});
