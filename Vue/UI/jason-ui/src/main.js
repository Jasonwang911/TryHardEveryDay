import Vue from 'vue'
import App from './App.vue'
import zfUi from "./packages/index"  
Vue.use(zfUi) //install
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
