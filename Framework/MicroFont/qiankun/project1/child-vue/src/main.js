import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 应用实例
let instance = null

function render(props) {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')  // 这里还是挂载到自己的html中，基座会拿到这个挂载后的html
}

// 如果是基座调用的子应用，qiankun会动态的注入 publicPath
if(window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

// 如果没有基座，需要独立运行子应用，直接进行挂载
if(!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap(props) {

}

export async function  mount(props) {
  // mount的时候渲染实例
  render(props)
}

export async function unmount(props) {
  // unmount的时候卸载实例
  instance.$destroy()
}