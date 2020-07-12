#! /user/bin/env node


// 创建一个koa服务
createServer().listen(4000, () => {
  console.log('server start 4000 port', 'http://127.0.0.1:4000')
})