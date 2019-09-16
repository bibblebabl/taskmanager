import {getTaskMocks, getMainFiltersList} from './data';
import {TASKS_COUNT} from './data/constants';

import Menu from './components/menu';
import Search from './components/search';
import Statistic from './components/statistic';
import MainFilters from './components/main-filters';

import {render} from './utils/render';
import {checkFiltersEmptyOrArchived} from './utils';
import BoardController from './controllers/board';
import SearchController from './controllers/search';

let mockTasks = getTaskMocks(TASKS_COUNT);
const mainFilters = getMainFiltersList(mockTasks);

const menuComponent = new Menu();
const searchComponent = new Search();
const mainFiltersComponent = new MainFilters(mainFilters);
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

const boardController = new BoardController(mainContainer, checkFiltersEmptyOrArchived(mainFilters), onDataChange);

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

  const menuItems = {
    "control__task": () => {
      statisticComponent.getElement().classList.add(`visually-hidden`);
      searchController.hide();
      boardController.show(mockTasks);
    },
    "control__statistic": () => {
      boardController.hide();
      searchController.hide();
      statisticComponent.getElement().classList.remove(`visually-hidden`);
    },
    "control__new-task": () => {
      boardController.createTask();
      boardController.show(mockTasks);
      menuComponent.getElement().querySelector(`#control__task`).checked = true;
    }
  };

  menuItems[evt.target.id]();
});


searchComponent.getElement().addEventListener(`click`, () => {
  statisticComponent.getElement().classList.add(`visually-hidden`);
  boardController.hide();
  searchController.show(mockTasks);
});
