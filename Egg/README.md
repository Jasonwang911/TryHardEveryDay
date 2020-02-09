# 模板引擎的两个代表 ejs nunjucks
## nunjucks 模板引擎
Egg中使用 egg-view-nunjucks
1. 基本语法
```
// 变量
{{ name }}
// 管道过滤器  管道符可以连接  capitalize
{{ names | join('-') }}   {{name | replace('wang', 'shuai')}}
// 条件判断
`
  {% if score >= 90 %}
  优秀
  {% elseif score >= 80 %}
  良好
  {% elseif score >= 70 %}
  中等
  {% elseif score >= 60 %}
  及格
  {% else %}
  不及格
  {% endif %}
`
// 循环  loopz对象中存放了循环的信息  loop.index-当前循环数  loop.revindex-当前循环数，从后往前  loop.first-是否是第一个  loop.last-是否是最后一个  loop.length-总数
`
  <ul>
  {% for user in users %}
  <li>{{user.name}}</li>
  {% endfor %}
  </ul>
  `, {
    users: [{
        id: 1,
        name: 'jason'
      },
      {
        id: 2,
        name: 'xiao kui'
      }
    ]
  }
```
2. 模板的继承  
```
<div>页头</div>
{% block content %}
<div>我是layout中的内容</div>
{% endblock %}
<div>页脚</div>
```
```
{% extends "layout.html" %}
{% block content %}
  <form>
    用户名 <input type="text">
  </form>
{% endblock %}
```
3. 模板的包含
```
{% block content %}
<ul>
  {% for user in users %}
  {% include "user-list.html" %}
  {% endfor %}
</ul>
{% endblock %}
```
```
<li>{{user.name}}</li>
```

# mock数据
1. mock数据写在json文件里（low)
2. 利用charles(mac), Fiddler(windows)等代理工具，将url映射到本地文件
3. 本地器Mock Server，即mockjs，有点麻烦每次修改了后还要重启服务  

## mockjs 和 easy-mock

# Egg.js  阿里开发，基于koa

MVC三层架构  Model模型层 View视图层 Controller控制器层  

经典的模型： 控制器Controller => 服务层Service => 模型层Model

1. 控制器的作用  
- 接收参数  
- 校验参数是否合法  
- 向下调用服务处理业务  
- 相应客户端数据  

2. 服务层的作用
- 处理业务逻辑
- 进行业务计算
- 调用模型层（数据库)进行处理

3. 模型层的作用
- 连接数据库
- 对数据库进行操作

## egg中间层请求
```
let result = await ctx.curl(url, {
      methods: 'GET',
      data: {
        limit
      },
      dataType: 'json'
    })
```

## 定时任务
schedule 文件下放置定时任务
```
const {Subscription} = require('egg')
```
```
// 定时任务
const {
  Subscription
} = require('egg')

class UpdateCacheSubscription extends Subscription {
  // 静态任务，返回一个配置
  static get schedule() {
    return {
      // 间隔时间，每隔5分钟执行一次
      interval: '5m',
      // 计划任务将在哪些worker上执行, all指的是在所有的worker上执行
      type: 'all'
    }
  }
  // 任务定义
  async subscribe() {
    const result = await this.ctx.curl(this.config.cache.url, {
      methods: 'GET',
      dataType: 'json'
    })
    // app代表egg应用的实例
    this.ctx.app.cache = result.data
  }
}

module.exports = UpdateCacheSubscription
```
1. worker 
- node是单线程，默认只使用一核，为了能充分利用CPU，使用node集群来提高性能，即根据核数，启动多个进程。一个核会启动一个worker

##数据库
1. mysql： egg-mysql

config/plugin.js
```
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}
```
config/config.default.js
```
  config.mysql = {
    client: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      port: '3306',
      database: 'cms-development'
    },
    // 把mysql模块挂载到app对象 this.app.mysql this.app.mysql.query(``)来执行查询语句
    app: true
  }
```
### 使用了ORM工具来管理数据库进行增删盖茶 sequelize  文档 https://sequelize.org/
1. 建立一个配置文件 .sequelizerc 指定不同类型的文件存放的位置
```
const path = require('path');

module.exports = {
  // 数据库的链接
  config: path.join(__dirname, 'database/config.json'),
  // 建表表结构的定义
  'migrations-path': path.join(__dirname, 'database/migrations'),
  // 种子数据的存放位置
  'seeders-path': path.join(__dirname, 'database/seeders'),
  // 定义模型的模流
  'models-path': path.join(__dirname, 'app/model')
}
```

2. 修改数据库的配置
修改 database/config.json 文件，不同的环境变量指向不同的开发环境，可以使用环境变量来切换  --env=环境变量
```
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }, 
  "test": {
    ...
  }
}
```

3. 建表表结构的定义 database/migrations 

