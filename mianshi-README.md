## Vue
1. v-module 原理

2. 组件中data为什么是一个函数

3. v-html会有什么问题：原理就是innerHTML
- 可能会导致xss攻击
- 会替换调内部标签

4. 父子组件生命周期调用顺序  
- 渲染顺序： 先父后子
- 完成顺序： 先子后父
- 有队列的概念，子组件初始化后都会进入队列，所有队列表清空才会执行父组件

5. Vue父子组件如何通信

6. Vue中相同逻辑如何抽离
- mixins
- 先执行mixin的后执行组件的，组件的会覆盖mixin的

7. 为什么要使用异步组件  
组件功能多打包打包出来的结果会变大，这时候可以使用异步组件的方式来加载。主要依赖import()实现文件分割加载。
- 把组件的定义变成异步加载
- 异步组件一定是一个函数或者是对象，函数的话返回的是一个Promise

8. 什么是作用域插槽
- 普通插槽是在父组件中进行渲染，在渲染完子组件后进行保存和替换
- 作用域插槽 slot-scope  v-slot， 是在组件内部渲染的，编译成了组件的属性，以一个函数的形式存在

9. 谈谈你对keep-alive的理解
- keep-alive 是一个组件，并且是抽象组件，创建组件created的时候创建一个缓存列表数组，移除组件destoryed，会清空缓存和key，在mounted的时候，会使用watch监听include和exclude属性，并动态的加载和移除组件，渲染render的时候，会拿到组件的默认插槽this.$slots.default，并且拿到缓存的第一个组件（如果缓存多个组件的话只会拿到第一个组件），然后获取组件的名字name，并判断组件是否在缓存队列中，如果是进行缓存，如果不是不进行缓存
- keep-alive可以实现组件缓存，当组件切换时不会对当前组件进行卸载，常用的两个属性是include和exclude，两个生命周期是activated和deactivited.
- LRU算法，缓存的时候会创建一个key，key会被放入队列，LRU算法就是最久未使用法。调用哪个页面会把哪个页面的key移动到数组最后，然后当超出keep-alive的max属性的时候，会从前面一次删除key

10. Vue组件中常见的性能优化  
- 编码优化
  不要讲所有数据都放在data中，data中的数据都会进行geter和setter,并会进行watch   
  vue在v-for时都会给每项元素绑定事件需要的代理   
  spa页面采用keep-alive缓存组件  
  拆分组件，提高复用性，增加代码的可维护性，减少不必要的渲染  
  v-，if当值为false时内部指令不会执行，具有阻断功能，尽量使用v-if代替v-show  
  key保证唯一性，vue会才用就就地复用策略  
  Object.freeze冻结数据   
  合理使用路由懒加载、异步组件   
  尽量才用runtime运行时版本  
  数据持久化的问题（防抖、节流）   

- vue加载性能优化
  第三方模块按需导入（babel-plugin-component)   
  滚动到可视区动态加载（vue-virtual-scroll-list)     
  图片懒加载（vue-lazyload)   

- 用户体验 
  app-skeleton骨架屏     
  app-shell app壳   
  pwa service-work   

- SEO优化  
  预渲染插件 prerender-spa-plugin  
  服务端渲染ssr   

- 打包优化
  使用cdn的方式加载第三方模块   
  多线程打包happypack   
  splitChunks 抽离公用文件  
  sourceMap 生成   

- 缓存 压缩
  客户端缓存，服务端缓存  
  服务端gzip压缩   


11. Vue3.0你知道有哪些改进
  Vue3.0才用了TS来编写   
  支持Composition API   
  Vue3中响应式数据原理改成proxy   
  vdom的对比算法更新，只更新vdom的绑定了动态数据部分

12. 实现hash路由和history路由
  onhashchange   
  history.pushState    

13. Vue-router中导航守卫有哪些
  - 完整的导航解析流程

##



