@vue/cli-server-

### 依赖

sudo npm install -g @vue/cli-service-global  
sudo npm uninstall -g @vue/cli-service-global 
可以不用任何依赖初始化一个 vue 项目  
运行 vue 文件： vue serve App.vue

## Vue 组件间通信方式

Vue: 单项数据流

1. 单层级
   :value="mny" @update:value="(value)=>mny=value"  
   :value.sync="mny"      sync是   :value="value" @update:value="(value) => this.value = value"  的语法糖  
   v-model="money"        v-model是   :value="value" @input="(value) => this.value = value"  的语法糖

   v-model 具有局限性，属性绑定只能使用value, .sync 可以指定属性绑定的名称
 

2. 多层级  
   $parent     父组件  
   $chilren    子组件
   $dispatch   向上通知，只会通知当前组件的父组件  循环获取父组件，并向上触发事件，直到没有父组件为止   
   $broadcast  向下广播


```
Vue.prototype.$dispatch = function (eventName, value) {
  let parent = this.$parent
  while(parent) {
    parent.$emit(eventName, value)
    parent = parent.$parent
  }
}
```

```
Vue.prototype.$broadcast = function(eventName, value) {
  // 获取当前组件下的所有的子组件
  const broadcast = (chilren) => {
    chilren.forEach(child => {
      child.$emit(eventName, value)
      if(child.$chilren) {
        broadcast(child.$chilren)
      }
    })
  }
  broadcast(this.$children)
}
```

$attrs 上级传过来的所有的属性    
inheritAttrs: false 不显示上级传入的属性，属性就不会挂在dom节点上   
$listeners 所有的监听属性    
v-bind="$attrs"  把所有属性都传给子集  v-on="$listeners"  把所有方法都传递给子集   
v-bind="{name: 'jason', age: 18, address: '保定'}"   属性会被展开   

注入数据： 类似react中的context  可以把父组件直接注入进去   
```
// 父级组将自己暴漏出去
provide() {
  return { parent: this}
}

// 子组件注入 这样子组件就有了一个 this.parent 的实例,这样就能拿到父组件的实例，建议一般业务项目中不适用，会造成数据混乱，类库中使用比较方便
inject: ['parent']
```

ref 可以用到dom元素上，获取的是dom节点   
ref 放到组件上，获取的是当前的组件  this.$refs.son.say()  父组件可以直接拿到子组件的实例然后直接调用组组件的方法

eventBus 定义到了全局上，一个组件发射了事件，所有同名的事件都会触发   将 $bus.$on $bus.$emit 方法暴漏到Vue实例上，这样在任何实例上都能触发这两个方法  
组件的挂在顺序：  父组件 => 子组件   由于组件挂在是有顺序的，所以在使用eventBus 需要注意发布和触发事件的顺序，必要的时候需要使用 this.$nextTick()   

## render 函数之 JSX 应用

## Vue 原理

## JWT 认证

## 级联组件编写

## Vue 的单元测试

单元测试就是测试小的单元（一个方法，一个组件）

### TDD 测试驱动开发

先编写测试用例，然后针对测试用例编写功能，使其能够通过  
很好的诠释了代码  
清晰的了解软件的需求

### BDD 行为驱动开发

系统业务专家，开发者，测试人员一起合作，分析软件需求，然后将需求形成文档  
保证程序的实现和需求是一致的

### 测试工具 mocha（测试库） + chai(断言库)/jest（） karma + jasmine + chreome-launcher

karma 为前端自动化测试提供了跨浏览器测试的能力，mocha 是前端自动化测试的库

### mocha + chai

// 一个用例 expect 期望
// 用例分类 describe 套件 一个套件可以包含多个用例

#### 单元测试的测试方法

1. 相等：
   相等 to.be.equal()  
   深度相等 to.be.deep.equal() 用于对象  
   数组相等 to.be.lengthOf(len) 用于数组  
   布尔检测 to.be.true

2. 包含  
   包含 to.be.contain()  
   正则匹配 to.be.match(正则)

3. 比较  
   大于 to.be.greaterThan()  
   小于 to.be.lessThan()

4. 取反 to.be.not

5. 测试组件 @vue/test-untils  
   提供了 mount 方法用来挂载组件，获取到 wrapper。  
   wrapper 上有 find text 等方法  
   提供了 shallowMount 方法用来获取非组件方法。

6. 模拟方法 sinon mock 方法

### 编写一个脚手架   
脚手架的核心功能就是创建项目初始文件，编写脚手架是为了应付  
- 业务类型多
- 多次造轮子，项目升级等问题 
- 公司代码规范,无法统一 

#### 脚手架必备模块
- commander      参数解析 --help的实现就是借助了它
- inquirer       交互式命令行工具，有他就可以实现命令行的选择功能
- download-git-repo  在git中下载模板  
- chalk   粉笔帮我们在控制台中画出各种各样的颜色
- metalsmith  读取所有文件,实现模板渲染  
- consolidate  统一模板引擎  

### 使用eslint 
```
npm install eslint husky --save-dev # eslint是负责代码校验工作,husky提供了git钩子功能
npx eslint --init # 初始化eslint配置文件
```
#### 组件设计原则
1. 单一职责   要求组件有一个且只有一个变更的原因，这样组件的修改隔离并且受控。单一职责原则限制了组件的大小，使其集中在一件事情上。集中在一件事情上的组件便于编码、修改、重用和测试。   

## Vue2.0如何实现响应式原理（数据变化可以更新视图）
Object.defineProperty  可以重新定义属性，给属性增加 getter 和 setter 
判断是否是对象   typeof tatget !== 'object' || target == null 
问题： 1.属性不存在，新增的属性不会被拦截观察； 2.不能拦截观察数组，需要对数组上的方法进行重写 push shift unshift pop push reverse   
函数劫持，把函数进行重写，内部继续调用老方法


## rollup的配置


### Vue的优化
1. Vue2.0的数据劫持方面的优化处理
Vue2.0的数据劫持是Object.definedProtype()进行劫持，并且该方法只能劫持一层，如果想深层劫持的话需要递归劫持
- 尽量保持数据的扁平化 
- 一定要写key，key会启动就地复用策略
- Object.freeze() 冻结只被展示而不会被操作的数据（不需要修改，不需要被双向绑定的数据）
- Vue模板编译的时候会进行ast语法树解析，需要耗费时间和性能，如果是纯静态html结构可以用v-pre提升编译效率  
- 虚拟列表渲染的处理方案 vue-virtual-scroller  vue-virtual-scroll-list 
- 异步加载组件 
```
components: {
  HelloWorld: () => ({
    component: import('@/component/HelloWorld'),
    loading: LoadingCom,
    error: ErrorCom,
    delay: 200,
    timeout: 300
  })
}
```


