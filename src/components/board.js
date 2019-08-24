import {getBoardFiltersComponent} from './board-filters';
import {getBoardTasksComponent} from './board-tasks';

const getBoardComponent = () => {
  return `
    <section class="board container">
      ${getBoardFiltersComponent()}
      ${getBoardTasksComponent()}
    </section>
  `;
};

export {
  getBoardComponent
};
