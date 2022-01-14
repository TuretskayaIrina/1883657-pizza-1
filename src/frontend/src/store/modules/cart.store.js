import misc from "@/static/misc.json";
import {
  SET_MISC,
  PUT_PIZZA_TO_CART,
  UPDATE_ADDITION_PRODUCT_COUNT,
} from "@/store/mutation-types.js";
import { normalizeMisc } from "@/common/helpers.js";

export default {
  namespaced: true,
  state: {
    allMisc: [],
    cart: {
      pizzasList: [],
      miscList: [],
    },
  },
  getters: {
    allMisc(state) {
      return state.allMisc;
    },
    cart(state) {
      const cart = {
        pizzasList: state.cart.pizzasList,
        miscList: state.allMisc.filter((item) => item.count > 0),
      };
      return cart;
    },
    totalCost(state) {
      let totalCostPizzas = 0;

      const costPizzas = state.cart.pizzasList.map((item) => item.cost);
      if (costPizzas.length !== 0) {
        totalCostPizzas = costPizzas.reduce((a, b) => a + b);
      }

      const totalCostAdditionalProducts = state.allMisc
        .filter((item) => item.count > 0)
        .reduce((cost, item) => {
          cost += item.count * item.price;
          return cost;
        }, 0);

      return totalCostPizzas + totalCostAdditionalProducts;
    },
  },
  mutations: {
    [SET_MISC](state, payload) {
      state.allMisc = payload;
    },
    [UPDATE_ADDITION_PRODUCT_COUNT](state, { type, count }) {
      const selectedProduct = state.allMisc.find(
        (product) => product.type === type
      );
      if (selectedProduct) {
        selectedProduct.count = count;
      }
    },
    [PUT_PIZZA_TO_CART](state, payload) {
      state.cart.pizzasList.push(payload);
    },
  },
  actions: {
    queryMisc({ commit }) {
      const allMisc = misc.map((misc) => normalizeMisc(misc));
      commit(SET_MISC, allMisc);
    },
    addPizza({ commit, rootGetters }) {
      commit(PUT_PIZZA_TO_CART, rootGetters["Builder/selectedPizza"]);
    },
  },
};
