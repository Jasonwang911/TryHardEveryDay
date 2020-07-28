import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI);

import { registerMicroApps, start } from 'qiankun'

const apps = [
  {
    name: 'vueApp',
    entry: '//localhost: 10001',  // 默认会加载这个html，解析里面的js，动态的执行（子应用需要解决跨域） fetch来读取文件
    container: '#vue',
    activeRule: '/vue'
  },
  {
    name: 'reactApp',
    entry: '//localhost: 20001',  // 默认会加载这个html，解析里面的js，动态的执行（子应用需要解决跨域） fetch来读取文件
    container: '#react',
    activeRule: '/react'
  }
]

registerMicroApps(apps)  // 注册应用
start()  // 开启应用

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
