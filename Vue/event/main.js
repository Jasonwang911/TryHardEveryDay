/* eslint-disable */
import Vue from 'vue'
import router from './router'
import App from './App'

// 向上传递
Vue.prototype.$dispatch = function(eventName, value) {
  let parent = this.$parent
  while(parent) {
    parent.$emit(eventName, value)
    parent = parent.$parent
  }
}

// 向下传递
Vue.prototype.$broadcast = function(eventName, value) {
  const broadcast = (children) => {
    children.forEach(child => {
      child.$emit(eventName, value)
      if(child.$children) {
        broadcast(child.$children)
      }
    })
  }
  broadcast(this.$children)
}

// eventBus   将 $on $emit 方法暴漏到Vue实例上，这样在任何实例上都能触发这两个方法
Vue.prototype.$bus = new Vue()   

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
