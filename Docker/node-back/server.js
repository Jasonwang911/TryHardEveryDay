/*
 * @Author: Jason wang
 * @Date: 2020-03-23 10:36:10
 * @Descripttion: 
 * @version: 
 */
let http = require('http')

let users = [
  {id: 1, name: 'jason'},
  {id: 2, name: 'xiaoming'},
  {id: 3, name: 'langkui'}
]

let server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if(req.url === '/api/users') {
    res.end(JSON.stringify(users))
  }else {
    res.end('Not Found')
  }
})

server.listen(30001, function() {
  console.log('server is running at 30001')
})