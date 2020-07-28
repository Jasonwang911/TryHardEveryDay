import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false;

const appOptions = {
  el: '#vue',   // 挂载到父应用中id为vue的标签中
  router,
  render: h => h(App)
}

const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions
})
// 如果是敷应用引用，
if(window.singleSpaNavigate) {
  __webpack_public_path__ = 'http://localhost:10001/'
}
if(!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}

// 协议接入，定义好了协议，父应用会调用这些方法
export const bootstrap = vueLifeCycle.bootstrap
export const mount = vueLifeCycle.mount
export const unmount = vueLifeCycle.unmount

// 父应用加载子应用，将自用用打包成一个个lib去给父应用使用

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app');


// 需要父应用加载子应用
// 暴漏三个生命周期： bootstrap mount unmount   
// single-spa: 使用对应的包： single-spa-vue/single-spa-vue