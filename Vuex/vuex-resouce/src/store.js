import Vue from "vue";
import Vuex from "./vuex/modules-vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 区分模块，无限分级
  modules: {
    a: {
      state: {
        x: 1
      }
    },
    b: {
      modules: {
        c: {
          state: {
            z: 1
          }
        }
      },
      state: {
        y: 1
      }
    }
  },
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
