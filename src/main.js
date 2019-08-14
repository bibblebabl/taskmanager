
import {getCardsList, getMainFiltersList} from './data';
import {getMenuComponent} from './components/menu';
import {getSearchComponent} from './components/search';
import {getMainFiltersComponent} from './components/main-filters';
import {getBoard} from './components/board';
import {getBoardTasks} from './components/board-tasks';

const CARDS_COUNT = 21;
const CARDS_PER_PAGE = 8;

let cardsCountToShow = CARDS_PER_PAGE;

const renderComponent = (container, component) => {
  container.insertAdjacentHTML(`beforeend`, component);
};

const reRenderComponent = (target, component) => {
  target.innerHTML = component;
};

const loadMoreCards = () => {
  const boardTasksElement = document.querySelector(`.board__tasks`);

  if (cardsCountToShow + CARDS_PER_PAGE >= CARDS_COUNT) {
    loadMoreButtonElement.remove();
  }

  cardsCountToShow += CARDS_PER_PAGE;
  const upatedCardsList = cardsList.slice(0, cardsCountToShow);

  reRenderComponent(boardTasksElement, getBoardTasks(upatedCardsList));
};

const cardsList = getCardsList(CARDS_COUNT);
const mainFiltersList = getMainFiltersList(cardsList);


const mainContainer = document.querySelector(`.main`);
const controlContainer = document.querySelector(`.main__control`);

renderComponent(controlContainer, getMenuComponent());
renderComponent(mainContainer, getSearchComponent());
renderComponent(mainContainer, getMainFiltersComponent(mainFiltersList));
renderComponent(mainContainer, getBoard(cardsList.slice(0, cardsCountToShow)));

const loadMoreButtonElement = document.querySelector(`.load-more`);
loadMoreButtonElement.addEventListener(`click`, loadMoreCards);
