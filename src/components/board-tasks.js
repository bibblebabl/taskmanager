import {getTasksComponents} from './tasks-cards';
import {getTaskCardEditComponent} from './task-card-edit';

const getBoardTasksComponent = (cardsList) => {
  const [first, ...rest] = cardsList;
  return `
    <div class="board__tasks">
      ${getTaskCardEditComponent(first)}
      ${getTasksComponents(rest)}
    </div>
  `;
};

export {
  getBoardTasksComponent
};
