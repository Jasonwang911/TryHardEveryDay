## 工具

### 文档

#### 需求文档
1. 语雀
2. wiki

#### 接口文档
1. Yapi 

#### 测试文档


## 架构设计的产出
1. 整体技术方案设计 文档
- 需要哪些项目，各项目之间的关系 
- 独立的业务组件库
- 为何要自研 自定义事件统计 服务
- 作品的数据结构设计
- 写 技术方案设计文档
注意事项  
- 不要关注细节，看整体，看范围
- 考虑扩展性
- 考虑可行性，不确定的调研
- 考虑实现成本，不要为了设计而设计，技术要永远服务于业务


## 运营统计
1. 统计平台
- 友盟
- 百度统计
- arms


#### 项目的数据结构设计
1. node结构，使用规范的vnode形式
2. 组件数据结构使用数组，数组是可以排序的
3. 使用vuex指定并存储指定组件
4. 图层使用一个计算属性(单一数据源)计算出索引，而不是一个单独的数据

设计思路： 
vuex store
```
const store = {
  // 作品
  work: {
    title: '作品标题',
    setting: { /* 一些可能的配置项，用不到就先预留，如微信分享等的参数 */ },
    props: { /* 页面body的一些配置，如背景色 */},
    components: [
      // components 要用数组，有序结构
      // 单个node要符合常见的vnode格式
      {
        id: 'xxx', // 每个组件都有id，不重复
        name: '文本1',
        tag: 'text',
        attrs: { fontSize: '20px'},
        children: [
          '文本1' // 文本内容，有时候放在children，有时候放在attrs或者props，没有标准，看实际情况来确定
        ]
      },
      {
        id: 'yyy',
        name: '图片1',
        tag: 'image',
        attrs: { src: 'xxx.png', width: '100px'},
        children: null
      }
    ]
  },

  // 画布当前选中的组件(只有其中一个)
  activeComponentId: 'xxx'
}

const getters= {
  layers: () => {
    store.work.components.map(c => {
      return {
        id: c.id,
        name: c.name
      }
    })
  }
}
```

1. 每个组件尽量符合vnode规范
2. 用数组来组织数据，有序
3. 尽量使用引用关系，不要冗余

##### 数据流转： B端、C端、管理后台 公用一个数据库
1. 创建作品：初始化一个JSON数据
2. 保存作品: 修改JSON数据
3. 发布作品：修改一个标记
4. C端浏览作品：获取JSON数据，SSR渲染页面
5. 屏蔽作品：修改一个标记

C端还有缓存，防止频繁访问数据库


#### 技术方案设计文档的编写技巧
1. 需求背景： 把需求文档贴上
2. 范围： 整体设计，没有细节
3. 模块设计
- 模块拆分和关系图
- 各个模块的功能解释
4. 扩展性的说明: 扩展页面配置，编辑器的功能
5. 开发提效： 脚手架，组件平台
6. 运维保障
- 线上服务和运维服务
- 安全
- 监控和报警
- 服务的扩展性： 流量大

### 大厂是怎么做项目的
1. 项目设计阶段
痛点---需求（PD）---PRD(产品原型图、可量化指标)---技术方案设计（技术选型，架构设计，选型，api，攻关）---立项（kick-off启动，项目成员）---排期/计划（确认时间点-WBS里程碑）
2. 项目实施阶段
交互/视觉设计（设计稿）---开发（前后端，联调）---测试（单端测试，功能测试，性能测试）---项目验收（产品验收）---发布上线

#### 项目研发过程中的痛点
1. 快速复用已有的沉淀
2. 协同开发时，由于git操作不规范，导致分支混乱，操作耗时
3. 发布上线的耗时，而且容易出现各种错误： 制定标准的上线流程和规范并集成到脚手架

