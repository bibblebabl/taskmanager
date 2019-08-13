import {getBoardFiltersComponent} from './board-filters';
import {getTasksComponents} from './tasks-cards';
import {getEditCardComponent} from './edit-task-card';
import {getLoadMoreButtonComponent} from './load-more-button';

const getBoard = (cardsCount, getRandomTask) => {
  return `
    <section class="board container">
      ${getBoardFiltersComponent()}
      <div class="board__tasks">
        ${getEditCardComponent()}
        ${getTasksComponents(cardsCount, getRandomTask)}
      </div>
      ${getLoadMoreButtonComponent()}
    </section>
    `;
};

export {
  getBoard
};
