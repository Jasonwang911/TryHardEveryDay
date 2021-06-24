## Commander 
1. 初始化实例
- new commander.Command()  直接创建一个实例

- commander.program   commander 提供了一个 program 的单例，拿到这个单例 脚手架已经注册好了

2. 注册命令
- command 注册命令
program.command() 会得到一个返回值，这个返回值是一个新的命令对象，并不是program对象     
options参数
- executableFile 可执行文件(实现多脚手架之间的串行使用)
- isDefault: true  设置默认命令
- hidden: true    隐藏命令

- addCommand 注册子命令

3. arguments() 监听所有的命令输入,并强制统一约束所传参数

### 高级定制
1. 自定义help信息
program.helpInformation()
```
program.helpInformation = () => {return ''}
program.on('--help', () => {
  console.log('your help information')
})
```

2. 实现debug模式, 并且早于命令执行之前
```
program.on('option:debug', () => {
  if(program.opts().debug) {
    process.env.LOG_LEVEL = 'verbose'
  }
  console.log(process.env.LOG_LEVEL)
})
```

3. 对未知命令监听
```
program.on('command:*', (obj) => {
  console.log('未知命令：',  obj )
  const avaliableCommands = program.commands.map(item => item.name()).join(',')
  console.log(avaliableCommands)
  console.log(program.commands[0].name() )
})
```