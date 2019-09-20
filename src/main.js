import {getTaskMocks, getMainFiltersList} from './data';
import {TASKS_COUNT} from './data/constants';

// Components
import Menu from './components/menu';
import Search from './components/search';
import MainFilters from './components/main-filters';

// Controllers
import BoardController from './controllers/board';
import SearchController from './controllers/search';
import StatisticController from './controllers/statistic';

// Utils
import {checkFiltersEmptyOrArchived} from './utils/statistic';
import {render} from './utils/render';

let mockTasks = getTaskMocks(TASKS_COUNT);
const mainFilters = getMainFiltersList(mockTasks);

const menuComponent = new Menu();
const searchComponent = new Search();
const mainFiltersComponent = new MainFilters(mainFilters);

const onDataChange = (tasks) => {
  mockTasks = tasks;
};

const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

render(controlContainer, menuComponent.getElement());
render(mainContainer, searchComponent.getElement());
render(mainContainer, mainFiltersComponent.getElement());

const statisticController = new StatisticController({
  container: mainContainer
});

const boardController = new BoardController(mainContainer, checkFiltersEmptyOrArchived(mainFilters), onDataChange);

const onSearchBackButtonClick = () => {
  statisticController.hide();
  searchController.hide();
  boardController.show(mockTasks);
};

const searchController = new SearchController({
  container: mainContainer,
  searchComponent,
  onBackButtonClick: onSearchBackButtonClick,
  onDataChange
});

statisticController.hide();

boardController.show(mockTasks);

menuComponent.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  const menuItems = {
    "control__task": () => {
      statisticController.hide();
      searchController.hide();
      boardController.show(mockTasks);
    },
    "control__statistic": () => {
      boardController.hide();
      searchController.hide();
      statisticController.show(mockTasks);
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
  statisticController.hide();
  boardController.hide();
  searchController.show(mockTasks);
});
