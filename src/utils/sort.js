const sortUp = (key) => (a, b) => a[key] - b[key];
const sortDown = (key) => (a, b) => b[key] - a[key];

const sort = (tasks) => ({
  "date-up": () => tasks.sort(sortUp(`dueDate`)),
  "date-down": () => tasks.sort(sortDown(`dueDate`)),
});

export const getSortedTasks = (tasks, sortType) => {
  const sortTasks = sort(tasks);
  return sortTasks[sortType] ? sortTasks[sortType]() : tasks;
};
