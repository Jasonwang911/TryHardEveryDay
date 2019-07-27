import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store, // 在每个实例上添加一个 $store 对象
  render: h => h(App)
}).$mount("#app");
