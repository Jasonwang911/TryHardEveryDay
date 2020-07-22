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
