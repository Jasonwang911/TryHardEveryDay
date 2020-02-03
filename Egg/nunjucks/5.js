let nunjucks = require('nunjucks')
let path = require('path')

nunjucks.configure({
  // 自动转译
  autoescape: true
})

let result = nunjucks.renderString(
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
  `, {
    score: 55
  }
)

console.log(result)