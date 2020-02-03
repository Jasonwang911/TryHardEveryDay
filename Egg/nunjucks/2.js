let nunjucks = require('nunjucks')
let path = require('path')

nunjucks.configure(
  // 视图所在路径
  path.resolve('view'), {
    // 自动转译
    autoescape: true
  }
)

let result = nunjucks.render(
  // 渲染文件的相对路径
  'index.html', {
    name: 'jason'
  }
)

console.log(result)