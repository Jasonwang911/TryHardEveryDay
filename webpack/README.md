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

### 打包多页面
1. 多入口
```
entry: {
  home: './src/index.js',
  other: './src/other.js'
}
```

2. 多出口
```
output: {
  filename: '[name].[hash:8].bundle.js',
  path: path.resolve(__dirname, 'dist')
},
```

3. html-webpack-plugin 插件的 chunks，并分别new 不同的入口
```
plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['home'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other'],
      hash: true
    })
  ]
```

#### SourceMap
```
// 需要babel相关依赖
yarn add @babel/core @babel/preset-env babel-loader -D
```

1. 源码映射，会单独生成一个sourceMap文件，会将源码映射到打包后代码，报错会提示当前报错的行和列
```
devtool: 'source-map',
```
2. 不会产生单独的文件，但是会显示报错的行和列
```
devtool: 'eval-source-map',
```
3. 不会产生列，但是是一个单独的映射文件
```
devtool: 'cheap-module-source-map',
```
4. 不会产生文件，集成在打包后的文件中，也不会产生列
```
devtool: 'cheap-module-eval-source-map',
```

### webpack实时打包  watch 
```
module.exports = {
  ...
  watch: true,
  // 监控的选项
  watchOptions: {
    poll: 100, // 每秒监控一次
    aggregateTimeout: 500,  // 防抖： 
    ignored: /node_modules/  // 忽略文件
  },
  ...
}
```

### webpack 小插件的应用
1. cleanWebpackPlugin
每次打包后hash值不一致或者文件名不一致会导致打包后的的文件叠加在出口文件目录，这个插件会帮助我们清除打包出口文件然后再进行打包
```
yarn add clean-webpck-plugin -D

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

new CleanWebpackPlugin()
```

2. copyWebpckPlugin 
```
yarn add copy-webpack-plugin -D

const CopyWebpackPlugin = require('copy-webpack-plugin')

new CopyWebpackPlugin([
  {
    from: './doc',
    to: './doc'
  }
])
```

3. 内置插件 bannerPlugin:版权声明插件
```
const { BannerPlugin } = require('webpack')

new BannerPlugin('make 2020 by Jason Wang')
```

### webpack 跨域的配置: http-proxy 模块
- 通过代理重写
```
devServer: {
  port: 7900,
  progress: true,
  contentBase: './dist',
  compress: true,
  // 通过重写的方式，进行代理
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      pathRewrite: {
        '/api': ''
      }
    }
  }
},
```

- 纯前端的模拟数据
```
devServer: {
  port: 7900,
  progress: true,
  contentBase: './dist',
  compress: true,
  // webpack-dev-server提供的钩子方法
  before(app) {
    app.get('/api/user', (req, res ) => {
      res.json('hello mock')
    })
  }
},
```
- 有服务端，不用代理来处理，能不能在服务端中启动webpack，端口用服务端端口: 使用中间件 webpack-dev-middleware
```
yarn add webpack-dev-middleware -D
```
server.js
```
const express = require('express')
const webpack = require('webpack')
let app = express() 
// 中间件
const middle = require('webpack-dev-middleware')

const config = require('./webpack.config.js')

let comiler = webpack(config)

app.use(middle(comiler))

app.get('/api/user', (req, res ) => {
  res.json('hello')
})

app.listen(3000, () => {
  console.log('server is running at port 3000')
})
```

### resolve属性的配置---解析
当我们引用第三方包依赖的时候，会首先从当前目录的node_modules中查找，如果没有，会继续往上一级菜单的node_modules中查找，一直查找到根目录。   
1. resolve中的modules可以配置只查找某个目录，减少不必要的查找  
```
module.exports = {
  ...
  // 解析
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  ...
}
```
2. alias 设置别名
```
yarn add css-loader style-loader -D

module.exports = {
  ...
  // 解析
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    // 别名  vue ==> vue.runtime
    alias: {
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    }
  },
  ...
}
```
3. 引入主入口的更改
在package.json中可以设置多个入口标签，这样则可根据 resolve.mainFields来进行读取顺序的匹配
```
resolve: {
  modules: [path.resolve(__dirname, 'node_modules')],
  // 别名  vue ==> vue.runtime
  // alias: {
  //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
  // },
  mainFields: ['style', 'main']
},
```
4. 入口文件的名字可以通过 mainFiles进行指定
```
resolve: {
  modules: [path.resolve(__dirname, 'node_modules')],
  mainFields: ['style', 'main']
},
```
5. 引入文件的扩展名配置 resolve.extensions
```
resolve: {
  modules: [path.resolve(__dirname, 'node_modules')],
  // 别名  vue ==> vue.runtime
  // alias: {
  //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
  // },
  mainFields: ['style', 'main'],
  extensions: ['.css', '.js']
},
```

### 环境变量和区分不同环境
1. 环境变量：使用插件 webpack.DefinePlugin
```
const { DefinePlugin } = require('webpack')

plugins: [
  // 配置环境变量
  new DefinePlugin({
    DEV: JSON.stringify('dev')
  }),
]
```
2. 关于webpack默认文件的混合
```
yarn add webpack-merge -D

npm run build -- --config webpack.prod.js
```


