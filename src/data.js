const getRandomTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: new Date(), // уточнить на видео 2:42:18 что за нюанс с date.now
  repeatingDays: {
    Mo: false,
    Tu: false,
    We: Boolean(Math.round(Math.random())),
    Th: false,
    Fr: false,
    Sa: false,
    Su: false
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});


export {
  getRandomTask
};
