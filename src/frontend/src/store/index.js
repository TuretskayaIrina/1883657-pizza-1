import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async init({ dispatch }) {
      dispatch("Builder/queryDough");
      dispatch("Builder/queryIngredients");
      dispatch("Builder/querySauces");
      dispatch("Builder/querySizes");
      dispatch("Cart/queryMisc");
    },
  },
  modules,
});
