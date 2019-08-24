export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getRandomNumber = (maxNumber) => Math.round(Math.random() * maxNumber);

export const getRandomPositiveNegativeNumber = (maxNumber) => {
  const number = getRandomNumber(maxNumber);
  const randomPositiveNegative = Math.random() < 0.5 ? -number : number;
  return randomPositiveNegative;
};

export const getRandomArrayElement = (array) => array[getRandomNumber(array.length - 1)];

export const getRandomArrayElements = (array, length) => {
  return array.slice(0, getRandomNumber(length || array.length - 1));
};
