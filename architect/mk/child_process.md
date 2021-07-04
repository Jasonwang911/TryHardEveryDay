## Node多进程开发入门

### 什么是进程
> 进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础。

1. 进程的概念主要有两点：
- 进程是一个实体。每一个进程都有它的地址空间
- 进程是一个“执行中的程序”，存在嵌套关系


### child_process的用法
##### 异步方法： 
1. exec 
```
const cp = require('child_process')

// 执行shell脚本 
// err 执行shell文件中的报错信息 
// stdout  正常执行输出的结果
// stderr  异常执行的输出结果
cp.exec('echo "hello node"', function(err, stdout, stderr) {
  console.log('err', err)
  console.log('stdout', stdout)
  console.log('stderr', stderr)
})
```

2. execFile 不能使用管道符，只能执行文件并依次传入参数
```
// 第一个参数是执行的文件，第二个参数执行文件的参数数组
cp.execFile('ls', ['-al'], function(err, stdout, stderr) {
  console.log('err', err)
  console.log('stdout', stdout)
  console.log('stderr', stderr)
})
```

3. fork

4. spawn
```
// 流式执行，更适合耗时任务，需要不断输出日志
const child = cp.spawn('lss', ['-al'], {
  // cwd: path.resolve('..')
})

child.stdout.on('data', (chunk) => {
  console.log(chunk.toString())
})

child.stderr.on('data', (chunk) => {
  console.log('stderr', chunk.toString())
})
```

##### 同步方法:
1. execSync

2. execFileSync 

3. spawnSync 


### 相关命令
1. ps -ef  查询当前系统的所有进程
- UID 当前用户权限的
- PID 当前进程的id  process_id
- PPID 当前进程的父id parent_process_id
- C 
- STIME
- TTY
- TIME
- CMD  

2. ps -ef | grep node  使用管道符查询当前系统中node的所有进程  

3. ps -ef | grep PID 筛选指定PID进程的信息


