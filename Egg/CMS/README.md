# egg+umi CMS系统

### 搭建项目
```
egg-init cms-api --type=simple
cd cms-api
yarn 
```

### 数据库脚本
```
 CREATE TABLE user (
 id int(11) PRIMARY KEY AUTO_INCREMENT,
 username varchar(255) NULL,
 password varchar(255) NULL,
 email varchar(255) NULL,
 phone varchar(255) NULL,
 gender tinyint(255) NULL,
 birthday datetime NULL,
 address varchar(255) NULL
);

CREATE TABLE role (
 id int(11) PRIMARY KEY AUTO_INCREMENT,
 name varchar(255) NULL
);

CREATE TABLE role_user (
role_id int(11) NOT NULL,
user_id int(11) NOT NULL,
PRIMARY KEY (user_id, role_id) 
);

CREATE TABLE resource (
id int(11) PRIMARY KEY AUTO_INCREMENT,
name varchar(255) NOT NULL
);

CREATE TABLE role_resource (
role_id int(11) NOT NULL,
resource_id int(255) NOT NULL,
PRIMARY KEY (role_id, resource_id) 
);
```

### 配置项目
egg中使用mysql 
- 安装依赖
```
yarn add egg-mysql -S
```
- config/plugin.js
```
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
```
- config/config.default.js
```
config.security = {
    csrf:false
} 
config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'cms',
}
```
- 强行关闭csrf 
config/config.default.js
```
security: {
  csrf: false,
},
```

### 接口风格 RESTful-风格的-url-定义
1. RESTful概念
- 一种软件架构风格、设计风格，而不是标准，只是提供了一组设计原则和约束条件。它主要用于客户端和服务器交互类的软件。基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存等机制。  
- API设计风格基本规则
  - 使用名词而不是动词
  - Get方法和查询参数不应该涉及状态改变
  - 使用复数名词
  - 使用子资源表达关系
  - 使用Http头声明序列化格式 
  - 为集合提供过滤 排序 选择和分页等功能
  - 版本化你的API
  - 使用Http状态码处理错误
  - 允许覆盖http方法

