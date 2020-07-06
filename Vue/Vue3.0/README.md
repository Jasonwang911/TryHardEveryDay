## VUE3.0

## Vue3.0的提高
1. performance  
- 重写了虚拟Dom的实现（跳过动态节点，只处理动态节点）
- update性能提高了1.3~2倍  
- SSR速度提高了2~3倍
2. Tree shaking
仅打包需要的模块
3. Fragment  
不在限于模板中的单个根节点
4. <Teleport> 
以前称为 Portal，传送门
5. syspense
异步组件
6. Typescript
更好的支持TS
7. Custom Render API 自定义渲染器API
8. Composition API
- 组合式API，替换原有的Options
- 根据逻辑相关性组织代码，提高可读性和可维护性
- 更好的重用逻辑代码（避免mixins混入时命名冲突问题）
- 但是依然可以沿用Options
9. Proxy  


## 基于Vue/cli配置vue3.0 版本4.3.0以上
```
npm install -g @vue/cli
vue create xxx
vue add vue-next
```

## 基于vite配置vue3.0
- 基于浏览器原生ES imports的开发服务器，完全跳过了打包这个概念，服务器随起随用
- 同时不仅有Vue文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢
```
npm init vite-app xxx
cd xxx
npm install 
npm yun dev
npm run build
```

## setup和响应式系统API
1. setup(props)
- Composition API的入口
- 初始化props和beforeCreated之间的触发的
- props 是基于Proxy响应式数据的，结构无效
- setup中return的对象可以直接在template中渲染


### watchEffect
```
setup(props) {
  watchEffect(() => {
    console.log(props.titile)
  })
}
```

### 构建响应式数据的方式
1. ref 接收一个参数值，返回一个响应式切可改变的ref对象,原理不是基于Proxy，还是Object.defineProperty监听value的值
- 值为内部的 value,模板渲染的是后不需要使用value，js中需要使用value的值
- 一般处理简单值的响应式

2. reactive 基于Proxy对数据进行深度的监听，以此构建响应式，Vue.observa

3. toRefs(state) 把reactive中返回的响应式数据变为ref响应式数据

4. readonly 传入一个

### 计算属性  
1. computed
```

```



