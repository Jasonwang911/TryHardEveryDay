import { initState } from './state'

export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function(options) {
    // 数据劫持
    const vm = this
    vm.$options = options   // Vue中的this.$options就是用户传递的属性
    // 初始化装填
    initState(vm)   
  }
}