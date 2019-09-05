// 1) 解析用户的参数  commander  返回一个 program
const program = require('commander')
const {
  version
} = require('./constants')
// 用户传递的参数解析的位置  执行 jason-cli --help 输出 [ '/usr/local/bin/node', '/usr/local/bin/jason-cli', '--help' ]
// console.log(process.argv) 
// 映射对象
const mapAction = {
  create: {
    alias: 'c',
    description: 'crate a project',
    examples: [
      'jason-cli create <project-name>'
    ]
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'jason-cli config set <k> <v>',
      'jason-cli config get <v>'
    ]
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}
// jason-cli create projectname
Reflect.ownKeys(mapAction).forEach((action) => {
  program
    .command(action)
    .alias(mapAction[action].alias)
    .description(mapAction[action].description)
    .action(() => {
      if (action === '*') {
        console.log(mapAction[action].description)
      } else {
        console.log(action)
      }
    })
})
// 示例
program.on('--help', () => {
  console.log('\nexamples: ')
  Reflect.ownKeys(mapAction).forEach((action) => {
    mapAction[action].examples.forEach(example => {
      console.log(`  ${example}`)
    })
  })
})

// 配置版本号
program.version(version).parse(process.argv)