## 为什么使用服务端渲染

1. 客户端渲染不利于 SEO 搜索引擎优化
2. 服务端渲染是可以被爬虫抓取的，客户端异步渲染是很难被爬虫抓取的
3. SSR 直接将 HTML 字符串传递给浏览器，大大加快了首屏加载时间
4. SSR 占用了更多的 CPU 和内存资源
5. 一些常用的浏览器 API 可能无法正常使用
6. 在 vue 中只支持 beforeCreate 和 created 两个生命周期

## 服务端渲染的流程

从入口文件打包成两份 主要靠 webpack 实现，server Bundle（静态字符串） + client Bundle

### 需要的依赖

vue-server-renderer 官方用来做服务端渲染的

```
npm init -y

yarn add koa koa-router koa-static vue vue-router vuex vue-server-renderer

yarn add webpack webpack-cli webpack-dev-server babel-loader @babel/preset-env @babel/core vue-style-loader css-loader vue-loader vue-template-compiler html-webpack-plugin webpack-merge

```

webpack-cli webpack 的命令行解析工具
webpack-dev-server 用来创建一个开发环境,webpack 开发服务  
babel-loader 解析 js 语法，主要是进行转化操作  
@babel/preset-env 解析 es6 语法并转化为 es5  
@babel/core babel 的核心模块  
vue-style-loader vue 中为 ssr 提供的解析 css 的工具，不适用 ssr 的话可以使用 style-loader  
css-loader 处理 css 文件  
vue-loader 处理 vue 文件  
vue-template-compiler 处理 vue 模板编译的  
html-webpack-plugin 一个处理 html 的插件  
webpack-merge 合并 webpack 配置文件的

webpack 启动： npx webpack-dev-server 会启动 node-modules/.bin/webpack-dev-server，然后会自动根据根目录下 webpack.config.js 的配置去启动 webpack

# step1

 使用 vue-server-renderer 的 createRenderer 方法创建一个渲染函数来提供一个渲染器；  
渲染器接受的参数中可以指定一个模板，可以将服务端渲染完成的字符串插入这个模板中的一个指定的占位注注释（<!--vue-ssr-outlet-->）的位置；  
在请求服务器路由的时候可以调用渲染器的 renderToString()的方法来返回一个异步 promise 的字符串，渲染器的 renderToString 方法可以接受一个 vue 的实例；  
由于 vue 的实例是在服务端创建的，所以在创建 vue 实例的时候不能挂载元素。

# step2

## 实现

## vue ssr 中路由的条状规则

服务端
客户端

router.onReady(() => {

})

## ssr vuex 集成

## vue-ssr 中路由的跳转规则
