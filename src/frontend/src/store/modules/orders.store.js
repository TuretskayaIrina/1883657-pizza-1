import { CONFIRM_ORDER } from "@/store/mutation-types.js";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    allOrders(state) {
      return state.orders;
    },
  },
  mutations: {
    [CONFIRM_ORDER](state, { cost, order }) {
      state.orders.push({ cost, order });
    },
  },
  actions: {
    createOrder({ commit, rootGetters }) {
      commit(CONFIRM_ORDER, {
        cost: rootGetters["Cart/totalCost"],
        order: rootGetters["Cart/cart"],
      });
    },
  },
};
