import {getBoardFiltersComponent} from './board-filters';
import {getBoardTasks} from './board-tasks';

import {getLoadMoreButtonComponent} from './load-more-button';

const getBoard = (cardsList) => {
  return `
  <section class="board container">
    ${getBoardFiltersComponent()}
    ${getBoardTasks(cardsList)}
    ${getLoadMoreButtonComponent()}
  </section>
  `;
};

export {
  getBoard
};
