let nunjucks = require('nunjucks')
let path = require('path')
let express = require('express')

let app = express()

nunjucks.configure(
  // 视图所在路径
  path.resolve('view'), {
    // 自动转译
    autoescape: true,
    express: app, // nunjucks 和 express 的关联
  }
)

app.get('/', function (req, res) {
  /*
   * 1. response.render 是express内部实现的
   * 2. 先读取模板文件，然后把模板文件和数据对象作为参数传递给nunjucks模板引擎
   * 3. 然后由 nunjucks模板引擎渲染出最终的字符串，再由response发送给客户端
   * */
  res.render(
    'login.html', {
      name: 'jason'
    }
  )
})

app.listen(8080)