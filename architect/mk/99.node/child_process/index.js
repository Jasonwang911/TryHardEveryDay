const cp = require('child_process')
const path = require('path')

// 执行shell脚本 
// err 执行shell文件中的报错信息 
// stdout  正常执行输出的结果
// stderr  异常执行的输出结果
// cp.exec('ls -al', function(err, stdout, stderr) {
//   console.log('err', err)
//   console.log('stdout', stdout)
//   console.log('stderr', stderr)
// })

// 第一个参数是执行的文件，第二个参数执行文件的参数数组
// cp.execFile('ls', ['-al'], function(err, stdout, stderr) {
//   console.log('err', err)
//   console.log('stdout', stdout)
//   console.log('stderr', stderr)
// })

cp.execFile(path.resolve(__dirname, 'node.sh'), function(err, stdout, stderr) {
  console.log('err', err)
  console.log('stdout', stdout)
  console.log('stderr', stderr)
})