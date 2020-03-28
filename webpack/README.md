# wepack

## 安装依赖
```
yarn webpack webpack-cli -D
```

### webpack-dev-server
```
yarn add webpack-dev-server -D

devServer: {
  port: 7900,
  progress: true,
  contentBase: './dist',
  compress: true
},
```

运行
```
webpack-dev-server
```

### html-webpack-plugin
```
yarn add html-webpack-plugin -D

let HtmlWebpckPlugin = require('html-webpack-plugin')

new HtmlWebpckPlugin({
  template: './public/index.html',
  filename: 'index.html',
  // 压缩
  minify: {
    // 删除双引号
    removeAttributeQuotes: true,
    // 折叠空行
    collapseWhitespace: true
  },
  // 添加hash
  hash: true
})
```

## module 模块

### css-loader 解析css引入的语法： @import 

### style-loader 把css插入到head标签中去


