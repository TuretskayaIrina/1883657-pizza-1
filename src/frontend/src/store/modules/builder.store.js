import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import {
  SET_DOUGH,
  SET_INGREDIENTS,
  SET_SAUCES,
  SET_SIZES,
  UPDATE_PIZZA_NAME,
  UPDATE_PIZZA_DOUGH,
  UPDATE_PIZZA_SAUCE,
  UPDATE_PIZZA_SIZE,
  UPDATE_PIZZA_INGREDIENT_COUNT,
  RESET_PIZZA,
} from "@/store/mutation-types.js";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSizes,
} from "@/common/helpers.js";

export default {
  namespaced: true,
  state: {
    dough: [],
    ingredients: [],
    sauces: [],
    sizes: [],
    pizza: {
      name: "",
      dough: dough[0],
      sauce: sauces[0],
      size: sizes[0],
      ingredients: [],
    },
  },
  getters: {
    allDough(state) {
      return state.dough;
    },
    allIngredients(state) {
      return state.ingredients;
    },
    allSauces(state) {
      return state.sauces;
    },
    allSizes(state) {
      return state.sizes;
    },
    selectedPizza(state) {
      const pizza = {
        name: state.pizza.name,
        dough: state.pizza.dough,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.count > 0
        ),
        sauce: state.pizza.sauce,
        size: state.pizza.size,
      };

      return pizza;
    },
    costPizza(state) {
      const multiplier = state.pizza.size.multiplier;
      const priceDough = state.pizza.dough.price;
      const priceSauce = state.pizza.sauce.price;

      const priceIngredients = state.pizza.ingredients.reduce((cost, item) => {
        cost += item.count * item.price;
        return cost;
      }, 0);

      return multiplier * (priceDough + priceSauce + priceIngredients);
    },
  },
  mutations: {
    [SET_DOUGH](state, payload) {
      state.dough = payload;
    },
    [SET_INGREDIENTS](state, payload) {
      state.ingredients = payload;
    },
    [SET_SAUCES](state, payload) {
      state.sauces = payload;
    },
    [SET_SIZES](state, payload) {
      state.sizes = payload;
    },
    [UPDATE_PIZZA_NAME](state, payload) {
      state.pizza.name = payload;
    },
    [UPDATE_PIZZA_DOUGH](state, payload) {
      state.pizza.dough = state.dough.find((item) => item.type === payload);
    },
    [UPDATE_PIZZA_SAUCE](state, payload) {
      state.pizza.sauce = state.sauces.find((item) => item.type === payload);
    },
    [UPDATE_PIZZA_SIZE](state, payload) {
      state.pizza.size = state.sizes.find((item) => item.type === payload);
    },
    [UPDATE_PIZZA_INGREDIENT_COUNT](state, { type, count }) {
      const selectedIngredient = state.ingredients.find(
        (ingredient) => ingredient.type === type
      );
      if (selectedIngredient) {
        selectedIngredient.count = count;
      }
    },
    [RESET_PIZZA](state) {
      state.pizza = {
        name: "",
        dough: dough[0],
        sauce: sauces[0],
        size: sizes[0],
        ingredients: [],
      };

      state.ingredients = state.ingredients.map((item) => {
        return { ...item, count: 0 };
      });
    },
  },
  actions: {
    queryDough({ commit }) {
      const allDough = dough.map((dough) => normalizeDough(dough));
      commit(SET_DOUGH, allDough);
    },
    queryIngredients({ commit }) {
      const allIngredients = ingredients.map((ingredient) =>
        normalizeIngredients(ingredient)
      );
      commit(SET_INGREDIENTS, allIngredients);
    },
    querySauces({ commit }) {
      const allSauces = sauces.map((sauce) => normalizeSauces(sauce));
      commit(SET_SAUCES, allSauces);
    },
    querySizes({ commit }) {
      const allSizes = sizes.map((size) => normalizeSizes(size));
      commit(SET_SIZES, allSizes);
    },
  },
};
