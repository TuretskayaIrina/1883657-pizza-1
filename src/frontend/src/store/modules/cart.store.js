import misc from "@/static/misc.json";
import {
  SET_MISC,
  PUT_PIZZA_TO_CART,
  UPDATE_PIZZA_IN_CART,
  UPDATE_ADDITION_PRODUCT_COUNT,
  UPDATE_PIZZAS_QUANTITY,
  RESET_CART,
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
        pizzasList: state.cart.pizzasList.filter((item) => item.quantity > 0),
        miscList: state.allMisc.filter((item) => item.count > 0),
      };
      return cart;
    },
    totalCost(state) {
      let totalCostPizzas = 0;

      const pizzaTypeCost = state.cart.pizzasList.map((item) => {
        return item.quantity * item.cost;
      });

      if (pizzaTypeCost.length !== 0) {
        totalCostPizzas = pizzaTypeCost.reduce((a, b) => a + b);
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
      payload.id = Math.floor(Math.random() * 1000);
      state.cart.pizzasList.push(payload);
    },
    [UPDATE_PIZZAS_QUANTITY](state, { name, quantity }) {
      const selectedPizza = state.cart.pizzasList.find(
        (pizza) => pizza.name === name
      );
      selectedPizza.quantity = quantity;
    },
    [UPDATE_PIZZA_IN_CART](state, payload) {
      const selectedPizza = state.cart.pizzasList.find(
        (pizza) => pizza.id === payload.id
      );

      if (selectedPizza) {
        Object.assign(selectedPizza, payload);
      }
    },
    [RESET_CART](state) {
      state.cart = {
        pizzasList: [],
        miscList: [],
      };

      state.allMisc = state.allMisc.map((item) => {
        return { ...item, count: 0 };
      });
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
    editPizza({ commit, rootGetters }) {
      commit(UPDATE_PIZZA_IN_CART, rootGetters["Builder/selectedPizza"]);
    },
  },
};
