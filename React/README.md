## React面试

1. React的优势
- 用于构建用户界面的JavaScript库
- 模板不纯净引入了其他的概念，代码更加纯净可读，更加自由。Vue的末班更加规矩

2. JSX映射虚拟DOM
- JSX最终会编译为React.createElement()语法糖，
- createElement()对参数进行拆解
- 发起ReactElement调用生成虚拟DOM对象

3. 什么是数据流管理

- UI = render(data)  or UI = f(data) 
- 组件间通信的背后是一套环环相扣的React数据流解决方案 
- 数据流就是React的核心
- React是一个由上而下的单向的数据流  
- props 和 回调
- Context API 是React 官方提供的一种组件数全局通信方式  React.createContext  Provider Consumer，数据混合到了展示层混合到一起，项目变大引起混乱。数据流不可回溯。
- 

4. Redux设计理念
- 全局store，组件销毁，状态还在
- 数据流可回溯

缺点： 
- 大量的store繁琐的操作
- 状态的残留
- 性能的优化
- 不支持TS

es6的proxy是mobox监听原理，把简单的操作给了用户，复杂的东西自己实现。好处是使用简单；缺点是大型项目使用不太好
