## VUE3.0

## Vue-cli 升级到最新版本 4.5
1. 安装脚手架
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli

```
2. 升级脚手架
```
npm update -g @vue/cli

# 或者
yarn global upgrade --latest @vue/cli
```
3. 查看脚手架版本
```
vue --version
```
4. 快速原型开发，可以运行单个.vue文件，缺点事需要安装全局依赖，这使得在不同的机器上一致性不能得到保证
https://cli.vuejs.org/zh/guide/prototyping.html
```
npm install -g @vue/cli-service-global
## 运行
serve [options] [entry]
Options:

  -o, --open  打开浏览器
  -c, --copy  将本地 URL 复制到剪切板
  -h, --help  输出用法信息

## 或者在vue文件下运行
vue serve
```

## Vue2.0 和 Vue3.0 对比
- Vue2.0采用flow(类型检测器)进行编写，3.0源码采用TS进行开发，对Ts支持友好
- 源码体积优化，移除部分api，便于tree-shaking（函数式api）
- 数据劫持优化： 3.0采用Proxy，性能大大提高
- 编译优化：3.0实现了静态模板分析，重写diff算法
- CompositionAPI: 整合业务代码的逻辑，提取公用逻辑（2.0采用了mixin--命名冲突数据来源不清晰）
- 自定义渲染器：可以用来创建自定义的渲染器，改写Vue底层渲染逻辑
- 新增Fragment/Teleport/Suspense组件



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



