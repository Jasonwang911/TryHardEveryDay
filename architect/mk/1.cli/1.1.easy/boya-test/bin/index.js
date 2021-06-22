#! /usr/bin/env node 
const lib = require('boya-test-lib')
const argv = require('process').argv

console.log(argv)

const command = argv[2]
const options = argv.slice(3)

console.log(options)

if(command) {
  if(lib[command]) {
    lib[command]('vue')
  }else {
    console.log('无效的命令')
  }
}else {
  console.log('请输入命令')
}

