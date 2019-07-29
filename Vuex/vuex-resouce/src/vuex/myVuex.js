let Vue;

const forEach = (obj, callback) => {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key]);
  });
};

class Store {
  constructor(options) {
    // options 是 new Vuex时注入的对象
    // this._s = options.state || {};
    // 将store中的状态变成可被观测的数据
    this._vm = new Vue({
      data: {
        state: options.state
      }
    });
    // getters
    let getters = options.getters || {};
    this.getters = {};
    forEach(getters, (getterName, value) => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return value(this.state);
        }
      });
    });
    // mutations
    let mutations = options.mutations || {};
    this.mutations = {};
    forEach(mutations, (mutationName, value) => {
      this.mutations[mutationName] = payload => {
        value(this.state, payload);
      };
    });
    // actions
    let actions = options.actions || {};
    this.actions = {};
    forEach(actions, (actionName, value) => {
      this.actions[actionName] = payload => {
        value(this, payload);
      };
    });
  }
  dispatch = (type, payload) => {
    this.actions[type](payload);
  };
  commit = (type, payload) => {
    this.mutations[type](payload);
  };
  get state() {
    return this._vm.state;
  }
}

const install = _Vue => {
  Vue = _Vue;
  // console.log(Vue);
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        // 根组件
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });
};

export default {
  Store,
  install
};
