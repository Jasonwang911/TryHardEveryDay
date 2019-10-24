## 脚手架必备模块  cli主要是根据用户对话去拉去对应的模板
- commander      参数解析 --help的实现就是借助了它
- inquirer       交互式命令行工具，有他就可以实现命令行的选择功能
- download-git-repo  在git中下载模板  
- chalk   粉笔帮我们在控制台中画出各种各样的颜色
- metalsmith  读取所有文件,实现模板渲染  
- consolidate  统一模板引擎  

### 使用eslint 
```
npm install eslint husky --save-dev # eslint是负责代码校验工作,husky提供了git钩子功能
npx eslint --init # 初始化eslint配置文件  执行了 node_module/bin/eslint
```

### bin/www 文件 是一个可执行功能
```
#! /usr/bin/env node 
```
表示通知系统使用 /usr/bin/env 中的node执行这个文件

npm link     将package.json中的bin链接到全局    
npm unlink   取消当前链接   

## 发布 
当前项目中切换源到官网源   
```
nrm uyse npm
```
登录自己的账号
``` 
npm addUser  
```
发布包
```
npm publish
```
卸载已发布的包
```
npm unpublish --force
```
