@vue/cli-server-

### 依赖

sudo npm install -g @vue/cli-service-global  
可以不用任何依赖初始化一个 vue 项目  
运行 vue 文件： vue serve App.vue

## Vue 组件间通信方式

Vue: 单项数据流

1. 单层级
   :value="mny" @update:value="(value)=>mny=value"  
   :value.sync="mny"  
   :value="mny" @input="mny=>this.mny=mny" ===> v-module="mny"

2. 多层级  
   $parent  $chilren  
   \$dispatch

```
Vue.prototype.$dispatch = function (eventName, value) {
  let parent = this.$parent
  while(parent) {
    parent.$emit(eventName, value)
    parent = parent.$parent
  }
}
```

\$broadcase

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
}
```

$attrs 所有的属性   $listeners 所有的监听属性  
inheritAttrs: false 不显示左右的传入的属性

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

##
