@vue/cli-server-

## Vue 组件间通信方式

1. 单层级
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

## render 函数之 JSX 应用

## Vue 原理

## JWT 认证

## 级联组件编写

## Vue 的单元测试

##
