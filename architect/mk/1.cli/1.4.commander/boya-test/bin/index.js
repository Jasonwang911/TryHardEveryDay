#! /usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')

// commander 提供了一个 program 的单例，拿到这个单例 脚手架已经注册号了
// const { program } = commander
// commander 也可以初始化一个实例(手动实例化一个实例)
const program = new commander.Command()

// 使用构造者模式 进行连点操作
program
  .name(Object.keys(pkg.bin)[0])
  .usage('[commander] <options>')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --envName <envName>', '获取环境变量名称')
  .parse(process.argv)

console.log('====>', program.envName)
console.log(program.opts())