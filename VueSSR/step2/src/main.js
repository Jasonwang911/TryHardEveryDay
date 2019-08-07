import Vue from "vue";
import App from "./App";

// const vm = new Vue({
//   el: "#app",
//   render: h => h(App)
// });

// main.js是项目的入口文件，作用是提供vue的实例
// 将入口文件改造为一个函数，每次调用都返回一个vue的实例，这样做可以 1.根据客户端或者服务端来添加或不添加el； 2.每次调用都产生一个新的实例，服务端的根本要求
export default () => {
  const app = new Vue({
    render: h => h(App)
  });
  return { app };
};
