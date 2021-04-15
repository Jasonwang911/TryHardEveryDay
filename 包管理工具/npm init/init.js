const desc = prompt('请输入项目描述0', '项目描述...') 

module.exports = {
  key: 'value',
  name: prompt('name?', process.cwd().split('/').pop()),
  version: prompt('version?', '0.0.1'),
  description: desc,
  main: 'index.js',
  repository: prompt('github repository url', '', function(url) {
    if(url) {
      run('touch README.md');
      run('git init');
      run('git add READNE,md');
      run('git commit -m "first commit"');
      run(`git remote add origin ${url}`);
      run('git push -u origin master');
    }
    return url
  })
}

// 执行该脚本 
// npm config set init-module  ~\.npm-init.js
// 编辑 npm config ，使用下列命令打开配置并进行修改，所有的配置都可以在 用户文件夹下的.npmrc文件进行查看
// npm config edit  