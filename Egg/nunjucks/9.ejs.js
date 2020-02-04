let ejs = require('ejs')
let path = require('path')

let result = ejs.render(
  `
  <%
    if(score >= 90) {
      %>优秀<%
    }else {
      %>不优秀<%
    }
  %>
  `, {
    score: 55
  }
)

console.log(result)