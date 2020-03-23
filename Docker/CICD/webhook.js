/*
 * @Author: Jason wang
 * @Date: 2020-03-23 10:55:31
 * @Descripttion: 
 * @version: 
 */
let http = require('http')
let crypto = require('crypto')

const SECRET = 'ajaxjsonp'

function sign(body) {
  return 'sha1='+crypto.createHmac('sha1', SECRET).update(body).digest('hex')
}

let server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.method, req.url)
  if(req.method === 'POST' && req.url === '/webhook') {
    let buffers = []
    req.on('data', function(buffer) {
      buffers.push(buffer)
    })
    req.on('end', function(buffer) {
      let body = Buffer.concat(buffers)
      let event = req.headers['x-github-event'] // event = push
      let signature = req.headers['x-github-signature']  // 签名，需要验证签名是否正确
      if(signature !== sign(body)) {
        return res.end('signature is not allowed!')
      }
    })
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ok: true}))
  }else {
    res.end('webhook server Not Found')
  }
})

server.listen(40001, function() {
  console.log('server is running at 40001')
})