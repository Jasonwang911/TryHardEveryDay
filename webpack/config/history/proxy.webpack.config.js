let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BannerPlugin } = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js',
  },
  output: {
    filename: '[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 7900,
    progress: true,
    contentBase: './dist',
    compress: true,
    // 通过重写的方式，进行代理
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3000',
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   }
    // },
    // webpack-dev-server提供的钩子方法
    before(app) {
      app.get('/api/user', (req, res ) => {
        res.json('hello mock')
      })
    }
  },
  // watch: true,
  // // 监控的选项
  // watchOptions: {
  //   poll: 100, // 每秒监控一次
  //   aggregateTimeout: 500,  // 防抖： 
  //   ignored: /node_modules/  // 忽略文件
  // },
  // 1. 源码映射，会单独生成一个sourceMap文件，会将源码映射到打包后代码，报错会提示当前报错的行和列
  // devtool: 'source-map',
  // 2. 不会产生单独的文件，但是会显示报错的行和列
  // devtool: 'eval-source-map',
  // 3. 不会产生列，但是是一个单独的映射文件
  // devtool: 'cheap-module-source-map',
  // 4. 不会产生文件，集成在打包后的文件中，也不会产生列
  // devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      hash: true
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './doc',
        to: './doc'
      }
    ]),
    new BannerPlugin('make 2020 by Jason Wang')
  ]
}