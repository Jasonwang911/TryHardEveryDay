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

### 权限管理
1. egg-mysql的事务
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

