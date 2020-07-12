# Vite
vite是一个基于Vue3单文件组件的非打包开发服务器，它做到了本地快速开发启动，实现按需编译，不再等待整个应用编译完成。   
面向现代浏览器，基于原生模块系统  ESModule 实现。webpack的开发环境很慢（开发时需要进行编译放到内存中）
```
npm install create-vite-app -g
create-vite-app xxx
// 或者
npm init vite-app xxxx
```

### 
默认采用的是es6原生模块，（import 语法在es6中默认会发送一个请求）   
默认会给vue的模块增加一个前缀 @module   
把.vue文件在后端给解析成一个对象（唯一就是编译了.vue文件）  

es-module-lexer  解析import语法,变为ast语法树     
magic-string   解析字符串，因为字符串具有不变性，需要把字符串变为对象再来重写     
```
npm install es-module-lexer koa koa-static magic-string
```


## Vite的实现原理
Vite在浏览器端使用export import的方式导入和导出模块，同时实现了按需加载。vite高度依赖module script特性