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