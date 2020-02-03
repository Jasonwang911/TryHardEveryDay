let nunjucks = require('nunjucks');
nunjucks.configure({
  autoescape: true, // 自动转译  
})
let result = nunjucks.renderString(
  `hello {{name}}`, {
    name: 'jason'
  }
)

console.log(result)