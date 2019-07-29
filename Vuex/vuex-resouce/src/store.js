import Vue from "vue";
import Vuex from "./vuex/myVuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    age: 20
  },
  getters: {
    // date 的 computed
    myAge(state) {
      return state.age + 10;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncMinuts(state, payload) {
      state.age -= payload;
    }
  },
  actions: {
    asyncMinus({ commit }, payload) {
      setTimeout(() => {
        commit("syncMinuts", payload);
      }, 1000);
    }
  }
});
