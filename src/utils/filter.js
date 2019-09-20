export const filters = (task) => {
  const currentDate = new Date();

  return {
    "overdue": () => (task.dueDate < currentDate),
    "today": () => (new Date(task.dueDate).toDateString() === currentDate.toDateString()),
    "favorites": () => (task.isFavorite),
    "archive": () => (task.isArchive),
    "repeating": () => (Object.values(task.repeatingDays).some((day) => day)),
    "tags": () => (task.tags.size),
  };
};

export const getFilteredTasks = (tasks, filter) => {
  const filterTasks = filters(tasks);
  return filterTasks[filter] ? filterTasks[filter]() : tasks;
};
