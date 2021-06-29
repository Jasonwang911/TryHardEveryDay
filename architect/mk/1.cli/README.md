## 脚手架架构设计和框架搭建(基础架构)
- Lerna： 多package管理工具
- 架构设计技巧和架构图绘制方法
- yargs 

### 开发脚手架的必须要性
1. 提升前端研发效能
2. 统一项目结构，节约初始化项目的冗余操作
3. 统一git操作，节省项目代码合并、提交、打tag等等一系列的操作，最有效的防止git误操作带来的效能影响
4. 构建发布CICD流程的介入（依赖的安装和构建，资源上传CDN，域名绑定， 测试、正式服务器的操作）

核心价值： 
1. 自动化：项目重复代码拷贝、git操作、发布上线操作
2. 标准化：项目创建、git flow、发布流程、回滚流程
3. 数据化：研发过程系统化、数据化，让研发过程可以量化

脚手架和自动化构建工具的区别   
1. jenkins、travis等自动化构建工具通常在git hooks中触发，需要在服务端执行，无法覆盖研发人员本地的功能，如：创建项目自动化、本地git操作自动化等
2. 定制复杂：定制过程需要开发插件，其过程较为复杂，需要使用java语言，对前端同学不够友好
3. 对前端组件化开发中组件的管理


### 什么是脚手架
脚手架本质是一个操作系统的客户端，它通过命令执行：
```
vue create vue-test-app --force -r https://registry.npm.taobao.org
```
上面这条命令由3个部分组成： 
1. 主命令  vue
2. command: create
3. command的param: vue-test-app
4. option: --force,用来辅助脚手架确认在特定场景下用户的选择，可以理解为配置
5. -r 也叫 option，是 --registry 的简写

脚手架执行原理如下
- 在终端输入vue create project
- 终端解析出vue
- 在环境变量中找到vue命令
- 终端根据vue命令链接到实际文件vue.js
- 终端利用node执行vue.js
- vue.js解析command或者param
- vue.js执行command
- 执行完毕，退出执行

从应用的角度看 如何开发一个脚手架
- 新建一个文件夹（项目）使用npm进行初始化，打开package.json 配置bin字段，创建一个命令，指向bin/index.js；
- 将这个项目发布到npm；
- 全局安装这个脚手架；
- 使用第一步中bin字段中配置的命令来使用脚手架即可。



### 脚手架的实现原理
问题：  
1. 为什么全局安装 @vue/cli 后会添加的命令为 vue ?
- 可以使用 which 命令来查看可执行命令的来源 
- package.json 中的 bin 下可以指定对应执行文件和名称

2. 全局安装 @vue/cli 时发生了什么？
- 下载包到node的node_modules文件目录
- 检查当前安装包的 package.json 文件，并把 bin 中的可执行 命令和命令对应的可执行文件通过软连接的方式连接到node的可执行文件夹 bin 下

3. 执行 vue 命令时发生了什么？为什么 vue 指向一个 js 文件，我们却可以直接通过 vue 命令去执行它？
- 操作系统根据可执行命令在环境变量中找到可执行的软连接  node/vxx.xx/bin/ 目录下
- 然后通过node这个解释器来执行对应的可执行命令，并带入输入的所有参数和配置
- 通过环境变量  /usr/bin/env node vue.js 等价于
```
#! /usr/bin/env node 
```
- echo $PATH  查看环境变量
- ln -s 创建软连接

### 脚手架的开发流程

#### 发布到npm 
- 登录npm 
```
// 先切换为npm源
npm config set registry https://registry.npmjs.org
// 然后登录 输入账号密码和邮箱
npm login
```
- 发布
```
npm publish
```
如果发布报403，修改package.json文件中的name，然后重新发布，说明包重名  
- 卸载已发布的包
```
```

#### 调试 
1. 本地调试
```
npm link    // 将package.json中的bin链接到全局   --force    // 强制链接，会将之前的链接覆盖掉   
npm unlink   // 取消当前链接 
```
2. 分包： 当项目较大时候，需要调试不同版本
- 在包的同层目录再创建一个不同文件名的项目（ boya-test-lib），并进行初始化 yarn init -y
- 在 boya-test-lib目录创建lib文件夹，并写入index.js文件, 在package.jason中制定入口文件为 lib/index.js
- 进入包文件 boya-test 中，使用 npm link boya-test-lib ，这时会发现找不到lib包。
- 进入 boya-test-lib中进行全局链接 npm link
- 再次进入包文件 boya-test 中，使用 npm link boya-test-lib，安装成功
- 因为 boya-test-lib 没有发布到npm，所以不会自动安装依赖到 package.json 文件的 dependencies 中，所以需要手动添加 dependencies
```
"dependencies": {
    "boya-test-lib": "^1.0.0"
  }
```

#### 注册命令
注册命令 boya-test init 这个命令
1. node 的命令库 process
```
require('process').argv 
``` 
罗列了这个库的所有参数
```
[
  'C:\\Program Files\\nodejs\\node.exe',
  'G:\\yabo\\TryHardEveryDay\\architect\\mk\\1.cli\\boya-test\\bin\\index.js'
]
```
argv[0] 是node的执行文件， argv[1]是cli的可执行文件  argv[2]是运行时候执行的命令

#### 参数解析
实现参数解析 --version  和  init --name 


### 命令注册
1. 每个项目单独存放在commands下，使用lerna create 
@boya-cli-dev/init 的项目
2. 脚手架动态加载命令
见images 动态执行命令.png
- 使用require() 来加载绝对路径 来实现缓存
- 使用node来执行字符串
```
node -e "require('bin/index.js')"
```

### 命令执行

