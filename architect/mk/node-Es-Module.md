# Node 支持 ES-module

### 模块化
1. CMD AMD require.js

2. CommonJS(node支持的模块化)
- 加载 require()
- 输出 module.exports / exports.x

3. ES Module 
- 加载 import 
- 输出 export default / export function/const

## node 支持 ES Module 的方法
1. webpack 构建
- 安装 webpack 
```
npm install webpack webpack-cli -D
```
- webpack 配置文件 webpack.config.js
```
const path = require('path')

module.exports = {
  entry: './bin/core.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'core.js'
  }
}
```
将入口文件中的内容 使用 require('./dist/core.js') 进行引用，然后用webpack对core.js为入口的文件进行编译
- 构建命令 package.json
```
"script": {
  "build": "webpack",
  "dev": "webpack --watch"
},
```
- 以上方法能支持高版本node，如果使用低版本node还需要添加babel的支持
- webpack 默认配置属性 target: 'web' 不会提提供内置库的打包，需要把target改为 node, webpack会提供垫片，对内置库进行处理
> 安装依赖库
```
npm install babel-loader @babel/core @babel/preset-env -D
```
> 对babel进行配置
```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_module|dist)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```
> 出现 ReferenceError: regeneratorRuntime is not defined 报错，是babel的regeneratorRuntime垫片并没有给引入，解决此问题，需要一个 @babel/plugin-transform-runtime 插件的垫片
```
npm install @babel/plugin-transform-runtime @babel/runtime-corejs3 -D
```
```
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './bin/core.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'core.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_module|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  regenerator: true,
                  useESModules: true,
                  helpers: true
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
```

2. 通过 node 原生进行支持
- .mjs 文件, 开启实验性属性
- 执行命令  node --experimental-modules bin/index.mjs  (node8 到 node14 支持实验性属性， node14 支持原生开启)
```
import './core.mjs'
```