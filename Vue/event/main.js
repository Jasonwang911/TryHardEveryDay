/* eslint-disable */
import Vue from 'vue'
import router from './router'
import App from './App'

Vue.prototype.$dispatch = function(eventName, value) {
  let parent = this.$parent
  while(parent) {
    parent.$emit(eventName, value)
    parent = parent.$parent
  }
}

Vue.prototype.$broadcast = function(eventName, value) {
  const broadcast = (children) => {
    console.log(children)
    children.forEach(child => {
      child.$emit(eventName, value)
      if(child.$children) {
        broadcast(child.$children)
      }
    })
  }
  broadcast(this.$children)
}

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
