
import {getTaskMocks, getMainFiltersList} from './data';
import {getMenuComponent} from './components/menu';
import {getSearchComponent} from './components/search';
import {getMainFiltersComponent} from './components/main-filters';
import {getBoard} from './components/board';
import {getBoardTasksComponent} from './components/board-tasks';
import {renderComponent, reRenderComponent, unRender} from './utils';

const CARDS_COUNT = 21;
const CARDS_PER_PAGE = 8;

let cardsCountToShow = CARDS_PER_PAGE;

const cards = getTaskMocks(CARDS_COUNT);
const mainFiltersList = getMainFiltersList(cards);

const onLoadMoreButtonClick = () => {
  const boardTasksElement = document.querySelector(`.board__tasks`);

  if (cardsCountToShow + CARDS_PER_PAGE >= CARDS_COUNT) {
    unRender(loadMoreButton);
  }

  cardsCountToShow += CARDS_PER_PAGE;
  const upatedCardsList = cards.slice(0, cardsCountToShow);

  reRenderComponent(boardTasksElement, getBoardTasksComponent(upatedCardsList));
};

const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

renderComponent(controlContainer, getMenuComponent());
renderComponent(mainContainer, getSearchComponent());
renderComponent(mainContainer, getMainFiltersComponent(mainFiltersList));
renderComponent(mainContainer, getBoard(cards.slice(0, cardsCountToShow)));

const loadMoreButton = document.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
