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
```
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
        'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
```
### css-loader 解析css引入的语法： @import 

### style-loader 把css插入到head标签中去

### less-loader 把less处理为css

### mini-css-extract-plugin 把css处理为link标签插入的插件
```
yarn add mini-css-extract-plugin -D

module: {
  rules: [
    {
      test: /\.css$/,
      use: [
      MiniCssExtractPlugin.loader,
      'css-loader']
    },
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    }
  ]
},
plugins: [
  new MiniCssExtractPlugin({
    filename: 'main.css'
  })
]
```

### autoprefixer 自动添加浏览器兼容前缀 需要配合 postcss-loader 进行处理
```
yarn add postcss-loader autoprefixer -D

// loader 在css-loader之前使用postcss-loader 
rules: [
  {
    test: /\.css$/,
    use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    ]
  },
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'less-loader'
    ]
  }
]
```
postcss.config.js
```
module.exports = {
  plugins: [
      require('autoprefixer')()
  ]
}
```
如果想设置浏览器兼容列表，需在package.json中添加 browserslist
```
"browserslist": [
  "defaults",
  "not ie < 11",
  "last 2 versions",
  "> 1%",
  "iOS 7",
  "last 3 iOS versions"
]
```

### 压缩css  optimize-css-assets-webpack-plugin 

```
yarn add optimize-css-assets-webpack-plugin -D

let OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin')

module.exports = {
  ...
  // 优化项
  optimization: {
    minimizer: [ new OptimizeCSSAssetsPlugin({})],
  },
  ...
}
```

### 压缩js: uglifyjs-webpack-plugin
```
yarn add uglifyjs-webpack-plugin -D

let UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 优化项
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,  // 是否启用缓存
        parallel: true, // 是否并发压缩
        sourceMap: true, // 是否开启sourceMap
      })
    ],
  },
```

### babel: es6->es5  
- 官网[https://babeljs.io/]
1. babel-loader 转化的下载器
2. @babel/core  babel的核心模块，会调用transform方法进行转化
3. @babel/preset-env  转化的具体模块，会把高级的语法转换为低级语法
4. @babel/plugin-proposal-class-properties 提案语法的转化（class)
5. @babel/plugin-proposal-decorators 装饰器相关配置
6. @babel/plugin-transform-runtime   generator/promise 等高级语法
7. @babel/runtime  @babel/plugin-transform-runtime在打包后的插件，需要-S安装
8. @babel/polyfill  es7或者更高级的语法需要使用babel的补丁模块

相关配置
```
yarn add babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties -D

rules: [
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      }
    }
  },
]
```

- 装饰器
```
yarn add @babel/plugin-proposal-decorators -D

plugins: [
  ["@babel/plugin-proposal-decorators", { "legacy": true }],  //使用宽松模式
  ["@babel/plugin-proposal-class-properties", { "loose" : true }]
]
```

- promise和迭代器
```
yarn add @babel/plugin-transform-runtime -D
yarn add @babel/runtime -S

rules: [
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          ["@babel/plugin-proposal-decorators", { "legacy": true }],  //使用宽松模式
          ["@babel/plugin-proposal-class-properties", { "loose" : true }],
          '@babel/plugin-transform-runtime'
        ]
      }
    },
    exclude: /node_modules/,
    include: path.resolve(__dirname, 'src')
  },
]
```

- @babel/polyfill
```
yarn add @babel/polyfill -S
```

### ESLint  
- 官网[https://eslint.org/]
1. eslint 
2. eslint-loader 


- eslint-loader 
```
rules: [
  {
    enforce: 'pre',
    test: /\.js$/,
    use: {
      loader: 'eslint-loader'
    },
    exclude: /node_modules/,
  },
]
```

### 第三方模块的处理  
1. expose-loader: 内联loader(liader) 例如第三方模块 jquery 等，等挂载在window对象上的库，需要使用 expose-loader 暴露全局loader 
```
import $ from 'expose-loader?$!jquery'

console.log(window.$)
```
或者 配置loader
```
{
  test: require.resolve('jquery'),
  use: 'expose-loader?$!juqeyr'
},
```

2. webpack.providePlugin  使用三方插件入第三方插件,缺点是依旧不能直接暴露到window上，想使用window对象的话可以使用cdn   
```
let webpack = require('webpack')

plugins: [
  new webpack.providePlugin({
    jquery: '$'
  })
]
```

3. externals 不从 bundle 中引用依赖的方式。解决的是，所创建的 bundle 依赖于那些存在于用户环境(consumer environment)中的依赖。
```
module.exports = {
  ...
  externals: {
    jquery: '$'
  }
  ...
}
```

## webpack打包图片
- 在js中创建图片来引入

1. file-loader: 默认会在内部生成资源文件到出口文件目录下
2. url-loader: 会在file-loader的基础上添加一些限制，如：
- 当图片小于4k的时候用base64,如果大于则用file-loader进行转化
```
{
  test: /\.(png|jpg|gif|ico)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 200*1024
    }
  }
}
```
- 对相关资源进行分类存储
```
...
{
  test: /\.(png|jpg|gif|ico)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 200*1024,
      outputPath: 'img/',   // 资源的分类存放
    }
  }
}
...
// mini-css-extract-plugin 也可以对css文件分类存储
new MiniCssExtractPlugin({
  filename: 'css/main.css'
}),
```
3. html-withimg-loader: 将html的中资源路径编译成打包后的正常路径 ? !尝试未成功
```
yarn add html-withimg-loader -D

{
  test: /\.(htm|html)$/i,
  loader: 'html-withimg-loader'
},
```

4. 添加通用路径
- 给所有的资源添加 publicPath
```
output: {
  filename: 'boundle.[hash:8].js',
  path: path.resolve(__dirname, 'dist'),
  // publicPath: 'http://www.wangshen.top'   // 给所有的资源添加发布路径前缀
},
```
- 只给某一个类型的资源添加，例如只给图片添加
```
{
  test: /\.(png|jpg|gif|ico)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 1,
      outputPath: '/img/',   // 资源的分类存放
      publicPath: 'http://www.wangshen.top'
    }
  }
}
```