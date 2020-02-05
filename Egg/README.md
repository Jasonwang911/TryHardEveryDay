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
```