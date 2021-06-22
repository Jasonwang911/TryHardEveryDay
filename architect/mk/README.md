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