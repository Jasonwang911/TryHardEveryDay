const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const static = require("koa-static");
const VueServerRender = require("vue-server-renderer");

const app = new Koa();
const router = new Router();

// 读取服务端打包完成的结果字符串已经通过 server-plugin写入 vue-ssr-server-bundle.json中，直接读取
const ServerBundle = require("./dist/vue-ssr-server-bundle.json");
// 读取模板
const template = fs.readFileSync("./dist/index.ssr.html", "utf8");
// 客户端 manifest.json 注意，名字必须固定，否则失败
const clientManifest = require("./dist/vue-ssr-client-manifest.json");
// 创建bundle渲染器, 进行渲染并插入模板
let render = VueServerRender.createBundleRenderer(ServerBundle, {
  template,
  // 渲染的时候，可以找到客户端的js文件，自动引入到html中
  clientManifest
});

// render.renderToString() 接收一个vue的实例并返回一个promise的字符串，将返回的字符串直接渲染到页面上,注意这个方法是个异步操作
router.get("/", async ctx => {
  // css样式只能通过回调，同步的话会有问题
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
});

app.use(router.routes());
// koa 静态服务中间件
app.use(static(path.resolve(__dirname, "dist")));

app.listen(3000, () => {
  console.log(`node serve run at port 3000`);
});
