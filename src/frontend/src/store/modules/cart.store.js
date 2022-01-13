import misc from "@/static/misc.json";
import {
  UPDATE_TOTAL_PRICE,
  PUT_PIZZA_TO_CART,
} from "@/store/mutation-types.js";
import { normalizeMisc } from "@/common/helpers.js";
import { SET_MISC } from "@/store/mutation-types.js";

export default {
  namespaced: true,
  state: {
    allMisc: [],
    cart: {
      pizzasList: [],
      miscList: [],
    },
    totalPrice: 0,
  },
  getters: {
    allMisc(state) {
      return state.allMisc;
    },
    cart(state) {
      return state.cart;
    },
    totalPrice(state) {
      // TODO: Подумать
      // const costPizzas = state.cart.pizzasList.map((item) => item.costPizza);
      // if (costPizzas.length !== 0) {
      //   state.totalPrice = costPizzas.reduce((a, b) => a + b);
      // }

      return state.totalPrice;
    },
  },
  mutations: {
    [SET_MISC](state, payload) {
      state.allMisc = payload;
    },
    [UPDATE_TOTAL_PRICE](state, payload) {
      console.log(state);
      console.log(payload);
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
    addPizza({ commit }, { pizza, costPizza }) {
      commit(PUT_PIZZA_TO_CART, { pizza, costPizza });
    },
  },
};
