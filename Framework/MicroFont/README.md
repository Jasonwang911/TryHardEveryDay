## 微前端 

#### 什么是微前端
微前端就是将不同的功能按照不同的维度拆分成多个子应用，通过主应用来加载这些子应用   
微前端的核心在于拆，拆完之后再合   

#### 为什么用微前端
不同团队技术栈不同   
希望每个团队都可以独立开发，独立部署   
项目中还有老代码不能重构   

#### 如何落地微前端
- single-SPA(2018年) 
  没有处理央视隔离，和平级之间应用的js隔离   
  仅仅实现了路由劫持和引用加载   
- qiankun（2019）： single-SPA + sandbox + import-html-entry

#### 应用间通信方式
1. 基于URL进行通信，传递消息的能力弱
2. 基于CustomEvent实现通信，浏览器自带的默认事件
3. 基于props主子应用通信
4. 使用全局变量，vuex进行通信  

#### 公共依赖
1. CDN-externals: web模块进行抽离
2. webpack5中提供的联邦模块  

#### Single-SPA  
