## 微前端 

#### 什么是微前端
微前端就是将不同的功能按照不同的维度拆分成多个子应用，通过主应用来加载这些子应用   
微前端的核心在于拆，拆完之后再合   

#### 为什么用微前端
不同团队技术栈不同   
希望每个团队都可以独立开发，独立部署   
项目中还有老代码不能重构   

#### 如何落地微前端
- single-SPA(2018年) 
  没有处理央视隔离，和平级之间应用的js隔离   
  仅仅实现了路由劫持和引用加载   
- qiankun（2019）： single-SPA + sandbox + import-html-entry

#### 应用间通信方式
1. 基于URL进行通信，传递消息的能力弱
2. 基于CustomEvent实现通信，浏览器自带的默认事件
3. 基于props主子应用通信
4. 使用全局变量，vuex进行通信  

#### 公共依赖
1. CDN-externals: web模块进行抽离
2. webpack5中提供的联邦模块  

#### Single-SPA  
1. 子应用中需要父应用加载子应用，使用对应的包来暴漏子应用的生命周期： single-spa-vue
```
yarn add single-spa-vue -S
```
子应用中main.js中进行引用
```
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

// 协议接入，定义好了协议，父应用会调用这些方法
export const bootstrap = vueLifeCycle.bootstrap
export const mount = vueLifeCycle.mount
export const unmount = vueLifeCycle.unmount

// 父应用加载子应用，将自用用打包成一个个lib去给父应用使用
```
在子应用中的vue.config.js配置将应用打包为lib
```
module.exports = {
  configureWebpack: {
    output: {
      library: 'sigleVue',
      libraryTarget: 'umd',   // 打包后模块规范，会将打包后的属性挂在到window上
    },
    devServer: {
      port: 10000
    }
  }
}
```

2. 父应用
- 在父应用中安装single-spa，作用是注册子应用，并根据路由的切换去挂在子应用
```
yarn add single-spa -S
```
在父应用的main.js中
```
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

```

3. 总结
- 不够灵活，不能动态加载js文件
- 样式不隔离，没有js沙箱的机制   

4. 子应用可以独立运行
```
if(!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}
```
