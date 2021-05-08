const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log('webpack.config.js', process.env.NODE_ENV)

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'), // 输出的文件夹
    filename: 'main.js'
  },
  // devServer会启动一个HTTP开发服务器，把一个文件夹作为静态根目录
  devServer: {
    contentBase: resolve(__dirname, 'dist'),  // 为了提高性能，使用的是内存文件系统，硬盘看不见，此配置设置静态文件跟目录
    writeToDisk: true,   // 写到硬盘上
    port: '7777',
    compress: true, // 是否启用压缩
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}