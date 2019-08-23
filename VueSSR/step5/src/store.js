import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default () => {
  const store = new Vuex.Store({
    state: {
      username: ""
    },
    getters: {
      username: state => state.username
    },
    mutations: {
      SET_USER_NAME(state, name) {
        state.username = name;
      }
    },
    actions: {
      setUserName({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit("SET_USER_NAME", "Jason");
            resolve();
          }, 1000);
        });
      }
    }
  });
  if (typeof window !== "undefined" && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store;
};
