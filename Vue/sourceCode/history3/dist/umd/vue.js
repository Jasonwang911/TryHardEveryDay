(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  // 重写是数组的方法是会导致数组本身发生变化的方法： push shift unshift pop resverse sort splice
  // slice() 等方法不会导致数组本身发生变化，所以不需要重写
  // 先把数组原型上的真实方法都存起来
  var oldArrayMethods = Array.prototype; // 创建新的数组的方法，并且可以通过 arrayMethods.__proto__ = oldArrayMethods 找到原来数组上的方法
  // 这样延长了原型链，用户调用数组的方法，会通过  value.__proto__ = arrayMethods 查找 arrayMethods 上的7个方法，其他的方法在 arrayMethods 上面不能找到，便会通过原型链 __proto__ 继续向上查找到oldArrayMethods  从而得到调用

  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'resverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    // AOC 面向切片编程
    arrayMethods[method] = function () {
      // args是个类数组
      console.log("\u7528\u6237\u8C03\u7528\u4E86".concat(method, "\u65B9\u6CD5")); // 调用原生数组的方法病返回结果

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); // 被添加的属性需要继续呗观测

      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          //  splice有3个属性  新增  修改 和删除 新增 arr.splice(arr, i, {name: 'xiaokui'})
          inserted = args.slice(2);
          break;
      }

      if (inserted) ob.observerArray(inserted);
      return result;
    };
  });

  //  判断当前数据是不是对象
  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  } // 定义一个不可枚举的对象

  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      // 不可枚举
      configurable: false,
      // 不可配置，不可修改
      value: value
    });
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // vue如果数据的层侧太多，需要递归去解析对象中的属性，依次增加set和get方法
      // 在被观测的属性上添加一个 __ob__属性，指向Observer这个类，然后被观测的对象身上就能通过 __ob__ 调用Observer类上的方法了
      // value.__ob__ = this
      def(value, '__ob__', this);

      if (Array.isArray(value)) {
        // 如果是数组的话并不会对索引进行观测，会导致性能问题
        // 前端开发中很少直接操作索引 push  shift  unshift  等方法需要重写
        value.__proto__ = arrayMethods; // 如果数组中放置的是对象，需要在进行观测

        this.observerArray(value);
      } else {
        this.walk(value);
      }
    } // 对数组中的每一项进行观测


    _createClass(Observer, [{
      key: "observerArray",
      value: function observerArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); // [name, age, address]

        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    // 递归劫持 observe函数中判断了如果不是对象就直接返回
    observe(value); // 在获取值和设置值得时候做依赖收集

    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        console.log('值发生变化了', newValue);
        observe(newValue); //  如果直接修改数据为新对象，需要继续劫持新对象---深度劫持

        value = newValue;
      }
    });
  } // 把data中的属性都使用 Object.defineProperty() 重新定义一遍


  function observe(data) {
    var isObj = isObject(data);

    if (!isObj) {
      return;
    } // 用来观测诗句


    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options; // Vue的数据来源  属性 方法 数据 计算属性 watch 依次初始化

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(this) : data;
    console.log(data); // 对象劫持，用户改变了数据，可以得到通知。 MVVM模式，数据变化可以驱动师徒变化
    // Object.defineProperty() 给属性增加get和set方法，也是响应式原理的主要代码

    observe(data);
  }

  // AST语法树使用对象来描述js语法的  虚拟DOM使用对象来描述dom节点的
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // name-space
  // ?: 匹配不捕获

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

  function parseHTML(html) {
    // 不停的解析html字符串，解析一段删除一段，html删除完毕就解析完成
    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        // 如果当前索引为0，肯定是一个标签： 开始标签或者结束标签
        var startTagMatch = parseStartTag(); // 通过这个方法获取到匹配的结果： tagName attrs

        break;
      }
    } // 截取函数  step 表示截取多少位


    function advance(step) {
      html = html.substring(step);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        console.log(start); // ["<div", "div", index: 0, input: "<div id="app">↵    <p>{{name}}</p>↵    <span>{{age}}</span>↵  </div>", groups: undefined]

        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 截取除了第一个开始标签以外的部分

        var end, attr; // 不是结尾标签 并且 有属性

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 截取属性剩余的标签
          console.log(attr);
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
        }

        console.log(match, html);
      }
    }
  }

  function compileToFunction(template) {
    var root = parseHTML(template);
    return function render() {};
  }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // 数据劫持
      var vm = this;
      vm.$options = options; // Vue中的this.$options就是用户传递的属性
      // 初始化装填

      initState(vm); // 如果用户传入了el属性，就需要将页面渲染出来，也就是要实现挂载流程

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options; // 获取dom元素

      el = document.querySelector(el); // 默认会先查找有没有render方法，没有render会采用template，template没有就会直接使用el中的内容

      if (!options.render) {
        // 对模板进行编译
        var template = options.template; // 取出模板

        if (!template && el) {
          template = el.outerHTML;
        } // 需要将template转化为render函数；Vue1.0是使用正则替换字符串，性能低。Vue2.0引入了虚拟dom的概念，提升了性能


        var render = compileToFunction(template);
        options.render = render;
      }
    };
  }

  function Vue(options) {
    this._init(options);
  } // 调用init.js中的initMixin()方法给Vue原型上添加方法


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
