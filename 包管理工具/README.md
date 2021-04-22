# 前端基础建设与架构

## npm 内部机制和核心原理

### npm 安装机制: 优先安装依赖包到当前目录，缺点：同一个依赖包可能在电脑上进行多次安装

#### npm 的安装机制

- 构建依赖树时，按照扁平化的原则
- 前端工程中，依赖嵌套依赖，安装包通过缓存来解决依赖下载问题，对于一个依赖包的同一个版本进行本地化缓存，node_modules 文件夹下的\_cacache 文件夹下

```
## 使用缓存
npm config get cache
## 清除缓存
npm cache clean --force
```

\_cacache 文件夹，npm 缓存的 3 个目录
content-v2 二进制文件  
index-v5 content-v2 里文件索引  
tmp

1. 缓存如何被存储并被利用
   当 npm install 执行时，通过 pacote 把相应的包解压在对应的 node_modules 下面，使用缓存后先下载到缓存中，再解压到 node_modules 下  
   pacote 依赖 npm-registry-fetch 来下载包，使用缓存后 npm-registry-fetch 可以通过设置 cache 属性在给定的路径下根据 IETF RFC 7234 生成缓存数据  
   在每次安装资源的时候，根据 package-lock.json 中存储的 integrity、version、name 信息生成一个唯一的 key，这个 key 对应 index-v5 下面的索引  
   如果发现有缓存资源，就会找到 tar 包的 hash，再次通过 pacote 把对应的二进制文件解压到相应的项目 node_modules 下面  
   注意：
   以上缓存策略是从 npm v5 版本开始的，在这个版本之前，每个缓存的模块在~/.npm 文件夹中以模块名的形式直接存储，存储的结构是： {cache}/{name}/{version}

2. npm 小技巧

- npm init 命令是调用 shell 脚本输出一个初始化的 package.json 文件， 取消关联 npm unlink  
  查看 npm init 文件下的例子

- npm link 将木块链接到对应的业务项目中，提高本地调试以验证报的可用性
  主要做了两件事
  为目标 npm 模块（npm-package1）创建软连接，将其连接到全局 node 模块安装路径/usr/loacl/lib/node_modules 中  
   为目标 npm 模块（npm-package1）的可执行 bin 文件创建软连接，将其链接到全局的 node 命令安装路径 /usr/loacl/lib 中  
  项目目录如下

```
project1
- package1
-- feature A
```

- 在 package1 中执行 npm link 链接目录和可执行文件
- 在 project1 项目文件夹中执行 npm link npm-package1 命令，这样就回去 /usr/loacl/lib/node_modules 中检查是否有 package1 这个包，如果有就会在项目目录下建立软链接

- npx
- npm 独有的命令是

```
npm rebuild
```

#### yarn Facebook,Goole,Exponent 和 Tilde 构建的新的 js 的包管理器

- 为了解决 npm 对安装包的一致性/完整性的问题；以及 npm 安装过慢的问题

1. 特点

- 确定性： 通过 lock 文件保证安装依赖关系的顺序性，既在不同的机器上安装的文件依赖一致
- 采用模块扁平安装模式： 通过一定策略将依赖中的不同版本归结为单个版本，已避免创建多个副本造成冗余
- 网络性能更好： yarn 采用了请求排队的理念，类似并发连接池。同时引入了更好链接失败的重试策略
- 采用了缓存机制，实现了离线模式
- yarn.lock 中子依赖版本号不是固定版本，不能单独固定 node_modules 文件，还需要和 package.json 进行配合
- yarn 和 npm 的互相切换： synp 工具，可以将 yarn.lock 转换为 package-lock.json
- yarn 查看缓存目录及内容: yarn 优先使用网络数据，如果网络数据请求失败再使用缓存数据

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

- 检测包（checking）: 检测项目中是否存在一些 npm 相关文件，检查系统 OS,CPU 等信息
- 解析包(Resolving Packages): 获取当前项目中 package.json 定义的依赖为首层依赖，采用遍历首层依赖的方式获取依赖包的版本信息以及递归查找每层依赖包的版本和嵌套信息  
  对于没有解析过的包 A，首次尝试从 yarn.lock 中过去到版本信息，并标记为已解析  
  如果在 yarn.lock 中没有找到包 A，则向 Registry 发起请求获取满足版本范围的已知最高版本的包信息，获取后将当前包标记为已解析
- 获取包(Fetching Packages)：检查缓存中是否存在当前依赖包，将缓存中部存在的依赖包下载到缓存目录  
  yarn 根据 cacheFolder+slug+node_modules+pkg.name 生成一个 path，判断系统中是否存在该 path，如果存在证明已经有缓存，不用重新下载
- 链接包(Linking Packages): 将项目中的依赖复制到项目 node_modules 下，同时尊徐扁平化原则
- 构建包(Building Packages)： 依赖包中存在二进制包的进行编译

#### npm 多原镜像和企业级部署私服原理

优势： 确保高速稳定的 npm 服务，使发布私有模块更加安全；审核机制保障私服上的 npm 模块的质量和安全

1. npm 中的源（registry）就是一个查询服务 查询的市 npmjs.org 官网的信息 registry.npmjs.org

2. 一个项目中使用多个源的时候一般使用 scripts 下的 preinstall 钩子在安装脚本前自动进行源切换

```
"scripts": {
  "preinstall": "node ./bin/preinstall.js"
}
```

3. nrm 是 npm 的镜像源管理工具，可以快速的在多个 npm 源中进行切换

##### 如何部署一个私有 npm 镜像

1. 市面上有三种部署方式，原理基本相同，通过一个服务转发进行检索和选择  
   nexus

verdaccio

cnpm

