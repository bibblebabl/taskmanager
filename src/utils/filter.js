export const filters = () => {
  const currentDate = new Date();

  return {
    "overdue": (task) => (task.dueDate < currentDate),
    "today": (task) => (new Date(task.dueDate).toDateString() === currentDate.toDateString()),
    "favorites": (task) => (task.isFavorite),
    "archive": (task) => (task.isArchive),
    "repeating": (task) => (Object.values(task.repeatingDays).some((day) => day)),
    "tags": (task) => (task.tags.size),
  };
};

export const getFilteredTasks = (tasks, filter) => {
  const selectedFilter = filters()[filter];

  if (selectedFilter) {
    return tasks.filter((task) => selectedFilter(task));
  }
  return tasks;
};
