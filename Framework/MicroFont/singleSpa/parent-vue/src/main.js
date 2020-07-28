import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { registerApplication, start } from 'single-spa'

// Vue.config.productionTip = false;

async function loadScript(url) {
  return new Promise((resolve,reject) => {
    let script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

registerApplication('myVueApp', 
  async () => {
    console.log('加载模块') 
    // single-spa推荐的加载方式是 system.js   加载子应用打包出来的lib： app.js 和  chunk-vendors.js  : 原理是动态的创建一个script标签并引入js
    await loadScript('http://127.0.0.1:10001/js/chunk-vendors.js')
    await loadScript('http://127.0.0.1:10001/js/app.js')
    return window.singleVue
  },  
  location => location.pathname.startsWith('/vue') // 当路由切换到 /vue 的路径下，需要加载上面定义的子应用，并且会掉上面的 promise 方法
)

start()

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
