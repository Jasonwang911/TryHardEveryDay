import { initState } from './state'
import { compileToFunction } from './compiler/index.js'

export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function(options) {
    // 数据劫持
    const vm = this
    vm.$options = options   // Vue中的this.$options就是用户传递的属性
    // 初始化装填
    initState(vm)   

    // 如果用户传入了el属性，就需要将页面渲染出来，也就是要实现挂载流程
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function(el) {
    const vm = this
    const options = vm.$options
    // 获取dom元素
    el = document.querySelector(el)
    // 默认会先查找有没有render方法，没有render会采用template，template没有就会直接使用el中的内容
    if(!options.render) {
      // 对模板进行编译
      let template = options.template   // 取出模板
      if(!template && el) {
        template = el.outerHTML
      }
      // 需要将template转化为render函数；Vue1.0是使用正则替换字符串，性能低。Vue2.0引入了虚拟dom的概念，提升了性能
      const render = compileToFunction(template)
      options.render = render
    }
  }
}

