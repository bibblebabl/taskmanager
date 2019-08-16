import {getTasksComponents} from './tasks-cards';
import {getEditCardComponent} from './edit-task-card';

const getBoardTasks = (cardsList) => {
  const [first, ...rest] = cardsList;
  return `
    <div class="board__tasks">
      ${getEditCardComponent(first)}
      ${getTasksComponents(rest)}
    </div>
  `;
};

export {
  getBoardTasks
};
