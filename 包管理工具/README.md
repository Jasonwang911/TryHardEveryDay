# 前端基础建设与架构

## npm内部机制和核心原理

### npm安装机制: 优先安装依赖包到当前目录，缺点：同一个依赖包可能在电脑上进行多次安装

#### npm的安装机制
- 构建依赖树时，按照扁平化的原则
- 前端工程中，依赖嵌套依赖，安装包通过缓存来解决依赖下载问题，对于一个依赖包的同一个版本进行本地化缓存，node_modules文件夹下的_cacache文件夹下
```
## 使用缓存
npm config get cache
## 清除缓存
npm cache clean --force
```
_cacache文件夹，npm缓存的3个目录
content-v2   二进制文件    
index-v5   content-v2里文件索引   
tmp   
1. 缓存如何被存储并被利用
当npm install 执行时，通过pacote把相应的包解压在对应的node_modules下面，使用缓存后先下载到缓存中，再解压到node_modules下   
pacote依赖npm-registry-fetch来下载包，使用缓存后 npm-registry-fetch 可以通过设置cache属性在给定的路径下根据IETF RFC 7234生成缓存数据  
在每次安装资源的时候，根据package-lock.json中存储的integrity、version、name信息生成一个唯一的key，这个key对应index-v5下面的索引   
如果发现有缓存资源，就会找到tar包的hash，再次通过pacote把对应的二进制文件解压到相应的项目node_modules下面    
注意： 
以上缓存策略是从 npm v5 版本开始的，在这个版本之前，每个缓存的模块在~/.npm文件夹中以模块名的形式直接存储，存储的结构是： {cache}/{name}/{version}

2. npm 小技巧
- npm init 命令是调用shell脚本输出一个初始化的package.json文件， 取消关联 npm unlink   
查看npm init 文件下的例子   

- npm link 将木块链接到对应的业务项目中，提高本地调试以验证报的可用性
主要做了两件事
 为目标npm模块（npm-package1）创建软连接，将其连接到全局node模块安装路径/usr/loacl/lib/node_modules中   
 为目标npm模块（npm-package1）的可执行bin文件创建软连接，将其链接到全局的node命令安装路径 /usr/loacl/lib 中  
项目目录如下
```
project1  
- package1
-- feature A    
```
- 在package1中执行npm link 链接目录和可执行文件
- 在project1项目文件夹中执行 npm link npm-package1 命令，这样就回去 /usr/loacl/lib/node_modules中检查是否有package1这个包，如果有就会在项目目录下建立软链接

- npx  


#### npm 多原镜像和企业级部署私服原理
优势： 确保高速稳定的npm服务，使发布私有模块更加安全；审核机制保障私服上的npm模块的质量和安全  
1. npm中的源（registry）就是一个查询服务  查询的市npmjs.org官网的信息  registry.npmjs.org

2. 一个项目中使用多个源的时候一般使用 scripts下的 preinstall 钩子在安装脚本前自动进行源切换   
```
"scripts": {
  "preinstall": "node ./bin/preinstall.js"
}
```

3. nrm 是 npm 的镜像源管理工具，可以快速的在多个npm源中进行切换

##### 如何部署一个私有npm镜像
1. 市面上有三种部署方式，原理基本相同，通过一个服务转发进行检索和选择   
nexus  

verdaccio 

cnpm  

2. npm配置作用优先级
npm内置的.npmrc < 全局级的 .npmrc < 用户级的 .npmrc < 项目级的 .npmrc < env环境变量设置npm配置 < 命令行设置npm配置

3. npm镜像和依赖安装问题： 有条件的情况下从网络层面解决









1. 删除node_modules,重新npm install 解决依赖问题，有什么影响