- 根据牵引文件生成数据库表结构
```
// 读取database文件夹下的文件执行up和down操作，默认会插入到开发库，如果想插入其他环境添加参数 --env=test
npx sequelize db:migrate
```

4. 创建种子文件
```
npx sequelize seed:create --name init-users
// 生成以下信息
module.exports = {
  up: (queryInterface, sequelize) => {
    return queryInterface.bulkInsert('表名',[
      {}
    ], {})
  }, 
  down: (queryInterface, sequelize) => {
    return queryInterface
  }
}
// 执行以下操作进行批量插入
npx sequelize db:seed:all
```

5. model 模型
```
module.exports = app => {
  // egg-sequelize插件会把Sequelize添加到app上
  const {
    INTEGER,
    STRING,
    DATE
  } = app.Sequelize
  // 定义模型
  const User = app.model.define('User', {

  })
  return User
}
```
 
## 国际化（I18n） 由 egg-i18n 插件提供
1. 默认语言 
config/config.default.js 
```
config.i18n = {
  defaultLocale: 'zh-CN'
}
```
2. 建立语言文件夹
config下建立 locale 文件夹，并在其下建立 en-US.js （美国-英语） zh-CN.js
```
module.exports = {        班干部你不能 你班干部你换个突然 诺邦股份吧
  Email: '邮箱',
  // 传递变量
  "Welcome, back,%s!": "你好 我是, %s!"
}
```
3. 使用
```
ctx.__('Email')
```

## 扩展工具方法框架
- 框架提供了一种快速扩展的方式，只需要在 app/extend 目录下提供扩展脚本即可
- Helper 函数用来提供一些使用的 utility 函数
- 访问方式，通过 ctx.helper 访问到helper对象

## 中间件 middleware  洋葱式处理方式 
app/middleware 文件夹


## 单元测试

### 测试框架
- mochajs
- power-assert

1. 测试目录接口

2. 测试运行工具
使用egg-bin来运行测试脚本，自动将内置的Mocha、co-mochat、power-assert、nyc等模块组合引入到测试脚本中，让我们聚集经理在编写测试代码上，而不是纠结选择那些测试周边周边工具和模块
```
"script": {
  "test": "egg-bin test",
  "cov": "egg-bin cov"
}
```

3. mock 测试辅助模块 egg-mock,可以非常快速的编写一个app的单元测试，并且还能快读创建一个ctx来测试它的属性、方法和Service
```
// 
npm install egg-mock --save-dev
```

```
// 模拟CSRF
app.mockCsrf()
```

4. 钩子函数
```
// 钩子函数
describe('test/order.test.js', function () {
  before(() => console.log('before1  在所有测试用例之前执行的函数'))
  before(() => console.log('before2  在所有测试用例之前执行的函数'))
  beforeEach(() => console.log('beforeEach 测试用例开始'))
  it('order1', () => console.log('测试用例1'))
  it('order1', () => console.log('测试用例2'))
  afterEach(() => console.log('afterEach 测试用例结束'))
  after(() => console.log('after1 在所有测试用例执行之后执行的钩子'))
  after(() => console.log('after2 在所有测试用例执行之后执行的钩子'))
})
```

- 同步测试
```
const {
  app,
  mock,
  assert
} = require('egg-mock/bootstrap')

describe('test/controller/news.test.js', function () {
  it('get a ctx', () => {
    // ctx.session.name= 'jason'
    let ctx = app.mockContext({
      session: {
        name: 'jason'
      }
    })
    // 断言内部房一个布尔表达式，如果为true,则什么都不做，如果为false抛异常让测试用例失败
    assert(ctx.method === 'GET')
    assert(ctx.url === '/')
    assert(ctx.session.name === 'jason')
  })
})
```

- 异步测试 promise callback async/await
```
// async/await 
  it('async/await', async () => {
    await app.httpRequest().get('/news').expect(200)
  })

  // callback 接收一个done参数，然后测试用例执行到此的时候回等待调用done方法
  it('callback', (done) => {
    app.httpRequest().get('/news').expect(200, done)
  })

  // promise
  it('promise', () => {
    // app.httpRequest() 发送一个请求
    return app.httpRequest().get('/news').expect(200)
  })
```

## 测试顺序： 由外往内测试，即 1.controller 2.service 3.model 4.extend 5.middleware

### egg 表单强行添加csrf校验


# RBAC （Role-Based Access Control）基于角色的权限访问控制，通过角色与权限进行关联
- 一个用户拥有若干角色，每一个角色拥有若干权限。这样，就构造成了 用户-角色-权限 的授权模型
- 这种模型中，用户与角色之间，角色与权限之间，一般是多对多的关系
- 在RBAC中最重要的概念是： 用户（User)、角色(Role)、权限(Permission)

## 生成服务端项目
```
mkdir server && cd server
// 生成一个ts的egg项目
npm init egg --type=ts
```
