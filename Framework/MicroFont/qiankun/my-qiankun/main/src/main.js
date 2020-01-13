import Vue from 'vue';
import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
} from 'qiankun';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.config.productionTip = false;

let app = null;
function render({ appContent, loading } = {}) {
  if (!app) {
    app = new Vue({
      el: '#container',
      router,
      store,
      data() {
        return {
          content: appContent,
          loading,
        };
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading,
          },
        });
      },
    });
  } else {
    app.content = appContent;
    app.loading = loading;
  }
}

// 路由监听
function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

render();


// 定义传入子应用的数据
const msg = {
  data: {
    auth: false,
  },
  fns: [
    {
      name: 'LOGOUT_',
      // eslint-disable-next-line no-underscore-dangle
      LOGOUT_(data) {
        // eslint-disable-next-line no-alert
        alert(`父应用返回信息：${data}`);
      },
    },
  ],
};

// 注册子应用
registerMicroApps(
  [
    {
      name: 'module-student',
      entry: '//localhost:39001',
      render,
      activeRule: genActiveRule('/student'),
      props: msg,
    },
    {
      name: 'module-teacher',
      entry: '//localhost:39002',
      render,
      activeRule: genActiveRule('/teacher'),
      props: msg,
    },
  ],
  {
    beforeLoad: [
      // eslint-disable-next-line no-shadow
      (app) => {
        console.log('before load', app);
      },
    ],
    beforeMount: [
      // eslint-disable-next-line no-shadow
      (app) => {
        console.log('before mount', app);
      },
    ],
    afterUnmount: [
      // eslint-disable-next-line no-shadow
      (app) => {
        console.log('after unload', app);
      },
    ],
  },
);

// 设置默认子应用
setDefaultMountApp('/basic');
// 第一个子应用加载完毕回调
runAfterFirstMounted();
// 启动微服务
start({ prefetch: true });

// new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount('#app');
