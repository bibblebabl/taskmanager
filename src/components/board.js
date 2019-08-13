import {getBoardFiltersComponent} from './board-filters';
import {getTasksComponents} from './tasks-cards';
import {getEditCardComponent} from './edit-task-card';
import {getLoadMoreButtonComponent} from './load-more-button';

const getBoard = (cardsList) => {
  const [first, ...rest] = cardsList;

  return `
    <section class="board container">
      ${getBoardFiltersComponent()}
      <div class="board__tasks">
        ${getEditCardComponent(first)}
        ${getTasksComponents([...rest])}
      </div>
      ${getLoadMoreButtonComponent()}
    </section>
    `;
};

export {
  getBoard
};
