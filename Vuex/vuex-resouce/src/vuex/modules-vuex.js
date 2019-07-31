let Vue;

const forEach = (obj, callback) => {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key]);
  });
};

class ModuleCollection {
  constructor(options) {
    // 注册传入的属性，进行初始化整理options
    this.register([], options);
  }
  register(path, rootModule) {
    let newModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    };
    if (path.length === 0) {
      // 是根模块
      this.root = newModule;
    } else {
      // 不是根模块  只取最后一项并挂载到 _children 上
      // 这样会导致  _children: {a, b, c}  只有两级
      // this.root._children[path[path.length - 1]] = newModule;
      let parent = path.slice(0, -1).reduce((root, current) => {
        return this.root._children[current];
      }, this.root);
      parent._children[path[path.length - 1]] = newModule;
    }
    if (rootModule.modules) {
      // 有子模块 循环递归
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module);
      });
    }
  }
}

// 递归树，将结果挂载 getters mutations actions
const installModule = (store, state, path, rootModule) => {
  // 处理根模块的getters属性
  let getters = rootModule._raw.getters;
  if (getters) {
    forEach(getters, (getterName, fn) => {
      Object.defineProperty(store.getters, getterName, {
        get: () => {
          return fn(rootModule.state);
        }
      });
    });
  }
  // mutations
  let mutations = rootModule._raw.mutations;
  if (mutations) {
    forEach(mutations, (mutationName, fn) => {
      let arr =
        store.mutations[mutationName] || (store.mutations[mutationName] = []);
      arr.push(payload => {
        fn(rootModule.state, payload);
      });
    });
  }
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
    // let getters = options.getters || {};
    // 创建 Store 的 getters 属性
    this.getters = {};
    // forEach(getters, (getterName, fn) => {
    //   Object.defineProperty(this.getters, getterName, {
    //     get: () => {
    //       return fn(this.state);
    //     }
    //   });
    // });
    // mutations
    // let mutations = options.mutations || {};
    this.mutations = {};
    // forEach(mutations, (mutationName, fn) => {
    //   this.mutations[mutationName] = payload => {
    //     // 修正this的指向，在mutations中使用this指向store
    //     // fn(this.state, payload);
    //     fn.call(this, this.state, payload);
    //   };
    // });
    // actions
    // let actions = options.actions || {};
    this.actions = {};
    // forEach(actions, (actionName, fn) => {
    //   this.actions[actionName] = payload => {
    //     // 修正this的实例
    //     fn.call(this, this, payload);
    //     // fn(this, payload);
    //   };
    // });

    // modules属性
    // 需要先格式化options传入的属性,编程如下格式，再进行模块的安装
    // let root = {
    //   _raw: rootModule,
    //   state: rootModule.state,
    //   _children: {
    //     a: {
    //       _raw: aModule,
    //       _children: {},
    //       state: {x:1}
    //     },
    //     b: {
    //       _raw: bModule,
    //       _children: {},
    //       state: bModule.state
    //     }
    //   }
    // }

    // 收集所有的模块
    this.modules = new ModuleCollection(options);
    console.log(this.modules);
    // 安装模块   getters mutations actions 会合并到 this.$store
    // Store实例  状态   路径  合并后的模块
    installModule(this, this.state, [], this.modules.root);
  }
  dispatch = (type, payload) => {
    this.actions[type](payload);
  };
  commit = (type, payload) => {
    this.mutations[type].forEach(fn => fn(payload));
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
