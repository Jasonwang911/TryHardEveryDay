import Vue from "vue";
import Vuex from "./vuex/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: {
    myAge(state) {
      return state.age + 10;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncMinus(state, payload) {
      state.age -= payload;
    }
  },
  adtions: {
    asyncMinus({ commit }, payload) {
      setTimeout(() => {
        commit("syncMinus", payload);
      }, 1000);
    }
  }
});
