const path = require('path');
const fs = require('fs');
const axios = require('axios');
const ora = require('ora');
const chalk = require('chalk');
const Inquirer = require('inquirer'); // 是一个类
const {
  promisify
} = require('util');
// 不是基于promise二十基于回调函数，需要转换为promise
let downloadGitRepo = require('download-git-repo');
let ncp = require('ncp');
// 便利文件夹，判断需不需要渲染
const Metalsmith = require('metalsmith');
// 统一了所有模板引擎
let {
  render
} = require('consolidate').ejs;

render = promisify(render);


downloadGitRepo = promisify(downloadGitRepo);
ncp = promisify(ncp);
const {
  downloadDirectory
} = require('./constants');
// create 的所有逻辑
// 功能是创建项目
// 拉去对应项目列表，让用户选择对应版本
// 可能还需要用户配置一些数据结合项目然后再渲染
// github 开发文档 https://developer.github.com/v3/

// https://api.github.com/orgs/zhu-cli/repos 获取组织下的仓库

// 封装loading效果
const waitFnLoading = (fn, message) => async (...args) => {
  const spinner = ora(message);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed();
  return result;
};

// 1. 获取项目的所有模板 在获取前显示loading 获取结束关闭loading  使用报ora
const fetchReplList = async () => {
  const {
    data
  } = await axios.get('https://api.github.com/orgs/jason-cli/repos');
  return data;
};

// 2. 获取对应项目版本号的tag
const fetchTaglList = async (repo) => {
  const {
    data
  } = await axios.get(`https://api.github.com/repos/jason-cli/${repo}/tags`);
  return data;
};

// 3.下载模板
const download = async (repo, tag) => {
  let api = `jason-cli/${repo}`;
  if (tag) {
    api = `${api}#${tag}`;
  }
  const dest = `${downloadDirectory}/${repo}`;
  await downloadGitRepo(api, dest);
  return dest;
};

module.exports = async (projectName) => {
  let repos = await waitFnLoading(fetchReplList, 'fetching template ...')();
  repos = repos.map((item) => item.name);
  // 选择模板 inquirer
  const {
    repo
  } = await Inquirer.prompt({
    name: 'repo', // 获取选择候的结果
    type: 'list', // list checkbox input
    message: `${chalk.green('please choise a template to create project')}`,
    choices: repos,
    // default: 'vue-simple-template',
  });
  // 通过当前选择的项目拉去对应的项目，并选择模板对应的版本号
  let tags = await waitFnLoading(fetchTaglList, 'fetching tags ...')(repo);
  tags = tags.map((tag) => tag.name);
  const {
    tag
  } = await Inquirer.prompt({
    name: 'tag', // 获取选择候的结果
    type: 'list', // list checkbox input
    message: "please choise a tag of your choise's template",
    choices: tags,
    // default: 'vue-simple-template',
  });
  console.log(repo, tag);
  // 把下载的模板放到一个临时的目录里，方便后续使用  download-git-repo
  const result = await waitFnLoading(download, 'download template ...')(repo, tag);
  // const result = await download(repo, tag);
  console.log(result);
  // 拿到下载的目录候如果是简单模板，直接拷贝到当前目录下即可; 复杂的模板需要渲染好再拷贝  ncp包的作用是拷贝
  // 目录是否存在，如果存在提示当前项目已经存在
  // 如果有ask.js文件就是需要配置的
  if (!fs.existsSync(path.join(result, 'ask.js'))) {
    console.log('简单模板');
    await ncp(result, path.resolve(projectName));
  } else {
    // 复杂的模板需要渲染好再拷贝  ncp包的作用是拷贝  只要编译都需要metalsmith这个包 还需要使用 consolidate ejs
    console.log('复杂模板');

    await new Promise((resolve, reject) => {
      // 1.根据ask.js文件让用户填信息
      Metalsmith(__dirname) // 如果传入路径，会默认便利当前路径下的src文件夹，所以要指定source
        .source(result)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          // 找ask.js文件
          const args = require(path.join(result, 'ask.js'));
          const obj = await Inquirer.prompt(args);
          // 中间件之间的连接 metal.metadata()
          const meta = metal.metadata();
          Object.assign(meta, obj);
          delete files['ask.js'];
          done();
        })
        .use((files, metal, done) => {
          // 根据用户的输入下载模板
          const obj = metal.metadata();
          Reflect.ownKeys(files).forEach(async (file) => {
            if (file.includes('js') || file.includes('json')) {
              // 获取内容查看是否又模板 buffer
              let content = files[file].contents.toString();
              if (content.includes('<%')) {
                content = await render(content, obj);
                files[file].contents = Buffer.from(content);
              }
            }
          });
          done();
        })
        .build((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      // 2.渲染模板
    });
  }
};