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
- npm 独有的命令是
```
npm rebuild 
```

#### yarn Facebook,Goole,Exponent和Tilde构建的新的js的包管理器
- 为了解决npm对安装包的一致性/完整性的问题；以及npm安装过慢的问题  

1. 特点
- 确定性： 通过lock文件保证安装依赖关系的顺序性，既在不同的机器上安装的文件依赖一致
- 采用模块扁平安装模式： 通过一定策略将依赖中的不同版本归结为单个版本，已避免创建多个副本造成冗余 
- 网络性能更好： yarn采用了请求排队的理念，类似并发连接池。同时引入了更好链接失败的重试策略  
- 采用了缓存机制，实现了离线模式
- yarn.lock中子依赖版本号不是固定版本，不能单独固定node_modules文件，还需要和package.json进行配合
- yarn和npm的互相切换： synp工具，可以将yarn.lock转换为package-lock.json
- yarn查看缓存目录及内容: yarn优先使用网络数据，如果网络数据请求失败再使用缓存数据
```
yarn cache dir
```
- yarn 独有的命令
```
yarn import 
yarn licenses
yarn pack
yarn why
yarn autoclean
```

2. Yarn 安装机制
检测包（checking） -- 解析包(Resolving Packages) -- 获取包(Fetching Packages) -- 链接包(Linking Packages) -- 构建包(Building Packages)   

- 检测包（checking）: 检测项目中是否存在一些npm相关文件，检查系统OS,CPU等信息
- 解析包(Resolving Packages): 获取当前项目中package.json定义的依赖为首层依赖，采用遍历首层依赖的方式获取依赖包的版本信息以及递归查找每层依赖包的版本和嵌套信息  
  对于没有解析过的包A，首次尝试从yarn.lock中过去到版本信息，并标记为已解析   
  如果在yarn.lock中没有找到包A，则向Registry发起请求获取满足版本范围的已知最高版本的包信息，获取后将当前包标记为已解析  
- 获取包(Fetching Packages)：检查缓存中是否存在当前依赖包，将缓存中部存在的依赖包下载到缓存目录  
  yarn根据cacheFolder+slug+node_modules+pkg.name生成一个path，判断系统中是否存在该path，如果存在证明已经有缓存，不用重新下载   
- 链接包(Linking Packages): 将项目中的依赖复制到项目node_modules下，同时尊徐扁平化原则  
- 构建包(Building Packages)： 依赖包中存在二进制包的进行编译   


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
