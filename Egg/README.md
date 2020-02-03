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