2. Egg中实现RESTful风格的接口
[Egg使用RESTful-api](https://eggjs.org/zh-cn/basics/router.html#restful-%E9%A3%8E%E6%A0%BC%E7%9A%84-url-%E5%AE%9A%E4%B9%89)
如果想通过 RESTful 的方式来定义路由， 我们提供了 app.resources('routerName', 'pathMatch', controller) 快速在一个路径上生成 CRUD 路由结构。  
```
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.resources('posts', '/api/posts', controller.posts);
  router.resources('users', '/api/v1/users', controller.v1.users); // app/controller/v1/users.js
};
```
上面代码就在 /posts 路径上部署了一组 CRUD 路径结构，对应的 Controller 为 app/controller/posts.js 接下来， 你只需要在 posts.js 里面实现对应的函数就可以了。   
- 增  POST    /posts      posts   app.controllers.posts.create
- 删  DELETE  /posts/:id  post    app.controllers.posts.destroy
- 改  PUT     /posts/:id  post    app.controllers.posts.update
- 查  GET     /posts      posts   app.controllers.posts.index

### 提取基类
```
'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }
}

module.exports = UserController;
```

###. egg-mysql的事务
```
// 开启一个事务
const conn = await this.app.mysql.beginTransaction()
// 成功后提交，失败后回滚
try{
  await conn.query()
  await conn.insert()
  await conn.commit()
}catch(e) {
  await conn.rollback()
}
```
### 分页
```
async select(pageNum, pageSize, where) {
  // await this.app.mysql.query(`SELECT * FROM user WHERE username='zhangsan' ORDER BY id DESC, age ASC limit 3, 3;`)
  const list = await this.app.mysql.select(this.entity, {
    where,
    orders: [
      [ 'id', 'desc' ],
    ],
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
  });
  const total = await this.app.mysql.count(this.entity, where);
  const totalSize = Math.ceil(total / pageSize);
  return {
    list,
    total,
    totalSize,
    pageSize,
    pageNum,
  };
}
```

### 验证码  svg-captcha
```
yarn add svg-captcha -S
```
获取验证码
```
'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
  // 获取验证码
  async captcha() {
    const {
      ctx,
    } = this;
    const captcha = svgCaptcha.create({});
    ctx.session.captcha = captcha.text;
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = captcha.data;
  }
}

module.exports = IndexController;

```

## roadhog+umi
antdesignPro使用了dva,使用了umi,umi使用了roadhog
### roadhog 
[roadhog](https://www.npmjs.com/package/roadhog)  
由于 create-react-app 的默认配置不能满足需求，而他又不提供定制的功能，于是基于他实现了一个可配置版。所以如果既要 create-react-app 的优雅体验，又想定制配置，那么可以试试 roadhog 。   
- roadhog 是基于 webpack 的封装工具，目的是简化 webpack 的配置
- 提供 server、 build 和 test 三个命
令，分别用于本地调试和构建
- 提供了特别易用的 mock 功能
- 命令行体验和 create-react-app 一致，配置略有不同，比如默认开启 css modules
- 还提供了 JSON 格式的配置方式。
```
// 安装
sudo npm install roadhog -g
// 安装依赖
npm i roadhog -g
// 创建项目
npm install react-dom -S
// 打包
roadhog build
``` 

#### HMR (热替换)
CSS 在开发模式下会走 style-loader (被内嵌在 JavaScript 文件中)，所以只要保证 JavaScript 的热更新，即可实现 CSS 的热更新。     

如果大家使用 dva ，配上 babel-plugin-dva-hmr 即可实现 routes 和 components 以及相关 CSS 修改的热更新，其他修改会自动刷新页面。 
```
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```
#### Mock
roadhog server 支持 mock 功能，类似 dora-plugin-proxy，在 .roadhogrc.mock.js 中进行配置，支持基于 require 动态分析的实时刷新，支持 ES6 语法，以及友好的出错提示。
```
export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1,2] },
 
  // GET POST 可省略
  '/api/users/1': { id: 1 },
 
  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
 
  // Forward 到另一个服务器
  'GET /assets/*': 'https://assets.online/',
 
  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',
};
```

#### 智能重启
配置文件修改的修改会触发 roadhog server 的自动重启，会触发重启的文件有：    
- .roadhogrc
- .roadhogrc.js
- .roadhogrc.mock.js
- theme 配置指定的文件

#### 默认配置
```
{
  "entry": "src/index.js",
  "disableCSSModules": false,
  "publicPath": "/",
  "outputPath": "./dist",
  "extraBabelPlugins": [],
  "extraPostCSSPlugins": [],
  "autoprefixer": null,
  "proxy": null,
  "externals": null,
  "library": null,
  "libraryTarget": "var",
  "multipage": false,
  "define": null,
  "env": null,
  "theme": null,
}
```
参数	含义
entry	指定 webpack 入口文件，支持 glob 格式   
outputPath	配置输出路径，默认是 ./dist   
disableCSSModules	禁用 CSS Modules    
publicPath	配置生产环境的 publicPath，开发环境下永远为 /     
extraBabelPlugins	配置额外的 babel plugin。babel plugin 只能添加，不允许覆盖和删除      
extraPostCSSPlugins	配置额外的 postcss 插件     
autoprefixer	配置 autoprefixer 参数      
proxy	配置代理      
externals	配置 webpack 的 externals 属性      
library	配置 webpack 的 library 属性    
libraryTarget	配置 webpack 的 libraryTarget 属性      
multipage	配置是否多页应用。多页应用会自动提取公共部分为 common.js 和 common.css      
define	配置 webpack 的 DefinePlugin 插件，define 的值会自动做 JSON.stringify 处理      
env	针对特定的环境进行配置。server 的环境变量是 development，build 的环境变量是 production      
theme	配置主题，实际上是配 less 的 modifyVars     

### umi 
[umi官网](https://umijs.org/zh/guide/)    
- UmiJS 是一个类 Next.JS 的 react 开发框架。
- 他基于一个约定，即 pages 目录下的文件即路由，而文件则导出 react 组件
- 然后打通从源码到产物的每个阶段，并配以完善的插件体系，让我们能把 umi 的产物部署到各种场景里。

#### umi的命令
```
// 安装
sudo npm install -g umi
// 启动
umi dev
// 
```
#### umi目录
```
.
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
        └── page2.js               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```

### 权限路由
umi 的权限路由是通过配置路由的 Routes 属性来实现。约定式的通过 yaml 注释添加，配置式的直接配上即可。  
PrivateRoute.js 的位置是相对于根目录的  
```
/**
 * title: 个人中心
 * Routes:
 *   - ./PrivateRoute.js
 */
```
PrivateRoute.js 
```
import React, { Component } from 'react'
import Link from 'umi/link';
import router from 'umi/router';

export default class componentName extends Component {
  login = ()=>{
     localStorage.setItem('login','true');
     if(this.props.location.state&&this.props.location.state.from){
        router.push(this.props.location.state.from);
     }
  } 
  render() {
    return (
     <button onClick={this.login}>登录</button>
    )
  }
}
``

## redux-saga
redux-sage是一个redux的中间件，而中间件的作用是为redux提供额外的功能。    
在reducers中的所有操作都是同步的并且是纯粹的，即reducer都是纯函数，纯函数是指一个函数的返回结果只依赖它的参数，并且在执行过程中不会对外部产生副作用，即给他传什么，就吐出什么。   
但在实际的应用开发中，我们希望做一些异步的且不纯粹的操作（比如改变外部的状态），这些在函数式编程凡是中被称为’副作用‘    
- redux-saga就是用来处理上述副作用（异步任务）的一个中间件，它是一个接收事件，并可能触发新事件的过程管理者，为你的应用管理复杂的流程。    

### redux-saga工作原理
- 
