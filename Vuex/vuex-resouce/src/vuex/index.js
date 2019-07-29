/* eslint-disable */
// import Vue from "vue"; // vue的构造函数

const forEach = (obj, callback) => {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key]);
  });
};

class ModuleCollection {
  constructor(options) {
    this.register([], options);
  }
  rejecter(path, rootModule) {
    let NewModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    };
    if (path.length === 0) {
      this.root = newModule;
    } else {
      // [a, b, c] 格式化数组
      // reduce 如果数组为空，会传一个上一次的值，直接把传入的值返回
      let parent = path.slice(0, -1).reduce((root, current) => {
        return this.root_children[current];
      }, this.root);
      this.root_children[path[path.length - 1]] = newModule;
    }
    if (rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module) => {
        this.rejecter(path.concat(moduleName), module);
      });
    }
  }
}

// 递归树，将结果挂在 getters mutations action
const installModule = (store, state, path, rootModule) => {
  let getters = rootModule._raw.getters;
  if (getters) {
    forEach(getters, (getName, fn) => {
      Object.defineProperty(store.getters, getterName, {
        get: () => {
          return fn(rootModule.state);
        }
      });
    });
  }
  let mutations = rootModule._raw.mutations;
  if (mutations) {
    forEach(mutations, (mutationName, fn) => {
      let arr =
        store.mutations[mutationName] || (store.mutations[mutationName] = []);
      arr.push(payload => {
        fn(rootMutation);
      });
    });
  }
};

class Store {
  constructor(options) {
    // this._s = options.state;
    this._vm = new Vue({
      data: {
        // 把普通对象编程了观察者模式的对象,实现了一个数据监听
        state: options.state
      }
    });
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    // 用户床底过来的getters
    // let getters = options.getters || {};
    // this.getters = {};
    // // 把getters属性定义到 this.getters中，并且根据状态更新getters
    // // Object.keys(getters).forEach(getterName => {
    // //   // 是个函数，但是返回的是个属性
    // //   Object.defineProperty(this.getters, getterName, {
    // //     get() {
    // //       return getters[getterName](this.state);
    // //     }
    // //   });
    // // });
    // forEach(getters, (getterName, value) => {
    //   // 是个函数，但是返回的是个属性
    //   Object.defineProperty(this.getters, getterName, {
    //     get() {
    //       return getters[getterName](this.state);
    //     }
    //   });
    // });

    // let mutations = options.mutations || {};
    // this.mutations = {};
    // forEach(mutations, (mutationName, value) => {
    //   // 先把用户传递过来Mutation放到我们store实例上
    //   this.mutations[mutationName] = payload => {
    //     mutations[mutationName](this.state, payload);
    //   };
    // });
    // let actions = options.actions || {};
    // this.actions = {};
    // forEach(actions, (actionsName, value) => {
    //   this.actions[actionName] = payload => {
    //     value(this, value);
    //   };
    // });
    // let { dispatch, commit } = this;
    // this.dispatch = function() {
    //   dispatch.call(this);
    // };
    // this.commit = function() {
    //   commit.call(this);
    // };

    // 模块
    // 需要先格式化一下当前用户传递过来的数据
    // let root = {
    //   _raw: rootModule,
    //   state: rootModule.state,
    //   _children: {

    //   }
    // }
    // 收集模块
    this.modules = new ModuleCollection(options);
    // 安装模块   空数组
    installModule(this, this.state, [], this.modules.root);
    console.log(this.modules);
  }
  dispatch() {}
  commit(type, payload) {
    // 找到对应的action执行
    this.mutations[type](payload);
  }
  get state() {
    // store.state
    return this._vm.state;
  }
}

// vue 的渲染顺序，深度优先， 先渲染父组件，再渲染子组件
const install = _Vue => {
  let Vue = _Vue;
  // console.log(Vue);
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        // 根组件
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent.$store;
      }
    }
  });
};

export default {
  Store,
  install
};