2. npm 配置作用优先级
   npm 内置的.npmrc < 全局级的 .npmrc < 用户级的 .npmrc < 项目级的 .npmrc < env 环境变量设置 npm 配置 < 命令行设置 npm 配置

3. npm 镜像和依赖安装问题： 有条件的情况下从网络层面解决

##### CI 环境上的 npm 优化以及更多工程化相关问题

1. CI 环境上 npm 的优化: 在 CI 环境使用 npm ci 代替 npm install 一般会获得更加稳定、一致和迅速的安装体验

- npm ci 要求项目中必须存在 package-lock.json 或 npm-shrinkwrap.json
- npm ci 完全根据 package-lock.json 安装依赖，可以保证整个开发团队保证使用完全一致的依赖
- npm ci 在执行安装时，会先删除项目中现有的 node_modules，然后全新安装
- npm ci 只能一次安装整个项目所有依赖包，无法安装单个依赖包
- 如果 package.json 和 package.json 冲突，那么 npm ci 会直接报错，并非更新 lockfiles
- npm ci 永远不会改变 package.json 和 package-lock.json

package-lock.json 缓存了每个包的具体版本和下载链接，不需要再去远程仓库进行查询,可以加快项目依赖下载时间

##### npm 版本规范： 遵循 SemVer 版本规范

这也是依赖库锁版本行为的原因  
create-react-app 中的做法： 使用 verifyPackageTree() 方法对 babel package.json 等进行检索，看是否符合 create-react-app 的版本的要求，如果不符合 create-react-app 的构建过程会直接报错并退出。  
这么做的理由是需要上述依赖项的某些确定版本，以保障 create-react-app 源码的相关功能稳定

##### 最佳实操建议

- 项目创建

1. 优先使用 npm v5.4.2 以上的 npm 版本，以保证 npm 的最基本先进性和稳定性
2. 项目的第一次搭建使用 npm install <package> 安装依赖包，并提交 package.json package-lock.json，而不提交 node_modules 目录
3. 其他项目成员首次 checkout/clone 项目代码后，执行一次 npm install 安装依赖包

- 升级依赖包的需求

1. 依靠 npm update 命令升级到新的小版本
2. 依靠 npm install <package-name>@<version> 升级大版本
3. 也可以手动修改 package.json 中的版本号，并执行 npm install 来升级版本
4. 本地验证升级后新版本无问题，提交新的 package.json、package-lock.json 文件

- 对于降级依赖包的需求

1. 执行 npm install <package-name>@<old-version>命令验证没问题后，提交新的 package.json、package-lock.json 文件

- 删除某些依赖

1. 执行 npm uninstall <package>命令，验证没问题后，提交新的 package.json、package-lock.json 文件
2. 也可以手动操作 package.json，删除依赖，执行 npm install 命令，验证没问题后，提交新的 package.json、package-lock.json 文件

- 任何团队成员提交 package.json、package-lock.json 更新后，其他成员应该拉去代码后，执行 npm install 更新依赖
- 任何时候都不要修改 package-lock.json
- 如果 package-lock.json 出现冲突或者问题，建议将本地的 package-lock.json 文件删除，引入远程的 package-lock.json 文件和 package.json，在执行 npm install 命令

##### 包管理工具中经常会遇到的问题

1. 为什么要 lockfiles，要不要提交 lockfiles 到仓库?
   package-lock.json 文件的作用是锁定依赖安装结构，目的是保证在任意机器上执行 npm install 都会得到完全相同的 node_modules 安装结果

2. 为什么单一的 package.json 不能确定唯一的依赖树
   不同版本的 npm 的安装依赖策略和算法不同  
   npm install 将根据 package.json 中的 semver-range version 更新依赖  
   某些依赖项自上次安装依赖，可能已发布了新版本

3. 删除 node_modules,重新 npm install 解决依赖问题，有什么影响

4. 要不要提交 lockfiles 到仓库？
   看项目定位决定  
   如果开发一个应用，建议吧 package-lock.json 文件提交到代码版本仓库  
   如果目标是开发一个给外部使用的库，可以复用主项目已经加载过的包，减少依赖重复和体积  
   作为库的开发者，真的有使用某个特定版本依赖的需要，一个更好的方式是定义 peerDependencies，具体的做法是把 package-lock.json 一起提交到代码库中，不需要 ignore，但是执行 npm publish 命令，发布一个库的时候，应该被忽略而不是直接发布出去  
   对于以上概念的解释：
   早起 npm 锁定版本的方式是使用 npm-shrinkwrap.json，与 package-lock.json 不通电在于 npm 包发布的时候默认将 npm-shrinkwrap.json 发布，因此类库或者组件需要慎重  
   使用 package-lock.json 是 npm v5.x 版本新增的特性，而 npm v5.6 以上才逐步稳定，在 5.0-5.6 中间，对 package-lock.json 的处理逻辑进行过几次更新  
   在 npm v5.0.x 版本中，npm install 时都会根据 package-lock.json 文件下载，不管 package.json 内容究竟是什么  
   在 npm v5.1.0 版本到 npm v5.4.2, npm install 会无视 package-loack.json 文件，下载最新的 npm 包病更新 package-lock.json  
   在 npm 5.4.2 版本后，如果项目中存在 package.json 和 package-lock.json，同时 package.json 的 semver-range 版本和 package-lock.json 中版本不兼容，npm install 时 package-lock,json 将会更新到兼容 package.json 的版本；如果 package-lock.json 和 npm-shrinkwrap.json 同时存在于项目跟目录，package-lock.json 将会被忽略

- npm 设计的依赖类型声明：
  dependencies 项目依赖  
  devDependencies 开发依赖
  peerDependencies 同版本依赖  
  bundledDependencies 捆绑依赖  
  optionalDependencies 可选依赖

5. 作为库开发者，如何保证依赖包之间的强制最低版本要求
