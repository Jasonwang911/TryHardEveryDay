let nunjucks = require('nunjucks')
let path = require('path')

nunjucks.configure({
  // 自动转译
  autoescape: true
})

let result = nunjucks.renderString(
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
)

console.log(result)