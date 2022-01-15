import {
  doughTypes,
  ingredientsTypes,
  saucesTypes,
  sizesTypes,
  miscTypes,
} from "./constans.js";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    type: doughTypes.find(({ name }) => dough.name === name)?.value,
  };
};

export const normalizeIngredients = (ingredients) => {
  return {
    ...ingredients,
    type: ingredientsTypes.find(({ name }) => ingredients.name === name)?.value,
    count: 0,
  };
};

export const normalizeSauces = (sauces) => {
  return {
    ...sauces,
    type: saucesTypes.find(({ name }) => sauces.name === name)?.value,
  };
};

export const normalizeSizes = (sizes) => {
  return {
    ...sizes,
    type: sizesTypes.find(({ name }) => sizes.name === name)?.value,
  };
};

export const normalizeMisc = (misc) => {
  return {
    ...misc,
    type: miscTypes.find(({ name }) => misc.name === name)?.value,
    count: 0,
  };
};
