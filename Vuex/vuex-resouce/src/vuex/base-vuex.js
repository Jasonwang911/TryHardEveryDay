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
    // getters 拿到new Store的时候传入的getters
    let getters = options.getters || {};
    // 创建 Store 的 getters 属性
    this.getters = {};
    forEach(getters, (getterName, fn) => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return fn(this.state);
        }
      });
    });
    // mutations
    let mutations = options.mutations || {};
    this.mutations = {};
    forEach(mutations, (mutationName, fn) => {
      this.mutations[mutationName] = payload => {
        // 修正this的指向，在mutations中使用this指向store
        // fn(this.state, payload);
        fn.call(this, this.state, payload);
      };
    });
    // actions
    let actions = options.actions || {};
    this.actions = {};
    forEach(actions, (actionName, fn) => {
      this.actions[actionName] = payload => {
        // 修正this的实例
        fn.call(this, this, payload);
        // fn(this, payload);
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
