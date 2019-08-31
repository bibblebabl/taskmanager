const sortUp = (key) => (a, b) => a[key] - b[key];
const sortDown = (key) => (a, b) => b[key] - a[key];

export const getSortedTasks = (tasks, sortType) => {
  const sort = ({
    'date-up': () => tasks.sort(sortUp(`dueDate`)),
    'date-down': () => tasks.sort(sortDown(`dueDate`)),
  });

  return sort[sortType] ? sort[sortType]() : tasks;
};
