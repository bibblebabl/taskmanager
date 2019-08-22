import {getBoardFiltersComponent} from './board-filters';
import {getBoardTasksComponent} from './board-tasks';

import {getLoadMoreButtonComponent} from './load-more-button';

const getBoard = (cardsList) => {
  return `
    <section class="board container">
      ${getBoardFiltersComponent()}
      ${getBoardTasksComponent(cardsList)}
      ${getLoadMoreButtonComponent()}
    </section>
  `;
};

export {
  getBoard
};
