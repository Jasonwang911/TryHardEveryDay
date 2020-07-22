## Vue源码学习

### rollup
rollup更专注于打包js，打包出的体积更小   
打包应用使用webpack，打包js类库使用rollup  
1. 安装依赖
@babel/core   使用babel就需要安装core   
@babel/preset-env  babel的一个预设，可以把高级语法转换成为低级语法   
rollup-plugin-babel  支持在rollup中使用babel    
rollup-plugin-serve  开发过程中的本地服务
cross-env  环境变量的设置
```
 yarn add rollup @babel/core @babel/preset-env rollup-plugin-babel cross-env -D
```
2. 配置文件 rollup.config.js
rollup的配置文件rollup.config.js支持es6-module，支持es6语法  
```
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/index.js',  // 打包的入口文件
  output: {
    file: 'dist/umd/vue.js',  // 打包的出口文件
    name: 'Vue',  // 打包后暴露的全局变量的名称
    format: 'umd',  // 指定统一的模块规范
    sourcemap: true   // 开始源码调试，方便找到源码报错位置
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'   // 排除babel转化的文件夹
    }),
    process.env.ENV == 'development' 
    ? 
    serve({
      open: true,   // 自动打开浏览器
      openPage: '/public/index.html',  // 默认打开的html
      port: 9909,    // 默认打开的端口
      contentBase: ''   // 服务默认的根路径
    })
    : null
  ]
}
```
3. 配置npm命令（package.json)
rollup -c   // -c 使用rollup.config.js配置文件启动  -w 开启监听模式
```
"scripts": {
  "build:dev": "rollup -c",
  "serve": "cross-env ENV=development rollup -c -w"
},
```
4. 初始化Vue的方法，_init   
index.js  Vue的一个声明文件，起到整合的做用，在原型上挂载方法，通过initMixin函数传入Vue实例
init.js  是对Vue原型上方法进行初始化，在Vue实例里调用后，会自动初始化Vue原型上的_init方法，暴露initMixin方法用来接收Vue实例
state.js  是对Vue上属性的初始化，初始化顺序是 属性 方法 数据 计算属性 watch 依次初始化
observe文件夹  响应式原理的主要流程  
5. 响应式原理 observe(data) 
- 对象的深度劫持
- 数组的处理
在Observer类中判断是否是数组，对数组进行单独处理。如果不单独处理会对索引进行观测，会导致性能问题   
前端开发中很少去操作索引（push shift unshift等）对这些方法进行重写   
如果数组中放的是对象，需要对对象再进行观测  
重写是数组的方法是会导致数组本身发生变化的方法： push shift unshift pop resverse sort splice    
slice() 等方法不会导致数组本身发生变化，所以不需要重写  


