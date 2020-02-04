# 模板引擎的两个代表 ejs nunjucks
## nunjucks 模板引擎
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
