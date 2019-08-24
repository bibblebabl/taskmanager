import {getTaskMocks, getMainFiltersList} from './data';

import Menu from './components/menu';
import Search from './components/search';
import MainFilters from './components/main-filters';
import Board from './components/board';
import BoardFilters from './components/board-filters';
import {renderCardTasksComponents} from './components/tasks-cards';
import LoadMoreButton from './components/load-more-button';

import {render, unRender, Position} from './utils/render';

const CARDS_COUNT = 21;
const CARDS_PER_PAGE = 8;
let cardsShown = 0;

let cardsCountToShow = CARDS_PER_PAGE;

const mockCards = getTaskMocks(CARDS_COUNT);
const mainFiltersList = getMainFiltersList(mockCards);

const menuComponent = new Menu();
const searchComponent = new Search();
const mainFiltersComponent = new MainFilters(mainFiltersList);

const boardComponent = new Board();
const boardFiltersComponent = new BoardFilters();
const loadMoreButtonComponent = new LoadMoreButton();

const onLoadMoreButtonClick = () => {
  cardsCountToShow += CARDS_PER_PAGE;
  const upatedCardsList = mockCards.slice(cardsShown, cardsCountToShow);
  cardsShown += CARDS_PER_PAGE;

  unRender(loadMoreButtonElement);
  renderCardTasksComponents(upatedCardsList, boardTasksContainer);

  if (cardsShown <= CARDS_COUNT) {
    render(boardTasksContainer, loadMoreButtonComponent.getElement());
  }
};

const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

render(controlContainer, menuComponent.getElement());
render(mainContainer, searchComponent.getElement());
render(mainContainer, mainFiltersComponent.getElement());
render(mainContainer, boardComponent.getElement());

const boardContainer = document.querySelector(`.board`);
const boardTasksContainer = document.querySelector(`.board__tasks`);

render(boardContainer, boardFiltersComponent.getElement(), Position.AFTERBEGIN);
renderCardTasksComponents(mockCards.slice(0, cardsCountToShow), boardTasksContainer);

cardsShown += cardsCountToShow;

render(boardTasksContainer, loadMoreButtonComponent.getElement());

const loadMoreButtonElement = document.querySelector(`.load-more`);
loadMoreButtonElement.addEventListener(`click`, onLoadMoreButtonClick);
