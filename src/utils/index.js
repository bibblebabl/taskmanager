export const objectHasSomeTruthyValue = (object) => Object.values(object).some((key) => key);

export const isEscButton = (key) => key === `Escape` || key === `Esc`;

export const isEnterButton = (key) => key === `Enter`;