#### 需求分析
1. 通用的研发脚手架
2. 通用的项目/组件创建能力
- 模板支持定制，定制后能够发布生效
- 模板支持快速接入，极低的接入成本
3. 通用的项目/组件发布能力
- 发布过程自动完成标准化的git操作
- 发布成功后自动删除开发分支并创建tag
- 发布后自动完成云构建、CDN、域名绑定
- 发布过程支持测试/生产两种模式

#### 大厂的git操作规范
- master分支: 只做代码同步
- dev分支
- release（上线后产生tag）

#### 画图工具推荐
1. mac 
- OmniGraffle

2. 在线
- https://whimsical.com/


### 脚手架拆包策略
拆分原则
- 核心模块 core
- 命令模块 commands
- 模型模块 models
- 工具模块 utils

1. 核心流程 core模块
- 准备阶段
检查版本号--检查node版本--检查root启动--检查用户目录--检查入参--检查环境变量--检查是否为最新版本--提示更新

- 命令注册
注册init命令--注册publish命令--注册clean命令--支持debug
- 命令执行

2. 命令
- 初始化

3. 模型层
- Command命令
- Git仓库

4. 支撑模块
- Git操作
- 云构建
- 工具方法
- API请求
- Git Api


### 技术点
- import-local
- commander

1. 工具库: 
- npmlog  日志
- fs-extra  文件操作
```
<!-- mkdir 创建目录  mkdirp 创建全部目录 mkdirpSync同步创建全部目录-->
fse.mkdirpSync()  
```
- semver  版本比对
- color  打印颜色
- user-home   用户的主目录
- dotenv   获取环境变量
- root-check  root账户的检查和自动降级
- semver 比对版本号
- root-check 实现root用户的降级， 判断当前 process.geteuid === 0, 进行process.setuid() 和 process.setgid()  当前用户所在的分组
- user-home 检查用户主目录
  os-homedir 包来实现
- path-exists 判断文件路径是否存在 fs
- minimist 参数解析
- url-join 拼接url
- commander 


#### 相关知识积累
1. require 支持加载的文件包括： .js/.json/.node
- 当加载 .js 文件的时候要求必须要使用 module.exports 或者 exports 导出 
- 当加载 .json 文件的时候，会使用 JSON.parse 解析json文件
- 当加载 .node 文件（c++的一个插件）的时候，会使用 process.dlopen 来打开这个插件
- 当加载 其他格式文件 全部默认使用 .js 引擎来解析

2. process.geteuid() 在windows上并不能检查当前用户
- 0 表示 root 账户
- 使用 root-check 来进行root用户的降级

3. 获取当前操作系统 os 模块
require('os').type()
- Linux系统上'Linux'
- macOS 系统上'Darwin'
- Windows系统上'Windows_NT'

4. Node多进程开发 child_process  spawn/exec/execFile/fork 的区别
- 中文文档： http://nodejs.cn/api/child_process.html



### Github Actions : CICD的一个工具
文档： https://docs.github.com/cn/actions/quickstart

> .github/workflows/xxx.yml  文件进行配置

> master 分支，自动化测试
> dev 分支，自动部署到测试机
> v*.*.* 格式的tag自动上线（支持回滚）

1. 触发条件 on
- push 

- branches

- paths 某个修改条件

2. 任务 jobs
- runs-on  操作系统
- steps
  uses:    
  name:      
  with:   
  run:    

### Travis CI
文档： travis-cli.com   
.travis.yml 文件


### Git 标准操作流程 Git Flow 
1. 命名规范
- develop分支： feature/功能名称
- release分支： 版本号 v1.0.0
- hotfix分支：hotfix/bug名称(合并到master和develop)

2. Github Flow 是传统版本控制的简化版
> 文档：https://guides.github.com/introduction/flow/index.html

- 从master拉出分支develop进行开发
- 开发完成发起 Pull Request
- 发起评审 Review
- 部署，并且测试
- 合并 Merge

3. Github Flow 需要注意的两个规则
- branch 命名
> feature 开头代表功能开发
> hotfix 开头代表bug修复
- commit 信息写清信息杜绝 update fix bug这类废话

