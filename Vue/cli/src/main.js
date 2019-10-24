// 1. 解析用户的参数commander解析用户命令行输入的参数
const path = require('path');
const program = require('commander');
const { version } = require('./constants');
// console.log(process.argv); 执行 jason-cli --help 后得到
// [ 'C:\\Program Files\\nodejs\\node.exe',
// 'C:\\Users\\shen.wang\\AppData\\Roaming\\npm\\node_modules\\vue-cli\\bin\\www','--help' ]
// 解析用户传入的选项program.parse(process.argv);
// vue create projectname
// vue ui
// vue -v
// 命令的映射随想
const mapAction = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'jason-cli create <project-name>',
    ],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'jason-cli config set <k> <v>',
      'jason-cli config get <k>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

// 循环创建项目  Reflect.ownKeys 和 Object.keys() 功能相同，但是能循环symbol
Reflect.ownKeys(mapAction).forEach((action) => {
  program
    .command(action) // 配置命令的名字
    .alias(mapAction[action].alias) // 配置项目的别名
    .description(mapAction[action].description) // 配置项目的描述
    .action(() => {
      if (action === '*') {
        console.log(mapAction[action].description);
      } else {
        // 从create.js引入create命令逻辑  [node , jason-cli, create]
        require(path.resolve(__dirname, action))(...process.argv.slice(3));
      }
    });
});
// 监听当前的 --help 事件
program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(mapAction).forEach((action) => {
    mapAction[action].examples.forEach((example) => {
      console.log(`  ${example}`);
    });
  });
});
// 创建项目
// program
//   .command('create') // 配置命令的名字
//   .alias('c') // 配置项目的别名
//   .description('create a project') // 配置项目的描述
//   .action(() => {
//     console.log('create');
//   });
// 配置版本号
program.version(version).parse(process.argv);
