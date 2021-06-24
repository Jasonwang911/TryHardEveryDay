#! /usr/bin/env node

const { description } = require('commander')
const commander = require('commander')
const pkg = require('../package.json')

// commander 提供了一个 program 的单例，拿到这个单例 脚手架已经注册好了
// const { program } = commander
// commander 也可以初始化一个实例(手动实例化一个实例)
const program = new commander.Command()

// 使用构造者模式 进行连点操作
program
  .name(Object.keys(pkg.bin)[0])
  .usage('<commander> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --envName <envName>', '获取环境变量名称')
const clone = program.command('clone <source> [destination]')
clone
  .description('描述')
  .option('-f, --force', '强制拷贝')
  .action((source, destination, cmdObj ) => {
    console.log('do clone', source, destination, cmdObj.force)
  })
  // 注册子命令
const service = new commander.Command('service')
service
  .command('start [port]')
  .description('start service at some port')
  .action((port) => {
    console.log(`service is running at ${port}`)
  })
program.addCommand(service)  

// program
//   .arguments('<cmd> [option]')
//   .description('test command', {
//     cmd: 'cmd to run',
//     option: 'option for command'
//   })
//   .action((cmd, option) => {
//     console.log(cmd, option)
//   })

// 高级定制1： 自定义help信息
// program.helpInformation = () => {return ''}
// program.on('--help', () => {
//   console.log('your help information')
// })

// 高级定制2： 实现debug模式, 并且早于命令执行之前
program.on('option:debug', () => {
  if(program.opts().debug) {
    process.env.LOG_LEVEL = 'verbose'
  }
  console.log(process.env.LOG_LEVEL)
})

// 高级定制3： 对未知命令监听
program.on('command:*', (obj) => {
  console.log('未知命令：',  obj )
  const avaliableCommands = program.commands.map(item => item.name()).join(',')
  console.log(avaliableCommands)
  console.log(program.commands[0].name() )
})

program
  .parse(process.argv)

// console.log(program.opts())