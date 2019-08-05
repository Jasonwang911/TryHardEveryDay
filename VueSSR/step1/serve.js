const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const Static = require("koa-static");
const Vue = require("vue");
const VueServerRender = require("vue-server-renderer");

// 创建一个vue的实例，注意在服务端不能挂载元素，只能使用渲染模板字符串
const vm = new Vue({
  data() {
    return {
      msg: "hello vue-ssr"
    };
  },
  template: `<div>{{msg}}</div>`
});

const template = fs.readFileSync("./template.html", "utf8");
// 创建一个渲染器
let render = VueServerRender.createRenderer({
  template
});

const app = new Koa();
const router = new Router();

// render.renderToString() 接收一个vue的实例并返回一个promise的字符串，将返回的字符串直接渲染到页面上,注意这个方法是个异步操作
router.get("/", async ctx => {
  ctx.body = await render.renderToString(vm);
});

app.use(router.routes());

app.listen(3000, () => {
  console.log(`node serve run at port 3000`);
});
